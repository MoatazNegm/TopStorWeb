import React from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import Panel from './Common/Panel';
import { ListSearch, useRowFilter, SortTh, useSort, sortRows, dateKey } from './Common/ListSearch';

const SnapshotList = ({ snapshots, onRollback, onDelete, title, subtitle }) => {
    const { query, setQuery, visible, filtering } = useRowFilter(snapshots);
    const { sort, toggle } = useSort();
    const sorted = sortRows(visible, sort, { time: (s) => dateKey(s.date, s.time), name: (s) => s.name, vol: (s) => s.volume.split('_')[0], size: (s) => s.used, comp: (s) => s.refcompressratio });
    return (
        <Panel title={title} subtitle={subtitle} bodyClass="p-0">

            <ListSearch id="listsearch" value={query} onChange={setQuery} count={visible.length} total={snapshots.length} />
            <div className="overflow-x-auto">
                <table className="min-w-[920px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <SortTh sortKey="time" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Date / Time</SortTh>
                            <SortTh sortKey="name" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Name</SortTh>
                            <SortTh sortKey="vol" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Volume</SortTh>
                            <SortTh sortKey="size" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">Size (MB)</SortTh>
                            <SortTh sortKey="comp" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">Comp %</SortTh>
                            <th className="px-2.5 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sorted.map((snap, idx) => (
                            <tr key={idx} className="group/row transition-colors hover:bg-gray-50/60">
                                <td className="px-2.5 py-1.5.5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-800">{snap.date}</span>
                                        <span className="text-xs text-gray-500">{snap.time}</span>
                                    </div>
                                </td>
                                <td className="px-2.5 py-1.5.5">
                                    <span className="inline-block max-w-[240px] truncate text-sm text-gray-700" title={snap.name}>
                                        {snap.name.split('.')[0] === snap.name ? snap.name : `${snap.name.split('.')[0]}.${snap.name.split('.').pop()}`}
                                    </span>
                                </td>
                                <td className="px-2.5 py-1.5.5 text-sm font-medium text-brand-600">
                                    {snap.volume.split('_')[0]}
                                </td>
                                <td className="px-2.5 py-1.5.5 text-center text-sm text-gray-700">{snap.used}</td>
                                <td className="px-2.5 py-1.5.5 text-center font-mono text-sm text-gray-700">{snap.refcompressratio}</td>
                                <td className="px-2.5 py-1.5.5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover/row:opacity-100">
                                        <button
                                            onClick={() => onRollback(snap.name)}
                                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
                                            title="Rollback"
                                        >
                                            <RotateCcw size={14} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(snap.name)}
                                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
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
                {filtering && visible.length === 0 && snapshots.length > 0 && (
                    <div className="py-6 text-center text-sm text-gray-500">No rows match the search</div>
                )}
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
