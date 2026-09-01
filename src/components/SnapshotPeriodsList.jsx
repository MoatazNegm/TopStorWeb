import React from 'react';
import { CalendarClock, Trash2 } from 'lucide-react';
import Panel from './Common/Panel';
import { ListSearch, useRowFilter, SortTh, useSort, sortRows, dateKey } from './Common/ListSearch';

const SnapshotPeriodsList = ({ periods, onDelete, type }) => {
    const { query, setQuery, visible, filtering } = useRowFilter(periods);
    const { sort, toggle } = useSort();
    const sorted = sortRows(visible, sort, { id: (p) => p.id, vol: (p) => p.volume.split('_')[0], freq: (p) => p.periodtype || p.id, keep: (p) => p.keep });
    return (
        <Panel
            icon={<CalendarClock size={16} />}
            title={`${type} Periods`}
            subtitle="Active schedules"
            bodyClass="p-0"
        >

            <ListSearch id="listsearch" value={query} onChange={setQuery} count={visible.length} total={periods.length} />
            <div className="overflow-x-auto">
                <table className="min-w-[800px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <SortTh sortKey="id" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Sequence ID</SortTh>
                            <SortTh sortKey="vol" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Volume</SortTh>
                            <SortTh sortKey="freq" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Frequency</SortTh>
                            <SortTh sortKey="keep" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Keep</SortTh>
                            <th className="px-2.5 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sorted.map((period, idx) => (
                            <tr key={idx} className="group/row transition-colors hover:bg-gray-50/60">
                                <td className="px-2.5 py-1.5.5 text-sm font-semibold text-gray-800">{period.id}</td>
                                <td className="px-2.5 py-1.5.5 text-sm font-medium text-brand-600">{period.volume.split('_')[0]}</td>
                                <td className="px-2.5 py-1.5.5 text-sm text-gray-700">
                                    {type === 'Minutely' && `Every ${period.every} min`}
                                    {type === 'Hourly' && `Every ${period.every} hr at min ${period.sminute}`}
                                    {type === 'Weekly' && `On ${period.every} at ${period.stime}`}
                                </td>
                                <td className="px-2.5 py-1.5.5 text-sm text-gray-700">{period.keep} snaps</td>
                                <td className="px-2.5 py-1.5.5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover/row:opacity-100">
                                        <button
                                            onClick={() => onDelete(period.id)}
                                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
                                            title="Delete Schedule"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtering && visible.length === 0 && periods.length > 0 && (
                    <div className="py-6 text-center text-sm text-gray-500">No rows match the search</div>
                )}
                {periods.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="text-sm font-medium text-gray-500">No active {type.toLowerCase()} schedules</p>
                    </div>
                )}
            </div>
        </Panel>
    );
};

export default SnapshotPeriodsList;
