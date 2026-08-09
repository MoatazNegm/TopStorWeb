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
    const [selectedDisks, setSelectedDisks] = useState([]);
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

    const handleDiskClick = (diskId) => {
        if (selectedDisks.includes(diskId)) {
            setSelectedDisks(selectedDisks.filter(id => id !== diskId));
            setCacheDisks(cacheDisks.filter(id => id !== diskId));
        } else {
            setSelectedDisks([...selectedDisks, diskId]);
        }
        setCreatingRedundancy(null);
        setCreatingSize(null);
    };

    const handleDiskRightClick = (diskId) => {
        if (cacheDisks.includes(diskId)) {
            setCacheDisks(cacheDisks.filter(id => id !== diskId));
        } else {
            if (!selectedDisks.includes(diskId)) {
                setSelectedDisks([...selectedDisks, diskId]);
            }
            setCacheDisks([...cacheDisks, diskId]);
        }
        setCreatingRedundancy(null);
        setCreatingSize(null);
    };

    const handleCreatePool = async () => {
        if (!creatingRedundancy || !creatingSize) return;
        try {
            const dataDisks = selectedDisks.filter(id => !cacheDisks.includes(id));
            await createPool({
                redundancy: creatingRedundancy,
                useable: creatingSize,
                disks: dataDisks,
                cache: cacheDisks,
                cache_bool: includeCache,
                user: 'mezo'
            });
            setSelectedDisks([]);
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
            setSelectedDisks([]);
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

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <label className="ml-1 mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-500">Select Physical Resources</label>
                                        <div className="flex h-[320px] flex-col justify-between rounded-lg border border-border bg-surface-muted p-6">
                                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-4">
                                                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-5 gap-4">
                                                    {dgsData.raids.free?.disks.map(diskId => (
                                                        <DiskIcon
                                                            key={diskId}
                                                            diskId={diskId}
                                                            data={dgsData.disks[diskId]}
                                                            isSelected={selectedDisks.includes(diskId)}
                                                            isCache={cacheDisks.includes(diskId)}
                                                            onClick={handleDiskClick}
                                                            onContextMenu={handleDiskRightClick}
                                                        />
                                                    ))}
                                                    {(!dgsData.raids.free?.disks || dgsData.raids.free.disks.length === 0) && (
                                                        <div className="col-span-full py-12 text-center">
                                                            <HardDrive size={40} className="mx-auto mb-4 text-gray-300" />
                                                            <p className="text-sm font-medium text-gray-500">No available disks found</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between rounded-md border border-border bg-surface px-5 py-3.5">
                                                <div className="flex gap-6">
                                                    <div>
                                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Data</p>
                                                        <p className="text-sm font-semibold text-gray-800">{selectedDisks.length - cacheDisks.length}</p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Cache</p>
                                                        <p className="text-sm font-semibold text-warning-600">{cacheDisks.length}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <input 
                                                            type="checkbox" 
                                                            id="includeCache" 
                                                            checked={includeCache} 
                                                            onChange={(e) => setIncludeCache(e.target.checked)}
                                                            className="h-3 w-3 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                                        />
                                                        <label htmlFor="includeCache" className="cursor-pointer text-xs font-medium text-gray-600">Include cache</label>
                                                    </div>
                                                    <Button
                                                        onClick={handleSaveCache}
                                                        disabled={cacheDisks.length === 0 || selectedDisks.length !== cacheDisks.length}
                                                        variant="secondary"
                                                        className="h-9 border-warning-100 text-warning-700 hover:bg-warning-50 hover:text-warning-700"
                                                    >
                                                        Save as Spare
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-center text-xs text-gray-500">
                                            <Info size={12} className="mr-1 inline-block" /> Hint: Right-click a selected disk to mark as Cache
                                        </p>
                                    </div>

                                    <div>
                                        <label className="ml-1 mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-500">Redundancy Configuration</label>
                                        <div className="flex h-[320px] flex-col overflow-hidden rounded-lg border border-border bg-surface">
                                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="sticky top-0 z-10 bg-surface-muted">
                                                        <tr>
                                                            <th className="border-b border-border px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Select</th>
                                                            <th className="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Efficiency</th>
                                                            <th className="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Usable (Est)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-border">
                                                        {(() => {
                                                            const dataDiskCount = selectedDisks.length - cacheDisks.length;
                                                            return Object.entries(dgsData.newraid).map(([type, options]) => {
                                                                // Filter options within this type to only those matching the data disk count
                                                                const filteredOptions = Object.entries(options).filter(([_, details]) =>
                                                                    details.diskcount === dataDiskCount
                                                                );

                                                                if (filteredOptions.length === 0) return null;

                                                                return (
                                                                     <tr
                                                                         key={type}
                                                                         onClick={() => handleRedundancySelect(type, filteredOptions[0][0])}
                                                                         className={`cursor-pointer transition-colors group ${creatingRedundancy === type ? 'bg-brand-50/60' : 'hover:bg-brand-50/40'}`}
                                                                     >
                                                                         <td className="px-5 py-3.5">
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
                                                                                 <span className="text-xs text-gray-500">
                                                                                     {type === 'single' && 'No redundancy. Data is stored on a single disk.'}
                                                                                     {type === 'mirror' && 'High availability. Data is duplicated across disks.'}
                                                                                     {type === 'raid5' && 'Single parity. Performance and safety balance.'}
                                                                                     {type === 'raid6' && 'Dual parity. Protection against two failures.'}
                                                                                     {type === 'stripe' && 'Performance only. Multi-disk striping, zero parity.'}
                                                                                 </span>
                                                                                 {(type === 'stripe' || type === 'single') && (
                                                                                     <span className="mt-0.5 text-xs font-semibold uppercase text-warning-700">
                                                                                         ⚠️ No Redundancy
                                                                                     </span>
                                                                                 )}
                                                                             </div>
                                                                         </td>
                                                                         <td className="px-5 py-3.5">
                                                                             {filteredOptions.length > 1 && creatingRedundancy === type ? (
                                                                                 <select
                                                                                     value={creatingSize}
                                                                                     onChange={(e) => setCreatingSize(e.target.value)}
                                                                                     onClick={(e) => e.stopPropagation()}
                                                                                     className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-brand-600 outline-none focus:ring-4 focus:ring-brand-100"
                                                                                 >
                                                                                     {filteredOptions.map(([size]) => (
                                                                                         <option key={size} value={size}>{parseFloat(size).toFixed(2)} GB</option>
                                                                                     ))}
                                                                                 </select>
                                                                             ) : (
                                                                                 <span className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${creatingRedundancy === type ? 'bg-surface text-brand-700' : 'bg-brand-50 text-brand-600'}`}>
                                                                                     {parseFloat(filteredOptions[0][0]).toFixed(2)} GB
                                                                                 </span>
                                                                             )}
                                                                         </td>
                                                                     </tr>
                                                                 );
                                                            });
                                                        })()}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-10 flex justify-end">
                                                <Button
                                                    onClick={handleCreatePool}
                                                    disabled={!creatingRedundancy || (selectedDisks.length - cacheDisks.length === 0)}
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
