import React from 'react';
import { Check, Loader2, Trash2, Users, UserX } from 'lucide-react';
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
                <table className="min-w-[820px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Group Name</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Members</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {groups.map((group) => (
                            <GroupRow
                                key={group.id ?? group.name}
                                group={group}
                                allUsers={users}
                                onUpdateMembers={onUpdateMembers}
                                onDelete={onDelete}
                            />
                        ))}
                        {groups.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-12 text-center text-gray-500">
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

const StatusBadge = ({ status }) => {
    if (status === 'creating') {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warning-100 bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700">
                <Loader2 size={12} className="animate-spin" />
                Creating
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success-100 bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            Active
        </span>
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

    const prevUsersKey = React.useRef(usersKey);

    React.useEffect(() => {
        if (prevUsersKey.current !== usersKey) {
            prevUsersKey.current = usersKey;
            setSelectedUsers(initialMembers);
            setHasChanges(false);
        }
    }, [usersKey, initialMembers]);

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
    const isCreating = group.status === 'creating';
    const initial = group.name?.charAt(0)?.toUpperCase() || 'G';

    return (
        <tr className={`transition-colors hover:bg-gray-50/60 ${isCreating ? 'bg-warning-50/40' : ''}`}>
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                            isCreating
                                ? 'border-warning-100 bg-warning-50 text-warning-700'
                                : 'border-border bg-surface-muted text-brand-600'
                        }`}
                    >
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
                            disabled={isEveryoneGroup || isCreating}
                            placeholder="Select users"
                        />
                    </div>
                    {hasChanges && !isCreating && (
                        <Button onClick={handleUpdate} size="sm" icon={<Check size={14} />}>
                            Apply
                        </Button>
                    )}
                </div>
            </td>
            <td className="px-5 py-4">
                <StatusBadge status={group.status} />
            </td>
            <td className="px-5 py-4 text-right">
                <button
                    onClick={() => onDelete(group.name)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
                        isEveryoneGroup || isCreating
                            ? 'cursor-not-allowed border-border bg-gray-100 text-gray-300'
                            : 'border-border bg-surface text-gray-500 hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600'
                    }`}
                    disabled={isEveryoneGroup || isCreating}
                >
                    <Trash2 size={15} />
                </button>
            </td>
        </tr>
    );
};

export default GroupList;

