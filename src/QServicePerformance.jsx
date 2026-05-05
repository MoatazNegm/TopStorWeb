import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPrometheusQuery, fetchServiceSummary, pingHeartbeat } from './api/performance';
import MetricCard from './components/MetricCard';
import PerformanceChart from './components/PerformanceChart';
import Button from './components/Common/Button';

const QServicePerformance = () => {
    const [summary, setSummary] = useState({ users: 0, groups: 0, pools: 0, volumes: { cifs: 0, nfs: 0, iscsi: 0 } });
    const [metrics, setMetrics] = useState({ cpu: [], mem: [], io: [], arc: [] });
    const [liveStats, setLiveStats] = useState({ arcSizeGB: 0, arcHitRate: 0, zvolLatency: 0 });
    const [loading, setLoading] = useState(true);

    // Track whether the component is still actively open
    const isMounted = useRef(true);

    // PromQL Queries
    const queries = {
        cpu: '100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)',
        mem: '100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))',
        io: '(sum(rate(node_disk_read_bytes_total[1m])) + sum(rate(node_disk_written_bytes_total[1m]))) / 1048576', // MB/s
        arcSize: 'node_zfs_arc_size / 1073741824', // GB
        arcHit: '(rate(node_zfs_arc_hits[1m]) / (rate(node_zfs_arc_hits[1m]) + rate(node_zfs_arc_misses[1m]))) * 100', // %
        zvolLatency: '(avg(rate(node_disk_read_time_seconds_total{device=~"zd.*"}[1m]) / rate(node_disk_reads_completed_total{device=~"zd.*"}[1m]))) * 1000' 
    };

    // Helper to safely extract the value from Prometheus JSON response
    const parsePrometheus = (res) => {
        try {
            const val = res.data?.data?.result?.[0]?.value?.[1];
            return val && !isNaN(val) ? parseFloat(val) : 0;
        } catch {
            return 0;
        }
    };

    const loadData = useCallback(async () => {
        // If the user left the page, stop the recursive loop immediately
        if (!isMounted.current) return;

        try {
            // Fetch Live Telemetry concurrently
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

            // Only update state if the component is still mounted
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
            }

        } catch (err) {
            // Ignore abort errors silently, but log real errors
            if (err.code !== 'ERR_CANCELED' && err.message !== 'Request aborted') {
                console.error("Prometheus pulse failed", err);
            }
        } finally {
            // Schedule the next pull ONLY after this one completely finishes
            if (isMounted.current) {
                setLoading(false);
                setTimeout(loadData, 250); 
            }
        }
    }, []);

    useEffect(() => {
        isMounted.current = true; // Mark component as active

        // Fetch static inventory summary once on mount
        fetchServiceSummary().then(res => {
            if (isMounted.current) setSummary(res.data);
        }).catch(() => {});

        // Initial array seeding to prevent chart rendering errors
        setMetrics({
            cpu: Array(30).fill(0), mem: Array(30).fill(0), io: Array(30).fill(0), arc: Array(30).fill(0)
        });

        // Initial Load & Boost Ping
        pingHeartbeat();
        
        // Kick off the self-sustaining telemetry loop
        loadData(); 

        // Keep-Alive Heartbeat to Flask (Every 3 seconds)
        const heartbeatInterval = setInterval(pingHeartbeat, 3000);
        
        // Cleanup function runs when navigating away
        return () => {
            isMounted.current = false; // Instantly kills the loadData recursive loop
            clearInterval(heartbeatInterval); // Kills the Flask heartbeat
        };
    }, [loadData]);

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <p className="text-lg text-gray-500 font-medium tracking-tight">Real-time ZFS heuristics and cluster orchestration vitals</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Active Pulse</span>
                                </div>
                                <a href="http://10.11.11.250:4000" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <i className="fas fa-external-link-alt text-blue-500 text-xs"></i>
                                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Launch Grafana</span>
                                </a>
                            </div>
                        </div>

                        {/* Inventory Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <MetricCard
                                title="Cluster Identity"
                                value={`${summary.users}`}
                                unit="Users Active"
                                icon="fa-users"
                                color="indigo"
                            />
                            <MetricCard
                                title="Storage Fabric"
                                value={`${summary.pools}`}
                                unit="Health Pools"
                                icon="fa-layer-group"
                                color="emerald"
                            />
                            <MetricCard
                                title="Active Shares"
                                value={`${(summary.volumes.cifs || 0) + (summary.volumes.nfs || 0) + (summary.volumes.iscsi || 0)}`}
                                unit="Mount Points"
                                icon="fa-network-wired"
                                color="blue"
                            />
                            <MetricCard
                                title="ZFS ARC Cache"
                                value={liveStats.arcHitRate}
                                unit="Hit Ratio %"
                                icon="fa-bolt"
                                color="amber"
                            />
                        </div>

                        {/* Performance Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            <PerformanceChart
                                title="Storage Throughput (MB/s)"
                                icon="fa-hdd"
                                data={metrics.io}
                                color="blue"
                            />
                            <PerformanceChart
                                title="CPU Utilization & Load (%)"
                                icon="fa-microchip"
                                data={metrics.cpu}
                                color="emerald"
                            />
                        </div>

                        {/* Optimization Stats Row */}
                        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden mb-20">
                            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
                            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                                <div className="max-w-md">
                                    <h4 className="text-2xl font-black mb-3 tracking-tight text-blue-400">Heuristic Optimization</h4>
                                    <p className="text-gray-400 font-medium text-sm leading-relaxed">
                                        Your ZFS Adaptive Replacement Cache is performing at <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-4 pointer-events-none">peak efficiency</span>. No memory pressure detected in the last 24 hours.
                                    </p>
                                </div>
                                <div className="flex gap-12 text-center">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">ARC Size</p>
                                        <p className="text-3xl font-black tracking-tighter text-blue-500">{liveStats.arcSizeGB} <small className="text-xs uppercase text-gray-400 tracking-widest font-bold">GB</small></p>
                                    </div>
                                    <div className="w-px h-12 bg-gray-800 self-center"></div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">iSCSI ZVOL Latency</p>
                                        <p className="text-3xl font-black tracking-tighter text-emerald-500">{liveStats.zvolLatency} <small className="text-xs uppercase text-gray-400 tracking-widest font-bold">ms</small></p>
                                    </div>
                                </div>
                                <Button
                                    bgColor="bg-blue-600"
                                    className="px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1"
                                >
                                    View Disk Topology
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QServicePerformance;
