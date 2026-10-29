import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Activity, AlertTriangle, CheckCircle, Cpu, Database, ExternalLink, FolderOpen, Gauge, HardDrive, Layers, MemoryStick, Share2, Users, Zap } from 'lucide-react';
import { fetchPrometheusQuery, fetchPrometheusRange, fetchServiceSummary } from './api/performance';
import MetricCard from './components/MetricCard';
import { fetchAllHostsInfo } from './api/nodes';
import { fetchAllVolumesInfo } from './api/volumes';
import { sampleRange, sampleTop, samplePools, sampleVols, isPromAnswer } from './performanceSample';

// Same source and rule as the Nodes view (QNodes/ActiveNodes): members = hostsInfo.active, off = hostsInfo.lost
const hostName = (h) => (h && typeof h === 'object' ? h.name : h);
const countNodes = (info) => {
    const active = Array.isArray(info?.active) ? info.active : [];
    const lost = (Array.isArray(info?.lost) ? info.lost : []).map(hostName);
    const total = active.length;
    const off = active.filter((h) => lost.includes(hostName(h))).length;
    return { total, ready: total - off };
};

const PartnersTorus = ({ total, ready }) => {
    const r = 15.9155, c = 2 * Math.PI * r;
    const frac = total > 0 ? ready / total : 1;
    const all = frac >= 1;
    const green = '#1F9D6B';
    const bad = ready === 0 && total > 0 ? '#DC2626' : '#F59E0B';
    return (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2 shadow-sm" id="runningpartners">
            <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                <circle cx="18" cy="18" r={r} fill="none" stroke={all ? green : bad} strokeOpacity={all ? 1 : 0.35} strokeWidth="4.5" />
                {!all && <circle cx="18" cy="18" r={r} fill="none" stroke={green} strokeWidth="4.5" strokeDasharray={`${c * frac} ${c}`} strokeLinecap="butt" />}
            </svg>
            <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Running Partners</h3>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-semibold text-gray-900">{ready}/{total}</span>
                    <span className="text-xs font-medium text-gray-500">ready</span>
                </div>
            </div>
        </div>
    );
};

// Polling: one refresh per Prometheus scrape interval (5 s, same as the Nodes view). Everything comes from
// Prometheus (all nodes are scraped there) - no backend call and no telemetry heartbeat from this page.
const REFRESH_MS = 5000;
const RANGES = [
    { id: '15m', label: '15 min', sec: 900 },
    { id: '1h', label: '1 hour', sec: 3600 },
    { id: '6h', label: '6 hours', sec: 21600 },
    { id: '24h', label: '24 hours', sec: 86400 },
    { id: '7d', label: '7 days', sec: 604800 },
];
const NODE = '{instance=~".*:9100"}';
const NODE_ARC = '{instance=~".*:9100"}';
// every range query is "by (instance)": totals and averages are computed in the page, so the per-node table
// and the cluster charts share the same data
const RQ = {
    cpu: `100 - avg by (instance) (rate(node_cpu_seconds_total{mode="idle",instance=~".*:9100"}[1m])) * 100`,
    mem: `100 * (1 - node_memory_MemAvailable_bytes${NODE} / node_memory_MemTotal_bytes${NODE})`,
    read: `sum by (instance) (rate(node_disk_read_bytes_total${NODE}[1m])) / 1048576`,
    write: `sum by (instance) (rate(node_disk_written_bytes_total${NODE}[1m])) / 1048576`,
    busy: `100 * avg by (instance) (rate(node_disk_io_time_seconds_total${NODE}[1m]))`,
    queue: `sum by (instance) (node_disk_io_now${NODE})`,
    load: `node_load1${NODE}`,
    arc: `node_zfs_arc_size${NODE_ARC} / 1073741824`,
    arcMax: `node_zfs_arc_c${NODE_ARC} / 1073741824`,
    l2: `node_zfs_arc_l2_size${NODE_ARC} / 1073741824`,
    hit: `100 * rate(node_zfs_arc_hits${NODE_ARC}[1m]) / (rate(node_zfs_arc_hits${NODE_ARC}[1m]) + rate(node_zfs_arc_misses${NODE_ARC}[1m]))`,
    memTotal: `node_memory_MemTotal_bytes${NODE} / 1073741824`,
};
const IQ = {
    pools: 'node_zfs_zpool_state{instance=~".*:9100"} == 1',
    // inventory counters written by the backend into node_exporter's textfile collector (topstor_volumes{type},
    // topstor_users, topstor_groups); until they exist the page keeps using the etcd summary endpoint
    inv: 'max by (__name__, type) ({__name__=~"topstor_(volumes|users|groups)"})',
    // per volume (every dataset below the pool root): bandwidth MB/s and IOPS, read and write, over the last minute
    vol: ['nread', 'nwritten', 'reads', 'writes'].map((m) => `sum by (dataset) (rate(node_zfs_zpool_dataset_${m}{instance=~".*:9100",dataset=~".+/.+"}[1m]))${m.startsWith('n') ? ' / 1048576' : ''}`),
    top: `topk(5, sum by (dataset) (rate(node_zfs_zpool_dataset_nread${NODE}[1m]) + rate(node_zfs_zpool_dataset_nwritten${NODE}[1m]))) / 1048576`,
};

const ipOf = (instance) => String(instance || '').replace(/:\d+$/, '');
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };

// result -> { instance: [[t, v], ...] }
const toSeries = (res) => {
    const out = {};
    (res?.data?.data?.result || []).forEach((r) => {
        const key = r.metric?.instance || r.metric?.dataset || 'all';
        out[key] = (r.values || []).map(([t, v]) => [t, num(v)]).filter((p) => p[1] !== null);
    });
    return out;
};
// combine the per-instance series into one: 'sum' or 'avg' per timestamp
const combine = (series, mode) => {
    const acc = new Map();
    Object.values(series).forEach((pts) => pts.forEach(([t, v]) => {
        const e = acc.get(t) || { s: 0, n: 0 };
        e.s += v; e.n += 1; acc.set(t, e);
    }));
    return [...acc.entries()].sort((a, b) => a[0] - b[0]).map(([t, e]) => [t, mode === 'avg' ? e.s / e.n : e.s]);
};
const lastOf = (pts) => (pts && pts.length ? pts[pts.length - 1][1] : null);
const fmt = (v, d = 1) => (v === null || v === undefined ? '-' : Number(v).toFixed(d));

const SeriesChart = ({ title, icon, unit, lines, fixedMax }) => {
    const [hv, setHv] = useState(null);
    const W = 300, H = 100;
    const all = lines.flatMap((l) => l.points.map((p) => p[1]));
    const max = fixedMax || Math.max(1e-9, ...all) * 1.15;
    const t0 = Math.min(...lines.flatMap((l) => l.points.map((p) => p[0])));
    const t1 = Math.max(...lines.flatMap((l) => l.points.map((p) => p[0])));
    const path = (pts) => pts.map(([t, v], i) => {
        const x = t1 > t0 ? ((t - t0) / (t1 - t0)) * W : 0;
        const y = H - Math.min(1, v / max) * H;
        return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    const empty = all.length === 0;
    const onMove = (e) => {
        if (empty) return;
        const r = e.currentTarget.getBoundingClientRect();
        setHv(Math.min(1, Math.max(0, (e.clientX - r.left) / Math.max(1, r.width))));
    };
    // value of every line at the hovered time (nearest sample)
    const tip = hv === null || empty ? null : (() => {
        const t = t0 + hv * (t1 - t0);
        return {
            t,
            rows: lines.map((l) => {
                let best = null; let bd = Infinity;
                l.points.forEach((p) => { const d = Math.abs(p[0] - t); if (d < bd) { bd = d; best = p; } });
                return { name: l.name, color: l.color, v: best ? best[1] : null };
            }),
        };
    })();
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-muted text-brand-600">{icon}</div>
                    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                </div>
                <span className="text-xs font-medium text-gray-500">{unit}</span>
            </div>
            <div className="relative min-h-[100px] flex-1" onMouseMove={onMove} onMouseLeave={() => setHv(null)}>
                {empty ? (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">No data</div>
                ) : (
                    <>
                        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
                            {[0.25, 0.5, 0.75].map((f) => (
                                <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="3 3" />
                            ))}
                            {lines.map((l) => (
                                <path key={l.name} d={path(l.points)} fill="none" stroke={l.color} strokeWidth="1.8"
                                    vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                            ))}
                        </svg>
                        <span className="absolute left-1 top-0 text-[10px] text-gray-400">{fmt(max, max < 10 ? 1 : 0)}</span>
                        {tip && (
                            <>
                                <div className="pointer-events-none absolute bottom-0 top-0 w-px bg-gray-400" style={{ left: `${hv * 100}%` }} />
                                <div className="pointer-events-none absolute top-1 z-10 whitespace-nowrap rounded border border-border bg-surface px-2 py-1 text-[11px] shadow-md"
                                    style={hv > 0.6 ? { right: `${(1 - hv) * 100 + 1}%` } : { left: `${hv * 100 + 1}%` }}>
                                    <div className="font-medium text-gray-500">
                                        {new Date(tip.t * 1000).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </div>
                                    {tip.rows.map((r) => (
                                        <div key={r.name} className="flex items-center gap-1.5 text-gray-700">
                                            <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                                            {r.name} <strong>{fmt(r.v, 2)}</strong> {unit}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-2 text-xs">
                {lines.map((l) => (
                    <span key={l.name} className="inline-flex items-center gap-1.5 text-gray-600">
                        <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                        {l.name}
                        <strong className="text-gray-800">{fmt(lastOf(l.points))}</strong>
                    </span>
                ))}
            </div>
        </div>
    );
};

// grouped vertical bars: x axis = volume names, one bar per series; hovering a group shows the numbers
const BarsChart = ({ title, icon, unit, groups, series }) => {
    const max = Math.max(1e-9, ...groups.flatMap((g) => g.values)) * 1.15;
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-muted text-brand-600">{icon}</div>
                    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                </div>
                <span className="text-xs font-medium text-gray-500">{unit}</span>
            </div>
            {groups.length === 0 ? (
                <div className="flex h-[180px] items-center justify-center text-xs text-gray-400">No volumes</div>
            ) : (
                <div className="relative flex h-[200px] items-stretch gap-1.5 border-b border-border pb-0 pt-2">
                    <span className="absolute left-0 top-0 text-[10px] text-gray-400">{fmt(max, max < 10 ? 1 : 0)}</span>
                    {groups.map((g) => (
                        <div key={g.label} className="group relative flex min-w-0 flex-1 flex-col justify-end">
                            <div className="flex h-[150px] items-end justify-center gap-0.5">
                                {g.values.map((v, i) => (
                                    <div key={series[i].name} className="w-full max-w-[22px] rounded-t transition-opacity group-hover:opacity-80"
                                        style={{ height: `${Math.max(1, (v / max) * 100)}%`, background: series[i].color }} />
                                ))}
                            </div>
                            <div className="mt-1 h-[34px] overflow-hidden text-center text-[10px] leading-tight text-gray-600" title={g.label}>
                                <span className="block truncate">{g.label}</span>
                                <span className="block truncate text-gray-400">{g.sub}</span>
                            </div>
                            <div className="pointer-events-none absolute bottom-[40px] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded border border-border bg-surface px-2 py-1 text-[11px] shadow-md group-hover:block">
                                <div className="font-medium text-gray-800">{g.label}{g.sub ? ` (${g.sub})` : ''}</div>
                                {g.values.map((v, i) => (
                                    <div key={series[i].name} className="flex items-center gap-1.5 text-gray-700">
                                        <span className="h-2 w-2 rounded-full" style={{ background: series[i].color }} />
                                        {series[i].name} <strong>{fmt(v, unit === 'ops/s' ? 0 : 2)}</strong> {unit}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                {series.map((x) => (
                    <span key={x.name} className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: x.color }} />{x.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

const sevColor = { ok: 'border-success-100 bg-success-50 text-success-600', warn: 'border-warning-100 bg-warning-50 text-warning-600', crit: 'border-danger-100 bg-danger-50 text-danger-600' };

const QServicePerformance = () => {
    const [summary, setSummary] = useState({ users: 0, groups: 0, pools: 0, volumes: { cifs: 0, nfs: 0, iscsi: 0 } });
    const [data, setData] = useState(null);
    const [rangeId, setRangeId] = useState('1h');
    const [partnerStats, setPartnerStats] = useState({ total: 0, ready: 0 });
    const [hostNames, setHostNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sample, setSample] = useState(false);
    const [volMeta, setVolMeta] = useState([]);
    const volMetaRef = useRef([]);
    const readyRef = useRef([]);

    const isMounted = useRef(true);
    const rangeRef = useRef(rangeId);
    rangeRef.current = rangeId;
    const timer = useRef(null);

    const loadData = useCallback(async () => {
        if (!isMounted.current) return;
        const sec = (RANGES.find((r) => r.id === rangeRef.current) || RANGES[1]).sec;
        const end = Math.floor(Date.now() / 1000);
        const start = end - sec;
        const step = Math.max(5, Math.ceil(sec / 180 / 5) * 5);
        try {
            const keys = Object.keys(RQ);
            // Prometheus unreachable (no proxy route / request failed) -> sample data, flagged on the page
            const safe = (p) => p.catch(() => null);
            let ranges = await Promise.all(keys.map((k) => safe(fetchPrometheusRange(RQ[k], start, end, step))));
            let inst = await Promise.all([safe(fetchPrometheusQuery(IQ.top)), safe(fetchPrometheusQuery(IQ.pools)), safe(fetchPrometheusQuery(IQ.inv)), ...IQ.vol.map((q) => safe(fetchPrometheusQuery(q)))]);
            const live = ranges.some(isPromAnswer);
            if (!live) {
                const insts = readyRef.current.map((n) => `${n.ip}:9100`);
                ranges = keys.map((k) => sampleRange(k, start, end, step, insts));
                inst = [sampleTop(), samplePools(insts), null, ...sampleVols(volMetaRef.current)];
            }
            if (isMounted.current) setSample(!live);
            if (!isMounted.current) return;
            const s = {};
            keys.forEach((k, i) => { s[k] = toSeries(ranges[i]); });
            const pools = (inst[1]?.data?.data?.result || []).map((r) => ({
                pool: r.metric.zpool, state: String(r.metric.state || '').toLowerCase(), instance: r.metric.instance,
            }));
            const top = (inst[0]?.data?.data?.result || []).map((r) => ({ dataset: r.metric.dataset, mbs: num(r.value?.[1]) }))
                .filter((d) => d.mbs !== null && d.mbs > 0);
            const inv = {};
            (inst[2]?.data?.data?.result || []).forEach((r) => {
                const n = r.metric.__name__ === 'topstor_volumes' ? `vol_${r.metric.type}` : String(r.metric.__name__ || '').replace('topstor_', '');
                inv[n] = num(r.value?.[1]);
            });
            const vmap = {};
            ['rbw', 'wbw', 'rio', 'wio'].forEach((k, i) => {
                (inst[3 + i]?.data?.data?.result || []).forEach((r) => {
                    const d = r.metric.dataset;
                    vmap[d] = vmap[d] || { dataset: d, rbw: 0, wbw: 0, rio: 0, wio: 0 };
                    vmap[d][k] = num(r.value?.[1]) || 0;
                });
            });
            // dataset -> assigned name + protocol from the volumes list (same API as the Volumes pages);
            // HOME folders are summed into ONE row, every other volume keeps its own row under its assigned name
            const meta = volMetaRef.current;
            const classify = (dataset) => {
                const [pool, leaf = ''] = String(dataset).split('/');
                const m = meta.find((v) => (!v.pool || v.pool === pool) && (v.fullname === leaf || v.name === leaf))
                    || meta.find((v) => (!v.pool || v.pool === pool) && leaf.replace(/_[0-9]+$/, '') === v.name);
                return { name: m ? m.name : leaf.replace(/_[0-9]+$/, ''), prot: m ? String(m.prot || '').toUpperCase() : '' };
            };
            const rows = [];
            let home = null;
            Object.values(vmap).forEach((v) => {
                const c = classify(v.dataset);
                if (c.prot.startsWith('HOME')) {
                    home = home || { dataset: 'home', name: 'Home folders (total)', prot: 'HOME', count: 0, rbw: 0, wbw: 0, rio: 0, wio: 0 };
                    home.count += 1;
                    ['rbw', 'wbw', 'rio', 'wio'].forEach((k) => { home[k] += v[k]; });
                } else {
                    rows.push({ ...v, name: c.name, prot: c.prot.replace(/_.*/, '') || '-' });
                }
            });
            const vols = [...rows, ...(home ? [home] : [])].map((v) => ({ ...v, bw: v.rbw + v.wbw, io: v.rio + v.wio }))
                .sort((a, b) => b.bw - a.bw || b.io - a.io);
            setData({ s, pools, top, inv, vols, at: Date.now() });
            setError(null);
        } catch (err) {
            if (err.code !== 'ERR_CANCELED' && err.message !== 'Request aborted') {
                setError('Failed to sync performance telemetry');
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
                timer.current = setTimeout(loadData, REFRESH_MS);
            }
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;

        fetchServiceSummary().then(res => {
            if (isMounted.current) setSummary(res.data);
        }).catch(() => {});

        const loadPartners = () => fetchAllHostsInfo().then(res => {
            if (isMounted.current && res.data) {
                setPartnerStats(countNodes(res.data));
                // ready nodes (members minus lost) feed the sample data, so the per-node lines match the Running Partners count
                const lostNames = (Array.isArray(res.data.lost) ? res.data.lost : []).map(hostName);
                readyRef.current = (Array.isArray(res.data.active) ? res.data.active : [])
                    .filter((h) => h && typeof h === 'object' && h.ip && !lostNames.includes(h.name))
                    .map((h) => ({ name: h.name, ip: h.ip }));
                // ip -> host name for the per-node table (same response, no extra request)
                const m = {};
                (Array.isArray(res.data.active) ? res.data.active : []).forEach((h) => {
                    if (h && typeof h === 'object') Object.values(h).forEach((v) => { if (typeof v === 'string') m[v] = h.name; });
                });
                setHostNames(m);
            }
        }).catch(() => {});
        const loadVolMeta = () => fetchAllVolumesInfo().then((res) => {
            const list = Array.isArray(res?.data?.allvolumes) ? res.data.allvolumes : [];
            volMetaRef.current = list;
            if (isMounted.current) setVolMeta(list);
        }).catch(() => {});
        loadVolMeta();
        const volInterval = setInterval(loadVolMeta, 30000);
        loadPartners();
        const partnerInterval = setInterval(loadPartners, 5000);

        loadData();

        return () => {
            isMounted.current = false;
            clearTimeout(timer.current);
            clearInterval(partnerInterval);
            clearInterval(volInterval);
        };
    }, [loadData]);

    // changing the window refreshes at once instead of waiting for the next tick
    const pickRange = (id) => {
        setRangeId(id);
        rangeRef.current = id;
        clearTimeout(timer.current);
        loadData();
    };

    const s = data?.s || {};
    const nodes = Object.keys(s.cpu || {}).sort();
    const nodeLabel = (i) => hostNames[ipOf(i)] || ipOf(i);
    const avgNow = (k) => { const v = nodes.map((n) => lastOf(s[k]?.[n])).filter((x) => x !== null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
    const sumNow = (k) => { const v = nodes.map((n) => lastOf(s[k]?.[n])).filter((x) => x !== null); return v.length ? v.reduce((a, b) => a + b, 0) : null; };
    const hitNow = avgNow('hit');
    const cpuNow = avgNow('cpu');
    const memNow = avgNow('mem');
    const busyNow = avgNow('busy');
    // counts: Prometheus inventory counters when present, otherwise the etcd summary
    const inv = data?.inv || {};
    const cnt = (k, fb) => (Number.isFinite(inv[k]) ? inv[k] : (fb || 0));
    const poolsBad = (data?.pools || []).filter((p) => p.state !== 'online');
    const poolCount = new Set((data?.pools || []).map((p) => p.pool)).size;

    // computed verdict: first matching rule wins, each says what was measured
    const verdict = (() => {
        if (!data) return { sev: 'ok', title: 'Waiting for telemetry', text: 'No samples received yet.' };
        if (poolsBad.length) return { sev: 'crit', title: 'Pool not healthy', text: `${poolsBad.map((p) => `${p.pool} is ${p.state}`).join(', ')}.` };
        if (partnerStats.total > 0 && partnerStats.ready < partnerStats.total) return { sev: 'warn', title: 'Partner not ready', text: `${partnerStats.total - partnerStats.ready} of ${partnerStats.total} partners are off.` };
        if (memNow !== null && memNow > 90) return { sev: 'warn', title: 'Memory pressure', text: `Memory in use is ${fmt(memNow, 0)} %.` };
        if (busyNow !== null && busyNow > 85) return { sev: 'warn', title: 'Disks saturated', text: `Average disk busy is ${fmt(busyNow, 0)} %.` };
        if (cpuNow !== null && cpuNow > 85) return { sev: 'warn', title: 'CPU saturated', text: `Average CPU is ${fmt(cpuNow, 0)} %.` };
        if (hitNow !== null && hitNow < 70) return { sev: 'warn', title: 'Low cache efficiency', text: `ARC hit ratio is ${fmt(hitNow, 0)} %; the working set may exceed memory.` };
        return { sev: 'ok', title: 'Healthy', text: 'Pools online, partners ready, CPU, memory, disks and cache within normal range.' };
    })();

    const line = (name, color, k, mode) => ({ name, color, points: combine(s[k] || {}, mode) });

    return (
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-xl font-semibold tracking-tight text-gray-900">Service Performance</h1>
                                <div className="mt-2 inline-flex overflow-hidden rounded-md border border-border" role="group" aria-label="Time range">
                                    {RANGES.map((r) => (
                                        <button
                                            key={r.id}
                                            type="button"
                                            onClick={() => pickRange(r.id)}
                                            className={`px-3 py-1 text-xs font-semibold transition-colors ${rangeId === r.id ? 'bg-brand-600 text-white' : 'bg-surface text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {r.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <PartnersTorus total={partnerStats.total} ready={partnerStats.ready} />
                                <a
                                    href={`https://${window.location.hostname}:4000`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-50 hover:text-brand-600"
                                >
                                    <ExternalLink size={15} />
                                    Launch Grafana
                                </a>
                            </div>
                        </div>

                        <div className="mt-3 space-y-3">
                            {sample && (
                                <div className="flex items-center gap-2 rounded-lg border border-warning-100 bg-warning-50 px-4 py-2 text-xs font-medium text-warning-600">
                                    <AlertTriangle size={14} />
                                    <span>Sample data - Prometheus is not reachable from this UI. Values are illustrative.</span>
                                </div>
                            )}
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
                                    <AlertTriangle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            {loading && (
                                <div className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-gray-500">
                                    Initializing telemetry stream...
                                </div>
                            )}

                            <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${sevColor[verdict.sev]}`} id="perfverdict">
                                {verdict.sev === 'ok' ? <CheckCircle size={18} className="mt-0.5" /> : <AlertTriangle size={18} className="mt-0.5" />}
                                <div>
                                    <h4 className="text-sm font-semibold">{verdict.title}</h4>
                                    <p className="text-sm">{verdict.text}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                                <MetricCard title="Cluster Identity" value={`${cnt('users', summary.users)}`} unit="Users Active" icon={<Users size={18} />} color="brand" />
                                <MetricCard
                                    title="Storage Fabric"
                                    value={`${poolCount || summary.pools}`}
                                    unit="Pools"
                                    icon={<Layers size={18} />}
                                    color={poolsBad.length ? 'warning' : 'success'}
                                />
                                <MetricCard
                                    title="Active Shares"
                                    value={`${(summary.volumes.cifs || 0) + (summary.volumes.nfs || 0) + (summary.volumes.iscsi || 0)}`}
                                    unit="Mount Points"
                                    icon={<HardDrive size={18} />}
                                    color="info"
                                />
                                <MetricCard title="Cache" value={fmt(hitNow)} unit="Hit Ratio %" icon={<Zap size={18} />} color="warning" />
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                                <MetricCard title="CIFS Volumes" value={`${cnt('vol_cifs', summary.volumes?.cifs)}`} unit="Created" icon={<FolderOpen size={18} />} color="brand" />
                                <MetricCard title="NFS Volumes" value={`${cnt('vol_nfs', summary.volumes?.nfs)}`} unit="Created" icon={<Share2 size={18} />} color="success" />
                                <MetricCard title="iSCSI Volumes" value={`${cnt('vol_iscsi', summary.volumes?.iscsi)}`} unit="Created" icon={<Database size={18} />} color="info" />
                                <MetricCard title="Groups" value={`${cnt('groups', summary.groups)}`} unit="Defined" icon={<Users size={18} />} color="warning" />
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4" id="volio">
                                <MetricCard title="Volume Bandwidth" value={fmt((data?.vols || []).reduce((a, v) => a + v.bw, 0), 1)} unit="MB/s all volumes" icon={<Gauge size={18} />} color="brand" />
                                <MetricCard title="Volume IOPS" value={fmt((data?.vols || []).reduce((a, v) => a + v.io, 0), 0)} unit="ops/s all volumes" icon={<Activity size={18} />} color="success" />
                                <MetricCard title="Busiest Volume" value={(() => { const b = (data?.vols || []).find((v) => v.prot !== 'HOME'); return b && (b.bw > 0 || b.io > 0) ? b.name : '-'; })()}
                                    unit={(() => { const b = (data?.vols || []).find((v) => v.prot !== 'HOME'); return b ? `${fmt(b.bw, 1)} MB/s - ${fmt(b.io, 0)} IOPS` : ''; })()} icon={<HardDrive size={18} />} color="warning" />
                                <MetricCard title="Home Folders (total)" value={fmt((data?.vols || []).find((v) => v.prot === 'HOME')?.bw ?? 0, 1)}
                                    unit={`MB/s - ${fmt((data?.vols || []).find((v) => v.prot === 'HOME')?.io ?? 0, 0)} IOPS - ${(data?.vols || []).find((v) => v.prot === 'HOME')?.count || 0} folders`} icon={<Users size={18} />} color="info" />
                            </div>

                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2" id="volumecharts">
                                <BarsChart
                                    title="IOPS per Volume" unit="ops/s" icon={<Activity size={16} />}
                                    series={[{ name: 'IOPS', color: '#6366F1' }]}
                                    groups={[...(data?.vols || [])].sort((x, y) => y.io - x.io).slice(0, 12)
                                        .map((v) => ({ label: v.name, sub: v.prot === 'HOME' ? `${v.count} folders` : v.prot, values: [v.io] }))}
                                />
                                <BarsChart
                                    title="Bandwidth per Volume" unit="MB/s" icon={<Gauge size={16} />}
                                    series={[{ name: 'Read', color: '#1F9D6B' }, { name: 'Write', color: '#F59E0B' }]}
                                    groups={[...(data?.vols || [])].sort((x, y) => y.bw - x.bw).slice(0, 12)
                                        .map((v) => ({ label: v.name, sub: v.prot === 'HOME' ? `${v.count} folders` : v.prot, values: [v.rbw, v.wbw] }))}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                <SeriesChart
                                    title="Throughput: Read vs Write"
                                    icon={<Activity size={16} />}
                                    unit="MB/s"
                                    lines={[line('Read', '#495BE2', 'read', 'sum'), line('Write', '#C77A12', 'write', 'sum')]}
                                />
                                <SeriesChart
                                    title="CPU and Memory"
                                    icon={<Cpu size={16} />}
                                    unit="%"
                                    fixedMax={100}
                                    lines={[line('CPU', '#1F9D6B', 'cpu', 'avg'), line('Memory', '#495BE2', 'mem', 'avg')]}
                                />
                                <SeriesChart
                                    title="ARC and L2ARC"
                                    icon={<MemoryStick size={16} />}
                                    unit="GB"
                                    lines={[line('ARC', '#495BE2', 'arc', 'sum'), line('ARC target', '#9CA3AF', 'arcMax', 'sum'), line('L2ARC', '#C77A12', 'l2', 'sum')]}
                                />
                                <SeriesChart
                                    title="Cache Hit Ratio"
                                    icon={<Zap size={16} />}
                                    unit="%"
                                    fixedMax={100}
                                    lines={[line('ARC hit', '#1F9D6B', 'hit', 'avg')]}
                                />
                                <SeriesChart
                                    title="Disk Busy"
                                    icon={<Gauge size={16} />}
                                    unit="%"
                                    fixedMax={100}
                                    lines={[line('Busy', '#DC2626', 'busy', 'avg')]}
                                />
                                <SeriesChart
                                    title="Load and Queue Depth"
                                    icon={<Gauge size={16} />}
                                    unit="load1 / I/Os in flight"
                                    lines={[line('Load', '#495BE2', 'load', 'avg'), line('Queue', '#C77A12', 'queue', 'sum')]}
                                />
                            </div>

                            <div className="grid grid-cols-[minmax(0,1fr)] gap-3 xl:grid-cols-3">
                                <div className="min-w-0 overflow-x-auto rounded-lg border border-border bg-surface p-3 xl:col-span-2" id="perfnodes">
                                    <h4 className="mb-2 text-sm font-semibold text-gray-800">Nodes</h4>
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-border text-xs uppercase tracking-wide text-gray-500">
                                                <th className="py-1 pr-3">Node</th>
                                                <th className="py-1 pr-3">CPU %</th>
                                                <th className="py-1 pr-3">Mem %</th>
                                                <th className="py-1 pr-3">Disk busy %</th>
                                                <th className="py-1 pr-3">Read MB/s</th>
                                                <th className="py-1 pr-3">Write MB/s</th>
                                                <th className="py-1 pr-3">ARC GB</th>
                                                <th className="py-1">Hit %</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nodes.length === 0 && (
                                                <tr><td colSpan="8" className="py-3 text-center text-xs text-gray-400">No data</td></tr>
                                            )}
                                            {nodes.map((n) => (
                                                <tr key={n} className="border-b border-border last:border-0">
                                                    <td className="py-1 pr-3 font-medium text-gray-800">{nodeLabel(n)}</td>
                                                    <td className="py-1 pr-3">{fmt(lastOf(s.cpu?.[n]), 0)}</td>
                                                    <td className="py-1 pr-3">{fmt(lastOf(s.mem?.[n]), 0)}</td>
                                                    <td className="py-1 pr-3">{fmt(lastOf(s.busy?.[n]), 0)}</td>
                                                    <td className="py-1 pr-3">{fmt(lastOf(s.read?.[n]))}</td>
                                                    <td className="py-1 pr-3">{fmt(lastOf(s.write?.[n]))}</td>
                                                    <td className="py-1 pr-3">{fmt(lastOf(s.arc?.[n]))}</td>
                                                    <td className="py-1">{fmt(lastOf(s.hit?.[n]), 0)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="rounded-lg border border-border bg-surface p-3" id="perftop">
                                    <h4 className="mb-2 text-sm font-semibold text-gray-800">Busiest Datasets</h4>
                                    {(data?.top || []).length === 0 ? (
                                        <p className="text-xs text-gray-400">No dataset I/O in the last minute.</p>
                                    ) : (
                                        <ul className="space-y-1.5">
                                            {data.top.map((d) => {
                                                const m = Math.max(...data.top.map((x) => x.mbs));
                                                return (
                                                    <li key={d.dataset} className="text-xs">
                                                        <div className="flex justify-between text-gray-700">
                                                            <span className="truncate pr-2">{d.dataset}</span>
                                                            <strong>{fmt(d.mbs, 2)} MB/s</strong>
                                                        </div>
                                                        <div className="mt-0.5 h-1.5 rounded bg-surface-muted">
                                                            <div className="h-1.5 rounded bg-brand-600" style={{ width: `${(d.mbs / m) * 100}%` }} />
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default QServicePerformance;
