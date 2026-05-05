import React from 'react';
import Dropdown from './Common/Dropdown';

const UserList = ({ users, groups, onUpdateGroups, onChangePassword, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-all duration-300 mt-8">
            {/* Theme Accent Line */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-2xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

            <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <i className="fas fa-users-cog"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">System User Directory</h3>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Active Directory & Local Users</p>
                    </div>
                </div>
                <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    {users.length} Active Accounts
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">User Identity</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Storage Target</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">Quota</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Group Assignments</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">Security</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <UserRow
                                key={user.name}
                                user={user}
                                allGroups={groups}
                                onUpdateGroups={onUpdateGroups}
                                onChangePassword={onChangePassword}
                                onDelete={onDelete}
                            />
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-gray-400">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl">
                                            <i className="fas fa-user-slash opacity-20"></i>
                                        </div>
                                        <p className="font-bold">No users found in system</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Storage System Directory Services v2.0</p>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-gray-300 uppercase italic">
                        <i className="fas fa-lock"></i> AES-256 Encrypted
                    </span>
                </div>
            </div>
        </div>
    );
};

const UserRow = ({ user, allGroups, onUpdateGroups, onChangePassword, onDelete }) => {
    // user.groups from API is always an array: ['1','3'] or ['NoGroup']
    const originalGroups = React.useMemo(() => {
        const grps = Array.isArray(user.groups) ? user.groups : (user.groups ? user.groups.split(',') : []);
        return grps.filter(g => g !== 'NoGroup');
    }, [user.groups]);

    const [selectedGroups, setSelectedGroups] = React.useState(originalGroups);
    const [hasChanges, setHasChanges] = React.useState(false);

    // Stable key derived from server data — changes only when server groups actually change,
    // not on every poll cycle that creates new array references with same content.
    const groupsKey = React.useMemo(() => [...originalGroups].sort().join(','), [originalGroups]);

    React.useEffect(() => {
        setSelectedGroups(originalGroups);
        setHasChanges(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupsKey]);

    const handleGroupChange = (values) => {
        setSelectedGroups(values);
        const sorted = (arr) => [...arr].sort().join(',');
        setHasChanges(sorted(values) !== sorted(originalGroups));
    };

    const handleUpdate = () => {
        // Map selected group IDs to text names — backend userchange accepts both but text is canonical
        const groupNames = selectedGroups.map(id => {
            const grp = allGroups.find(g => String(g.id) === String(id));
            return grp ? grp.text : id;
        });
        onUpdateGroups(user.name, groupNames.join(','));
        setHasChanges(false);
    };

    return (
        <tr className="hover:bg-indigo-50/10 transition-colors group/row">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-indigo-500 font-bold text-sm border-2 border-white shadow-sm">
                        {user.name[0]?.toUpperCase()}
                    </div>
                    <span className="font-bold text-gray-700">{user.name}</span>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    <span className="text-gray-600 font-medium">{user.Volpool || user.pool || 'N/A'}</span>
                </div>
            </td>
            <td className="px-6 py-5 text-center">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold border border-gray-200">
                    {user.Volsize || user.size || '0'} GB
                </span>
            </td>
            <td className="px-6 py-5 min-w-[300px]">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Dropdown
                            isMulti
                            options={allGroups.map(group => ({ value: String(group.id), label: group.text }))}
                            value={selectedGroups}
                            onChange={handleGroupChange}
                            placeholder="Select Groups..."
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
            <td className="px-6 py-5 text-center">
                <button
                    onClick={() => onChangePassword(user.name)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs font-bold border border-blue-100"
                >
                    <i className="fas fa-shield-alt"></i> Reset
                </button>
            </td>
            <td className="px-6 py-5 text-right">
                <button
                    onClick={() => onDelete(user.name)}
                    className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-center hover:shadow-lg hover:shadow-rose-100 border border-transparent hover:border-rose-100"
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );
};

export default UserList;
