import React from 'react';

const SnapshotList = ({ snapshots, onRollback, onDelete, title, subtitle }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-all duration-300">
            <div className="px-6 pt-4 pb-2 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-gray-800 font-bold tracking-tight">{title}</h3>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{subtitle}</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="px-6 py-2.5">Date / Time</th>
                            <th className="px-6 py-2.5">Name</th>
                            <th className="px-6 py-2.5">Volume</th>
                            <th className="px-6 py-2.5 text-center">Size (MB)</th>
                            <th className="px-6 py-2.5 text-center">Comp %</th>
                            <th className="px-6 py-2.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {snapshots.map((snap, idx) => (
                            <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group/row">
                                <td className="px-6 py-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-700">{snap.date}</span>
                                        <span className="text-[10px] text-gray-400 font-medium">{snap.time}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3">
                                    <span className="text-sm font-medium text-gray-600 truncate max-w-[150px] inline-block" title={snap.name}>
                                        {snap.name.split('.')[0] === snap.name ? snap.name : `${snap.name.split('.')[0]}.${snap.name.split('.').pop()}`}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-sm font-bold text-indigo-500">
                                    {snap.volume.split('_')[0]}
                                </td>
                                <td className="px-6 py-3 text-center text-sm font-medium text-gray-600">{snap.used}</td>
                                <td className="px-6 py-3 text-center text-sm font-medium text-gray-600 font-mono italic">{snap.refcompressratio}</td>
                                <td className="px-6 py-3 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onRollback(snap.name)}
                                            className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Rollback"
                                        >
                                            <i className="fas fa-undo"></i>
                                        </button>
                                        <button
                                            onClick={() => onDelete(snap.name)}
                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {snapshots.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-gray-400 font-medium tracking-tight">No snapshots available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SnapshotList;
