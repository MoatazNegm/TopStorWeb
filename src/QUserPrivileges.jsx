import React, { useState, useEffect, useCallback } from 'react';
import {
    AlertTriangle,
    BarChart3,
    Camera,
    Check,
    ClipboardList,
    Database,
    FolderHome,
    HardDrive,
    Layers,
    Linux,
    Network,
    RefreshCw,
    Server,
    Shield,
    Share2,
    Upload,
    UserCog,
    Users,
} from 'lucide-react';
import { fetchUserList, updateUserPrivileges } from './api/users';
import Button from './components/Common/Button';
import Dropdown from './components/Common/Dropdown';

const QUserPrivileges = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [privileges, setPrivileges] = useState({});
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const privilegeList = [
        { id: 'Active_Directory', label: 'Active Directory', icon: Network },
        { id: 'Service_Charts', label: 'Performance Charts', icon: BarChart3 },
        { id: 'NFS', label: 'NFS', icon: Linux },
        { id: 'SnapShots', label: 'Snapshots', icon: Camera },
        { id: 'Box_Users', label: 'Users & Groups', icon: Users },
        { id: 'Logs', label: 'Logs', icon: ClipboardList },
        { id: 'UserPrivilegesch', label: 'User Privileges', icon: Shield },
        { id: 'Cluster', label: 'Cluster Nodes', icon: Server },
        { id: 'Error', label: 'Node Config.', icon: AlertTriangle },
        { id: 'CIFS', label: 'CIFS', icon: Share2 },
        { id: 'DiskGroups', label: 'Disk Groups', icon: Layers },
        { id: 'Partners', label: 'Partners', icon: Users },
        { id: 'Senders', label: 'Senders', icon: Upload },
        { id: 'Replication', label: 'Replication', icon: RefreshCw },
        { id: 'Uploadch', label: 'Firmware', icon: Upload },
        { id: 'HOME', label: 'Home Folders', icon: FolderHome },
        { id: 'ISCSI', label: 'ISCSI LUNs', icon: HardDrive },
    ];

    const syncUserPrivileges = useCallback((users, userId) => {
        if (userId === null || !users[userId]) return;
        const userAuths = users[userId].priv || [];
        const newPrivs = {};
        privilegeList.forEach(p => {
            newPrivs[p.id] = userAuths.includes(`${p.id}-true`);
        });
        setPrivileges(newPrivs);
    }, []);

    const loadUsers = useCallback(async (isInitial = false) => {
        try {
            const res = await fetchUserList();
            const users = res.data.allusers || [];

            // Check for changes before updating state to avoid re-renders
            if (JSON.stringify(users.map(u => ({ n: u.name, p: u.priv }))) !==
                JSON.stringify(allUsers.map(u => ({ n: u.name, p: u.priv })))) {
                setAllUsers(users);

                if (isInitial && users.length > 0) {
                    setSelectedUserId(0);
                    syncUserPrivileges(users, 0);
                } else if (selectedUserId !== null) {
                    syncUserPrivileges(users, selectedUserId);
                }
            }
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            if (isInitial) setLoading(false);
        }
    }, [allUsers, selectedUserId, syncUserPrivileges]);

    useEffect(() => {
        loadUsers(true);
        const interval = setInterval(() => loadUsers(), 2000);
        return () => clearInterval(interval);
    }, [loadUsers]);

    const handleUserChange = (val) => {
        setSelectedUserId(val);
        syncUserPrivileges(allUsers, val);
    };

    const togglePrivilege = (id) => {
        setPrivileges(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleUpdate = async () => {
        if (selectedUserId === null || !allUsers[selectedUserId]) return;

        setUpdating(true);
        setMessage({ text: '', type: '' });

        try {
            const authString = privilegeList
                .map(p => `${p.id}-${privileges[p.id] || false}`)
                .join(',');

            await updateUserPrivileges(allUsers[selectedUserId].name, authString);
            setMessage({ text: 'Privileges updated successfully', type: 'success' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (err) {
            console.error("Update failed", err);
            setMessage({ text: 'Failed to update privileges', type: 'error' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="content-wrapper">
                <div className="floating-canvas">
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
                    </div>
                </div>
            </div>
        );
    }

    const dropdownOptions = allUsers.map((u, i) => ({ label: u.name, value: i }));

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">User Privileges</h1>
                                <p className="mt-1 text-sm text-gray-500">Define precise administrative access for system operators</p>
                            </div>
                            <Button onClick={() => loadUsers()} variant="secondary" icon={<RefreshCw size={15} />}>
                                Sync Now
                            </Button>
                        </div>

                        <div className="mt-6 rounded-lg border border-border bg-surface p-5">
                            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <UserCog size={17} />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">Privilege Manifest</h3>
                                </div>
                                <div className="w-full md:w-72">
                                    <Dropdown
                                        label="Operating Identity"
                                        options={dropdownOptions}
                                        value={selectedUserId}
                                        onChange={handleUserChange}
                                        placeholder="Select user"
                                    />
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {privilegeList.map((p) => (
                                    <button
                                        type="button"
                                        key={p.id}
                                        onClick={() => togglePrivilege(p.id)}
                                        className={`group flex items-center gap-3 rounded-md border px-3.5 py-3 text-left transition-colors ${privileges[p.id]
                                            ? 'border-brand-600 bg-brand-600 text-white'
                                            : 'border-border bg-surface-muted text-gray-700 hover:border-brand-100 hover:bg-surface'
                                            }`}
                                    >
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${privileges[p.id] ? 'bg-white/20 text-white' : 'bg-surface text-brand-600'
                                            }`}>
                                            <p.icon size={15} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-xs font-semibold uppercase tracking-wide ${privileges[p.id] ? 'text-white' : 'text-gray-600'}`}>
                                                {p.label}
                                            </p>
                                        </div>
                                        <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${privileges[p.id] ? 'border-white bg-white text-brand-600' : 'border-border bg-surface-muted text-transparent'
                                            }`}>
                                            <Check size={10} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-4">
                                    {message.text && (
                                        <div className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium ${message.type === 'success' ? 'border-success-100 bg-success-50 text-success-600' : 'border-danger-100 bg-danger-50 text-danger-600'
                                            }`}>
                                            {message.type === 'success' ? <Check size={14} /> : <AlertTriangle size={14} />}
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                                <Button
                                    onClick={handleUpdate}
                                    disabled={updating || selectedUserId === null}
                                    className="w-full sm:w-auto"
                                    icon={updating ? <RefreshCw size={14} className="animate-spin" /> : <Shield size={14} />}
                                >
                                    {updating ? 'Syncing...' : 'Update Privileges'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QUserPrivileges;
