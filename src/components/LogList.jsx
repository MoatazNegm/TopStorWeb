import React from 'react';
import {
    AlertTriangle,
    CheckCircle2,
    ClipboardList,
    History,
    Info,
    Server,
    UserCircle,
    XCircle,
} from 'lucide-react';
import Panel from './Common/Panel';
import { ListSearch, useRowFilter, SortTh, useSort, sortRows, dateKey } from './Common/ListSearch';

const LogList = ({ logs }) => {
    const { query, setQuery, visible, filtering } = useRowFilter(logs);
    const { sort, toggle } = useSort();
    const sorted = sortRows(visible, sort, { time: (l) => dateKey(l.date, l.time), who: (l) => `${l.user || ''} ${l.host || ''}`, msg: (l) => l.msgbody, sev: (l) => l.type, code: (l) => l.msgcode });
    return (
        <Panel
            icon={<ClipboardList size={17} />}
            title="System Event Logs"
            subtitle="Real-time system monitoring and audit trail"
            bodyClass="p-0"
            footer={
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Storage Audit System</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success-600">
                        <CheckCircle2 size={13} />
                        Monitoring Active
                    </span>
                </div>
            }
        >
            <div className="border-b border-border bg-surface-muted px-2.5 py-1.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {logs.length} Total Events
                </div>
            </div>

            <ListSearch id="listsearch" value={query} onChange={setQuery} count={visible.length} total={logs.length} />
            <div className="overflow-x-auto">
                <table className="min-w-[880px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <SortTh sortKey="time" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Timestamp</SortTh>
                            <SortTh sortKey="who" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Identity</SortTh>
                            <SortTh sortKey="msg" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Event Details</SortTh>
                            <SortTh sortKey="sev" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">Severity</SortTh>
                            <SortTh sortKey="code" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">Code</SortTh>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sorted.map((log, index) => (
                            <LogRow key={`${log.date}-${log.time}-${index}`} log={log} />
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                                            <History size={20} />
                                        </span>
                                        <p className="text-sm font-medium">No system logs available</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {filtering && visible.length === 0 && logs.length > 0 && (
                    <div className="py-6 text-center text-sm text-gray-500">No rows match the search</div>
                )}
            </div>
        </Panel>
    );
};

const LogRow = ({ log }) => {
    const getSeverityStyles = (type) => {
        switch (type?.toLowerCase()) {
            case 'error':
                return {
                    bg: 'bg-danger-50',
                    text: 'text-danger-600',
                    border: 'border-danger-100',
                    icon: <XCircle size={12} />,
                    row: 'bg-danger-50/40 hover:bg-danger-50/60'
                };
            case 'warning':
                return {
                    bg: 'bg-warning-50',
                    text: 'text-warning-600',
                    border: 'border-warning-100',
                    icon: <AlertTriangle size={12} />,
                    row: 'bg-warning-50/40 hover:bg-warning-50/60'
                };
            default:
                return {
                    bg: 'bg-info-50',
                    text: 'text-info-600',
                    border: 'border-info-100',
                    icon: <Info size={12} />,
                    row: 'hover:bg-gray-50/60'
                };
        }
    };

    const styles = getSeverityStyles(log.type);

    return (
        <tr className={`${styles.row} transition-colors`}>
            <td className="whitespace-nowrap px-2.5 py-1">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">{log.date}</span>
                    <span className="text-xs font-medium text-gray-500">{log.time}</span>
                </div>
            </td>
            <td className="whitespace-nowrap px-2.5 py-1">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <UserCircle size={13} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-700">{log.user}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Server size={12} className="text-gray-400" />
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{log.host}</span>
                    </div>
                </div>
            </td>
            <td className="px-2.5 py-1">
                <p className="max-w-xl text-sm text-gray-700">
                    {log.msgbody}
                </p>
            </td>
            <td className="px-2.5 py-1 text-center">
                <span className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles.bg} ${styles.text} ${styles.border}`}>
                    {styles.icon}
                    {log.type}
                </span>
            </td>
            <td className="px-2.5 py-1 text-right">
                <span className="rounded-sm border border-border bg-surface-muted px-2 py-1 font-mono text-xs font-semibold text-gray-500">
                    {log.msgcode}
                </span>
            </td>
        </tr>
    );
};

export default LogList;
