import React from 'react';

const SnapshotPeriodsList = ({ periods, onDelete, type }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-all duration-300">
            <div className="px-6 pt-4 pb-2 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-gray-800 font-bold tracking-tight">{type} Periods</h3>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Active Schedules</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="px-6 py-2.5">Sequence ID</th>
                            <th className="px-6 py-4">Volume</th>
                            <th className="px-6 py-2.5">Frequency</th>
                            <th className="px-6 py-2.5">Keep</th>
                            <th className="px-6 py-2.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {periods.map((period, idx) => (
                            <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group/row">
                                <td className="px-6 py-3 text-sm font-bold text-gray-700">{period.id}</td>
                                <td className="px-6 py-3 text-sm font-bold text-indigo-500">{period.volume.split('_')[0]}</td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-600">
                                    {type === 'Minutely' && `Every ${period.every} min`}
                                    {type === 'Hourly' && `Every ${period.every} hr at min ${period.sminute}`}
                                    {type === 'Weekly' && `On ${period.every} at ${period.stime}`}
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-600">{period.keep} snaps</td>
                                <td className="px-6 py-3 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onDelete(period.id)}
                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete Schedule"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {periods.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="text-gray-400 font-medium tracking-tight">No active {type.toLowerCase()} schedules</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SnapshotPeriodsList;
