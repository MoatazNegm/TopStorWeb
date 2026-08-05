import React, { useState } from 'react';
import { Check, Database, Edit3, FolderOpen, Trash2, X } from 'lucide-react';
import Panel from './Common/Panel';

const IscsiList = ({ volumes, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const handleEdit = (vol) => {
        setEditingId(vol.name);
        setEditValues({
            ipaddress: vol.ipaddress,
            portalport: vol.portalport,
            initiators: (vol.initiators || '').replaceAll(',', '\n')
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    const handleSave = (volName) => {
        onUpdate(volName, {
            ...editValues,
            // Format initiators back to comma separated string before saving
            initiators: editValues.initiators.replaceAll('\n', ',').replaceAll(' ', ',').replaceAll(/,{2,}/g, ',')
        });
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
            icon={<Database size={17} />}
            title="iSCSI LUN List"
            subtitle="Block-level storage targets"
            bodyClass="p-0"
        >
            <div className="border-b border-border bg-surface-muted px-5 py-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {volumes.length} Targets
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-[1200px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">LUN / Target</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Pool</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Size</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Snaps</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Comp %</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">IP:Port</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Allowed Initiators</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {volumes.map((vol) => (
                            <tr key={vol.name} className="group/row transition-colors hover:bg-gray-50/60">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                            <Database size={14} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800">{vol.name.split('_')[0]}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-xs font-medium text-gray-600">{getPoolLabel(vol.pool)}</span>
                                </td>
                                <td className="px-5 py-4 text-center text-sm text-gray-700">{vol.used || 'n/a'}</td>
                                <td className="px-5 py-4 text-center text-sm text-gray-700">{vol.usedbysnapshots || 'n/a'}</td>
                                <td className="px-5 py-4 text-center font-mono text-sm text-gray-700">{vol.refcompressratio || 'n/a'}</td>
                                <td className="px-5 py-4">
                                    {editingId === vol.name ? (
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                value={editValues.ipaddress}
                                                onChange={(e) => handleChange('ipaddress', e.target.value)}
                                                className="w-36 rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                                placeholder="IP"
                                            />
                                            <input
                                                type="number"
                                                value={editValues.portalport}
                                                onChange={(e) => handleChange('portalport', e.target.value)}
                                                className="w-20 rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                                placeholder="Port"
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-700">{vol.ipaddress}:{vol.portalport}</span>
                                    )}
                                </td>
                                <td className="max-w-xs px-5 py-4">
                                    {editingId === vol.name ? (
                                        <textarea
                                            value={editValues.initiators}
                                            onChange={(e) => handleChange('initiators', e.target.value)}
                                            className="min-h-[60px] w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                            placeholder="IQN1&#10;IQN2..."
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-1">
                                            {(vol.initiators || '').split(',').filter(Boolean).map((iqn, idx) => (
                                                <span key={idx} className="truncate rounded-sm border border-border bg-surface-muted px-2 py-0.5 text-xs font-medium text-gray-500" title={iqn}>
                                                    {iqn}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover/row:opacity-100">
                                        {editingId === vol.name ? (
                                            <>
                                                <button onClick={() => handleSave(vol.name)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-success-100 bg-success-50 text-success-600 transition-colors hover:bg-success-600 hover:text-white" title="Save">
                                                    <Check size={14} />
                                                </button>
                                                <button onClick={handleCancel} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:bg-gray-100" title="Cancel">
                                                    <X size={14} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(vol)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600" title="Edit">
                                                    <Edit3 size={14} />
                                                </button>
                                                <button onClick={() => onDelete(vol.name)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600" title="Delete">
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
                {volumes.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                            <FolderOpen size={18} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No iSCSI LUNs found</p>
                    </div>
                )}
            </div>
        </Panel>
    );
};

export default IscsiList;
