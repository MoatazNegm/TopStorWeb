import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Activity, AlertTriangle, ExternalLink, Gauge, HardDrive, Layers, Users, Zap } from 'lucide-react';
import { fetchPrometheusQuery, fetchServiceSummary, pingHeartbeat } from './api/performance';
import MetricCard from './components/MetricCard';
import PerformanceChart from './components/PerformanceChart';
import Button from './components/Common/Button';

const QServicePerformance = () => {
    const [summary, setSummary] = useState({ users: 0, groups: 0, pools: 0, volumes: { cifs: 0, nfs: 0, iscsi: 0 } });
    const [metrics, setMetrics] = useState({ cpu: [], mem: [], io: [], arc: [] });
    const [liveStats, setLiveStats] = useState({ arcSizeGB: 0, arcHitRate: 0, zvolLatency: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isMounted = useRef(true);

    const queries = {
        cpu: '100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)',
        mem: '100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))',
        io: '(sum(rate(node_disk_read_bytes_total[1m])) + sum(rate(node_disk_written_bytes_total[1m]))) / 1048576',
        arcSize: 'node_zfs_arc_size / 1073741824',
        arcHit: '(rate(node_zfs_arc_hits[1m]) / (rate(node_zfs_arc_hits[1m]) + rate(node_zfs_arc_misses[1m]))) * 100',
        zvolLatency: '(avg(rate(node_disk_read_time_seconds_total{device=~"zd.*"}[1m]) / rate(node_disk_reads_completed_total{device=~"zd.*"}[1m]))) * 1000' 
    };

    const parsePrometheus = (res) => {
        try {
            const val = res.data?.data?.result?.[0]?.value?.[1];
            return val && !isNaN(val) ? parseFloat(val) : 0;
        } catch {
            return 0;
        }
    };

    const loadData = useCallback(async () => {
        if (!isMounted.current) return;

        try {
            const [cpuRes, memRes, ioRes, arcSizeRes, arcHitRes, zvolLatRes] = await Promise.all([
                fetchPrometheusQuery(queries.cpu),
                fetchPrometheusQuery(queries.mem),
                fetchPrometheusQuery(queries.io),
                fetchPrometheusQuery(queries.arcSize),
                fetchPrometheusQuery(queries.arcHit),
                fetchPrometheusQuery(queries.zvolLatency)
            ]);

            const currentCpu = parsePrometheus(cpuRes);
            const currentMem = parsePrometheus(memRes);
            const currentIo = parsePrometheus(ioRes);
            const currentArcSize = parsePrometheus(arcSizeRes);
            const currentArcHit = parsePrometheus(arcHitRes);
            const currentZvolLat = parsePrometheus(zvolLatRes);

            if (isMounted.current) {
                setLiveStats({
                    arcSizeGB: currentArcSize.toFixed(1),
                    arcHitRate: currentArcHit.toFixed(1),
                    zvolLatency: currentZvolLat.toFixed(2)
                });

                setMetrics(prev => ({
                    cpu: [...prev.cpu.slice(-29), currentCpu],
                    mem: [...prev.mem.slice(-29), currentMem],
                    io: [...prev.io.slice(-29), currentIo],
                    arc: [...prev.arc.slice(-29), currentArcHit]
                }));
                setError(null);
            }

        } catch (err) {
            if (err.code !== 'ERR_CANCELED' && err.message !== 'Request aborted') {
                console.error("Prometheus pulse failed", err);
                setError('Failed to sync performance telemetry');
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
                setTimeout(loadData, 250); 
            }
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;

        fetchServiceSummary().then(res => {
            if (isMounted.current) setSummary(res.data);
        }).catch(() => {});

        setMetrics({
            cpu: Array(30).fill(0), mem: Array(30).fill(0), io: Array(30).fill(0), arc: Array(30).fill(0)
        });

        pingHeartbeat();
        loadData(); 

        const heartbeatInterval = setInterval(pingHeartbeat, 3000);

        return () => {
            isMounted.current = false;
            clearInterval(heartbeatInterval);
        };
    }, [loadData]);

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Service Performance</h1>
                                <p className="mt-1 text-sm text-gray-500">Real-time ZFS heuristics and cluster orchestration vitals</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface-muted px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <span className="h-2 w-2 rounded-full bg-success-500" />
                                    Active Pulse
                                </div>
                                <a
                                    href="http://10.11.11.250:4000"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-50 hover:text-brand-600"
                                >
                                    <ExternalLink size={15} />
                                    Launch Grafana
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 space-y-6">
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

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <MetricCard
                                title="Cluster Identity"
                                value={`${summary.users}`}
                                unit="Users Active"
                                icon={<Users size={18} />}
                                color="brand"
                            />
                            <MetricCard
                                title="Storage Fabric"
                                value={`${summary.pools}`}
                                unit="Health Pools"
                                icon={<Layers size={18} />}
                                color="success"
                            />
                            <MetricCard
                                title="Active Shares"
                                value={`${(summary.volumes.cifs || 0) + (summary.volumes.nfs || 0) + (summary.volumes.iscsi || 0)}`}
                                unit="Mount Points"
                                icon={<HardDrive size={18} />}
                                color="info"
                            />
                            <MetricCard
                                title="ZFS ARC Cache"
                                value={liveStats.arcHitRate}
                                unit="Hit Ratio %"
                                icon={<Zap size={18} />}
                                color="warning"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <PerformanceChart
                                title="Storage Throughput (MB/s)"
                                icon={<Activity size={17} />}
                                data={metrics.io}
                                color="info"
                            />
                            <PerformanceChart
                                title="CPU Utilization & Load (%)"
                                icon={<Gauge size={17} />}
                                data={metrics.cpu}
                                color="success"
                            />
                        </div>

                        <div className="rounded-lg border border-border bg-surface-muted p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h4 className="text-base font-semibold text-gray-800">Heuristic Optimization</h4>
                                    <p className="mt-1 text-sm text-gray-500">
                                        ARC and disk telemetry indicate stable memory behavior and healthy cache efficiency.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                    <span className="text-gray-600"><strong className="text-gray-800">ARC:</strong> {liveStats.arcSizeGB} GB</span>
                                    <span className="text-gray-600"><strong className="text-gray-800">Latency:</strong> {liveStats.zvolLatency} ms</span>
                                </div>
                                <Button
                                    variant="primary"
                                    icon={<ExternalLink size={15} />}
                                >
                                    View Disk Topology
                                </Button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QServicePerformance;
