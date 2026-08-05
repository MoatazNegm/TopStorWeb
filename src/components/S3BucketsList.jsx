import React, { useState } from 'react';
import { Check, Cloud, Edit3, FolderOpen, Trash2, X } from 'lucide-react';
import Panel from './Common/Panel';

const S3BucketsList = ({ volumes, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const handleEdit = (vol) => {
        setEditingId(vol.name);
        setEditValues({
            ipaddress: vol.ipaddress,
            Subnet: vol.Subnet,
            active: (vol.statusmount || vol.active || '').toLowerCase() === 'active',
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    const handleSave = (volName) => {
        onUpdate(volName, {
            ...editValues,
            active: editValues.active ? 'active' : 'false'
        });
        setEditingId(null);
    };

    const handleChange = (field, value) => {
        setEditValues((prev) => ({ ...prev, [field]: value }));
    };

    const getPoolLabel = (pool = '') => {
        const parts = String(pool).split('p');
        return parts[2] || pool;
    };

    return (
        <Panel
            icon={<Cloud size={17} />}
            title="S3 Bucket List"
            subtitle="Object storage mount points"
            bodyClass="p-0"
        >
            <div className="border-b border-border bg-surface-muted px-5 py-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {volumes.length} Buckets
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-[1450px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Bucket</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Pool</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Endpoint</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Access Key</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Secret Key</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Size</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Snaps</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Comp %</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">IP Address</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Subnet</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {volumes.map((vol) => {
                            const statusValue = vol.statusmount || vol.active || 'false';
                            const isActive = String(statusValue).toLowerCase() === 'active';
                            const apiPort = vol.apiPort || '9000';

                            return (
                                <tr key={vol.name} className="group/row transition-colors hover:bg-gray-50/60">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                                <Cloud size={14} />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800">{vol.name.split('_')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-xs font-medium text-gray-600">{getPoolLabel(vol.pool)}</span>
                                    </td>
                                    <td className="px-5 py-4 text-xs font-medium text-info-600">
                                        {`http://${vol.ipaddress}:${apiPort}/${vol.bucket || vol.name.split('_')[0]}`}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-gray-600">{vol.accesskey || 'n/a'}</td>
                                    <td className="px-5 py-4 font-mono text-xs text-gray-600">{vol.secretkey || 'n/a'}</td>
                                    <td className="px-5 py-4 text-sm text-gray-700">{vol.quota || 'n/a'}</td>
                                    <td className="px-5 py-4 text-sm text-gray-700">{vol.usedbysnapshots || 'n/a'}</td>
                                    <td className="px-5 py-4 font-mono text-sm text-gray-700">{vol.refcompressratio || 'n/a'}</td>
                                    <td className="px-5 py-4">
                                        {editingId === vol.name ? (
                                            <input
                                                type="text"
                                                value={editValues.ipaddress}
                                                onChange={(e) => handleChange('ipaddress', e.target.value)}
                                                className="w-36 rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-700">{vol.ipaddress}</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        {editingId === vol.name ? (
                                            <input
                                                type="number"
                                                value={editValues.Subnet}
                                                onChange={(e) => handleChange('Subnet', e.target.value)}
                                                className="w-16 rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-700">{vol.Subnet}</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        {editingId === vol.name ? (
                                            <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-border text-brand-600 focus:ring-brand-100"
                                                    checked={!!editValues.active}
                                                    onChange={(e) => handleChange('active', e.target.checked)}
                                                />
                                                Active
                                            </label>
                                        ) : (
                                            <span className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${isActive ? 'border-success-100 bg-success-50 text-success-600' : 'border-warning-100 bg-warning-50 text-warning-600'}`}>
                                                {isActive ? 'Active' : 'Disabled'}
                                            </span>
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
                            );
                        })}
                    </tbody>
                </table>
                {volumes.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                            <FolderOpen size={18} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No S3 bucket volumes found</p>
                    </div>
                )}
            </div>
        </Panel>
    );
};

export default S3BucketsList;