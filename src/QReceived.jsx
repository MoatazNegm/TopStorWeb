import React, { useState, useEffect, useCallback } from 'react';
import {
    RefreshCw,
    Trash2,
    RotateCcw,
    Database,
    HardDrive,
    Server,
    Clock,
    Zap,
    Filter
} from 'lucide-react';
import Button from './components/Common/Button';
import Dropdown from './components/Common/Dropdown';
import {
    fetchSnapshotsInfo,
    deleteSnapshot,
    rollbackSnapshot,
    fetchVolumeList
} from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import { fetchPartnerList } from './api/partners';

const QReceived = () => {
    // Data state
    const [pools, setPools] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const [partners, setPartners] = useState([]);
    const [allSnapshots, setAllSnapshots] = useState([]);

    // UI state
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Filter state
    const [filters, setFilters] = useState({
        pool: 'Any',
        volume: 'Any',
        sender: 'Any'
    });

    const loadInitialData = useCallback(async () => {
        try {
            const [poolsRes, partnersRes, volumesRes] = await Promise.all([
                fetchPoolsInfo(),
                fetchPartnerList(),
                fetchVolumeList()
            ]);

            // Format pools
            const poolOptions = [{ value: 'Any', label: 'Any' }, ...Object.entries(poolsRes.data.results || {}).map(([id, p]) => ({
                value: p.text,
                label: p.text
            }))];
            setPools(poolOptions);

            // Format partners (senders)
            const senderOptions = [{ value: 'Any', label: 'Any' }, ...Object.entries(partnersRes.data.allpartners || {}).map(([id, p]) => ({
                value: p.alias.split('_')[0],
                label: p.alias.split('_')[0],
                type: p.type
            })).filter(p => p.type.toLowerCase().includes('ender'))];
            setPartners(senderOptions);

            // Format volumes
            const volOptions = [{ value: 'Any', label: 'Any' }, ...(volumesRes.data || []).map(v => ({
                value: v.text,
                label: v.text,
                pool: v.pool
            }))];
            setVolumes(volOptions);

        } catch (err) {
            console.error("Failed to load initial data", err);
            setMessage({ text: 'Failed to load system configuration.', type: 'error' });
        }
    }, []);

    const loadSnapshots = useCallback(async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        try {
            const res = await fetchSnapshotsInfo();
            // In Qreceived.js, it filters by partnerS !== '-'
            const receivedOnly = (res.data.allsnaps || []).filter(s => s.partnerS && s.partnerS !== '-');
            setAllSnapshots(receivedOnly);
        } catch (err) {
            console.error("Failed to load snapshots", err);
            if (!isSilent) setMessage({ text: 'Failed to synchronize snapshot data.', type: 'error' });
        } finally {
            if (!isSilent) setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInitialData();
        loadSnapshots();
        const interval = setInterval(() => loadSnapshots(true), 5000);
        return () => clearInterval(interval);
    }, [loadInitialData, loadSnapshots]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleDelete = async (name) => {
        if (!window.confirm(`Are you sure you want to remove snapshot ${name}?`)) return;
        setActionLoading(`delete-${name}`);
        try {
            await deleteSnapshot(name);
            setMessage({ text: 'Snapshot removed successfully', type: 'success' });
            loadSnapshots(true);
        } catch (err) {
            console.error(`Failed to delete`, err);
            setMessage({ text: 'Failed to remove snapshot', type: 'error' });
        } finally {
            setActionLoading(null);
        }
    };

    const handleRollback = async (name) => {
        if (!window.confirm("Perform rollback? This will restore the volume to this snapshot state.")) return;
        setActionLoading(`rollback-${name}`);
        try {
            await rollbackSnapshot(name);
            setMessage({ text: 'Rollback initiated successfully', type: 'success' });
            loadSnapshots(true);
        } catch (err) {
            console.error("Rollback failed", err);
            setMessage({ text: 'Rollback failed', type: 'error' });
        } finally {
            setActionLoading(null);
        }
    };

    const filteredSnapshots = allSnapshots.filter(snap => {
        const matchPool = filters.pool === 'Any' || snap.pool === filters.pool;
        const matchVolume = filters.volume === 'Any' || snap.volume.split('_')[0] === filters.volume;
        const matchSender = filters.sender === 'Any' || snap.partnerS === filters.sender;
        return matchPool && matchVolume && matchSender;
    });

    if (loading && allSnapshots.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Received Snapshots</h1>
                                <p className="text-xs text-gray-400 mt-0.5 font-medium uppercase tracking-wider">Manage and restore snapshots replicated from remote partners</p>
                            </div>
                            <Button
                                onClick={() => loadSnapshots()}
                                bgColor="bg-white"
                                textColor="text-gray-400"
                                className="border border-gray-100 hover:text-indigo-500 rounded-xl shadow-sm transition-all"
                                icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
                            />
                        </div>

                        {message.text && (
                            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                {message.text}
                            </div>
                        )}

                        <div className="flex flex-col gap-8">
                            {/* Filter Section Card */}
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative group">
                                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-sm">
                                        <Filter size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">Source Filters</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Dropdown
                                        label="Pool"
                                        options={pools}
                                        value={filters.pool}
                                        onChange={(val) => handleFilterChange('pool', val)}
                                        icon={<Database size={16} />}
                                    />
                                    <Dropdown
                                        label="Volume"
                                        options={volumes.filter(v => filters.pool === 'Any' || v.pool === filters.pool)}
                                        value={filters.volume}
                                        onChange={(val) => handleFilterChange('volume', val)}
                                        icon={<HardDrive size={16} />}
                                    />
                                    <Dropdown
                                        label="Sender"
                                        options={partners}
                                        value={filters.sender}
                                        onChange={(val) => handleFilterChange('sender', val)}
                                        icon={<Server size={16} />}
                                    />
                                </div>
                            </div>

                            {/* Received Snapshots List Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative group overflow-visible mb-12">
                                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-emerald-500 rounded-l-xl shadow-[2px_0_10px_rgba(16,185,129,0.2)]"></div>

                                <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 rounded-t-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                            <Zap size={18} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">Received Snapshots List</h3>
                                    </div>
                                    <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest shadow-sm">
                                        {filteredSnapshots.length} Found
                                    </span>
                                </div>

                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Timestamp</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Alias</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Pool / Volume</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Sender</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Size / Ratio</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredSnapshots.map((snap, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-gray-700">{snap.date}</span>
                                                            <span className="text-[10px] text-gray-400 font-medium tracking-tight">{snap.time}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <span className="text-xs font-semibold text-indigo-600 truncate max-w-[150px] inline-block">
                                                            {snap.name.split('.')[0]}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-gray-600">{snap.pool}</span>
                                                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">{snap.volume.split('_')[0]}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-black">
                                                            {snap.partnerS}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-gray-500 uppercase">{snap.used} MB</span>
                                                            <span className="text-[9px] text-emerald-500 font-black">{snap.refcompressratio}x Ratio</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleRollback(snap.name)}
                                                                className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all shadow-sm hover:shadow-indigo-100"
                                                                title="Rollback volume"
                                                            >
                                                                <RotateCcw size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(snap.name)}
                                                                disabled={actionLoading === `delete-${snap.name}`}
                                                                className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm hover:shadow-rose-100"
                                                                title="Delete snapshot"
                                                            >
                                                                {actionLoading === `delete-${snap.name}` ? (
                                                                    <div className="w-4 h-4 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
                                                                ) : <Trash2 size={14} />}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredSnapshots.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="px-8 py-20 text-center">
                                                        <div className="flex flex-col items-center gap-4 opacity-30">
                                                            <Zap size={40} className="text-gray-400" />
                                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No Received Snapshots Found</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QReceived;
