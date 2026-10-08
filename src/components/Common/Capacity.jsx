import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Database, Info } from 'lucide-react';
import { fetchDgsInfo } from '../../api/pools';
import { fetchAllVolumesInfo } from '../../api/volumes';
import { fetchAllHostsInfo } from '../../api/nodes';

/*
 * Capacity display shared by the CIFS, NFS and Home pages.
 *
 * Numbers from the backend: used / quota / available are GB; referenced and usedbysnapshots are MB (levelthis in
 * allphysicalinfo.py).  A quota of 0 means "no limit" (the volume may grow to what the pool has).
 * Volumes are thin: a quota reserves nothing, so the sum of the quotas of a pool can be larger than the pool.  What the
 * pool really has is used + available of its dataset; at 90 % of that the backend warns every 2 hours (putzpool.py).
 */

const num = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
};

export const fmtGB = (gb) => {
    const n = num(gb);
    if (n >= 1024) return `${(n / 1024).toFixed(n >= 10240 ? 0 : 1)} TB`;
    if (n >= 100) return `${Math.round(n)} GB`;
    if (n >= 1) return `${n.toFixed(1)} GB`;
    return `${Math.round(n * 1024)} MB`;
};

// a size as a plain number of GB (the unit is in the header of the column)
export const fmtNum = (gb) => {
    const n = num(gb);
    if (n >= 100) return String(Math.round(n));
    if (n >= 1) return n.toFixed(1);
    return n.toFixed(2);
};

export const poolLabel = (pool = '') => String(pool).split('p')[2] || pool;

// capacity numbers of one volume (all in GB)
export const volumeNumbers = (vol) => {
    const used = num(vol.used);
    const quota = num(vol.quota);
    const avail = num(vol.available);
    const limit = quota > 0 ? quota : used + avail;
    const free = vol.available !== undefined && vol.available !== '' ? avail : Math.max(limit - used, 0);
    const snaps = Math.min(num(vol.usedbysnapshots) / 1024, used);
    const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
    return { used, quota, limit, free, snaps, pct, data: Math.max(used - snaps, 0), unlimited: !(quota > 0) };
};

const levelClass = (pct) => (pct >= 90 ? 'bg-danger-500' : pct >= 75 ? 'bg-warning-500' : 'bg-success-500');
const levelText = (pct) => (pct >= 90 ? 'text-danger-600' : pct >= 75 ? 'text-warning-600' : 'text-gray-700');

// used / limit with a bar: data, then snapshots in a lighter tone of the same colour
export const CapacityBar = ({ vol }) => {
    const c = volumeNumbers(vol);
    const dataW = c.limit > 0 ? (c.data / c.limit) * 100 : 0;
    const snapW = c.limit > 0 ? (c.snaps / c.limit) * 100 : 0;
    const title = [
        `Used ${fmtGB(c.used)} of ${c.unlimited ? 'the pool free space' : fmtGB(c.limit)} (${c.pct.toFixed(0)} %)`,
        `Data ${fmtGB(c.data)} · Snapshots ${fmtGB(c.snaps)}`,
        `Free ${fmtGB(c.free)}`,
        c.unlimited ? 'No quota: the volume may use all free space of its pool' : 'Thin provisioned: the quota reserves no space',
    ].join('\n');
    return (
        <div className="min-w-[170px]" title={title}>
            <div className="flex items-baseline justify-between gap-2 text-xs">
                <span className={`font-semibold ${levelText(c.pct)}`}>{fmtNum(c.used)}</span>
                <span className="text-gray-500">of {c.unlimited ? 'no limit' : fmtNum(c.limit)}</span>
                <span className={`font-mono text-[11px] ${levelText(c.pct)}`}>{c.pct.toFixed(0)}%</span>
            </div>
            <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div className={`h-full ${levelClass(c.pct)}`} style={{ width: `${dataW}%` }} />
                <div className={`h-full opacity-50 ${levelClass(c.pct)}`} style={{ width: `${snapW}%` }} />
            </div>
        </div>
    );
};

const flagOn = (v) => ['on', 'lz4', 'yes', 'true', 'verify'].includes(String(v || '').toLowerCase()) || /^(lz4|zstd|gzip)/i.test(String(v || ''));
const flagKnown = (v) => v !== undefined && v !== null && v !== '' && v !== '-';

// compression ratio of the data plus small badges for what is switched on
export const EfficiencyCell = ({ vol }) => (
    <div className="flex items-center gap-1.5">
        <span className="font-mono text-sm text-gray-700">{vol.refcompressratio || 'n/a'}</span>
        {flagKnown(vol.compression) && (
            <span className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${flagOn(vol.compression) ? 'bg-success-50 text-success-700' : 'bg-gray-100 text-gray-400'}`}>
                {flagOn(vol.compression) ? 'Comp' : 'No comp'}
            </span>
        )}
        {flagKnown(vol.dedup) && (
            <span className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${flagOn(vol.dedup) ? 'bg-brand-50 text-brand-700' : 'bg-gray-100 text-gray-400'}`}>
                {flagOn(vol.dedup) ? 'Dedup' : 'No dedup'}
            </span>
        )}
    </div>
);

// real and provisioned capacity of every pool: { name: { usable, used, free, realPct, provisioned, ratio } }
export const poolStats = (pools, volumes) => {
    const out = {};
    Object.values(pools || {}).forEach((p) => {
        if (!p || !String(p.name).startsWith('pdhc')) return;
        const used = num(p.used);
        const free = num(p.available);
        const usable = used + free;
        out[p.name] = { name: p.name, host: p.host, usable, used, free, realPct: usable > 0 ? (used / usable) * 100 : 0, provisioned: 0, ratio: 0, volumes: 0 };
    });
    (volumes || []).forEach((v) => {
        const s = out[v.pool];
        if (!s) return;
        s.provisioned += num(v.quota) > 0 ? num(v.quota) : num(v.used);
        s.volumes += 1;
    });
    Object.values(out).forEach((s) => { s.ratio = s.usable > 0 ? s.provisioned / s.usable : 0; });
    return out;
};

// pools (dgsinfo), all volumes (every protocol) and the addresses of the nodes, refreshed together
export const useCapacity = (intervalMs = 10000) => {
    const [state, setState] = useState({ pools: {}, volumes: [], hosts: [] });
    const load = useCallback(async () => {
        try {
            const [p, v, h] = await Promise.all([fetchDgsInfo(), fetchAllVolumesInfo(), fetchAllHostsInfo().catch(() => ({ data: {} }))]);
            const hosts = [];
            const all = h.data?.all || {};
            Object.entries(all).forEach(([name, info]) => {
                if (info?.ipaddr) hosts.push({ name, ip: info.ipaddr });
                if (info?.cluster) hosts.push({ name: 'cluster', ip: info.cluster });
            });
            (h.data?.active || []).forEach((a) => { if (a?.ip) hosts.push({ name: a.name, ip: a.ip }); });
            setState({ pools: p.data?.pools || {}, volumes: v.data?.allvolumes || [], hosts });
        } catch (e) { /* the page keeps what it had */ }
    }, []);
    useEffect(() => {
        load();
        const t = setInterval(load, intervalMs);
        return () => clearInterval(t);
    }, [load, intervalMs]);
    return { stats: poolStats(state.pools, state.volumes), volumes: state.volumes, hosts: state.hosts, reload: load };
};

// the card beside the "New Volume" form: one line per pool
export const PoolCapacityPanel = ({ stats, className = '' }) => {
    const rows = Object.values(stats || {});
    const total = rows.reduce((a, s) => ({ usable: a.usable + s.usable, used: a.used + s.used, prov: a.prov + s.provisioned }), { usable: 0, used: 0, prov: 0 });
    return (
        <div className={`flex flex-col rounded-lg border border-border bg-surface p-5 shadow-sm ${className}`}>
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600"><Database size={16} /></div>
                <div className="min-w-0 flex-1">
                    <h3 className="whitespace-nowrap text-base font-semibold text-gray-800">Pool Capacity</h3>
                    <p className="text-xs text-gray-500">Real usage and thin provisioning per pool</p>
                </div>
            </div>

            <div className="-mt-1 mb-4 flex flex-wrap items-baseline gap-x-4 text-xs text-gray-500">
                <span><span className="font-semibold text-gray-800">{fmtGB(total.used)}</span> used of {fmtGB(total.usable)}</span>
                <span>{fmtGB(total.prov)} provisioned</span>
            </div>

            <div className="space-y-4">
                {rows.length === 0 && <p className="py-6 text-center text-sm text-gray-400">No pools yet</p>}
                {rows.map((s) => {
                    const provW = s.usable > 0 ? Math.min((s.provisioned / s.usable) * 100, 100) : 0;
                    return (
                        <div key={s.name}>
                            <div className="flex items-baseline justify-between gap-2">
                                <span className="text-sm font-semibold text-gray-800">Pool {poolLabel(s.name)}</span>
                                <span className="text-xs text-gray-500">{s.volumes} volume{s.volumes === 1 ? '' : 's'}</span>
                            </div>
                            <div className="mt-1.5 flex items-baseline justify-between gap-2 text-xs">
                                <span className={`font-semibold ${levelText(s.realPct)}`}>{fmtGB(s.used)} used</span>
                                <span className="text-gray-500">{fmtGB(s.free)} free of {fmtGB(s.usable)}</span>
                                <span className={`font-mono text-[11px] ${levelText(s.realPct)}`}>{s.realPct.toFixed(0)}%</span>
                            </div>
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100" title="Real usage of the pool">
                                <div className={`h-full ${levelClass(s.realPct)}`} style={{ width: `${Math.min(s.realPct, 100)}%` }} />
                            </div>
                            <div className="mt-1.5 flex items-center justify-between gap-2 text-[11px] text-gray-500">
                                <span>Provisioned {fmtGB(s.provisioned)}</span>
                                {s.ratio > 1
                                    ? <span className="rounded-sm bg-brand-50 px-1.5 py-0.5 font-medium text-brand-700" title="The quotas of the volumes add up to more than the pool holds (thin provisioning)">{s.ratio.toFixed(2)}× over-provisioned</span>
                                    : <span>{(s.ratio * 100).toFixed(0)}% of the pool</span>}
                            </div>
                            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100" title="Quotas handed out (can pass 100 %: volumes are thin)">
                                <div className="h-full bg-brand-500/60" style={{ width: `${provW}%` }} />
                            </div>
                            {s.realPct >= 90 && (
                                <div className="mt-2 flex items-start gap-1.5 rounded-md border border-danger-100 bg-danger-50 px-2.5 py-1.5 text-xs text-danger-600">
                                    <AlertTriangle size={13} className="mt-px flex-shrink-0" />
                                    Above 90% of its real capacity, only {fmtGB(s.free)} left. A warning is logged every 2 hours.
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="mt-4 flex items-start gap-1.5 border-t border-border pt-3 text-[11px] leading-snug text-gray-400">
                <Info size={12} className="mt-px flex-shrink-0" />
                Volumes are thin provisioned: a size is a limit, not a reservation, so only the real usage counts against the pool.
            </p>
        </div>
    );
};

// under the Size field of the create forms
export const ProvisionHint = ({ stat, size }) => {
    const gb = num(size);
    if (!stat) return <p className="text-[11px] text-gray-400">Choose a pool to see its free space.</p>;
    const after = stat.provisioned + gb;
    const overFree = gb > stat.free;
    const overPool = after > stat.usable;
    return (
        <div className="space-y-0.5 text-[11px] leading-snug">
            <p className="text-gray-500">
                Pool {poolLabel(stat.name)}: <span className="font-medium text-gray-700">{fmtGB(stat.free)} free</span> of {fmtGB(stat.usable)} ·
                {' '}{fmtGB(stat.provisioned)} already provisioned → {fmtGB(after)} with this volume
            </p>
            {overFree && <p className="text-brand-700">Larger than the free space: allowed, the volume is thin and only what it stores counts.</p>}
            {overPool && !overFree && <p className="text-brand-700">The pool will be over-provisioned ({(after / stat.usable).toFixed(2)}×), only real usage counts.</p>}
            {stat.realPct >= 90 && <p className="font-medium text-danger-600">This pool is above 90% of its real capacity.</p>}
        </div>
    );
};

// compression and deduplication of a new volume: both on, the user may switch either off (stacked = two lines, no title)
export const EfficiencyOptions = ({ compression, dedup, onChange, stacked = false }) => (
    <div>
        {!stacked && <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">Data efficiency</span>}
        <div className={stacked ? 'flex flex-col gap-1.5' : 'flex flex-wrap gap-x-6 gap-y-2'}>
            <label className="flex cursor-pointer items-center whitespace-nowrap text-sm text-gray-700">
                <input type="checkbox" className="mr-2 h-4 w-4 flex-shrink-0 rounded border-border text-brand-600 focus:ring-brand-100" checked={compression} onChange={(e) => onChange({ compression: e.target.checked })} />
                Compression <span className="ml-1 text-xs text-gray-400">(LZ4)</span>
            </label>
            <label className="flex cursor-pointer items-center whitespace-nowrap text-sm text-gray-700">
                <input type="checkbox" className="mr-2 h-4 w-4 flex-shrink-0 rounded border-border text-brand-600 focus:ring-brand-100" checked={dedup} onChange={(e) => onChange({ dedup: e.target.checked })} />
                Deduplication
            </label>
        </div>
    </div>
);
