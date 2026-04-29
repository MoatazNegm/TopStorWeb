import React, { useState } from 'react';
import DiskIcon from './DiskIcon';
import Button from './Common/Button';

const PoolCard = ({
    poolName,
    data,
    allDisks,
    allRaids,
    newRaidOptions,
    onAddDisks,
    onDeletePool,
    onDiskAction
}) => {
    const [deleteStep, setDeleteStep] = useState(0); // 0: Idle, 1: Delete?, 2: Really?, 3: Confirm
    const [selectedRedundancy, setSelectedRedundancy] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedDiskId, setSelectedDiskId] = useState(null);

    const { available, used, dedup, raids = [], volumes = [] } = data;
    const totalSize = (parseFloat(available) + parseFloat(used)).toFixed(2);

    // Determine redundancy type and color — mirrors legacy Qdg.js initdgs() health logic
    let redundancyText = "Highly Available";
    let redundancyColor = "text-blue-500";

    const isRaid = raids.some(r => r.includes('raidz') || r.includes('mirror'));

    if (raids.some(r => r.includes('strip'))) {
        redundancyText = "No Redundancy";
        redundancyColor = "text-rose-500";
    } else {
        let balanced = ", balanced";
        for (const raidId of raids) {
            const raidData = allRaids[raidId];
            if (raidData?.missingdisks?.[0] != 0) {
                redundancyColor = "text-rose-500";
                balanced = ", missing disks";
                break;
            }
            if (raidData?.raidrank?.[0] < 0) {
                redundancyColor = "text-amber-500";
                balanced = ", not balanced";
                break;
            }
        }
        redundancyText = redundancyText + balanced;
    }

    const handleAdd = () => {
        if (!selectedRedundancy || !selectedSize) return;
        onAddDisks(poolName, selectedRedundancy, selectedSize);
        setSelectedRedundancy(null);
        setSelectedSize(null);
    };

    const handleRedundancySelect = (type, firstSize) => {
        setSelectedRedundancy(type);
        setSelectedSize(firstSize);
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-gray-100 mb-4 overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3 pb-2 border-b border-gray-50">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                        <i className="fas fa-database text-lg"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">Pool: <span className="text-indigo-600">{poolName}</span></h3>
                        <div className="flex items-center gap-3 mt-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${redundancyColor}`}>{redundancyText}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dedup: {dedup}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 bg-gray-50/50 px-6 py-2 rounded-2xl border border-gray-50">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Size</p>
                        <p className="text-lg font-black text-gray-800 tracking-tighter">{totalSize}GB</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Used</p>
                        <p className="text-lg font-black text-indigo-600 tracking-tighter">{used}GB</p>
                    </div>
                </div>
            </div>

            {/* Raid Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {raids.map(raidId => {
                    const raidDisks = allRaids[raidId]?.disks || [];
                    // Filter out dm-* virtual placeholder devices — they are not real disks to render
                    const realDisks = raidDisks.filter(diskId => !allDisks[diskId]?.name?.includes('dm-'));
                    // Count missing slots: dm- disks = placeholder slots, minus non-ONLINE non-dm disks (clamped to 0)
                    const missingCount = Math.max(0, raidDisks.reduce((count, diskId) => {
                        if (allDisks[diskId]?.name?.includes('dm-')) return count + 1;
                        if (!allDisks[diskId]?.changeop?.includes('ONLINE')) return count - 1;
                        return count;
                    }, 0));
                    const raidHasMissing = missingCount > 0;

                    return (
                        <div key={raidId} className={`bg-gray-50/30 rounded-3xl p-6 border relative ${raidHasMissing ? 'border-red-300' : 'border-gray-50/50'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${raidHasMissing ? 'text-red-500' : 'text-gray-400'}`}>{raidId.split('_')[0]}</span>
                                <div className={`w-2 h-2 rounded-full ${raidHasMissing ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`}></div>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                {realDisks.map(diskId => (
                                    <DiskIcon
                                        key={diskId}
                                        diskId={diskId}
                                        data={allDisks[diskId]}
                                        isSelected={selectedDiskId === diskId}
                                        onClick={() => setSelectedDiskId(prev => prev === diskId ? null : diskId)}
                                        showActions={true}
                                        onAction={(action) => onDiskAction(diskId, action)}
                                    />
                                ))}
                                {Array.from({ length: missingCount }).map((_, i) => (
                                    <div key={`missing-${i}`} className="flex flex-col items-center p-2 rounded-xl border border-red-200 bg-red-50/30">
                                        <img src="img/invaliddisk.png" alt="missing disk" className="w-10 h-10 object-contain opacity-50" />
                                        <span className="text-[9px] font-bold text-red-400 mt-1 uppercase tracking-tight">missing</span>
                                        <span className="text-[10px] font-black text-red-300 leading-none">-</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Capacity Management Section */}
            <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 text-indigo-500 flex items-center justify-center shadow-sm">
                        <i className="fas fa-plus text-[10px]"></i>
                    </div>
                    <h4 className="text-xs font-black text-gray-700 uppercase tracking-widest">Expansion Options</h4>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-100/50">
                                <th className="pb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Select</th>
                                <th className="pb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Configuration</th>
                                <th className="pb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">New Total Size</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/50">
                            {Object.entries(newRaidOptions).map(([type, options]) => {
                                if (Object.keys(options).length === 0) return null;
                                
                                // Legacy Visibility Logic:
                                // If it's a RAID pool, hide 'volset' (stripe).
                                // If it's NOT a RAID pool (e.g. stripe), hide RAID options.
                                if (isRaid && type === 'volset') return null;
                                if (!isRaid && type !== 'volset') return null;

                                const sizes = Object.keys(options);
                                return (
                                    <tr
                                        key={type}
                                        onClick={() => handleRedundancySelect(type, sizes[0])}
                                        className={`group/row transition-colors cursor-pointer ${selectedRedundancy === type ? 'bg-indigo-50/50' : 'hover:bg-white'}`}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`${poolName}_redundancy`}
                                                    className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 transition-all cursor-pointer pointer-events-none"
                                                    id={`${poolName}_${type}`}
                                                    checked={selectedRedundancy === type}
                                                    readOnly
                                                />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm font-bold text-gray-700">
                                                {type.charAt(0).toUpperCase() + type.slice(1)} Redundancy
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {sizes.length > 1 && selectedRedundancy === type ? (
                                                <select 
                                                    value={selectedSize}
                                                    onChange={(e) => setSelectedSize(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[10px] font-black px-3 py-1 rounded-lg bg-white border-none text-indigo-600 focus:ring-1 focus:ring-indigo-200 outline-none"
                                                >
                                                    {sizes.map(s => (
                                                        <option key={s} value={s}>
                                                            {(parseFloat(s.replace(/[^0-9.]/g, '')) + parseFloat(available)).toFixed(2)}GB
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className={`text-[10px] font-black px-3 py-1 rounded-lg transition-colors ${selectedRedundancy === type ? 'bg-white text-indigo-600' : 'bg-gray-100 text-gray-400 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600'}`}>
                                                    {(parseFloat(sizes[0].replace(/[^0-9.]/g, '')) + parseFloat(available)).toFixed(2)}GB
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-8">
                    <Button
                        onClick={handleAdd}
                        disabled={!selectedRedundancy || !selectedSize}
                        bgColor="bg-indigo-600"
                        className="px-8 py-2.5 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5"
                    >
                        Add to Pool
                    </Button>
                </div>
            </div>

            {/* Deletion Safety Flow — matches legacy: block deletion when pool has volumes */}
            <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center">
                <div className="text-xs font-medium text-gray-400">
                    Volumes in pool: <span className="text-indigo-500 font-bold">{volumes.length > 0 ? volumes.join(', ') : 'None'}</span>
                </div>

                <div className="flex gap-3">
                    {volumes.length > 0 ? (
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Remove volumes first to decommission</span>
                    ) : (
                        <>
                            {deleteStep === 0 && (
                                <Button
                                    onClick={() => setDeleteStep(1)}
                                    bgColor="bg-transparent hover:bg-rose-50"
                                    textColor="text-gray-400 hover:text-rose-500"
                                    className="text-[10px] font-black uppercase tracking-widest transition-colors px-4 py-2"
                                >
                                    Decommission Pool
                                </Button>
                            )}
                            {deleteStep === 1 && (
                                <>
                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest animate-pulse flex items-center">Really delete?</span>
                                    <button onClick={() => setDeleteStep(0)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold text-[10px] uppercase tracking-widest">Cancel</button>
                                    <button onClick={() => setDeleteStep(2)} className="px-4 py-2 bg-rose-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-rose-100">Delete</button>
                                </>
                            )}
                            {deleteStep === 2 && (
                                <>
                                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest animate-pulse flex items-center">Final confirmation needed!</span>
                                    <button onClick={() => setDeleteStep(0)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold text-[10px] uppercase tracking-widest">Cancel</button>
                                    <Button
                                        onClick={() => onDeletePool(poolName)}
                                        bgColor="bg-rose-600"
                                        className="px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-rose-200"
                                    >
                                        Confirm Destruction
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PoolCard;
