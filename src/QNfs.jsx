import React, { useState, useEffect, useCallback } from 'react';
import { fetchVolumesInfo, fetchGroupList, createVolume, updateVolume, deleteVolume, fetchVolumeStats } from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import NfsList from './components/NfsList';
import VolumeInsights from './components/VolumeInsights';

const QNfs = () => {
    const [volumes, setVolumes] = useState([]);
    const [pools, setPools] = useState([]);
    const [groups, setGroups] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        pool: '',
        name: '',
        size: 1,
        ipaddress: '',
        Subnet: 24,
        groups: [],
        rootname: 'root',
        rootid: 0,
        groupname: 'root',
        groupid: 0,
        active: true
    });

    const loadData = useCallback(async () => {
        try {
            const [volsRes, poolsRes, groupsRes, statsRes] = await Promise.all([
                fetchVolumesInfo('NFS'),
                fetchPoolsInfo(),
                fetchGroupList(),
                fetchVolumeStats().catch(() => ({ data: {} }))
            ]);

            setVolumes(volsRes.data.allvolumes || []);
            setPools(poolsRes.data.results || []);
            setGroups(groupsRes.data.results || []);
            setStats(statsRes.data);
        } catch (err) {
            console.error("Failed to load NFS data", err);
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
            const payload = {
                type: 'NFS',
                pool: poolObj.text,
                name: formData.name,
                ipaddress: formData.ipaddress,
                Subnet: formData.Subnet,
                groups: formData.groups.join(','),
                Myname: 'mezo',
                size: `${formData.size}G`,
                owner: poolObj.owner,
                rootname: formData.rootname,
                rootid: formData.rootid,
                groupname: formData.groupname,
                groupid: formData.groupid,
                active: formData.active ? 'on' : 'off'
            };

            await createVolume(payload);
            setFormData({
                ...formData,
                pool: '',
                name: '',
                size: 1,
                groups: []
            });
            loadData();
        } catch (err) {
            setError("Failed to create volume");
        }
    };

    const handleUpdate = async (volName, values) => {
        try {
            await updateVolume({
                volume: volName,
                type: 'NFS',
                ...values
            });
            loadData();
        } catch (err) {
            setError("Failed to update volume");
        }
    };

    const handleDelete = async (volName) => {
        if (!window.confirm(`Are you sure you want to delete volume ${volName}?`)) return;
        try {
            await deleteVolume({ name: volName, type: 'NFS', user: 'mezo' });
            loadData();
        } catch (err) {
            setError("Failed to delete volume");
        }
    };

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-lg text-gray-500 font-medium tracking-tight">Unix-compatible network share administration</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={loadData}
                                    bgColor="bg-white"
                                    textColor="text-gray-400"
                                    className="border border-gray-100 hover:text-blue-500 rounded-xl"
                                    icon={<i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        {/* First Row: Form + Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Creation Form */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                        <i className="fas fa-plus text-xs"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">New Volume</h3>
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
                                        <Input
                                            label="Volume Name"
                                            required
                                            placeholder="Share name..."
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Root Name"
                                                required
                                                value={formData.rootname}
                                                onChange={(e) => setFormData({ ...formData, rootname: e.target.value })}
                                            />
                                            <Input
                                                label="Root ID"
                                                type="number"
                                                min="0"
                                                required
                                                value={formData.rootid}
                                                onChange={(e) => setFormData({ ...formData, rootid: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Group Name"
                                                required
                                                value={formData.groupname}
                                                onChange={(e) => setFormData({ ...formData, groupname: e.target.value })}
                                            />
                                            <Input
                                                label="Group ID"
                                                type="number"
                                                min="0"
                                                required
                                                value={formData.groupid}
                                                onChange={(e) => setFormData({ ...formData, groupid: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <Input
                                            label="IP Address"
                                            required
                                            placeholder="192.168.1.10"
                                            value={formData.ipaddress}
                                            onChange={(e) => setFormData({ ...formData, ipaddress: e.target.value })}
                                        />
                                        <div className="grid grid-cols-3 gap-4">
                                            <Input
                                                label="Subnet"
                                                type="number"
                                                min="8" max="32" step="8"
                                                required
                                                value={formData.Subnet}
                                                onChange={(e) => setFormData({ ...formData, Subnet: e.target.value })}
                                            />
                                            <Input
                                                label="Size (GB)"
                                                type="number"
                                                min="1"
                                                required
                                                value={formData.size}
                                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                            />
                                            <div className="flex flex-col items-center justify-end pb-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Active</label>
                                                <input
                                                    type="checkbox"
                                                    className="w-6 h-6 rounded-lg border-gray-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                                                    checked={formData.active}
                                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Dropdown
                                            label="Allowed Groups"
                                            isMulti
                                            options={groups.map(g => ({ value: g.text, label: g.text }))}
                                            value={formData.groups}
                                            placeholder="Select Groups..."
                                            onChange={(val) => setFormData({ ...formData, groups: val })}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            bgColor="bg-indigo-600"
                                            className="px-6 py-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5"
                                            onClick={handleCreate}
                                        >
                                            Provision Volume
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Volume Insights Replacement for Pie Chart */}
                            <VolumeInsights volumes={volumes} />
                        </div>

                        {/* Second Row: Volume List */}
                        <div className="w-full">
                            <NfsList
                                volumes={volumes}
                                groups={groups}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QNfs;
