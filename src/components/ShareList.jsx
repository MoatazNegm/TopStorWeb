import React from 'react';
import { FolderOpen, HardDrive, RotateCcw, Trash2 } from 'lucide-react';
import Dropdown from './Common/Dropdown';
import Panel from './Common/Panel';
import SubmitBar from './Common/SubmitBar';
import { CurrentValue, OkButton, RevertButton, closeOnLeave } from './Common/PendingEdit';
import { IpInput, SubnetInput, ipError, DEFAULT_SUBNET } from './Common/NetFields';
import { ListSearch, useRowFilter, SortTh, useSort, sortRows } from './Common/ListSearch';
import { CapacityBar, EfficiencyCell, fmtGB, poolLabel, volumeNumbers } from './Common/Capacity';

/**
 * The list of the CIFS, NFS and home folder volumes. Same way of editing as the users list: nothing is sent at once.
 * A click on the address or on the groups field edits it in the row, the change is collected as "pending" and shown marked
 * (the original value tiny and green above it), the small x takes one change back, and the Submit bar at the end sends
 * all of them (the page makes one API call per changed volume, one after the other); Cancel throws them away.
 * Deleting a volume is collected the same way (the row is struck through until submitted).
 */

const volAddress = (vol) => vol.ipaddress || '';
const volSubnet = (vol) => String(vol.Subnet || DEFAULT_SUBNET);

// the ids of the groups of a volume (the API gives ids; names are mapped to ids)
const volGroupIds = (vol, groups) => {
    const parsed = Array.isArray(vol.groups) ? vol.groups : vol.groups ? String(vol.groups).split(',') : [];
    return parsed
        .map(String)
        .filter((g) => g && g !== 'NoGroup')
        .map((g) => {
            const byId = groups.find((x) => String(x.id) === g);
            if (byId) return String(byId.id);
            const byName = groups.find((x) => x.text === g);
            return byName ? String(byName.id) : g;
        });
};
const groupNames = (ids, groups) => ids.map((id) => (groups.find((x) => String(x.id) === String(id)) || {}).text || id);

const countPending = (pending) =>
    Object.values(pending).reduce((n, p) => n + (p.remove ? 1 : 0) + (p.address !== undefined ? 1 : 0) + (p.groups !== undefined ? 1 : 0), 0);

// Address: text; a click turns it into an edit field (address + subnet) with the current value above it.
const AddressCell = ({ vol, pend, onStage, onRevert }) => {
    const address = volAddress(vol);
    const subnet = volSubnet(vol);
    const shownAddress = pend.address !== undefined ? pend.address : address;
    const shownSubnet = pend.subnet !== undefined ? String(pend.subnet) : subnet;
    const changed = pend.address !== undefined;
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(shownAddress);
    const [draftSubnet, setDraftSubnet] = React.useState(shownSubnet);
    const locked = Boolean(pend.remove);

    const start = () => { setDraft(shownAddress); setDraftSubnet(shownSubnet); setEditing(true); };
    const apply = (nextAddress, nextSubnet) => {
        const value = nextAddress.trim();
        if (value === address && String(nextSubnet) === subnet) onRevert(['address', 'subnet']);
        else if (value !== '' && !ipError(value)) onStage({ address: value, subnet: String(nextSubnet) });
    };
    const revert = () => { onRevert(['address', 'subnet']); setEditing(false); };

    if (!editing) {
        const valueButton = (
            <button type="button" onClick={start} disabled={locked}
                title={changed ? `Changed from ${address}/${subnet}; not applied until submitted` : 'Click to edit the address'}
                className={`block min-w-0 flex-1 truncate rounded px-1 py-0.5 text-left font-mono text-xs ${
                    locked ? 'cursor-default text-gray-300' : changed ? 'bg-warning-50 text-warning-700 hover:bg-warning-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                {shownAddress ? `${shownAddress}/${shownSubnet}` : <span className="text-gray-400">not set</span>}
            </button>
        );
        if (!changed || locked) return <div className="flex items-center gap-1">{valueButton}</div>;
        return (
            <div>
                <CurrentValue>{address ? `${address}/${subnet}` : 'not set'}</CurrentValue>
                <div className="flex items-center gap-1">
                    {valueButton}
                    <RevertButton onClick={revert} />
                </div>
            </div>
        );
    }
    return (
        <div onBlur={closeOnLeave(() => setEditing(false))}>
            <CurrentValue>{address ? `${address}/${subnet}` : 'not set'}</CurrentValue>
            <div className="flex items-center gap-1">
                <IpInput
                    autoFocus
                    value={draft}
                    onChange={(event) => { setDraft(event.target.value); apply(event.target.value, draftSubnet); }}
                    className="h-6 w-32 rounded border border-border bg-surface px-1.5 font-mono text-xs outline-none focus:border-brand-500"
                />
                <SubnetInput
                    value={draftSubnet}
                    onChange={(event) => { setDraftSubnet(event.target.value); apply(draft, event.target.value); }}
                    className="h-6 w-12 rounded border border-border bg-surface px-1 text-xs outline-none focus:border-brand-500"
                />
                <OkButton onClick={() => setEditing(false)} disabled={draft.trim() === '' || Boolean(ipError(draft))} />
                <RevertButton onClick={revert} />
            </div>
        </div>
    );
};

// Groups: the same field as in the users list (a compact multi select that is always there)
const GroupsCell = ({ vol, groups, pend, onStage, onRevert }) => {
    const original = React.useMemo(() => volGroupIds(vol, groups), [vol, groups]);
    const shown = pend.groupIds !== undefined ? pend.groupIds : original;
    const removed = Boolean(pend.remove);
    const domain = vol.type === 'DOMAIN';
    const sorted = (arr) => [...arr].sort().join(',');

    const change = (values) => {
        const normalized = (Array.isArray(values) ? values : []).map(String);
        if (sorted(normalized) === sorted(original)) {
            onRevert(['groups', 'groupIds']);
            return;
        }
        onStage({ groupIds: normalized, groups: groupNames(normalized, groups).join(',') });
    };

    if (domain) return <span className="text-xs text-gray-400" title="The groups of a domain share come from the domain">Domain groups</span>;
    return (
        <div>
            {pend.groups !== undefined && !removed && (
                <CurrentValue>{groupNames(original, groups).join(', ') || 'no groups'}</CurrentValue>
            )}
            <div className="flex items-center gap-1.5">
                <div className={`min-w-0 flex-1 ${pend.groups !== undefined ? 'rounded ring-1 ring-warning-100' : ''}`}>
                    <Dropdown
                        compact
                        isMulti
                        options={groups.map((group) => ({ value: String(group.id), label: group.text }))}
                        value={shown}
                        onChange={change}
                        disabled={removed}
                        placeholder="Select groups..."
                    />
                </div>
                {pend.groups !== undefined && !removed && <RevertButton onClick={() => onRevert(['groups', 'groupIds'])} />}
            </div>
        </div>
    );
};

const ShareList = ({ volumes, groups = [], onSubmit, queueStatus, title, subtitle, count, emptyText, icon: Icon = HardDrive, showGroups = true }) => {
    const { query, setQuery, visible, filtering } = useRowFilter(volumes);
    const { sort, toggle } = useSort();
    const [pending, setPending] = React.useState({});
    const [busy, setBusy] = React.useState(false);

    // a volume that is gone (after a submit, or deleted elsewhere) has nothing pending any more
    React.useEffect(() => {
        const names = volumes.map((v) => v.name);
        setPending((prev) => {
            const keys = Object.keys(prev).filter((n) => names.includes(n));
            return keys.length === Object.keys(prev).length ? prev : Object.fromEntries(keys.map((k) => [k, prev[k]]));
        });
    }, [volumes]);

    const stage = (name, changes) => setPending((prev) => ({ ...prev, [name]: { ...(prev[name] || {}), ...changes } }));
    const unstage = (name, keys) => setPending((prev) => {
        if (!prev[name]) return prev;
        const rest = { ...prev[name] };
        keys.forEach((key) => { delete rest[key]; });
        const next = { ...prev };
        if (Object.keys(rest).length === 0) delete next[name]; else next[name] = rest;
        return next;
    });

    const sorted = sortRows(visible, sort, {
        name: (v) => v.name.split('_')[0],
        pool: (v) => v.pool,
        cap: (v) => volumeNumbers(v).pct,
        free: (v) => volumeNumbers(v).free,
        snaps: (v) => parseFloat(v.usedbysnapshots) || 0,
        comp: (v) => parseFloat(v.refcompressratio) || 0,
        ip: (v) => (pending[v.name]?.address !== undefined ? pending[v.name].address : v.ipaddress),
        groups: (v) => groupNames(volGroupIds(v, groups), groups).join(' '),
    });

    const pendingCount = countPending(pending);
    const handleSubmit = async () => {
        setBusy(true);
        const ok = await onSubmit(pending);
        setBusy(false);
        if (ok !== false) setPending({});
    };

    const th = 'px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500';
    const cols = showGroups ? 9 : 8;

    return (
        <Panel icon={<Icon size={17} />} title={title} subtitle={subtitle} bodyClass="p-0">
            <div className="border-b border-border bg-surface-muted px-2.5 py-1.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {volumes.length} {count}
                </span>
            </div>

            <ListSearch id="listsearch" value={query} onChange={setQuery} count={visible.length} total={volumes.length} />
            <div className="overflow-x-auto">
                <table className="min-w-[1050px] w-full text-left">
                    <thead className="bg-surface-muted">
                        <tr className="border-b border-border">
                            <SortTh sortKey="name" sort={sort} onToggle={toggle} className={th}>Volume</SortTh>
                            <SortTh sortKey="pool" sort={sort} onToggle={toggle} className={th}>Pool</SortTh>
                            <SortTh sortKey="cap" sort={sort} onToggle={toggle} className={th}>Capacity</SortTh>
                            <SortTh sortKey="free" sort={sort} onToggle={toggle} className={th}>Free</SortTh>
                            <SortTh sortKey="snaps" sort={sort} onToggle={toggle} className={th}>Snapshots</SortTh>
                            <SortTh sortKey="comp" sort={sort} onToggle={toggle} className={th}>Efficiency</SortTh>
                            <SortTh sortKey="ip" sort={sort} onToggle={toggle} className={th}>Access</SortTh>
                            {showGroups && <SortTh sortKey="groups" sort={sort} onToggle={toggle} className={`${th} min-w-[210px]`}>Groups</SortTh>}
                            <th className={`${th} text-right`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sorted.map((vol) => {
                            const pend = pending[vol.name] || {};
                            const removed = Boolean(pend.remove);
                            return (
                                <tr key={vol.name} className={`transition-colors ${removed ? 'bg-danger-50/60' : 'hover:bg-gray-50/60'}`}>
                                    <td className="px-2.5 py-1">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                                <Icon size={14} />
                                            </div>
                                            <span className={`text-sm font-semibold ${removed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{vol.name.split('_')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="px-2.5 py-1">
                                        <span className="text-xs font-medium text-gray-600">{poolLabel(vol.pool)}</span>
                                    </td>
                                    <td className="px-2.5 py-1"><CapacityBar vol={vol} /></td>
                                    <td className="px-2.5 py-1 text-sm text-gray-700">{fmtGB(volumeNumbers(vol).free)}</td>
                                    <td className="px-2.5 py-1 text-sm text-gray-700">{fmtGB((parseFloat(vol.usedbysnapshots) || 0) / 1024)}</td>
                                    <td className="px-2.5 py-1"><EfficiencyCell vol={vol} /></td>
                                    <td className="px-2.5 py-1">
                                        <AddressCell vol={vol} pend={pend} onStage={(c) => stage(vol.name, c)} onRevert={(k) => unstage(vol.name, k)} />
                                    </td>
                                    {showGroups && (
                                        <td className="px-2.5 py-1">
                                            <GroupsCell vol={vol} groups={groups} pend={pend} onStage={(c) => stage(vol.name, c)} onRevert={(k) => unstage(vol.name, k)} />
                                        </td>
                                    )}
                                    <td className="px-2.5 py-1 text-right">
                                        {removed ? (
                                            <button
                                                type="button"
                                                onClick={() => unstage(vol.name, ['remove'])}
                                                title="Keep this volume (take back the deletion)"
                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-danger-100 bg-danger-50 text-danger-600 transition-colors hover:bg-danger-100"
                                            >
                                                <RotateCcw size={14} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => stage(vol.name, { remove: true })}
                                                title="Delete this volume"
                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-50 text-gray-400 transition-colors hover:border hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {filtering && sorted.length === 0 && volumes.length > 0 && (
                            <tr><td colSpan={cols} className="py-6 text-center text-sm text-gray-500">No rows match the search</td></tr>
                        )}
                    </tbody>
                </table>
                {volumes.length === 0 && (
                    <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                            <FolderOpen size={18} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">{emptyText}</p>
                    </div>
                )}
            </div>

            <SubmitBar count={pendingCount} onSubmit={handleSubmit} onCancel={() => setPending({})} status={queueStatus} busy={busy} />
        </Panel>
    );
};

export default ShareList;
