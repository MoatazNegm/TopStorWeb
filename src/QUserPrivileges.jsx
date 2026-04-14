import React, { useState, useEffect, useCallback } from 'react';
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
        { id: 'Active_Directory', label: 'Active Directory', icon: 'fab fa-windows' },
        { id: 'Service_Charts', label: 'Performance Charts', icon: 'far fa-chart-bar' },
        { id: 'NFS', label: 'NFS', icon: 'fab fa-linux' },
        { id: 'SnapShots', label: 'Snapshots', icon: 'fas fa-camera' },
        { id: 'Box_Users', label: 'Users & Groups', icon: 'fas fa-users' },
        { id: 'Logs', label: 'Logs', icon: 'fas fa-clipboard-list' },
        { id: 'UserPrivilegesch', label: 'User Privileges', icon: 'fas fa-unlock-alt' },
        { id: 'Cluster', label: 'Cluster Nodes', icon: 'fas fa-server' },
        { id: 'Error', label: 'Node Config.', icon: 'fas fa-exclamation-triangle' },
        { id: 'CIFS', label: 'CIFS', icon: 'fab fa-windows' },
        { id: 'DiskGroups', label: 'Disk Groups', icon: 'fas fa-database' },
        { id: 'Partners', label: 'Partners', icon: 'fas fa-hands-helping' },
        { id: 'Senders', label: 'Senders', icon: 'fab fa-perbyte' },
        { id: 'Replication', label: 'Replication', icon: 'far fa-clone' },
        { id: 'Uploadch', label: 'Firmware', icon: 'fas fa-pen-fancy' },
        { id: 'HOME', label: 'Home Folders', icon: 'fas fa-house-user' },
        { id: 'ISCSI', label: 'ISCSI LUNs', icon: 'fas fa-database' },
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
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const dropdownOptions = allUsers.map((u, i) => ({ label: u.name, value: i }));

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Granular User Privileges Management</h1>
                                <p className="text-gray-500 mt-1 font-medium">Define precise administrative access for system operators</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => loadUsers()}
                                    bgColor="bg-white"
                                    textColor="text-gray-400"
                                    className="border border-gray-100 hover:text-blue-500 rounded-xl shadow-sm transition-all"
                                    icon={<i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative group">
                            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-3xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                        <i className="fas fa-shield-alt text-xs"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">Privilege Manifest</h3>
                                </div>
                                <div className="w-full md:w-72">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Operating Identity</label>
                                    <Dropdown
                                        options={dropdownOptions}
                                        value={selectedUserId}
                                        onChange={handleUserChange}
                                        placeholder="Select User..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                                {privilegeList.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => togglePrivilege(p.id)}
                                        className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 ${privileges[p.id]
                                            ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-100'
                                            : 'bg-gray-50/50 border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-sm'
                                            }`}
                                    >
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${privileges[p.id] ? 'bg-white/20' : 'bg-white group-hover:bg-indigo-50'
                                            }`}>
                                            <i className={`${p.icon} text-sm ${privileges[p.id] ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'}`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-[11px] font-black uppercase tracking-wider ${privileges[p.id] ? 'text-white' : 'text-gray-600'}`}>
                                                {p.label}
                                            </p>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${privileges[p.id] ? 'bg-white border-white' : 'border-gray-200 bg-white'
                                            }`}>
                                            {privileges[p.id] && <i className="fas fa-check text-[8px] text-indigo-600"></i>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-4">
                                    {message.text && (
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold animate-in fade-in slide-in-from-left-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                                            }`}>
                                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                                <Button
                                    onClick={handleUpdate}
                                    disabled={updating || selectedUserId === null}
                                    bgColor="bg-indigo-600"
                                    className="w-full sm:w-auto px-8 py-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3"
                                >
                                    {updating ? (
                                        <>
                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Syncing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-cloud-upload-alt text-[10px]"></i>
                                            Update Privileges
                                        </>
                                    )}
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
