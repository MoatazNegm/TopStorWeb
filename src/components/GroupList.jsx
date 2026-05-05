import React from 'react';
import Dropdown from './Common/Dropdown';

const GroupList = ({ groups, users, onUpdateMembers, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-all duration-300 mt-8">
            {/* Theme Accent Line */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-2xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

            <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <i className="fas fa-users"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">System Groups Directory</h3>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Permissions & Access Control</p>
                    </div>
                </div>
                <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    {groups.length} Active Groups
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Group Name</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Members</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {groups.map((group) => (
                            <GroupRow
                                key={group.name}
                                group={group}
                                allUsers={users}
                                onUpdateMembers={onUpdateMembers}
                                onDelete={onDelete}
                            />
                        ))}
                        {groups.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center py-20 text-gray-400">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl">
                                            <i className="fas fa-users-slash opacity-20"></i>
                                        </div>
                                        <p className="font-bold">No groups found in system</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Directory Services v2.0</p>
            </div>
        </div>
    );
};

const GroupRow = ({ group, allUsers, onUpdateMembers, onDelete }) => {
    // API always returns group.users as an integer array: [1,3] or ["NoUser"]
    const initialMembers = React.useMemo(() => {
        if (!group.users) return [];
        const arr = Array.isArray(group.users) ? group.users : [group.users];
        return arr.map(String).filter(u => u !== '' && u !== 'NoUser');
    }, [group.users]);

    const [selectedUsers, setSelectedUsers] = React.useState(initialMembers);
    const [hasChanges, setHasChanges] = React.useState(false);

    // Stable key derived from server data — changes only when server membership actually changes,
    // not on every poll cycle that creates new array references with same content.
    const usersKey = React.useMemo(() => [...initialMembers].sort().join(','), [initialMembers]);

    React.useEffect(() => {
        setSelectedUsers(initialMembers);
        setHasChanges(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersKey]);

    const handleUserChange = (values) => {
        setSelectedUsers(values);
        const sorted = (arr) => [...arr].map(String).sort().join(',');
        setHasChanges(sorted(values) !== sorted(initialMembers));
    };

    const handleUpdate = () => {
        onUpdateMembers(group.name, selectedUsers.join(','));
        setHasChanges(false);
    };

    const isEveryoneGroup = group.name === 'Everyone';

    return (
        <tr className="hover:bg-indigo-50/10 transition-colors group/row">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-indigo-500 font-bold text-sm border-2 border-white shadow-sm">
                        <i className="fas fa-users text-xs"></i>
                    </div>
                    <span className="font-bold text-gray-700">{group.name}</span>
                </div>
            </td>
            <td className="px-6 py-5 min-w-[300px]">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Dropdown
                            isMulti
                            options={allUsers.map(user => ({ value: String(user.id), label: user.text }))}
                            value={selectedUsers}
                            onChange={handleUserChange}
                            disabled={isEveryoneGroup}
                            placeholder="Select Users..."
                        />
                    </div>
                    {hasChanges && (
                        <button
                            onClick={handleUpdate}
                            className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100 flex-shrink-0 animate-bounce"
                            title="Apply Changes"
                        >
                            <i className="fas fa-check"></i>
                        </button>
                    )}
                </div>
            </td>
            <td className="px-6 py-5 text-right">
                <button
                    onClick={() => onDelete(group.name)}
                    className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-all border border-transparent ${isEveryoneGroup ? 'opacity-20 cursor-not-allowed' : 'text-gray-400 hover:bg-rose-50 hover:text-rose-600 hover:shadow-lg hover:shadow-rose-100 hover:border-rose-100'}`}
                    disabled={isEveryoneGroup}
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );
};

export default GroupList;
