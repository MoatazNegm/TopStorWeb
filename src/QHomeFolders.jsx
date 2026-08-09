import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Plus, RefreshCw } from 'lucide-react';
import { fetchVolumesInfo, fetchUserList, createVolume, updateVolume, deleteVolume, fetchVolumeStats } from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import HomeFoldersList from './components/HomeFoldersList';
import VolumeInsights from './components/VolumeInsights';

const QHomeFolders = () => {
    const [volumes, setVolumes] = useState([]);
    const [pools, setPools] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        pool: '',
        userIndex: '',
        size: 1,
        ipaddress: '',
        Subnet: 24,
    });

    const loadData = useCallback(async () => {
        try {
            const [volsRes, poolsRes, usersRes, statsRes] = await Promise.all([
                fetchVolumesInfo('HOME'),
                fetchPoolsInfo(),
                fetchUserList(),
                fetchVolumeStats().catch(() => ({ data: {} }))
            ]);

            setVolumes(volsRes.data.allvolumes || []);
            setPools(poolsRes.data.results || []);
            setUsers(usersRes.data.usersnohome || []);
            setStats(statsRes.data);
        } catch (err) {
            console.error("Failed to load Home Folders data", err);
            setError("Failed to synchronize with volumes API");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, [loadData]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const poolObj = pools[formData.pool];
            const userObj = users[formData.userIndex];
            const payload = {
                type: 'HOME',
                pool: poolObj.text,
                name: userObj.text,
                ipaddress: formData.ipaddress,
                Subnet: formData.Subnet,
                groups: userObj.text,
                Myname: 'mezo',
                size: `${formData.size}G`,
                owner: poolObj.owner,
                active: 'Yes',
            };

            await createVolume(payload);
            setFormData({
                pool: '',
                userIndex: '',
                size: 1,
                ipaddress: '',
                Subnet: 24
            });
            loadData();
        } catch (err) {
            setError("Failed to create home folder");
        }
    };

    const handleUpdate = async (volName, values) => {
        try {
            await updateVolume({
                volume: volName,
                type: 'HOME',
                ...values
            });
            loadData();
        } catch (err) {
            setError("Failed to update volume");
        }
    };

    const handleDelete = async (volName) => {
        if (!window.confirm(`Are you sure you want to delete home folder for ${volName.split('_')[0]}?`)) return;
        try {
            await deleteVolume({ name: volName, type: 'HOME', user: 'mezo' });
            loadData();
        } catch (err) {
            setError("Failed to delete volume");
        }
    };

    return (
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Home Folders Management</h1>
                                <p className="mt-1 text-sm text-gray-500">User-specific private network storage</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={loadData}
                                    variant="secondary"
                                    size="icon"
                                    className="h-10 w-10"
                                    icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 flex items-center gap-3 rounded-xl border border-danger-100 bg-danger-50 p-4 text-sm font-medium text-danger-700">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {/* First Row: Form + Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Creation Form */}
                            <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <Plus size={14} />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">Provision New Home Folder</h3>
                                </div>

                                <form onSubmit={handleCreate} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <Dropdown
                                            label="Storage Pool"
                                            options={pools.map((p, idx) => ({ value: idx, label: p.text }))}
                                            value={formData.pool}
                                            placeholder="Select Pool..."
                                            onChange={(val) => setFormData({ ...formData, pool: val })}
                                        />
                                        <Dropdown
                                            label="Assign To User"
                                            options={users.map((u, idx) => ({ value: idx, label: u.text }))}
                                            value={formData.userIndex}
                                            placeholder="Select User..."
                                            onChange={(val) => setFormData({ ...formData, userIndex: val })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <Input
                                            label="Size (GB)"
                                            type="number"
                                            min="1"
                                            required
                                            value={formData.size}
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                        />
                                        <div className="col-span-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    label="IP Address"
                                                    required
                                                    placeholder="10.0.0.50"
                                                    value={formData.ipaddress}
                                                    onChange={(e) => setFormData({ ...formData, ipaddress: e.target.value })}
                                                />
                                                <Input
                                                    label="Subnet"
                                                    type="number"
                                                    min="8" max="32" step="8"
                                                    required
                                                    value={formData.Subnet}
                                                    onChange={(e) => setFormData({ ...formData, Subnet: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="px-6"
                                            onClick={handleCreate}
                                        >
                                            Create Home Folder
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <VolumeInsights volumes={volumes} />
                        </div>

                        {/* Second Row: List */}
                        <div className="w-full">
                            <HomeFoldersList
                                volumes={volumes}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                </div>
    );
};

export default QHomeFolders;
