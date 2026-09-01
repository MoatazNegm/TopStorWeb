import React, { useState } from 'react';
import { Check, Edit3, Home, FolderOpen, Trash2, X } from 'lucide-react';
import Panel from './Common/Panel';
import { ListSearch, useRowFilter, SortTh, useSort, sortRows, dateKey } from './Common/ListSearch';

const HomeFoldersList = ({ volumes, onUpdate, onDelete }) => {
    const { query, setQuery, visible, filtering } = useRowFilter(volumes);
    const { sort, toggle } = useSort();
    const sorted = sortRows(visible, sort, { name: (v) => v.name.split('_')[0], pool: (v) => v.pool, size: (v) => v.quota, snaps: (v) => v.usedbysnapshots, comp: (v) => v.refcompressratio, ip: (v) => v.ipaddress, subnet: (v) => v.Subnet });
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const handleEdit = (vol) => {
        setEditingId(vol.name);
        setEditValues({
            ipaddress: vol.ipaddress,
            Subnet: vol.Subnet
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    const handleSave = (volName) => {
        onUpdate(volName, editValues);
        setEditingId(null);
    };

    const handleChange = (field, value) => {
        setEditValues(prev => ({ ...prev, [field]: value }));
    };

    const getPoolLabel = (pool = '') => {
        const parts = String(pool).split('p');
        return parts[2] || pool;
    };

    return (
        <Panel
            icon={<Home size={17} />}
            title="Home Folders List"
            subtitle="User home directories"
            bodyClass="p-0"
        >
            <div className="border-b border-border bg-surface-muted px-2.5 py-1.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {volumes.length} Homes
                </span>
            </div>

            <ListSearch id="listsearch" value={query} onChange={setQuery} count={visible.length} total={volumes.length} />
            <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <SortTh sortKey="name" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">User / Volume</SortTh>
                            <SortTh sortKey="pool" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Pool</SortTh>
                            <SortTh sortKey="size" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Size</SortTh>
                            <SortTh sortKey="snaps" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Snaps</SortTh>
                            <SortTh sortKey="comp" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Comp %</SortTh>
                            <SortTh sortKey="ip" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">IP Address</SortTh>
                            <SortTh sortKey="subnet" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Subnet</SortTh>
                            <th className="px-2.5 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sorted.map((vol) => (
                            <tr key={vol.name} className="group/row transition-colors hover:bg-gray-50/60">
                                <td className="px-2.5 py-1">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                            <Home size={14} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800">{vol.name.split('_')[0]}</span>
                                    </div>
                                </td>
                                <td className="px-2.5 py-1">
                                    <span className="text-xs font-medium text-gray-600">{getPoolLabel(vol.pool)}</span>
                                </td>
                                <td className="px-2.5 py-1 text-sm text-gray-700">{vol.quota || 'n/a'}</td>
                                <td className="px-2.5 py-1 text-sm text-gray-700">{vol.usedbysnapshots || 'n/a'}</td>
                                <td className="px-2.5 py-1 font-mono text-sm text-gray-700">{vol.refcompressratio || 'n/a'}</td>
                                <td className="px-2.5 py-1">
                                    {editingId === vol.name ? (
                                        <input
                                            type="text"
                                            value={editValues.ipaddress}
                                            onChange={(e) => handleChange('ipaddress', e.target.value)}
                                            className="w-36 rounded-md border border-border bg-surface px-2.5 py-0.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-700">{vol.ipaddress}</span>
                                    )}
                                </td>
                                <td className="px-2.5 py-1">
                                    {editingId === vol.name ? (
                                        <input
                                            type="number"
                                            value={editValues.Subnet}
                                            onChange={(e) => handleChange('Subnet', e.target.value)}
                                            className="w-16 rounded-md border border-border bg-surface px-2.5 py-0.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-700">{vol.Subnet}</span>
                                    )}
                                </td>
                                <td className="px-2.5 py-1 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover/row:opacity-100">
                                        {editingId === vol.name ? (
                                            <>
                                                <button onClick={() => handleSave(vol.name)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-success-100 bg-success-50 text-success-600 transition-colors hover:bg-success-600 hover:text-white" title="Save">
                                                    <Check size={14} />
                                                </button>
                                                <button onClick={handleCancel} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:bg-gray-100" title="Cancel">
                                                    <X size={14} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(vol)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600" title="Edit">
                                                    <Edit3 size={14} />
                                                </button>
                                                <button onClick={() => onDelete(vol.name)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600" title="Delete">
                                                    <Trash2 size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtering && visible.length === 0 && volumes.length > 0 && (
                    <div className="py-6 text-center text-sm text-gray-500">No rows match the search</div>
                )}
                {volumes.length === 0 && (
                    <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                            <FolderOpen size={18} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No home folders found</p>
                    </div>
                )}
            </div>
        </Panel>
    );
};

export default HomeFoldersList;
