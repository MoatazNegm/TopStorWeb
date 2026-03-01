import React, { useState, useEffect, useCallback } from 'react';
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

    // Mock Data for initial design review
    const useMock = true; // Toggle this if API is not ready
    const mockData = {
        disks: {
            "sda": { status: "ONLINE", size: "100.0", name: "sda", changeop: "ONLINE", raid: "pool1_raid1", silvering: "no" },
            "sdb": { status: "ONLINE", size: "100.0", name: "sdb", changeop: "ONLINE", raid: "pool1_raid1", silvering: "no" },
            "sdc": { status: "free", size: "250.0", name: "sdc", changeop: "NONE", raid: "free", silvering: "no" },
            "sdd": { status: "free", size: "250.0", name: "sdd", changeop: "NONE", raid: "free", silvering: "no" },
            "sde": { status: "free", size: "250.0", name: "sde", changeop: "NONE", raid: "free", silvering: "no" },
            "sdf": { status: "free", size: "250.0", name: "sdf", changeop: "NONE", raid: "free", silvering: "no" },
            "sdg": { status: "free", size: "250.0", name: "sdg", changeop: "NONE", raid: "free", silvering: "no" },
            "sdh": { status: "free", size: "250.0", name: "sdh", changeop: "NONE", raid: "free", silvering: "no" },
            "sdi": { status: "free", size: "250.0", name: "sdi", changeop: "NONE", raid: "free", silvering: "no" },
            "sdj": { status: "free", size: "250.0", name: "sdj", changeop: "NONE", raid: "free", silvering: "no" },
            "sdk": { status: "free", size: "250.0", name: "sdk", changeop: "NONE", raid: "free", silvering: "no" },
            "sdl": { status: "free", size: "250.0", name: "sdl", changeop: "NONE", raid: "free", silvering: "no" },
        },
        pools: {
            "Production": { available: "80.5", used: "15.0", dedup: "1.2x", raids: ["raid1"], volumes: ["SharedData", "Backups"] }
        },
        raids: {
            "raid1": { disks: ["sda", "sdb"], missingdisks: [0] },
            "free": { disks: ["sdc", "sdd", "sde", "sdf", "sdg", "sdh", "sdi", "sdj", "sdk", "sdl"], missingdisks: [0] }
        },
        newraid: {
            mirror: { "235GB": { diskcount: 2 } },
            raid5: { "470GB": { diskcount: 3 }, "705GB": { diskcount: 4 }, "940GB": { diskcount: 5 } },
            raid6: { "470GB": { diskcount: 4 }, "705GB": { diskcount: 5 }, "940GB": { diskcount: 6 } },
            single: {
                "235GB": { diskcount: 1 },
                "470GB": { diskcount: 2 },
                "705GB": { diskcount: 3 },
                "940GB": { diskcount: 4 },
                "1.1TB": { diskcount: 5 }
            },
            stripe: {
                "470GB": { diskcount: 2 },
                "705GB": { diskcount: 3 },
                "940GB": { diskcount: 4 },
                "1.1TB": { diskcount: 5 }
            }
        }
    };

    const loadData = useCallback(async () => {
        try {
            if (useMock) {
                setDgsData(mockData);
                setLoading(false);
                return;
            }
            const res = await fetchDgsInfo();
            setDgsData(res.data);
            setError(null);
        } catch (err) {
            console.error("Failed to load Disk Groups", err);
            setError("Failed to synchronize with disk management service");
            // Fallback to mock on error during dev
            // setDgsData(mockData);
        } finally {
            setLoading(false);
        }
    }, [useMock]);

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
    };

    const handleCreatePool = async () => {
        if (!creatingRedundancy) return;
        try {
            const usable = Object.keys(dgsData.newraid[creatingRedundancy])[0];
            const dataDisks = selectedDisks.filter(id => !cacheDisks.includes(id));
            await createPool({
                redundancy: creatingRedundancy,
                useable: usable,
                disks: dataDisks,
                cache: cacheDisks,
                cache_bool: cacheDisks.length > 0,
                user: 'mezo'
            });
            setSelectedDisks([]);
            setCacheDisks([]);
            setCreatingRedundancy(null);
            loadData();
        } catch (err) {
            setError("Failed to create pool");
        }
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

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Disk Infrastructure</h1>
                                <p className="text-gray-500 mt-1 font-medium">Provision storage pools and manage physical disks</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={loadData}
                                    bgColor="bg-white"
                                    textColor="text-gray-400"
                                    className="border border-gray-100 hover:text-indigo-500 rounded-xl shadow-sm transition-all"
                                    icon={<i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-in fade-in slide-in-from-top-4">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-8">
                            {/* Create New Pool Card */}
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                        <i className="fas fa-plus text-xs"></i>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-800 tracking-tight">Create New Pool</h3>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-4 block">Select Physical Resources</label>
                                        <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 h-[320px] flex flex-col justify-between">
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
                                                            <i className="fas fa-hdd text-gray-200 text-4xl mb-4 block"></i>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No available disks found</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-8 flex justify-between items-center bg-white/50 px-6 py-4 rounded-2xl border border-white">
                                                <div className="flex gap-6">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Data</p>
                                                        <p className="text-sm font-black text-gray-700">{selectedDisks.length - cacheDisks.length}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Cache</p>
                                                        <p className="text-sm font-black text-amber-500">{cacheDisks.length}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={handleSaveCache}
                                                    disabled={cacheDisks.length === 0 || selectedDisks.length !== cacheDisks.length}
                                                    bgColor="bg-transparent hover:bg-amber-50"
                                                    textColor="text-amber-500"
                                                    className="text-[10px] font-black uppercase tracking-widest px-4 py-2"
                                                >
                                                    Save as Spare
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-[10px] font-medium text-gray-400 text-center italic">
                                            <i className="fas fa-info-circle mr-1"></i> Hint: Right-click a selected disk to mark as Cache
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-4 block">Redundancy Configuration</label>
                                        <div className="overflow-hidden border border-gray-100 rounded-3xl h-[320px] bg-white flex flex-col">
                                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
                                                        <tr>
                                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Select</th>
                                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Efficiency</th>
                                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Usable (Est)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
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
                                                                        onClick={() => setCreatingRedundancy(prev => prev === type ? null : type)}
                                                                        className={`transition-colors cursor-pointer group ${creatingRedundancy === type ? 'bg-indigo-50/50' : 'hover:bg-indigo-50/30'}`}
                                                                    >
                                                                        <td className="px-6 py-4">
                                                                            <input
                                                                                type="radio"
                                                                                name="newraid"
                                                                                checked={creatingRedundancy === type}
                                                                                readOnly
                                                                                className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 transition-all cursor-pointer pointer-events-none"
                                                                            />
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <div className="flex flex-col">
                                                                                <span className="text-sm font-bold text-gray-700">{type.toUpperCase()}</span>
                                                                                <span className="text-[10px] text-gray-500 font-medium">
                                                                                    {type === 'single' && 'No redundancy. Data is stored on a single disk.'}
                                                                                    {type === 'mirror' && 'High availability. Data is duplicated across disks.'}
                                                                                    {type === 'raid5' && 'Single parity. Performance and safety balance.'}
                                                                                    {type === 'raid6' && 'Dual parity. Protection against two failures.'}
                                                                                    {type === 'stripe' && 'Performance only. Multi-disk striping, zero parity.'}
                                                                                </span>
                                                                                {(type === 'stripe' || type === 'single') && (
                                                                                    <span className="text-[9px] text-amber-600 font-black uppercase tracking-tighter mt-0.5">
                                                                                        ⚠️ No Redundancy
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <span className={`text-[10px] font-black px-3 py-1 rounded-lg transition-colors ${creatingRedundancy === type ? 'bg-white text-indigo-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                                                                {filteredOptions[0][0]}
                                                                            </span>
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
                                                    bgColor="bg-indigo-600"
                                                    className="px-8 py-2.5 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5"
                                                >
                                                    Create Pool
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Existing Pools */}
                                {Object.entries(dgsData.pools).map(([poolName, pool]) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QDisks;
