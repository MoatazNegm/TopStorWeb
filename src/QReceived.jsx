import React, { useState, useEffect, useCallback } from 'react';
import {
    AlertTriangle,
    CheckCircle2,
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
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
            </div>
        );
    }

    return (
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Received Snapshots</h1>
                                <p className="mt-1 text-sm text-gray-500">Manage and restore snapshots replicated from remote partners</p>
                            </div>
                            <Button
                                onClick={() => loadSnapshots()}
                                variant="secondary"
                                icon={<RefreshCw size={15} className={loading ? 'animate-spin' : ''} />}
                            >
                                Sync Now
                            </Button>
                        </div>

                        {message.text && (
                            <div className={`mt-6 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${message.type === 'success' ? 'border-success-100 bg-success-50 text-success-600' : 'border-danger-100 bg-danger-50 text-danger-600'}`}>
                                {message.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                                {message.text}
                            </div>
                        )}

                        <div className="mt-6 space-y-6">
                            <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <Filter size={17} />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">Source Filters</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Dropdown
                                        label="Pool"
                                        options={pools}
                                        value={filters.pool}
                                        onChange={(val) => handleFilterChange('pool', val)}
                                    />
                                    <Dropdown
                                        label="Volume"
                                        options={volumes.filter(v => filters.pool === 'Any' || v.pool === filters.pool)}
                                        value={filters.volume}
                                        onChange={(val) => handleFilterChange('volume', val)}
                                    />
                                    <Dropdown
                                        label="Sender"
                                        options={partners}
                                        value={filters.sender}
                                        onChange={(val) => handleFilterChange('sender', val)}
                                    />
                                </div>
                            </div>

                            <div className="mb-2 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                                <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-success-50 text-success-600">
                                            <Zap size={16} />
                                        </span>
                                        <h3 className="text-base font-semibold text-gray-800">Received Snapshots List</h3>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-gray-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                                        {filteredSnapshots.length} Found
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-[1100px] w-full text-left">
                                        <thead className="bg-surface-muted">
                                            <tr className="border-b border-border">
                                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Timestamp</th>
                                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Alias</th>
                                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Pool / Volume</th>
                                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Sender</th>
                                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Size / Ratio</th>
                                                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {filteredSnapshots.map((snap, idx) => (
                                                <tr key={idx} className="group transition-colors hover:bg-gray-50/60">
                                                    <td className="px-5 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-semibold text-gray-700">{snap.date}</span>
                                                            <span className="text-xs text-gray-500">{snap.time}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className="inline-block max-w-[150px] truncate text-sm text-brand-600">
                                                            {snap.name.split('.')[0]}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-700">{snap.pool}</span>
                                                            <span className="text-xs font-medium uppercase tracking-wide text-brand-500">{snap.volume.split('_')[0]}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex items-center rounded-sm border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                                                            {snap.partnerS}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-medium uppercase text-gray-500">{snap.used} MB</span>
                                                            <span className="text-xs font-medium text-success-600">{snap.refcompressratio}x Ratio</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleRollback(snap.name)}
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
                                                                title="Rollback volume"
                                                            >
                                                                <RotateCcw size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(snap.name)}
                                                                disabled={actionLoading === `delete-${snap.name}`}
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
                                                                title="Delete snapshot"
                                                            >
                                                                {actionLoading === `delete-${snap.name}` ? (
                                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-danger-100 border-t-danger-600" />
                                                                ) : <Trash2 size={14} />}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredSnapshots.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="px-5 py-14 text-center">
                                                        <div className="flex flex-col items-center gap-3 text-gray-400">
                                                            <Zap size={20} />
                                                            <p className="text-sm font-medium">No received snapshots found</p>
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
    );
};

export default QReceived;
