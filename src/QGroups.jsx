import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { fetchGroupList, fetchUserOptions, addGroup, deleteGroup, updateGroupUsers } from './api/groups';
import Button from './components/Common/Button';
import AddGroupForm from './components/AddGroupForm';
import GroupList from './components/GroupList';

const QGroups = () => {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const firstLoadRef = useRef(true);
    const pollTimer = useRef(null);

    const loadData = useCallback(async () => {
        try {
            const [groupRes, userRes] = await Promise.all([
                fetchGroupList(),
                fetchUserOptions()
            ]);

            if (groupRes.data?.allgroups) setGroups(groupRes.data.allgroups);
            if (userRes.data?.results) setUsers(userRes.data.results);

        } catch (err) {
            console.error("Failed to load groups data", err);
            setError("Failed to sync with server");
        } finally {
            if (firstLoadRef.current) {
                firstLoadRef.current = false;
                setLoading(false);
            }
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

    const handleAddGroup = async (groupData) => {
        try {
            await addGroup(groupData);
            await loadData();
        } catch (e) {
            console.error("Add group failed", e);
        }
    };

    // Submit of the groups list: one request per changed group, one after the other (a deleted group is only deleted).
    const [queueStatus, setQueueStatus] = useState('');
    const handleSubmitChanges = async (pending) => {
        const names = Object.keys(pending);
        if (names.length === 0) return true;
        const removing = names.filter((name) => pending[name].remove);
        if (removing.length > 0 && !window.confirm(`Delete ${removing.length} group${removing.length === 1 ? '' : 's'}: ${removing.join(', ')}?`)) return false;
        let done = 0;
        const failed = [];
        for (const name of names) {
            setQueueStatus(`Submitting: ${done + failed.length + 1} of ${names.length} (${name})`);
            try {
                if (pending[name].remove) await deleteGroup(name);
                else await updateGroupUsers(name, pending[name].members.join(','));
                done += 1;
            } catch (e) {
                console.error(`Group ${name} failed`, e);
                failed.push(name);
            }
        }
        await loadData();
        setQueueStatus(`Submitting: ${done} done${failed.length ? `, ${failed.length} failed (${failed.join(', ')})` : ''}`);
        setTimeout(() => setQueueStatus(''), 8000);
        return true;
    };

    const handleDeleteGroup = async (name) => {
        if (!window.confirm(`Are you sure you want to delete group ${name}?`)) return;
        try {
            await deleteGroup(name);
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
                                onSubmit={handleSubmitChanges}
                                queueStatus={queueStatus}
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

