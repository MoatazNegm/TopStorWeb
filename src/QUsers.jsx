import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertCircle, KeyRound, RefreshCw, X } from 'lucide-react';
import { fetchUserList, fetchGroupList, addUser, deleteUser, updateUserGroups, changePassword } from './api/users';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';

// Optimistic "creating" entries that never get resolved by the server
// (e.g. duplicate name) are dropped after this delay.
const PENDING_TTL_MS = 60_000;

const QUsers = () => {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const firstLoadRef = useRef(true);
    const pollTimer = useRef(null);
    // Names that have been observed in the real list at least once. Once a name
    // is here, the optimistic "creating" entry for that name can never come back,
    // even if a stale poll response temporarily drops the real entry.
    const seenUserNamesRef = useRef(new Set());

    const [passwordModal, setPasswordModal] = useState({
        isOpen: false,
        username: '',
        password: '',
        confirmPassword: '',
    });

    const loadData = useCallback(async () => {
        try {
            const [userRes, groupRes, poolRes] = await Promise.all([fetchUserList(), fetchGroupList(), fetchPoolsInfo()]);

            if (userRes.data?.allusers) {
                const realUsers = userRes.data.allusers;
                // Mark every name currently visible in the real list as
                // "resolved", so a stale response from a parallel poll chain
                // can never resurrect an already-resolved pending entry.
                realUsers.forEach((u) => seenUserNamesRef.current.add(u.name));

                setUsers((prev) => {
                    const stillPending = prev.filter(
                        (u) => u._isPending && !seenUserNamesRef.current.has(u.name)
                    );
                    return [...stillPending, ...realUsers];
                });
            }
            if (groupRes.data?.results) setGroups(groupRes.data.results);
            if (poolRes.data?.results) setPools(poolRes.data.results);

        } catch (err) {
            console.error('Failed to load users data', err);
            setError('Failed to sync with server');
        } finally {
            if (firstLoadRef.current) {
                firstLoadRef.current = false;
                setLoading(false);
            }
            // Cancel any existing timer so only one polling chain stays alive.
            // Without this, handleAddUser's await loadData() creates a second
            // concurrent chain whose out-of-order responses can flicker the UI.
            if (pollTimer.current) clearTimeout(pollTimer.current);
            pollTimer.current = setTimeout(loadData, 5000);
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
            setUsers((prev) => {
                const filtered = prev.filter(
                    (u) =>
                        !u._isPending ||
                        !u._pendingSince ||
                        now - u._pendingSince <= PENDING_TTL_MS
                );
                // Return same reference when nothing changed to avoid re-renders.
                return filtered.length === prev.length ? prev : filtered;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleAddUser = async (userData) => {
        const tempId = `pending-user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const groupIds = (userData.groups || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        const pendingUser = {
            id: tempId,
            name: userData.name,
            Volpool: userData.Volpool,
            pool: userData.Volpool,
            Volsize: userData.Volsize,
            size: userData.Volsize,
            groups: groupIds,
            status: 'creating',
            _isPending: true,
            _pendingSince: Date.now(),
        };

        // Show the row immediately so the user has feedback before the
        // backend's async postchange / etcd write completes.
        setUsers((prev) => [pendingUser, ...prev]);

        try {
            await addUser(userData);
            // Kick an immediate refresh so the real entry shows up faster
            // than the next 5 s poll tick.
            await loadData();
        } catch (err) {
            console.error('Add user failed', err);
            // Allow a retry with the same name after a transient failure
            seenUserNamesRef.current.delete(userData.name);
            setUsers((prev) => prev.filter((u) => u.id !== tempId));
        }
    };

    const handleDeleteUser = async (name) => {
        if (!window.confirm(`Are you sure you want to delete user ${name}?`)) return;
        try {
            await deleteUser(name);
            // Clear the resolved flag so the same name can be re-created
            seenUserNamesRef.current.delete(name);
            await loadData();
        } catch (err) {
            console.error('Delete user failed', err);
        }
    };

    const handleUpdateGroups = async (name, groupString) => {
        try {
            await updateUserGroups(name, groupString);
            await loadData();
        } catch (err) {
            console.error('Update groups failed', err);
        }
    };

    const handleOpenPasswordModal = (username) => {
        setPasswordModal({ isOpen: true, username, password: '', confirmPassword: '' });
    };

    const handleSavePassword = async () => {
        if (passwordModal.password !== passwordModal.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await changePassword(passwordModal.username, passwordModal.password);
            setPasswordModal((prev) => ({ ...prev, isOpen: false }));
        } catch (err) {
            console.error('Change password failed', err);
        }
    };

    const passwordMismatch =
        passwordModal.password &&
        passwordModal.confirmPassword &&
        passwordModal.password !== passwordModal.confirmPassword;

    return (
        <>
            <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">User Management</h1>
                                <p className="mt-1 text-sm text-gray-500">Manage system accounts, permissions, and storage quotas</p>
                            </div>
                            <Button onClick={loadData} variant="secondary" icon={<RefreshCw size={15} />}>
                                    Sync Now
                                </Button>
                        </div>
                    </div>
                </div>

                <div className="content px-4 pb-8">
                    <div className="container-fluid space-y-6">
                        {error && (
                            <div className="rounded-lg border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="rounded-lg border border-border bg-surface px-4 py-6 text-sm text-gray-500">Loading users...</div>
                        ) : (
                            <>
                                <AddUserForm pools={pools} groups={groups} onAdd={handleAddUser} />
                                <UserList
                                    users={users}
                                    groups={groups}
                                    onUpdateGroups={handleUpdateGroups}
                                    onChangePassword={handleOpenPasswordModal}
                                    onDelete={handleDeleteUser}
                                />
                            </>
                        )}
                    </div>
                </div>

                {passwordModal.isOpen && (
                    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
                            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <KeyRound size={18} />
                                    </span>
                                    <h4 className="text-base font-semibold text-gray-800">Change Password</h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setPasswordModal((prev) => ({ ...prev, isOpen: false }))}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="rounded-md border border-brand-100 bg-brand-50 px-3.5 py-2.5 text-sm text-brand-800">
                                    Updating password for <span className="font-semibold">{passwordModal.username}</span>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                        placeholder="Enter new password"
                                        value={passwordModal.password}
                                        onChange={(event) =>
                                            setPasswordModal((prev) => ({ ...prev, password: event.target.value }))
                                        }
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                        placeholder="Confirm new password"
                                        value={passwordModal.confirmPassword}
                                        onChange={(event) =>
                                            setPasswordModal((prev) => ({ ...prev, confirmPassword: event.target.value }))
                                        }
                                    />
                                </div>

                                {passwordMismatch && (
                                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-danger-600">
                                        <AlertCircle size={14} />
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 border-t border-border bg-surface-muted px-5 py-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    onClick={() => setPasswordModal((prev) => ({ ...prev, isOpen: false }))}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    disabled={!passwordModal.password || passwordMismatch}
                                    onClick={handleSavePassword}
                                >
                                    Save Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default QUsers;

