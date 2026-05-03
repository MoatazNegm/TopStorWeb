import React, { useState, useEffect, useCallback } from 'react';
import { fetchVolumesInfo, createVolume, updateVolume, deleteVolume, fetchVolumeStats } from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import IscsiList from './components/IscsiList';
import VolumeInsights from './components/VolumeInsights';

const QIscsi = () => {
    const [volumes, setVolumes] = useState([]);
    const [pools, setPools] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        poolIndex: '',
        name: '',
        ipaddress: '',
        Subnet: 24,
        size: 1,
        portalport: 3260,
        initiators: '',
        active: true,
    });

    const loadData = useCallback(async () => {
        try {
            const [volsRes, poolsRes, statsRes] = await Promise.all([
                fetchVolumesInfo('ISCSI'),
                fetchPoolsInfo(),
                fetchVolumeStats().catch(() => ({ data: {} }))
            ]);

            setVolumes(volsRes.data.allvolumes || []);
            setPools(poolsRes.data.results || []);
            setStats(statsRes.data);
        } catch (err) {
            console.error("Failed to load iSCSI data", err);
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
            const poolObj = pools[formData.poolIndex];
            const initiatorStr = formData.initiators.trim().replaceAll('\n', ',').replaceAll(' ', ',').replaceAll(/,{2,}/g, ',');
            const payload = {
                type: 'ISCSI',
                pool: poolObj.text,
                name: formData.name,
                ipaddress: formData.ipaddress,
                portalport: formData.portalport,
                Subnet: formData.Subnet,
                initiators: initiatorStr || 'This_lun_is_not_mapped',
                size: `${formData.size}G`,
                active: formData.active ? 'active' : 'false',
            };

            await createVolume(payload);
            setFormData({
                poolIndex: '',
                name: '',
                ipaddress: '',
                Subnet: 24,
                size: 1,
                portalport: 3260,
                initiators: '',
                active: true,
            });
            loadData();
        } catch (err) {
            setError("Failed to create iSCSI volume");
        }
    };

    const handleUpdate = async (volName, values) => {
        try {
            await updateVolume({
                volume: volName,
                type: 'ISCSI',
                ...values
            });
            loadData();
        } catch (err) {
            setError("Failed to update volume");
        }
    };

    const handleDelete = async (volName) => {
        if (!window.confirm(`Are you sure you want to delete LUN ${volName.split('_')[0]}?`)) return;
        try {
            await deleteVolume({ name: volName, type: 'ISCSI', user: 'mezo' });
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
                                <p className="text-lg text-gray-500 font-medium tracking-tight">Enterprise block-level storage administration</p>
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
                                        <i className="fas fa-layer-group text-xs"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">Provision Block Device</h3>
                                </div>

                                <form onSubmit={handleCreate} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <Dropdown
                                            label="Storage Pool"
                                            options={pools.map((p, idx) => ({ value: idx, label: p.text }))}
                                            value={formData.poolIndex}
                                            placeholder="Select Pool..."
                                            onChange={(val) => setFormData({ ...formData, poolIndex: val })}
                                        />
                                        <Input
                                            label="LUN Name"
                                            required
                                            placeholder="LUN-01..."
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    label="IP Address"
                                                    required
                                                    placeholder="10.0.0.100"
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
                                        <Input
                                            label="Port"
                                            type="number"
                                            min="1024" max="65535"
                                            required
                                            value={formData.portalport}
                                            onChange={(e) => setFormData({ ...formData, portalport: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 gap-6">
                                        <div className="flex flex-col gap-3">
                                            <Input
                                                label="Size (GB)"
                                                type="number"
                                                min="1"
                                                required
                                                value={formData.size}
                                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                            />
                                            <div className="flex items-center gap-2 pt-1">
                                                <input
                                                    type="checkbox"
                                                    id="iscsiActive"
                                                    className="w-4 h-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                    checked={formData.active}
                                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                                />
                                                <label htmlFor="iscsiActive" className="text-xs font-semibold text-gray-600 cursor-pointer">Active</label>
                                            </div>
                                        </div>
                                        <div className="col-span-3 text-indigo-900">
                                            <Input
                                                label="Initiators IQN"
                                                isTextArea
                                                rows={2}
                                                placeholder="iqn.1993-08.org.debian:01:..."
                                                value={formData.initiators}
                                                onChange={(e) => setFormData({ ...formData, initiators: e.target.value })}
                                            />
                                            <span className="text-[9px] text-gray-400 ml-1 mt-1 block font-medium">Add IQNs separated by space, comma, or newline.</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button
                                            type="submit"
                                            bgColor="bg-blue-600"
                                            className="px-6 py-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5"
                                            onClick={handleCreate}
                                        >
                                            Create iSCSI Target
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <VolumeInsights volumes={volumes} />
                        </div>

                        {/* Second Row: List */}
                        <div className="w-full">
                            <IscsiList
                                volumes={volumes}
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

export default QIscsi;
