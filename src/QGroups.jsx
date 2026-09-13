import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { fetchGroupList, fetchUserOptions, addGroup, deleteGroup, updateGroupUsers } from './api/groups';
import Button from './components/Common/Button';
import AddGroupForm from './components/AddGroupForm';
import GroupList from './components/GroupList';

// Optimistic "creating" entries that never get resolved by the server (e.g. duplicate name)
// are dropped automatically after this delay so the UI doesn't get stuck.
const PENDING_TTL_MS = 60_000;

const QGroups = () => {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const firstLoadRef = useRef(true);
    const pollTimer = useRef(null);
    // Names that have been observed in the real list at least once. Once a name
    // is here, the optimistic "creating" entry for that name can never come back,
    // even if a stale poll response temporarily drops the real entry.
    const seenGroupNamesRef = useRef(new Set());

    const loadData = useCallback(async () => {
        try {
            const [groupRes, userRes] = await Promise.all([
                fetchGroupList(),
                fetchUserOptions()
            ]);

            if (groupRes.data?.allgroups) {
                const realGroups = groupRes.data.allgroups;
                // Mark every name currently visible in the real list as
                // "resolved", so a stale response from a parallel poll chain
                // can never resurrect an already-resolved pending entry.
                realGroups.forEach((g) => seenGroupNamesRef.current.add(g.name));

                setGroups((prev) => {
                    const stillPending = prev.filter(
                        (g) => g._isPending && !seenGroupNamesRef.current.has(g.name)
                    );
                    return [...stillPending, ...realGroups];
                });
            }
            if (userRes.data?.results) setUsers(userRes.data.results);

        } catch (err) {
            console.error("Failed to load groups data", err);
            setError("Failed to sync with server");
        } finally {
            if (firstLoadRef.current) {
                firstLoadRef.current = false;
                setLoading(false);
            }
            // Cancel any existing timer so only one polling chain stays alive.
            // Without this, handleAddGroup's await loadData() creates a second
            // concurrent chain whose out-of-order responses can flicker the UI.
            if (pollTimer.current) clearTimeout(pollTimer.current);
            pollTimer.current = setTimeout(loadData, 2000);
        }
    }, []);

    useEffect(() => {
        loadData();
        return () => {
            if (pollTimer.current) {
                clearTimeout(pollTimer.current);
                pollTimer.current = null;
            }
        };
    }, [loadData]);

    // Periodically prune pending entries that the backend never picked up.
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setGroups((prev) => {
                const filtered = prev.filter(
                    (g) =>
                        !g._isPending ||
                        !g._pendingSince ||
                        now - g._pendingSince <= PENDING_TTL_MS
                );
                // Return same reference when nothing changed to avoid re-renders.
                return filtered.length === prev.length ? prev : filtered;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleAddGroup = async (groupData) => {
        const tempId = `pending-group-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const memberIds = (groupData.users || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        const pendingGroup = {
            id: tempId,
            name: groupData.name,
            users: memberIds,
            status: 'creating',
            _isPending: true,
            _pendingSince: Date.now(),
        };

        // Show the row immediately so the user has feedback before the
        // backend's async postchange / etcd write completes.
        setGroups((prev) => [pendingGroup, ...prev]);

        try {
            await addGroup(groupData);
            // Kick an immediate refresh so the real entry shows up faster
            // than the next 2 s poll tick.
            await loadData();
        } catch (e) {
            console.error("Add group failed", e);
            // Allow a retry with the same name after a transient failure
            seenGroupNamesRef.current.delete(groupData.name);
            setGroups((prev) => prev.filter((g) => g.id !== tempId));
        }
    };

    const handleDeleteGroup = async (name) => {
        if (!window.confirm(`Are you sure you want to delete group ${name}?`)) return;
        try {
            await deleteGroup(name);
            // Clear the resolved flag so the same name can be re-created
            seenGroupNamesRef.current.delete(name);
            await loadData();
        } catch (e) {
            console.error("Delete group failed", e);
        }
    };

    const handleUpdateMembers = async (name, userString) => {
        try {
            await updateGroupUsers(name, userString);
            await loadData();
        } catch (e) {
            console.error("Update group members failed", e);
        }
    };

    return (
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Groups</h1>
                                <p className="mt-1 text-sm text-gray-500">Manage system groups, permissions, and directory memberships</p>
                            </div>
                            <Button onClick={loadData} variant="secondary" icon={<RefreshCw size={15} />}>
                                Sync Now
                            </Button>
                        </div>

                        <div className="mt-6 space-y-6">
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
                                    <AlertTriangle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <AddGroupForm
                                users={users}
                                onAdd={handleAddGroup}
                            />

                            <GroupList
                                groups={groups}
                                users={users}
                                onUpdateMembers={handleUpdateMembers}
                                onDelete={handleDeleteGroup}
                            />

                            {loading && (
                                <div className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-gray-500">
                                    Syncing groups...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    );
};

export default QGroups;

