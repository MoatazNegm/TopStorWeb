import React, { useState } from 'react';

const CifsList = ({ volumes, groups, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const handleEdit = (vol) => {
        setEditingId(vol.name);
        setEditValues({
            ipaddress: vol.ipaddress,
            Subnet: vol.Subnet,
            groups: vol.groups
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

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-all duration-300 mb-8">
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-2xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>
            <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-gray-800 font-bold tracking-tight">CIFS Volume List</h3>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Active Network Shares</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="px-6 py-4">Volume</th>
                            <th className="px-6 py-4">Pool</th>
                            <th className="px-6 py-4">Size</th>
                            <th className="px-6 py-4">Snaps</th>
                            <th className="px-6 py-4">Comp %</th>
                            <th className="px-6 py-4">IP Address</th>
                            <th className="px-6 py-4">Subnet</th>
                            <th className="px-6 py-4">Groups</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {volumes.map((vol) => (
                            <tr key={vol.name} className="hover:bg-blue-50/30 transition-colors group/row">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                                            <i className="fab fa-windows text-xs"></i>
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{vol.name.split('_')[0]}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs font-bold text-gray-500">{vol.pool.split('p')[2]}</span>
                                </td>
                                <td className="px-6 py-5 text-sm font-medium text-gray-600">{vol.quota || 'n/a'}</td>
                                <td className="px-6 py-5 text-sm font-medium text-gray-600">{vol.usedbysnapshots || 'n/a'}</td>
                                <td className="px-6 py-5 text-sm font-medium text-gray-600 font-mono italic">{vol.refcompressratio || 'n/a'}</td>
                                <td className="px-6 py-5">
                                    {editingId === vol.name ? (
                                        <input
                                            type="text"
                                            value={editValues.ipaddress}
                                            onChange={(e) => handleChange('ipaddress', e.target.value)}
                                            className="w-32 px-2 py-1 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-600">{vol.ipaddress}</span>
                                    )}
                                </td>
                                <td className="px-6 py-5">
                                    {editingId === vol.name ? (
                                        <input
                                            type="number"
                                            value={editValues.Subnet}
                                            onChange={(e) => handleChange('Subnet', e.target.value)}
                                            className="w-16 px-2 py-1 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-600">{vol.Subnet}</span>
                                    )}
                                </td>
                                <td className="px-6 py-5">
                                    {editingId === vol.name ? (
                                        <select
                                            multiple
                                            value={editValues.groups.split(',')}
                                            onChange={(e) => handleChange('groups', Array.from(e.target.selectedOptions, option => option.value).join(','))}
                                            className="w-40 px-2 py-1 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[40px]"
                                        >
                                            {groups.map(g => (
                                                <option key={g.id} value={g.text}>{g.text}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="flex flex-wrap gap-1">
                                            {vol.groups.split(',').map((g, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-bold">
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                        {editingId === vol.name ? (
                                            <>
                                                <button onClick={() => handleSave(vol.name)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Save">
                                                    <i className="fas fa-check"></i>
                                                </button>
                                                <button onClick={handleCancel} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Cancel">
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(vol)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button onClick={() => onDelete(vol.name)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                                                    <i className="fas fa-trash"></i>
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
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-folder-open text-gray-200 text-xl"></i>
                        </div>
                        <p className="text-gray-400 font-medium tracking-tight">No CIFS volumes found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CifsList;
