import React from 'react';
import { RotateCcw, Trash2, Users, UserX, X } from 'lucide-react';
import Dropdown from './Common/Dropdown';
import SubmitBar from './Common/SubmitBar';
import Panel from './Common/Panel';
import { ListSearch, useRowFilter, SortTh, useSort, sortRows, dateKey } from './Common/ListSearch';

/**
 * The groups list. Like the users list, a change (members, deletion) is only collected as "pending" and shown marked;
 * Submit at the end of the list sends one API call per changed group, Cancel throws all of them away, the small x
 * takes back one change.
 */
const GroupList = ({ groups, users, onSubmit, queueStatus }) => {
    const { query, setQuery, visible, filtering } = useRowFilter(groups, (group) => [group.name, group.text, group.id, ...(Array.isArray(group.users) ? group.users : [group.users]).map((id) => { const match = (users || []).find((u) => String(u.id) === String(id)); return match ? match.text : id; })].join(' '));
    const { sort, toggle } = useSort();
    const sorted = sortRows(visible, sort, { name: (g) => g.name || g.text, members: (g) => (Array.isArray(g.users) ? g.users : [g.users]).filter((u) => u && u !== 'NoUser').length });
    const [pending, setPending] = React.useState({});
    const [busy, setBusy] = React.useState(false);

    React.useEffect(() => {
        const names = groups.map((group) => group.name);
        setPending((prev) => {
            const keys = Object.keys(prev).filter((name) => names.includes(name));
            return keys.length === Object.keys(prev).length ? prev : Object.fromEntries(keys.map((k) => [k, prev[k]]));
        });
    }, [groups]);

    const stage = (name, changes) => setPending((prev) => ({ ...prev, [name]: { ...(prev[name] || {}), ...changes } }));
    const unstage = (name, keys) =>
        setPending((prev) => {
            const next = { ...prev };
            if (!next[name]) return prev;
            const rest = { ...next[name] };
            keys.forEach((key) => { delete rest[key]; });
            if (Object.keys(rest).length === 0) delete next[name]; else next[name] = rest;
            return next;
        });

    const pendingCount = Object.values(pending).reduce((n, p) => n + (p.remove ? 1 : 0) + (p.members !== undefined ? 1 : 0), 0);
    const handleSubmit = async () => {
        setBusy(true);
        const ok = await onSubmit(pending);
        setBusy(false);
        if (ok !== false) setPending({});
    };

    return (
        <Panel
            icon={<Users size={17} />}
            title="System Groups Directory"
            subtitle="Permissions and access control"
            bodyClass="p-0"
            footer={<p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Directory Services</p>}
        >
            <ListSearch id="listsearch" value={query} onChange={setQuery} count={visible.length} total={groups.length} />
            <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <SortTh sortKey="name" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Group Name</SortTh>
                            <SortTh sortKey="members" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Members</SortTh>
                            <th className="px-2.5 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sorted.map((group) => (
                            <GroupRow
                                key={group.name}
                                group={group}
                                allUsers={users}
                                pend={pending[group.name] || {}}
                                onStage={(changes) => stage(group.name, changes)}
                                onRevert={(keys) => unstage(group.name, keys)}
                            />
                        ))}
                        {groups.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-8 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                                            <UserX size={20} />
                                        </span>
                                        <p className="text-sm font-medium">No groups found in system</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {filtering && visible.length === 0 && groups.length > 0 && (
                    <div className="py-6 text-center text-sm text-gray-500">No rows match the search</div>
                )}
            </div>

            <div className="border-t border-border bg-surface-muted px-2.5 py-1.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {groups.length} Active Groups
                </div>
            </div>
            <SubmitBar count={pendingCount} onSubmit={handleSubmit} onCancel={() => setPending({})} status={queueStatus} busy={busy} />
        </Panel>
    );
};

const GroupRow = ({ group, allUsers, pend, onStage, onRevert }) => {
    const initialMembers = React.useMemo(() => {
        if (!group.users) return [];
        const arr = Array.isArray(group.users) ? group.users : [group.users];
        return arr.map(String).filter((u) => u !== '' && u !== 'NoUser');
    }, [group.users]);

    const shownMembers = pend.members !== undefined ? pend.members : initialMembers;
    const removed = Boolean(pend.remove);
    const isEveryoneGroup = group.name === 'Everyone';

    const handleUserChange = (values) => {
        const normalized = (Array.isArray(values) ? values : []).map(String);
        const sorted = (arr) => [...arr].sort().join(',');
        if (sorted(normalized) === sorted(initialMembers)) onRevert(['members']);
        else onStage({ members: normalized });
    };

    return (
        <tr className={`transition-colors ${removed ? 'bg-danger-50/60' : 'hover:bg-gray-50/60'}`}>
            <td className="px-2.5 py-1">
                <span className={`text-sm font-semibold ${removed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{group.name}</span>
            </td>
            <td className="min-w-[300px] px-2.5 py-1">
                {pend.members !== undefined && !removed && (
                    <div className="mb-0.5 whitespace-nowrap text-[9px] font-medium leading-none text-success-600" title="current value">
                        {initialMembers.map((id) => { const match = allUsers.find((u) => String(u.id) === id); return match ? match.text : id; }).join(', ') || 'no members'}
                    </div>
                )}
                <div className="flex items-center gap-1.5">
                    <div className={`min-w-0 flex-1 ${pend.members !== undefined ? 'rounded ring-1 ring-warning-100' : ''}`}>
                        <Dropdown
                            compact
                            isMulti
                            options={allUsers.map(user => ({ value: String(user.id), label: user.text }))}
                            value={shownMembers}
                            onChange={handleUserChange}
                            disabled={isEveryoneGroup || removed}
                            placeholder="Select users"
                        />
                    </div>
                    {pend.members !== undefined && !removed && (
                        <button
                            type="button"
                            onClick={() => onRevert(['members'])}
                            title="Cancel this change"
                            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-gray-500 transition-colors hover:bg-gray-100"
                        >
                            <X size={11} />
                        </button>
                    )}
                </div>
            </td>
            <td className="px-2.5 py-1 text-right">
                {removed ? (
                    <button
                        type="button"
                        onClick={() => onRevert(['remove'])}
                        title="Keep this group (take back the deletion)"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-danger-100 bg-danger-50 text-danger-600 transition-colors hover:bg-danger-100"
                    >
                        <RotateCcw size={14} />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => onStage({ remove: true })}
                        title="Delete group"
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors ${
                            isEveryoneGroup
                                ? 'cursor-not-allowed border-border bg-gray-100 text-gray-300'
                                : 'border-border bg-surface text-gray-500 hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600'
                        }`}
                        disabled={isEveryoneGroup}
                    >
                        <Trash2 size={15} />
                    </button>
                )}
            </td>
        </tr>
    );
};

export default GroupList;
