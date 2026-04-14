import React from 'react';

const LogList = ({ logs }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-all duration-300 mt-4">
            {/* Theme Accent Line */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-blue-500 shadow-[2px_0_10px_rgba(59,130,246,0.2)]"></div>

            <div className="px-6 py-3 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <i className="fas fa-clipboard-list"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">System Event Logs</h3>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Real-time system monitoring & audit trail</p>
                    </div>
                </div>
                <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    {logs.length} Total Events
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Timestamp</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Identity</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Event Details</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">Severity</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Code</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {logs.map((log, index) => (
                            <LogRow key={`${log.date}-${log.time}-${index}`} log={log} />
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-20 text-gray-400">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl">
                                            <i className="fas fa-history opacity-20"></i>
                                        </div>
                                        <p className="font-bold">No system logs available</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Storage Audit System v2.0</p>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-gray-300 uppercase italic">
                        <i className="fas fa-check-circle"></i> Monitoring Active
                    </span>
                </div>
            </div>
        </div>
    );
};

const LogRow = ({ log }) => {
    const getSeverityStyles = (type) => {
        switch (type?.toLowerCase()) {
            case 'error':
                return {
                    bg: 'bg-rose-50',
                    text: 'text-rose-600',
                    border: 'border-rose-100',
                    icon: 'fa-exclamation-circle',
                    row: 'bg-rose-50/30 hover:bg-rose-50/50'
                };
            case 'warning':
                return {
                    bg: 'bg-amber-50',
                    text: 'text-amber-600',
                    border: 'border-amber-100',
                    icon: 'fa-exclamation-triangle',
                    row: 'bg-amber-50/30 hover:bg-amber-50/50'
                };
            default:
                return {
                    bg: 'bg-blue-50',
                    text: 'text-blue-600',
                    border: 'border-blue-100',
                    icon: 'fa-info-circle',
                    row: 'hover:bg-blue-50/10'
                };
        }
    };

    const styles = getSeverityStyles(log.type);

    return (
        <tr className={`${styles.row} transition-colors group/row`}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    <span className="font-bold text-gray-700 text-sm">{log.date}</span>
                    <span className="text-xs text-gray-400 font-medium">{log.time}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-user-circle text-gray-300 text-xs"></i>
                        <span className="font-bold text-gray-700 text-xs">{log.user}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <i className="fas fa-server text-gray-300 text-[10px]"></i>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{log.host}</span>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-600 leading-relaxed max-w-xl">
                    {log.msgbody}
                </p>
            </td>
            <td className="px-6 py-4 text-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${styles.bg} ${styles.text} rounded-lg text-[10px] font-black uppercase tracking-widest border ${styles.border} shadow-sm`}>
                    <i className={`fas ${styles.icon}`}></i>
                    {log.type}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <span className="text-xs font-mono font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    {log.msgcode}
                </span>
            </td>
        </tr>
    );
};

export default LogList;
