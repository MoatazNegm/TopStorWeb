import React from 'react';
import { KeyRound, RotateCcw, Search, Shield, Trash2, UserX, Users, X } from 'lucide-react';
import Dropdown from './Common/Dropdown';
import Panel from './Common/Panel';
import SubmitBar from './Common/SubmitBar';
import { SortTh, useSort, sortRows } from './Common/ListSearch';
import { IpInput, SubnetInput, ipError, DEFAULT_SUBNET } from './Common/NetFields';

/**
 * The users list. Nothing a user changes here is sent at once: edits (groups, address, quota, deletion) are collected as
 * "pending" and shown marked; the Submit button at the end of the list sends them (one API call per changed user, one after
 * the other), Cancel throws them all away, the small x next to a field takes back that one change.
 * With several users selected, a change made on one selected row is made for all of them.
 */

// the address a user is restricted to (empty when none is known) and its subnet
const userAddress = (user) => {
    const address = user.HomeAddress || user.ipaddress || user.address || '';
    return address === 'NoAddress' || address === '_1' ? '' : address;
};
const userSubnet = (user) => user.HomeSubnet || user.Subnet || DEFAULT_SUBNET;
const hasHome = (user) => (user.Volpool || user.pool) !== 'NoHome';

const userGroupIds = (user) => {
    const parsed = Array.isArray(user.groups) ? user.groups : user.groups ? String(user.groups).split(',') : [];
    return parsed.filter((group) => group !== 'NoGroup').map(String);
};

// the names of the groups a user belongs to
const userGroupNames = (user, groups) =>
    userGroupIds(user).map((id) => {
        const match = groups.find((group) => String(group.id) === String(id));
        return match ? match.text : String(id);
    });

// everything a row shows (and a little more) as one lower-case string, so a search term can match any part of any field
const userSearchText = (user, groups) =>
    [user.name, user.Volpool || user.pool, userAddress(user), user.Volsize || user.size, ...userGroupNames(user, groups), user.priv, user.id]
        .filter((part) => part !== undefined && part !== null)
        .join(' ')
        .toLowerCase();

const countPending = (pending) =>
    Object.values(pending).reduce(
        (n, p) => n + (p.remove ? 1 : 0) + (p.groups !== undefined ? 1 : 0) + (p.address !== undefined ? 1 : 0) + (p.quota !== undefined ? 1 : 0),
        0
    );

// column widths (percent); the column that is being edited gets wider, the others give way
const columnWidths = (editing) => {
    if (editing.address > 0) return { name: 11, target: 9, address: 34, quota: 8, password: 6, actions: 5 };
    if (editing.quota > 0) return { name: 11, target: 10, address: 13, quota: 18, password: 6, actions: 5 };
    return { name: 13, target: 12, address: 15, quota: 10, password: 7, actions: 6 };
};

const UserList = ({ users, groups, onChangePassword, onSubmit, queueStatus }) => {
    const [query, setQuery] = React.useState('');
    const { sort, toggle } = useSort();
    // the selected users (by name). Filter first, then "select all" selects what the filter shows.
    const [selected, setSelected] = React.useState([]);
    const [pending, setPending] = React.useState({});
    const [editing, setEditing] = React.useState({ address: 0, quota: 0 });
    const [busy, setBusy] = React.useState(false);

    React.useEffect(() => {
        const names = users.map((user) => user.name);
        setSelected((prev) => {
            const next = prev.filter((name) => names.includes(name));
            return next.length === prev.length ? prev : next;
        });
        setPending((prev) => {
            const keys = Object.keys(prev).filter((name) => names.includes(name));
            return keys.length === Object.keys(prev).length ? prev : Object.fromEntries(keys.map((k) => [k, prev[k]]));
        });
    }, [users]);

    const byName = React.useMemo(() => Object.fromEntries(users.map((user) => [user.name, user])), [users]);

    const stage = (names, changes) =>
        setPending((prev) => {
            const next = { ...prev };
            names.forEach((name) => { next[name] = { ...(next[name] || {}), ...changes }; });
            return next;
        });
    const unstage = (names, keys) =>
        setPending((prev) => {
            const next = { ...prev };
            names.forEach((name) => {
                if (!next[name]) return;
                const rest = { ...next[name] };
                keys.forEach((key) => { delete rest[key]; });
                if (Object.keys(rest).length === 0) delete next[name]; else next[name] = rest;
            });
            return next;
        });
    const editState = (column, delta) => setEditing((prev) => ({ ...prev, [column]: Math.max(0, prev[column] + delta) }));

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const visibleUsers = terms.length === 0
        ? users
        : users.filter((user) => {
            const text = userSearchText(user, groups);
            return terms.every((term) => text.includes(term));
        });

    const sortedUsers = sortRows(visibleUsers, sort, {
        name: (user) => user.name,
        target: (user) => user.Volpool || user.pool,
        address: (user) => (pending[user.name]?.address !== undefined ? pending[user.name].address : userAddress(user)),
        quota: (user) => (pending[user.name]?.quota !== undefined ? pending[user.name].quota : user.Volsize || user.size),
        groups: (user) => userGroupNames(user, groups).join(' '),
    });
    const allShownSelected = sortedUsers.length > 0 && sortedUsers.every((user) => selected.includes(user.name));
    const someShownSelected = sortedUsers.some((user) => selected.includes(user.name));
    const toggleAll = () => {
        const shown = sortedUsers.map((user) => user.name);
        setSelected((prev) => (allShownSelected ? prev.filter((name) => !shown.includes(name)) : [...new Set([...prev, ...shown])]));
    };
    const toggleOne = (name) => setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
    const selectAllRef = React.useRef(null);
    React.useEffect(() => {
        if (selectAllRef.current) selectAllRef.current.indeterminate = someShownSelected && !allShownSelected;
    }, [someShownSelected, allShownSelected]);

    // the users a change made on this row is made for: all selected ones when several are selected (address and quota only
    // where there is a home folder), otherwise just this one
    const targetsFor = (user, keys) => {
        let names = selected.includes(user.name) && selected.length > 1 ? selected : [user.name];
        if (keys.some((key) => ['address', 'subnet', 'quota'].includes(key))) names = names.filter((name) => byName[name] && hasHome(byName[name]));
        return names;
    };

    const pendingCount = countPending(pending);
    const handleSubmit = async () => {
        setBusy(true);
        const ok = await onSubmit(pending);
        setBusy(false);
        if (ok !== false) {
            setPending({});
            setSelected([]);
        }
    };
    const handleCancel = () => {
        setPending({});
        setSelected([]);
    };

    const w = columnWidths(editing);
    const thBase = 'px-2.5 py-1.5 text-[11px] font-semibold tracking-wide text-gray-500';

    return (
        <Panel
            icon={<Users size={18} />}
            title="System User Directory"
            subtitle="Local and directory accounts"
            bodyClass="p-0"
            actions={
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-success-500"></span>
                    {terms.length > 0 ? `${visibleUsers.length} of ${users.length}` : users.length} accounts
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
            <div className="border-b border-border px-2.5 py-1.5">
                <div className="relative">
                    <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        id="usersearch"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search users: name, storage target, quota, group ..."
                        autoComplete="off"
                        className="h-8 w-full rounded-md border border-border bg-surface pl-8 pr-8 text-sm text-gray-800 outline-none transition-colors hover:border-border-strong focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            title="Clear search"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {selected.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-b border-border bg-brand-50/40 px-2.5 py-1.5 text-xs">
                    <span className="font-semibold text-brand-700">{selected.length} selected</span>
                    <button
                        type="button"
                        onClick={() => stage(selected, { remove: true })}
                        className="inline-flex h-7 items-center gap-1 rounded-md border border-danger-100 bg-danger-50 px-2 font-medium text-danger-700 transition-colors hover:bg-danger-600 hover:text-white"
                    >
                        <Trash2 size={13} />
                        Delete {selected.length === 1 ? 'user' : `${selected.length} users`}
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelected([])}
                        className="inline-flex h-7 items-center rounded-md border border-border bg-surface px-2 font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Clear selection
                    </button>
                    {selected.length > 1 && (
                        <span className="text-gray-500">
                            A change made on one selected user is made for all {selected.length}; passwords cannot be set for several users. Nothing is applied until you submit.
                        </span>
                    )}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full table-fixed text-left">
                    <thead>
                        <tr className="border-b border-border bg-surface-muted">
                            <th className="w-8 px-2.5 py-1.5">
                                <input
                                    ref={selectAllRef}
                                    type="checkbox"
                                    checked={allShownSelected}
                                    onChange={toggleAll}
                                    disabled={sortedUsers.length === 0}
                                    title="Select all shown users"
                                    className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 text-brand-600"
                                />
                            </th>
                            <SortTh sortKey="name" sort={sort} onToggle={toggle} className={`${thBase} text-left`} style={{ width: `${w.name}%` }}>User Identity</SortTh>
                            <SortTh sortKey="target" sort={sort} onToggle={toggle} className={`${thBase} text-left`} style={{ width: `${w.target}%` }}>Storage Target</SortTh>
                            <SortTh sortKey="address" sort={sort} onToggle={toggle} className={`${thBase} text-left`} style={{ width: `${w.address}%` }}>Address</SortTh>
                            <SortTh sortKey="quota" sort={sort} onToggle={toggle} className={`${thBase} text-center`} style={{ width: `${w.quota}%` }}>Quota (GB)</SortTh>
                            <SortTh sortKey="groups" sort={sort} onToggle={toggle} className={`${thBase} text-left`}>Group Assignments</SortTh>
                            <th className={`${thBase} text-center uppercase`} style={{ width: `${w.password}%` }}>Password</th>
                            <th className={`${thBase} text-right uppercase`} style={{ width: `${w.actions}%` }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sortedUsers.map((user) => {
                            const bulkMode = selected.includes(user.name) && selected.length > 1;
                            return (
                                <UserRow
                                    key={user.name}
                                    user={user}
                                    allGroups={groups}
                                    pend={pending[user.name] || {}}
                                    onStage={(changes) => stage(targetsFor(user, Object.keys(changes)), changes)}
                                    onRevert={(keys) => unstage(targetsFor(user, keys), keys)}
                                    onChangePassword={onChangePassword}
                                    isSelected={selected.includes(user.name)}
                                    onToggle={() => toggleOne(user.name)}
                                    applyTo={bulkMode ? selected.length : 0}
                                    onEditState={editState}
                                />
                            );
                        })}
                        {sortedUsers.length === 0 && (
                            <tr>
                                <td colSpan="8" className="py-8 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                                            <UserX size={20} />
                                        </span>
                                        <p className="text-sm font-medium">{users.length === 0 ? 'No users found in system' : 'No users match the search'}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <SubmitBar count={pendingCount} onSubmit={handleSubmit} onCancel={handleCancel} status={queueStatus} busy={busy} />
        </Panel>
    );
};

// "current value" shown very small and green above a field that is being edited
const CurrentValue = ({ children, applyTo = 0 }) => (
    <div className="mb-0.5 whitespace-nowrap text-[9px] font-medium leading-none text-success-600" title="current value">
        {children}
        {applyTo > 1 && <span className="ml-1.5 text-warning-700">applies to {applyTo} users</span>}
    </div>
);

// the small square x: takes back the change of this one field
const RevertButton = ({ onClick, title = 'Cancel this change' }) => (
    <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClick}
        title={title}
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-gray-500 transition-colors hover:bg-gray-100"
    >
        <X size={11} />
    </button>
);

const useEditSession = (editing, column, onEditState) => {
    React.useEffect(() => {
        if (!editing) return undefined;
        onEditState(column, 1);
        return () => onEditState(column, -1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editing]);
};

const closeOnLeave = (close) => (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
};

// Address: shown as text; a click turns it into an edit field (address + subnet) with the current value above it.
// A valid change is collected as pending at once (there is no OK button, Submit at the end of the list sends it).
const AddressCell = ({ user, pend, onStage, onRevert, applyTo = 0, onEditState }) => {
    const address = userAddress(user);
    const subnet = String(userSubnet(user));
    const shownAddress = pend.address !== undefined ? pend.address : address;
    const shownSubnet = pend.subnet !== undefined ? String(pend.subnet) : subnet;
    const changed = pend.address !== undefined;
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(shownAddress);
    const [draftSubnet, setDraftSubnet] = React.useState(shownSubnet);
    const locked = !hasHome(user) || pend.remove;
    useEditSession(editing, 'address', onEditState);

    const start = () => { setDraft(shownAddress); setDraftSubnet(shownSubnet); setEditing(true); };
    const apply = (nextAddress, nextSubnet) => {
        const value = nextAddress.trim();
        if (value === address && String(nextSubnet) === subnet) onRevert(['address', 'subnet']);
        else if (value !== '' && !ipError(value)) onStage({ address: value, subnet: String(nextSubnet) });
    };
    const revert = () => { onRevert(['address', 'subnet']); setEditing(false); };

    if (!editing) {
        return (
            <div className="flex items-center gap-1">
                <button type="button" onClick={start} disabled={locked}
                    title={!hasHome(user) ? 'No home storage' : changed ? `Changed from ${address || 'not set'}; not applied until submitted` : 'Click to edit the address'}
                    className={`block min-w-0 flex-1 truncate rounded px-1 py-0.5 text-left font-mono text-xs ${
                        locked ? 'cursor-default text-gray-300' : changed ? 'bg-warning-50 text-warning-700 hover:bg-warning-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {!hasHome(user) ? '—' : shownAddress ? `${shownAddress}/${shownSubnet}` : <span className="text-gray-400">not set</span>}
                </button>
                {changed && !locked && <RevertButton onClick={revert} />}
            </div>
        );
    }
    return (
        <div onBlur={closeOnLeave(() => setEditing(false))}>
            <CurrentValue applyTo={applyTo}>{address ? `${address}/${subnet}` : 'not set'}</CurrentValue>
            <div className="flex items-center gap-1">
                <IpInput
                    autoFocus
                    value={draft}
                    onChange={(event) => { setDraft(event.target.value); apply(event.target.value, draftSubnet); }}
                    className="h-6 w-32 rounded border border-border bg-surface px-1.5 font-mono text-xs outline-none focus:border-brand-500"
                />
                <SubnetInput
                    name="HomeSubnet"
                    value={draftSubnet}
                    onChange={(event) => { setDraftSubnet(event.target.value); apply(draft, event.target.value); }}
                    className="h-6 w-12 rounded border border-border bg-surface px-1 text-xs outline-none focus:border-brand-500"
                />
                <RevertButton onClick={revert} />
            </div>
        </div>
    );
};

// Quota (GB): shown as a number; a click turns it into an edit field (up to 5 digits) with the current value above it
const QuotaCell = ({ user, pend, onStage, onRevert, applyTo = 0, onEditState }) => {
    const quota = String(user.Volsize || user.size || '0');
    const shown = pend.quota !== undefined ? String(pend.quota) : quota;
    const changed = pend.quota !== undefined;
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(shown);
    const locked = !hasHome(user) || pend.remove;
    useEditSession(editing, 'quota', onEditState);

    const start = () => { setDraft(shown); setEditing(true); };
    const change = (value) => {
        setDraft(value);
        if (value === quota) onRevert(['quota']);
        else if (/^\d{1,5}$/.test(value)) onStage({ quota: value });
    };
    const revert = () => { onRevert(['quota']); setEditing(false); };

    if (!editing) {
        return (
            <div className="flex items-center justify-center gap-1">
                <button type="button" onClick={start} disabled={locked}
                    title={!hasHome(user) ? 'No home storage' : changed ? `Changed from ${quota}; not applied until submitted` : 'Click to edit the quota'}
                    className={`inline-flex min-w-[2.5rem] justify-center rounded-sm border px-2 py-0.5 text-xs font-medium ${
                        locked ? 'cursor-default border-border bg-surface-muted text-gray-300' : changed ? 'border-warning-100 bg-warning-50 text-warning-700' : 'border-border bg-surface-muted text-gray-700 hover:border-brand-500'}`}>
                    {!hasHome(user) ? '—' : shown}
                </button>
                {changed && !locked && <RevertButton onClick={revert} />}
            </div>
        );
    }
    return (
        <div onBlur={closeOnLeave(() => setEditing(false))} className="inline-block text-left">
            <CurrentValue applyTo={applyTo}>{quota}</CurrentValue>
            <div className="flex items-center gap-1">
                <input
                    autoFocus
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={draft}
                    onChange={(event) => change(event.target.value.replace(/\D/g, '').slice(0, 5))}
                    className="h-6 w-14 rounded border border-border bg-surface px-1.5 text-center text-xs outline-none focus:border-brand-500"
                />
                <RevertButton onClick={revert} />
            </div>
        </div>
    );
};

const UserRow = ({ user, allGroups, pend, onStage, onRevert, onChangePassword, isSelected, onToggle, applyTo, onEditState }) => {
    const originalGroups = React.useMemo(() => userGroupIds(user), [user]);
    const shownGroups = pend.groupIds !== undefined ? pend.groupIds : originalGroups;
    const removed = Boolean(pend.remove);
    const bulkMode = applyTo > 1;

    const handleGroupChange = (values) => {
        const normalized = (Array.isArray(values) ? values : []).map(String);
        const sorted = (arr) => [...arr].sort().join(',');
        if (sorted(normalized) === sorted(originalGroups)) {
            onRevert(['groups', 'groupIds']);
            return;
        }
        const names = normalized.map((id) => {
            const match = allGroups.find((group) => String(group.id) === id);
            return match ? match.text : id;
        });
        onStage({ groupIds: normalized, groups: names.join(',') });
    };

    return (
        <tr className={`transition-colors ${removed ? 'bg-danger-50/60' : isSelected ? 'bg-brand-50/50' : 'hover:bg-gray-50/60'}`}>
            <td className="w-8 px-2.5 py-1">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onToggle}
                    title="Select this user"
                    className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 text-brand-600"
                />
            </td>
            <td className="px-2.5 py-1">
                <span className={`block truncate text-sm font-medium ${removed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{user.name}</span>
            </td>
            <td className="px-2.5 py-1">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300"></span>
                    <span className="truncate">{user.Volpool || user.pool || 'N/A'}</span>
                </div>
            </td>
            <td className="px-2.5 py-1">
                <AddressCell user={user} pend={pend} onStage={onStage} onRevert={onRevert} applyTo={applyTo} onEditState={onEditState} />
            </td>
            <td className="px-2.5 py-1 text-center">
                <QuotaCell user={user} pend={pend} onStage={onStage} onRevert={onRevert} applyTo={applyTo} onEditState={onEditState} />
            </td>
            <td className="px-2.5 py-1">
                <div className="flex items-center gap-1.5">
                    <div className={`min-w-0 flex-1 ${pend.groups !== undefined ? 'rounded ring-1 ring-warning-100' : ''}`}>
                        <Dropdown
                            compact
                            isMulti
                            options={allGroups.map((group) => ({ value: String(group.id), label: group.text }))}
                            value={shownGroups}
                            onChange={handleGroupChange}
                            disabled={removed}
                            placeholder="Select groups..."
                        />
                    </div>
                    {pend.groups !== undefined && !removed && <RevertButton onClick={() => onRevert(['groups', 'groupIds'])} />}
                </div>
            </td>
            <td className="px-2.5 py-1 text-center">
                <button
                    type="button"
                    onClick={() => onChangePassword(user.name)}
                    disabled={bulkMode || removed}
                    title={bulkMode ? 'A password cannot be set for several users at once' : 'Reset password'}
                    aria-label={`Reset password of ${user.name}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-brand-100 bg-brand-50 text-brand-600 transition-colors hover:bg-brand-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-brand-50 disabled:hover:text-brand-600"
                >
                    <KeyRound size={14} />
                </button>
            </td>
            <td className="px-2.5 py-1 text-right">
                {removed ? (
                    <button
                        type="button"
                        onClick={() => onRevert(['remove'])}
                        title={bulkMode ? `Keep the ${applyTo} selected users` : 'Keep this user (take back the deletion)'}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-danger-100 bg-danger-50 text-danger-600 transition-colors hover:bg-danger-100"
                    >
                        <RotateCcw size={14} />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => onStage({ remove: true })}
                        title={bulkMode ? `Delete the ${applyTo} selected users` : 'Delete user'}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-50 text-gray-400 transition-colors hover:border hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </td>
        </tr>
    );
};

export default UserList;
