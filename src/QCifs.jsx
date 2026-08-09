import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, FolderPlus, RefreshCw } from 'lucide-react';
import { fetchVolumesInfo, fetchGroupList, createVolume, updateVolume, deleteVolume, fetchVolumeStats } from './api/volumes';
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
        // Workgroup specific — workname auto-derives from name on input
        workname: '',
        wrkactive: true
    });

    const loadData = useCallback(async () => {
        try {
            const [volsRes, poolsRes, groupsRes, statsRes] = await Promise.all([
                fetchVolumesInfo('CIFS'),
                fetchPoolsInfo(),
                fetchGroupList(),
                fetchVolumeStats().catch(() => ({ data: {} }))
            ]);

            setVolumes(volsRes.data.allvolumes || []);
            setPools(poolsRes.data.results || []);
            setGroups(groupsRes.data.results || []);
            setStats(statsRes.data);
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
            const isDomain = formData.serving === 'domain';
            const payload = {
                pool: poolObj.text,
                name: formData.name,
                ipaddress: formData.ipaddress,
                Subnet: formData.Subnet,
                Myname: 'mezo',
                size: `${formData.size}G`,
                owner: poolObj.owner,
                ...(isDomain ? {
                    type: 'CIFSdom',
                    active: formData.domactive ? 'active' : 'false',
                    domname: formData.domain,
                    domip: formData.domip,
                    domsrv: formData.domsrv,
                    domadmin: formData.domadmin,
                    dompass: formData.dompass,
                } : {
                    type: 'CIFS',
                    active: formData.wrkactive ? 'active' : 'false',
                    groups: formData.groups.join(',') || 'NoGroup',
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
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">CIFS Volumes</h1>
                                <p className="mt-1 text-sm text-gray-500">Windows-compatible network share administration</p>
                            </div>
                            <Button
                                onClick={loadData}
                                variant="secondary"
                                icon={<RefreshCw size={15} className={loading ? 'animate-spin' : ''} />}
                            >
                                Sync Now
                            </Button>
                        </div>

                        {error && (
                            <div className="mt-6 flex items-center gap-2 rounded-lg border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
                                <AlertTriangle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="mt-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                            <FolderPlus size={16} />
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-800">New Volume</h3>
                                    </div>

                                    <form onSubmit={handleCreate} className="space-y-5">
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
                                                placeholder="Select pool"
                                                onChange={(val) => setFormData({ ...formData, pool: val })}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Input
                                                label="Volume Name"
                                                required
                                                placeholder="Share name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value, workname: 'cifs-' + e.target.value })}
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
                                                    placeholder="Domain name"
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
                                                    placeholder="Server name"
                                                    disabled={!!formData.domip}
                                                    value={formData.domsrv}
                                                    onChange={(e) => setFormData({ ...formData, domsrv: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-12 gap-6 items-end">
                                                <Input
                                                    className="col-span-5"
                                                    label="Domain Admin"
                                                    placeholder="Admin username"
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
                                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">Active</label>
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 rounded border-border text-brand-600 focus:ring-brand-100"
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
                                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">Active</label>
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 rounded border-border text-brand-600 focus:ring-brand-100"
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
                                            placeholder="Select groups"
                                            onChange={(val) => setFormData({ ...formData, groups: val })}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto"
                                            onClick={handleCreate}
                                        >
                                            Provision Volume
                                        </Button>
                                    </div>
                                    </form>
                                </div>

                                <VolumeInsights volumes={volumes} />
                            </div>

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
    );
};

export default QCifs;
