import React, { useState, useEffect, useCallback } from 'react';
import { fetchVolumesInfo, fetchGroupList, createVolume, updateVolume, deleteVolume, fetchVolumeStats, fetchAdConfig } from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import CifsList from './components/CifsList';
import VolumeInsights from './components/VolumeInsights';

const QCifs = () => {
    const [volumes, setVolumes] = useState([]);
    const [pools, setPools] = useState([]);
    const [groups, setGroups] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        serving: 'domain',
        pool: '',
        name: '',
        size: 1,
        ipaddress: '',
        Subnet: 24,
        groups: [],
        // Domain specific
        domain: '',
        domip: '',
        domsrv: '',
        domadmin: '',
        dompass: '',
        domactive: true,
        // Workgroup specific
        workname: '',
        wrkactive: true
    });

    const loadData = useCallback(async () => {
        try {
            const [volsRes, poolsRes, groupsRes, statsRes, adConfig] = await Promise.all([
                fetchVolumesInfo('CIFS'),
                fetchPoolsInfo(),
                fetchGroupList(),
                fetchVolumeStats().catch(() => ({ data: {} })),
                fetchAdConfig()
            ]);

            setVolumes(volsRes.data.allvolumes || []);
            setPools(poolsRes.data.results || []);
            setGroups(groupsRes.data.results || []);
            setStats(statsRes.data);

            // Auto-populate Workgroup name and potentially set serving type if not already interacted with
            setFormData(prev => ({
                ...prev,
                workname: adConfig.domainName,
                domain: prev.domain || (adConfig.domainType === 'Domain' ? adConfig.domainName : ''),
                domip: prev.domip || adConfig.dcServer
            }));
        } catch (err) {
            console.error("Failed to load CIFS data", err);
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
                type: 'CIFS',
                pool: poolObj.text,
                name: formData.name,
                ipaddress: formData.ipaddress,
                Subnet: formData.Subnet,
                groups: formData.groups.join(','),
                Myname: 'mezo',
                size: `${formData.size}G`,
                owner: poolObj.owner,
                // New fields based on serving type
                serving: formData.serving,
                ...(formData.serving === 'domain' ? {
                    domain: formData.domain,
                    domip: formData.domip,
                    domsrv: formData.domsrv,
                    domadmin: formData.domadmin,
                    dompass: formData.dompass,
                    domactive: formData.domactive ? 'on' : 'off'
                } : {
                    workname: formData.workname,
                    wrkactive: formData.wrkactive ? 'on' : 'off'
                })
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
                type: 'CIFS',
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
            await deleteVolume({ name: volName, type: 'CIFS', user: 'mezo' });
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
                                <h1 className="text-3xl font-black text-gray-800 tracking-tight">CIFS Volume Management</h1>
                                <p className="text-gray-500 mt-1 font-medium">Windows-compatible network share administration</p>
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
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-2">
                                            <Dropdown
                                                label="Serving"
                                                options={[
                                                    { value: 'domain', label: 'Domain' },
                                                    { value: 'workgroup', label: 'Workgroup' }
                                                ]}
                                                value={formData.serving}
                                                onChange={(val) => setFormData({ ...formData, serving: val })}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Dropdown
                                                label="Storage Pool"
                                                options={pools.map((p, idx) => ({ value: idx, label: p.text }))}
                                                value={formData.pool}
                                                placeholder="Select Pool..."
                                                onChange={(val) => setFormData({ ...formData, pool: val })}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Input
                                                label="Volume Name"
                                                required
                                                placeholder="Share name..."
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                        <div className="grid grid-cols-2 gap-4">
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
                                        </div>
                                    </div>

                                    {formData.serving === 'domain' ? (
                                        <>
                                            <div className="grid grid-cols-3 gap-6">
                                                <Input
                                                    label="Domain"
                                                    placeholder="Domain name..."
                                                    value={formData.domain}
                                                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                                />
                                                <Input
                                                    label="xDC IP"
                                                    placeholder="xxx.xxx.xxx.xxx"
                                                    disabled={!!formData.domsrv}
                                                    value={formData.domip}
                                                    onChange={(e) => setFormData({ ...formData, domip: e.target.value })}
                                                />
                                                <Input
                                                    label="xDC Server"
                                                    placeholder="Server name..."
                                                    disabled={!!formData.domip}
                                                    value={formData.domsrv}
                                                    onChange={(e) => setFormData({ ...formData, domsrv: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-12 gap-6 items-end">
                                                <Input
                                                    className="col-span-5"
                                                    label="Domain Admin"
                                                    placeholder="Admin username..."
                                                    value={formData.domadmin}
                                                    onChange={(e) => setFormData({ ...formData, domadmin: e.target.value })}
                                                />
                                                <Input
                                                    className="col-span-5"
                                                    label="Password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={formData.dompass}
                                                    onChange={(e) => setFormData({ ...formData, dompass: e.target.value })}
                                                />
                                                <div className="col-span-2 pb-3 flex flex-col items-center">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Active</label>
                                                    <input
                                                        type="checkbox"
                                                        className="w-6 h-6 rounded-lg border-gray-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                                                        checked={formData.domactive}
                                                        onChange={(e) => setFormData({ ...formData, domactive: e.target.checked })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="grid grid-cols-12 gap-6 items-end">
                                            <Input
                                                className="col-span-10"
                                                label="Workgroup Name (Preset)"
                                                disabled
                                                value={formData.workname}
                                            />
                                            <div className="col-span-2 pb-3 flex flex-col items-center">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Active</label>
                                                <input
                                                    type="checkbox"
                                                    className="w-6 h-6 rounded-lg border-gray-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                                                    checked={formData.wrkactive}
                                                    onChange={(e) => setFormData({ ...formData, wrkactive: e.target.checked })}
                                                />
                                            </div>
                                        </div>
                                    )}

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
                            <CifsList
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

export default QCifs;
