import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, HardDrive, Info, MemoryStick, Plus, RefreshCw } from 'lucide-react';
import { fetchDgsInfo, createPool, addDisksToPool, deletePool, actionOnDisk, saveCacheSpares, deleteCacheSpares } from './api/pools';
import PoolCard from './components/PoolCard';
import Button from './components/Common/Button';
import DiskIcon from './components/DiskIcon';

const QDisks = () => {
    const [dgsData, setDgsData] = useState({
        disks: {},
        pools: {},
        raids: {},
        newraid: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cacheDisks, setCacheDisks] = useState([]);
    const [creatingRedundancy, setCreatingRedundancy] = useState(null);
    const [creatingSize, setCreatingSize] = useState(null);
    const [includeCache, setIncludeCache] = useState(false);
    const [selectedCacheSpares, setSelectedCacheSpares] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const res = await fetchDgsInfo();
            setDgsData(res.data);
            setError(null);
        } catch (err) {
            console.error("Failed to load Disk Groups", err);
            setError("Failed to synchronize with disk management service");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, [loadData]);

    const handleDiskRightClick = (diskId) => {
        setCacheDisks(current =>
            current.includes(diskId)
                ? current.filter(id => id !== diskId)
                : [...current, diskId]
        );
    };

    const handleCreatePool = async () => {
        if (!creatingRedundancy || !creatingSize) return;
        try {
            await createPool({
                redundancy: creatingRedundancy,
                useable: creatingSize,
                disks: [],
                cache: cacheDisks,
                cache_bool: includeCache,
                user: 'mezo'
            });
            setCacheDisks([]);
            setCreatingRedundancy(null);
            setCreatingSize(null);
            loadData();
        } catch (err) {
            setError("Failed to create pool");
        }
    };

    const handleRedundancySelect = (type, firstSize) => {
        setCreatingRedundancy(type);
        setCreatingSize(firstSize);
    };

    const handleAddDisks = async (pool, redundancy, usableSize) => {
        try {
            await addDisksToPool({ pool, redundancy, useable: usableSize, user: 'mezo' });
            loadData();
        } catch (err) {
            setError("Failed to expand pool");
        }
    };

    const handleDeletePool = async (pool) => {
        try {
            await deletePool({ pool, user: 'mezo' });
            // Optimistic: remove immediately — backend deletion is async via RabbitMQ,
            // so loadData() right after would return stale data (1s cache still warm).
            setDgsData(prev => {
                const pools = { ...prev.pools };
                delete pools[pool];
                return { ...prev, pools };
            });
            loadData();
        } catch (err) {
            setError("Failed to decommission pool");
        }
    };

    const handleDiskAction = async (diskId, action) => {
        try {
            const diskData = dgsData.disks[diskId];
            await actionOnDisk({ ...diskData, action, user: 'mezo' });
            loadData();
        } catch (err) {
            setError(`Failed to perform ${action} action on disk`);
        }
    };

    const handleSaveCache = async () => {
        if (cacheDisks.length === 0) return;
        try {
            await saveCacheSpares({ cache_disks: cacheDisks, user: 'mezo' });
            setCacheDisks([]);
            loadData();
        } catch (err) {
            setError("Failed to save cache spares");
        }
    };

    const handleRemoveCacheSpares = async () => {
        if (selectedCacheSpares.length === 0) return;
        try {
            await deleteCacheSpares({ cache_disks: selectedCacheSpares, user: 'mezo' });
            setSelectedCacheSpares([]);
            loadData();
        } catch (err) {
            setError("Failed to remove cache spares");
        }
    };

    const handleCacheSpareClick = (diskId) => {
        setSelectedCacheSpares(prev =>
            prev.includes(diskId) ? prev.filter(id => id !== diskId) : [...prev, diskId]
        );
    };

    const availableDiskIds = dgsData.raids.free?.disks || [];
    const availableDisksByNode = availableDiskIds.reduce((groups, diskId) => {
        const node = dgsData.disks[diskId]?.host || 'Unknown node';
        if (!groups[node]) groups[node] = [];
        groups[node].push(diskId);
        return groups;
    }, {});

    const getOptionDetails = (type, option) => {
        if (type !== 'single') return option;

        const diskIds = Array.isArray(option) ? option : [];
        return {
            diskcount: 1,
            hosts: [...new Set(diskIds.map(diskId => dgsData.disks[diskId]?.host).filter(Boolean))]
        };
    };

    return (
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Disk Infrastructure</h1>
                                <p className="mt-1 text-sm text-gray-500">Provision storage pools and manage physical disks</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={loadData}
                                    variant="secondary"
                                    size="icon"
                                    className="h-10 w-10"
                                    icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mb-8 flex items-center gap-3 rounded-xl border border-danger-100 bg-danger-50 p-4 text-sm font-medium text-danger-700 animate-in fade-in slide-in-from-top-4">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-8">
                            {/* Create New Pool Card */}
                            <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <Plus size={14} />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">Create New Pool</h3>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <label className="ml-1 mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-500">Available Disks by Node</label>
                                        <div className="rounded-lg border border-border bg-surface-muted p-6">
                                            <div className="max-h-[360px] space-y-5 overflow-y-auto pr-2 custom-scrollbar">
                                                {Object.entries(availableDisksByNode).sort(([a], [b]) => a.localeCompare(b)).map(([node, diskIds]) => (
                                                    <section key={node} className="rounded-lg border border-border bg-surface p-4">
                                                        <div className="mb-4 flex items-center justify-between">
                                                            <h4 className="text-sm font-semibold text-gray-800">{node}</h4>
                                                            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                                                                {diskIds.length} {diskIds.length === 1 ? 'disk' : 'disks'}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
                                                            {diskIds.map(diskId => (
                                                                <DiskIcon
                                                                    key={diskId}
                                                                    diskId={diskId}
                                                                    data={dgsData.disks[diskId]}
                                                                    isCache={cacheDisks.includes(diskId)}
                                                                    onContextMenu={handleDiskRightClick}
                                                                />
                                                            ))}
                                                        </div>
                                                    </section>
                                                ))}
                                                {availableDiskIds.length === 0 && (
                                                    <div className="py-12 text-center">
                                                        <HardDrive size={40} className="mx-auto mb-4 text-gray-300" />
                                                        <p className="text-sm font-medium text-gray-500">No available disks found</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-5 flex flex-col gap-4 rounded-md border border-border bg-surface px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex gap-6">
                                                    <div>
                                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Available</p>
                                                        <p className="text-sm font-semibold text-gray-800">{availableDiskIds.length}</p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Marked Cache</p>
                                                        <p className="text-sm font-semibold text-warning-600">{cacheDisks.length}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="includeCache"
                                                            checked={includeCache}
                                                            onChange={(e) => setIncludeCache(e.target.checked)}
                                                            className="h-3 w-3 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                                        />
                                                        <label htmlFor="includeCache" className="cursor-pointer text-xs font-medium text-gray-600">Include marked cache in pool</label>
                                                    </div>
                                                    <Button
                                                        onClick={handleSaveCache}
                                                        disabled={cacheDisks.length === 0}
                                                        variant="secondary"
                                                        className="h-9 border-warning-100 text-warning-700 hover:bg-warning-50 hover:text-warning-700"
                                                    >
                                                        Save as Spare
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-center text-xs text-gray-500">
                                            <Info size={12} className="mr-1 inline-block" /> Right-click an available disk to mark or unmark it as cache
                                        </p>
                                    </div>

                                    <div>
                                        <label className="ml-1 mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-500">Available Pool Configurations</label>
                                        <div className="flex max-h-[420px] min-h-[240px] flex-col overflow-hidden rounded-lg border border-border bg-surface">
                                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="sticky top-0 z-10 bg-surface-muted">
                                                        <tr>
                                                            <th className="border-b border-border px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Select</th>
                                                            <th className="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Configuration</th>
                                                            <th className="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Disks</th>
                                                            <th className="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Eligible Nodes</th>
                                                            <th className="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Usable (Est)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-border">
                                                        {Object.entries(dgsData.newraid).map(([type, options]) => {
                                                            const optionEntries = Object.entries(options);
                                                            const visibleOptions = type === 'volset'
                                                                ? optionEntries.filter(([, option]) => getOptionDetails(type, option).diskcount !== 1)
                                                                : optionEntries;
                                                            if (visibleOptions.length === 0) return null;

                                                            const selectedOption = creatingRedundancy === type
                                                                ? visibleOptions.find(([size]) => size === creatingSize) || visibleOptions[0]
                                                                : visibleOptions[0];
                                                            const details = getOptionDetails(type, selectedOption[1]);
                                                            const eligibleNodes = [...new Set([
                                                                ...(details.hosts || []),
                                                                ...(details.othershosts || [])
                                                            ])];

                                                            return (
                                                                <tr
                                                                    key={type}
                                                                    onClick={() => handleRedundancySelect(type, visibleOptions[0][0])}
                                                                    className={`cursor-pointer transition-colors group ${creatingRedundancy === type ? 'bg-brand-50/60' : 'hover:bg-brand-50/40'}`}
                                                                >
                                                                    <td className="px-5 py-3.5 text-center">
                                                                        <input
                                                                            type="radio"
                                                                            name="newraid"
                                                                            checked={creatingRedundancy === type}
                                                                            readOnly
                                                                            className="h-4 w-4 cursor-pointer border-gray-300 text-brand-600 transition-all pointer-events-none focus:ring-0"
                                                                        />
                                                                    </td>
                                                                    <td className="px-5 py-3.5">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-semibold text-gray-800">{type.toUpperCase()}</span>
                                                                            {(type === 'volset' || type === 'single') && (
                                                                                <span className="mt-0.5 text-xs font-semibold uppercase text-warning-700">No redundancy</span>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{details.diskcount || '-'}</td>
                                                                    <td className="px-5 py-3.5 text-xs font-medium text-gray-500">
                                                                        {eligibleNodes.length > 0 ? eligibleNodes.join(', ') : 'Any available node'}
                                                                    </td>
                                                                    <td className="px-5 py-3.5">
                                                                        <select
                                                                            value={creatingRedundancy === type ? creatingSize : visibleOptions[0][0]}
                                                                            onChange={(e) => {
                                                                                setCreatingRedundancy(type);
                                                                                setCreatingSize(e.target.value);
                                                                            }}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-brand-600 outline-none focus:ring-4 focus:ring-brand-100"
                                                                        >
                                                                            {visibleOptions.map(([size]) => (
                                                                                <option key={size} value={size}>{parseFloat(size).toFixed(2)} GB</option>
                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="flex justify-end border-t border-border bg-surface-muted p-4">
                                                <Button
                                                    onClick={handleCreatePool}
                                                    disabled={!creatingRedundancy || !creatingSize}
                                                    variant="primary"
                                                    className="px-6"
                                                >
                                                    Create Pool
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Existing Pools — "pree" is the internal cache-spare pool, hidden like legacy */}
                                {Object.entries(dgsData.pools).filter(([name]) => !name.includes('pree')).map(([poolName, pool]) => (
                                    <PoolCard
                                        key={poolName}
                                        poolName={poolName}
                                        data={pool}
                                        allDisks={dgsData.disks}
                                        allRaids={dgsData.raids}
                                        newRaidOptions={dgsData.newraid}
                                        onAddDisks={handleAddDisks}
                                        onDeletePool={handleDeletePool}
                                        onDiskAction={handleDiskAction}
                                    />
                                ))}
                            </div>

                            {/* Spare Cache Disks — mirrors legacy #cachepools section */}
                            {dgsData.raids.cache_pree?.disks?.length > 0 && (
                                <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-warning-50 text-warning-600">
                                            <MemoryStick size={14} />
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-800">Spare Cache Disks</h3>
                                    </div>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 mb-8">
                                        {dgsData.raids.cache_pree.disks.map(diskId => (
                                            <DiskIcon
                                                key={diskId}
                                                diskId={diskId}
                                                data={dgsData.disks[diskId]}
                                                isSelected={selectedCacheSpares.includes(diskId)}
                                                onClick={handleCacheSpareClick}
                                            />
                                        ))}
                                    </div>
                                    <Button
                                        onClick={handleRemoveCacheSpares}
                                        disabled={selectedCacheSpares.length === 0}
                                        variant="danger"
                                        className="px-6"
                                    >
                                        Remove Selected Cache Spares
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    );
};

export default QDisks;

