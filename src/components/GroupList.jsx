import React from 'react';
import { Check, Trash2, Users, UserX } from 'lucide-react';
import Dropdown from './Common/Dropdown';
import Button from './Common/Button';
import Panel from './Common/Panel';

const GroupList = ({ groups, users, onUpdateMembers, onDelete }) => {
    return (
        <Panel
            icon={<Users size={17} />}
            title="System Groups Directory"
            subtitle="Permissions and access control"
            bodyClass="p-0"
            footer={<p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Directory Services</p>}
        >
            <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Group Name</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Members</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
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
                                <td colSpan="3" className="py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                                            <UserX size={20} />
                                        </span>
                                        <p className="text-sm font-medium">No groups found in system</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-border bg-surface-muted px-5 py-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {groups.length} Active Groups
                </div>
            </div>
        </Panel>
    );
};

const GroupRow = ({ group, allUsers, onUpdateMembers, onDelete }) => {
    const initialMembers = React.useMemo(() => {
        if (!group.users) return [];
        const arr = Array.isArray(group.users) ? group.users : [group.users];
        return arr.map(String).filter((u) => u !== '' && u !== 'NoUser');
    }, [group.users]);

    const [selectedUsers, setSelectedUsers] = React.useState(initialMembers);
    const [hasChanges, setHasChanges] = React.useState(false);

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
    const initial = group.name?.charAt(0)?.toUpperCase() || 'G';

    return (
        <tr className="transition-colors hover:bg-gray-50/60">
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-muted text-xs font-semibold text-brand-600">
                        {initial}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{group.name}</span>
                </div>
            </td>
            <td className="min-w-[300px] px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Dropdown
                            isMulti
                            options={allUsers.map(user => ({ value: String(user.id), label: user.text }))}
                            value={selectedUsers}
                            onChange={handleUserChange}
                            disabled={isEveryoneGroup}
                            placeholder="Select users"
                        />
                    </div>
                    {hasChanges && (
                        <Button onClick={handleUpdate} size="sm" icon={<Check size={14} />}>
                            Apply
                        </Button>
                    )}
                </div>
            </td>
            <td className="px-5 py-4 text-right">
                <button
                    onClick={() => onDelete(group.name)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
                        isEveryoneGroup
                            ? 'cursor-not-allowed border-border bg-gray-100 text-gray-300'
                            : 'border-border bg-surface text-gray-500 hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600'
                    }`}
                    disabled={isEveryoneGroup}
                >
                    <Trash2 size={15} />
                </button>
            </td>
        </tr>
    );
};

export default GroupList;
