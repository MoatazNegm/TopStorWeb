import React from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import Panel from './Common/Panel';

const SnapshotList = ({ snapshots, onRollback, onDelete, title, subtitle }) => {
    return (
        <Panel title={title} subtitle={subtitle} bodyClass="p-0">

            <div className="overflow-x-auto">
                <table className="min-w-[920px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Date / Time</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Volume</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Size (MB)</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Comp %</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {snapshots.map((snap, idx) => (
                            <tr key={idx} className="group/row transition-colors hover:bg-gray-50/60">
                                <td className="px-5 py-3.5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-800">{snap.date}</span>
                                        <span className="text-xs text-gray-500">{snap.time}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className="inline-block max-w-[240px] truncate text-sm text-gray-700" title={snap.name}>
                                        {snap.name.split('.')[0] === snap.name ? snap.name : `${snap.name.split('.')[0]}.${snap.name.split('.').pop()}`}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-sm font-medium text-brand-600">
                                    {snap.volume.split('_')[0]}
                                </td>
                                <td className="px-5 py-3.5 text-center text-sm text-gray-700">{snap.used}</td>
                                <td className="px-5 py-3.5 text-center font-mono text-sm text-gray-700">{snap.refcompressratio}</td>
                                <td className="px-5 py-3.5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover/row:opacity-100">
                                        <button
                                            onClick={() => onRollback(snap.name)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
                                            title="Rollback"
                                        >
                                            <RotateCcw size={14} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(snap.name)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {snapshots.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-sm font-medium text-gray-500">No snapshots available</p>
                    </div>
                )}
            </div>
        </Panel>
    );
};

export default SnapshotList;
