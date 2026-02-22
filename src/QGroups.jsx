import React, { useState, useEffect, useCallback } from 'react';
import { fetchGroupList, fetchUserOptions, addGroup, deleteGroup, updateGroupUsers } from './api/groups';
import AddGroupForm from './components/AddGroupForm';
import GroupList from './components/GroupList';

const QGroups = () => {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 2000); // Polling every 2s to match legacy
        return () => clearInterval(interval);
    }, [loadData]);

    const handleAddGroup = async (groupData) => {
        try {
            await addGroup(groupData);
            await loadData();
        } catch (e) {
            console.error("Add group failed", e);
        }
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
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Groups Management</h1>
                                <p className="text-gray-500 mt-2 font-medium">Manage system groups, permissions, and directory memberships</p>
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
                        {/* Add Group Section */}
                        <AddGroupForm
                            users={users}
                            onAdd={handleAddGroup}
                        />

                        {/* Group List Section */}
                        <GroupList
                            groups={groups}
                            users={users}
                            onUpdateMembers={handleUpdateMembers}
                            onDelete={handleDeleteGroup}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QGroups;
