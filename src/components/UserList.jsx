import React from 'react';
import { Check, KeyRound, Shield, Trash2, UserX, Users } from 'lucide-react';
import Dropdown from './Common/Dropdown';
import Panel from './Common/Panel';

const UserList = ({ users, groups, onUpdateGroups, onChangePassword, onDelete }) => {
    return (
        <Panel
            icon={<Users size={18} />}
            title="System User Directory"
            subtitle="Local and directory accounts"
            bodyClass="p-0"
            actions={
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-success-500"></span>
                    {users.length} accounts
                </span>
            }
            footer={
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Storage system directory services</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Shield size={14} />
                        AES-256 encrypted
                    </span>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full text-left">
                    <thead>
                        <tr className="border-b border-border bg-surface-muted">
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">User Identity</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Storage Target</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Quota</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Group Assignments</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Security</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
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
                                <td colSpan="6" className="py-16 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                                            <UserX size={24} />
                                        </span>
                                        <p className="text-sm font-medium">No users found in system</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Panel>
    );
};

const UserRow = ({ user, allGroups, onUpdateGroups, onChangePassword, onDelete }) => {
    // user.groups from API is always an array: ['1','3'] or ['NoGroup']
    const originalGroups = React.useMemo(() => {
        const parsed = Array.isArray(user.groups) ? user.groups : user.groups ? user.groups.split(',') : [];
        return parsed.filter((group) => group !== 'NoGroup');
    }, [user.groups]);

    const [selectedGroups, setSelectedGroups] = React.useState(originalGroups);
    const [hasChanges, setHasChanges] = React.useState(false);

    const groupsKey = React.useMemo(() => [...originalGroups].sort().join(','), [originalGroups]);

    const prevGroupsKey = React.useRef(groupsKey);

    React.useEffect(() => {
        if (prevGroupsKey.current !== groupsKey) {
            prevGroupsKey.current = groupsKey;
            setSelectedGroups(originalGroups);
            setHasChanges(false);
        }
    }, [groupsKey, originalGroups]);

    const handleGroupChange = (values) => {
        const normalized = Array.isArray(values) ? values : [];
        setSelectedGroups(normalized);
        const sorted = (arr) => [...arr].sort().join(',');
        setHasChanges(sorted(normalized) !== sorted(originalGroups));
    };

    const handleUpdate = () => {
        const groupNames = selectedGroups.map((id) => {
            const match = allGroups.find((group) => String(group.id) === String(id));
            return match ? match.text : id;
        });
        onUpdateGroups(user.name, groupNames.join(','));
        setHasChanges(false);
    };

    return (
        <tr className="hover:bg-gray-50/60 transition-colors">
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600">
                        {user.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                    <span className="font-medium text-gray-800">{user.name}</span>
                </div>
            </td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                    <span>{user.Volpool || user.pool || 'N/A'}</span>
                </div>
            </td>
            <td className="px-5 py-4 text-center">
                <span className="inline-flex rounded-sm border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-gray-700">
                    {user.Volsize || user.size || '0'} GB
                </span>
            </td>
            <td className="px-5 py-4 min-w-[300px]">
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Dropdown
                            isMulti
                            options={allGroups.map((group) => ({ value: String(group.id), label: group.text }))}
                            value={selectedGroups}
                            onChange={handleGroupChange}
                            placeholder="Select groups..."
                        />
                    </div>
                    {hasChanges && (
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-success-100 bg-success-50 text-success-600 transition-colors hover:bg-success-600 hover:text-white"
                            title="Apply changes"
                        >
                            <Check size={16} />
                        </button>
                    )}
                </div>
            </td>
            <td className="px-5 py-4 text-center">
                <button
                    type="button"
                    onClick={() => onChangePassword(user.name)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                >
                    <KeyRound size={14} />
                    Reset
                </button>
            </td>
            <td className="px-5 py-4 text-right">
                <button
                    type="button"
                    onClick={() => onDelete(user.name)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gray-50 text-gray-400 transition-colors hover:border hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
                >
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );
};

export default UserList;

