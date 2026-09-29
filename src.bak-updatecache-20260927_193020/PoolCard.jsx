import React, { useState } from 'react';
import { ChevronDown, Database, Plus } from 'lucide-react';
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
    const [isExpansionOpen, setIsExpansionOpen] = useState(false);

    const { available, used, dedup, raids = [], volumes = [] } = data;
    const totalSize = (parseFloat(available) + parseFloat(used)).toFixed(2);

    // Determine redundancy type and color — mirrors legacy Qdg.js initdgs() health logic
    let redundancyText = "Highly Available";
    let redundancyColor = "text-brand-600";

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
        <div className="mb-4 overflow-hidden rounded-lg border border-border bg-surface p-5 shadow-sm">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                        <Database size={18} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">Pool: <span className="text-brand-700">{poolName}</span></h3>
                        <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs font-semibold uppercase tracking-wide ${redundancyColor}`}>{redundancyText}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Dedup: {dedup}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 rounded-md border border-border bg-surface-muted px-5 py-3">
                    <div className="text-center">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Total Size</p>
                        <p className="text-lg font-semibold text-gray-900">{totalSize}GB</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Used</p>
                        <p className="text-lg font-semibold text-brand-600">{used}GB</p>
                    </div>
                </div>
            </div>

            {/* Raid Groups Grid */}
            <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
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
                        <div key={raidId} className={`relative rounded-lg border bg-surface-muted p-5 ${raidHasMissing ? 'border-danger-200' : 'border-border'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-xs font-semibold uppercase tracking-wide ${raidHasMissing ? 'text-danger-600' : 'text-gray-500'}`}>{raidId.split('_')[0]}</span>
                                <div className={`h-2.5 w-2.5 rounded-full ${raidHasMissing ? 'bg-danger-500' : 'bg-success-500'}`}></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 2xl:grid-cols-6">
                                {realDisks.map(diskId => (
                                    <DiskIcon
                                        key={diskId}
                                        diskId={diskId}
                                        data={allDisks[diskId]}
                                        isSelected={selectedDiskId === diskId}
                                        onClick={() => setSelectedDiskId(prev => prev === diskId ? null : diskId)}
                                        showActions={true}
                                        displaySize="large"
                                        onAction={(action) => onDiskAction(diskId, action)}
                                    />
                                ))}
                                {Array.from({ length: missingCount }).map((_, i) => (
                                    <div key={`missing-${i}`} className="flex flex-col items-center rounded-md border border-danger-200 bg-danger-50 p-3">
                                        <img src="img/invaliddisk.png" alt="missing disk" className="h-20 w-16 object-contain opacity-50" />
                                        <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-danger-600">missing</span>
                                        <span className="text-xs font-semibold leading-none text-danger-400">-</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Capacity Management Section */}
            <div className="overflow-hidden rounded-lg border border-border bg-surface-muted">
                <button
                    type="button"
                    onClick={() => setIsExpansionOpen(current => !current)}
                    aria-expanded={isExpansionOpen}
                    className="flex w-full items-center justify-between gap-3 p-5 text-left transition-colors hover:bg-gray-50/60"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-brand-600 shadow-xs">
                            <Plus size={12} />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">Expansion Options</h4>
                            <p className="mt-0.5 text-xs text-gray-500">Add a compatible disk group to this pool</p>
                        </div>
                    </div>
                    <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform ${isExpansionOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isExpansionOpen && (
                    <div className="border-t border-border p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border text-left">
                                        <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Select</th>
                                        <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Configuration</th>
                                        <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">New Total Size</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {Object.entries(newRaidOptions).map(([type, options]) => {
                                if (Object.keys(options).length === 0) return null;
                                
                                // Legacy Visibility Logic:
                                // If it's a RAID pool, hide 'volset' (stripe).
                                // If it's NOT a RAID pool (e.g. stripe), hide RAID options.
                                if (isRaid && (type === 'volset' || type === 'single')) return null;
                                if (!isRaid && type !== 'volset') return null;

                                const sizes = Object.keys(options);
                                return (
                                    <tr
                                        key={type}
                                        onClick={() => handleRedundancySelect(type, sizes[0])}
                                        className={`group/row cursor-pointer transition-colors ${selectedRedundancy === type ? 'bg-brand-50/60' : 'hover:bg-white'}`}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`${poolName}_redundancy`}
                                                    className="h-4 w-4 cursor-pointer border-gray-300 text-brand-600 transition-all pointer-events-none focus:ring-0"
                                                    id={`${poolName}_${type}`}
                                                    checked={selectedRedundancy === type}
                                                    readOnly
                                                />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm font-medium text-gray-800">
                                                {type.charAt(0).toUpperCase() + type.slice(1)} Redundancy
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {sizes.length > 1 && selectedRedundancy === type ? (
                                                <select 
                                                    value={selectedSize}
                                                    onChange={(e) => setSelectedSize(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-brand-700 outline-none focus:ring-4 focus:ring-brand-100"
                                                >
                                                    {sizes.map(s => (
                                                        <option key={s} value={s}>
                                                            {(parseFloat(s.replace(/[^0-9.]/g, '')) + parseFloat(available)).toFixed(2)}GB
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${selectedRedundancy === type ? 'bg-surface text-brand-700' : 'bg-gray-100 text-gray-500 group-hover/row:bg-brand-50 group-hover/row:text-brand-700'}`}>
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
                                variant="primary"
                                className="px-6"
                            >
                                Add to Pool
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Deletion Safety Flow — matches legacy: block deletion when pool has volumes */}
            <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center">
                <div className="text-xs font-medium text-gray-400">
                    Volumes in pool: <span className="text-brand-600 font-bold">{volumes.length > 0 ? volumes.map(v => v.split('_')[0]).join(', ') : 'None'}</span>
                </div>

                <div className="flex gap-3">
                    {volumes.length > 0 ? (
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Remove volumes first to decommission</span>
                    ) : (
                        <>
                            {deleteStep === 0 && (
                                <Button
                                    onClick={() => setDeleteStep(1)}
                                    variant="ghost"
                                    className="px-4 text-danger-600 hover:bg-danger-50 hover:text-danger-700"
                                >
                                    Decommission Pool
                                </Button>
                            )}
                            {deleteStep === 1 && (
                                <>
                                    <span className="flex items-center text-xs font-semibold uppercase tracking-wide text-danger-600">Really delete?</span>
                                    <Button onClick={() => setDeleteStep(0)} variant="secondary" size="sm">Cancel</Button>
                                    <Button onClick={() => setDeleteStep(2)} variant="danger" size="sm">Delete</Button>
                                </>
                            )}
                            {deleteStep === 2 && (
                                <>
                                    <span className="flex items-center text-xs font-semibold uppercase tracking-wide text-danger-700">Final confirmation needed!</span>
                                    <Button onClick={() => setDeleteStep(0)} variant="secondary" size="sm">Cancel</Button>
                                    <Button
                                        onClick={() => { setDeleteStep(0); onDeletePool(poolName); }}
                                        variant="danger"
                                        size="sm"
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

