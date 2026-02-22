import React, { useState, useEffect, useCallback } from 'react';
import { fetchUserList, fetchGroupList, addUser, deleteUser, updateUserGroups, changePassword } from './api/users';
import { fetchPoolsInfo } from './api/pools';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';

const QUsers = () => {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Password Modal State
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, username: '', password: '', confirmPassword: '' });

    const loadData = useCallback(async () => {
        try {
            const [userRes, groupRes, poolRes] = await Promise.all([
                fetchUserList(),
                fetchGroupList(),
                fetchPoolsInfo()
            ]);

            if (userRes.data?.allusers) setUsers(userRes.data.allusers);
            if (groupRes.data?.results) setGroups(groupRes.data.results);
            if (poolRes.data?.results) setPools(poolRes.data.results);

        } catch (err) {
            console.error("Failed to load users data", err);
            setError("Failed to sync with server");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000); // Polling every 5s
        return () => clearInterval(interval);
    }, [loadData]);

    const handleAddUser = async (userData) => {
        try {
            await addUser(userData);
            await loadData();
            // Show success toast (assuming parent or global handles this)
        } catch (e) {
            console.error("Add user failed", e);
        }
    };

    const handleDeleteUser = async (name) => {
        if (!window.confirm(`Are you sure you want to delete user ${name}?`)) return;
        try {
            await deleteUser(name);
            await loadData();
        } catch (e) {
            console.error("Delete user failed", e);
        }
    };

    const handleUpdateGroups = async (name, groupString) => {
        try {
            await updateUserGroups(name, groupString);
            await loadData();
        } catch (e) {
            console.error("Update groups failed", e);
        }
    };

    const handleOpenPasswordModal = (username) => {
        setPasswordModal({ isOpen: true, username, password: '', confirmPassword: '' });
    };

    const handleSavePassword = async () => {
        if (passwordModal.password !== passwordModal.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await changePassword(passwordModal.username, passwordModal.password);
            setPasswordModal({ ...passwordModal, isOpen: false });
        } catch (e) {
            console.error("Change password failed", e);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">User Management</h1>
                                <p className="text-gray-500 mt-2 font-medium">Manage system accounts, permissions, and storage quotas</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={loadData} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-xl font-medium shadow-sm transition-all flex items-center">
                                    <i className="fas fa-sync-alt mr-2 opacity-70"></i> Sync Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content px-4">
                    <div className="container-fluid space-y-8">
                        {/* Add User Section */}
                        <AddUserForm
                            pools={pools}
                            groups={groups}
                            onAdd={handleAddUser}
                        />

                        {/* User List Section */}
                        <UserList
                            users={users}
                            groups={groups}
                            onUpdateGroups={handleUpdateGroups}
                            onChangePassword={handleOpenPasswordModal}
                            onDelete={handleDeleteUser}
                        />
                    </div>
                </div>

                {/* Password Change Modal */}
                {passwordModal.isOpen && (
                    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-all duration-300">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                                <h4 className="text-xl font-bold text-gray-800">Change Password</h4>
                                <button
                                    onClick={() => setPasswordModal({ ...passwordModal, isOpen: false })}
                                    className="text-gray-400 hover:text-gray-600 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="p-7 space-y-6">
                                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-blue-800 font-medium">
                                    Updating password for: <span className="font-bold underline decoration-blue-300 underline-offset-4">{passwordModal.username}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl text-gray-800 px-4 py-3.5 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all outline-none"
                                        placeholder="Enter new password"
                                        value={passwordModal.password}
                                        onChange={(e) => setPasswordModal({ ...passwordModal, password: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl text-gray-800 px-4 py-3.5 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all outline-none"
                                        placeholder="Confirm new password"
                                        value={passwordModal.confirmPassword}
                                        onChange={(e) => setPasswordModal({ ...passwordModal, confirmPassword: e.target.value })}
                                    />
                                </div>
                                {passwordModal.password && passwordModal.confirmPassword && passwordModal.password !== passwordModal.confirmPassword && (
                                    <p className="text-rose-500 text-xs mt-2 font-semibold flex items-center gap-1">
                                        <i className="fas fa-exclamation-circle"></i> Passwords do not match
                                    </p>
                                )}
                            </div>
                            <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-4 rounded-b-2xl">
                                <button
                                    className="px-6 py-2.5 text-gray-500 hover:text-gray-700 transition-colors font-bold"
                                    onClick={() => setPasswordModal({ ...passwordModal, isOpen: false })}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`px-8 py-2.5 rounded-xl font-bold transition-all duration-300 ${passwordModal.password && passwordModal.password === passwordModal.confirmPassword
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={!passwordModal.password || passwordModal.password !== passwordModal.confirmPassword}
                                    onClick={handleSavePassword}
                                >
                                    Save Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QUsers;
