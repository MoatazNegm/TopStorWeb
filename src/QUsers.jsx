import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertCircle, KeyRound, RefreshCw, X } from 'lucide-react';
import { fetchUserList, fetchGroupList, addUser, deleteUser, updateUserGroups, changePassword, changeUserHome } from './api/users';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';

const QUsers = () => {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [pools, setPools] = useState([]);
    // address / quota submitted from the list, shown until the list is loaded again
    const [localEdits, setLocalEdits] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const firstLoadRef = useRef(true);
    const pollTimer = useRef(null);

    const [passwordModal, setPasswordModal] = useState({
        isOpen: false,
        username: '',
        password: '',
        confirmPassword: '',
    });

    const loadData = useCallback(async () => {
        try {
            const [userRes, groupRes, poolRes] = await Promise.all([fetchUserList(), fetchGroupList(), fetchPoolsInfo()]);

            if (userRes.data?.allusers) setUsers(userRes.data.allusers);
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

    // A change for several users is a queue of single requests through the API, one after the other.
    const [queueStatus, setQueueStatus] = useState('');
    const runQueue = async (label, names, action) => {
        let done = 0;
        let skipped = 0;
        const failed = [];
        for (const name of names) {
            setQueueStatus(`${label}: ${done + skipped + failed.length + 1} of ${names.length} (${name})`);
            try {
                const outcome = await action(name);
                if (outcome === 'skipped') skipped += 1; else done += 1;
            } catch (err) {
                console.error(`${label} failed for ${name}`, err);
                failed.push(name);
            }
        }
        await loadData();
        setQueueStatus(`${label}: ${done} done${skipped ? `, ${skipped} skipped (no home folder)` : ''}${failed.length ? `, ${failed.length} failed (${failed.join(', ')})` : ''}`);
        setTimeout(() => setQueueStatus(''), 8000);
    };

    // Submit of the users list: one request per changed user, one after the other.
    //   deletion         -> the delete call (the other changes of that user are dropped)
    //   groups           -> the group-change call
    //   address / quota  -> changeUserHome (api/v1/users/userhomechange, backend added separately); only users with a home folder
    const handleSubmitChanges = async (pending) => {
        const names = Object.keys(pending);
        if (names.length === 0) return true;
        const removing = names.filter((name) => pending[name].remove);
        if (removing.length > 0 && !window.confirm(`Delete ${removing.length} user${removing.length === 1 ? '' : 's'}: ${removing.join(', ')}?`)) return false;
        await runQueue('Submitting', names, async (name) => {
            const change = pending[name];
            if (change.remove) {
                await deleteUser(name);
                return 'done';
            }
            const user = users.find((u) => u.name === name);
            let applied = false;
            let skipped = false;
            if (change.groups !== undefined) {
                await updateUserGroups(name, change.groups);
                applied = true;
            }
            if (change.address !== undefined || change.quota !== undefined) {
                if (!user || (user.Volpool || user.pool) === 'NoHome') {
                    skipped = true;
                } else {
                    const fields = {};
                    if (change.address !== undefined) { fields.HomeAddress = change.address; fields.HomeSubnet = change.subnet; }
                    if (change.quota !== undefined) fields.Volsize = change.quota;
                    await changeUserHome(name, fields);
                    handleUpdateUser(name, fields); // shown at once; the next load of the list brings the server's value
                    applied = true;
                }
            }
            return applied || !skipped ? 'done' : 'skipped';
        });
        return true;
    };

    // what was submitted for address/quota is shown at once; it is dropped as soon as the server's data for that user changes
    const handleUpdateUser = (name, changes) => {
        const serverUser = users.find((u) => u.name === name);
        setLocalEdits((prev) => ({
            ...prev,
            [name]: { fields: { ...(prev[name]?.fields || {}), ...changes }, base: prev[name]?.base || JSON.stringify(serverUser) },
        }));
    };
    useEffect(() => {
        setLocalEdits((prev) => {
            const names = Object.keys(prev).filter((name) => {
                const serverUser = users.find((u) => u.name === name);
                return serverUser && JSON.stringify(serverUser) === prev[name].base;
            });
            return names.length === Object.keys(prev).length ? prev : Object.fromEntries(names.map((n) => [n, prev[n]]));
        });
    }, [users]);



    const handleAddUser = async (userData) => {
        try {
            const res = await addUser(userData);
            // the backend applies the same rules as the form; if it still refuses, say why
            const status = res?.data?.adduser || '';
            if (status.startsWith('rejected')) {
                setError(`User ${userData.name} was not created: ${status.replace(/^rejected:\s*/, '')}.`);
            } else {
                setError(null);
            }
            await loadData();
        } catch (err) {
            console.error('Add user failed', err);
            setError('The user could not be created: no answer from the server.');
        }
    };

    const handleDeleteUser = async (name) => {
        if (!window.confirm(`Are you sure you want to delete user ${name}?`)) return;
        try {
            await deleteUser(name);
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
                                <AddUserForm pools={pools} groups={groups} users={users} onAdd={handleAddUser} />
                                <UserList
                                    users={users.map((user) => (localEdits[user.name] ? { ...user, ...localEdits[user.name].fields } : user))}
                                    groups={groups}
                                    onChangePassword={handleOpenPasswordModal}
                                    onSubmit={handleSubmitChanges}
                                    queueStatus={queueStatus}
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

