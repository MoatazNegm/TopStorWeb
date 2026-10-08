import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, FolderPlus } from 'lucide-react';
import { fetchVolumesInfo, createVolume, updateVolume, deleteVolume } from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import { ipError } from './components/Common/NetFields';
import Dropdown from './components/Common/Dropdown';
import IscsiList from './components/IscsiList';
import { PoolCapacityPanel, ProvisionHint, useCapacity } from './components/Common/Capacity';
import { ipCollision } from './components/Common/ipCheck';

const QIscsi = () => {
    const [volumes, setVolumes] = useState([]);
    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { stats: capStats, volumes: allVolumes, hosts: allHosts, reload: reloadCapacity } = useCapacity();

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

    // the address may be shared with other LUNs only (one portal), never with a node, a share or a home folder
    const ipMsg = ipCollision(formData.ipaddress, { kind: 'ISCSI' }, { hosts: allHosts, volumes: allVolumes });

    const loadData = useCallback(async () => {
        try {
            const [volsRes, poolsRes] = await Promise.all([
                fetchVolumesInfo('ISCSI'),
                fetchPoolsInfo(),
            ]);

            setVolumes(volsRes.data.allvolumes || []);
            setPools(poolsRes.data.results || []);
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
        if (ipError(formData.ipaddress) || ipMsg) return;
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
            reloadCapacity();
        } catch (err) {
            setError("Failed to create iSCSI volume");
        }
    };

    // the list collects the edits (address and port, initiators, deletion); Submit sends them, one call per changed LUN
    const handleSubmit = async (pending) => {
        const names = Object.keys(pending);
        const removing = names.filter((n) => pending[n].remove);
        if (removing.length > 0 && !window.confirm(`Delete ${removing.length} LUN${removing.length === 1 ? '' : 's'}: ${removing.map((n) => n.split('_')[0]).join(', ')}?`)) return false;
        try {
            for (const name of names) {
                const p = pending[name];
                if (p.remove) {
                    await deleteVolume({ name, type: 'ISCSI', user: 'mezo' });
                } else {
                    await updateVolume({
                        volume: name,
                        type: 'ISCSI',
                        ...(p.address !== undefined ? { ipaddress: p.address } : {}),
                        ...(p.port !== undefined ? { portalport: p.port } : {}),
                        ...(p.initiators !== undefined ? { initiators: p.initiators } : {}),
                    });
                }
            }
            loadData();
            reloadCapacity();
            return true;
        } catch (err) {
            setError("Failed to apply the changes");
            return false;
        }
    };

    return (
                <div>
                    <div className="rounded-none border border-border bg-surface p-2 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">iSCSI LUNs</h1>
                                <p className="mt-1 text-sm text-gray-500">Enterprise block-level storage administration</p>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-6 flex items-center gap-2 rounded-lg border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
                                <AlertTriangle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="mt-6 space-y-6">
                            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                                <div className="rounded-lg border border-border bg-surface p-2 shadow-sm lg:col-span-2">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                            <FolderPlus size={16} />
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-800">Provision Block Device</h3>
                                    </div>

                                    <form onSubmit={handleCreate} className="space-y-5">
                                        <div className="flex flex-wrap items-end gap-4">
                                            <div className="w-40">
                                                <Dropdown
                                                    label="Storage Pool"
                                                    options={pools.map((p, idx) => ({ value: idx, label: p.text }))}
                                                    value={formData.poolIndex}
                                                    placeholder="Select pool"
                                                    onChange={(val) => setFormData({ ...formData, poolIndex: val })}
                                                />
                                            </div>
                                            <div className="min-w-[10rem] flex-1">
                                                <Input
                                                    label="LUN Name"
                                                    required
                                                    placeholder="LUN-01"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="w-24">
                                                <Input
                                                    label="Size (GB)"
                                                    type="number"
                                                    min="1"
                                                    max="999999"
                                                    required
                                                    value={formData.size}
                                                    onChange={(e) => setFormData({ ...formData, size: e.target.value.slice(0, 6) })}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-start gap-4">
                                            <div className="w-44">
                                                <Input
                                                    label="IP Address"
                                                    kind="ip"
                                                    required
                                                    error={ipMsg}
                                                    value={formData.ipaddress}
                                                    onChange={(e) => setFormData({ ...formData, ipaddress: e.target.value })}
                                                />
                                            </div>
                                            <div className="w-20">
                                                <Input
                                                    label="Subnet"
                                                    kind="subnet"
                                                    required
                                                    value={formData.Subnet}
                                                    onChange={(e) => setFormData({ ...formData, Subnet: e.target.value })}
                                                />
                                            </div>
                                            <div className="w-24">
                                                <Input
                                                    label="Port"
                                                    type="number"
                                                    min="1024" max="65535"
                                                    required
                                                    value={formData.portalport}
                                                    onChange={(e) => setFormData({ ...formData, portalport: e.target.value })}
                                                />
                                            </div>
                                            <div className="pt-8">
                                                <label className="flex cursor-pointer items-center whitespace-nowrap text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 h-4 w-4 flex-shrink-0 rounded border-border text-brand-600 focus:ring-brand-100"
                                                        checked={formData.active}
                                                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                                    />
                                                    Active
                                                </label>
                                            </div>
                                        </div>
                                        <ProvisionHint thick stat={capStats[pools[formData.poolIndex]?.text]} size={formData.size} />

                                        <div className="text-gray-800">
                                            <Input
                                                label="Initiators IQN"
                                                isTextArea
                                                rows={2}
                                                placeholder="iqn.1993-08.org.debian:01:..."
                                                value={formData.initiators}
                                                onChange={(e) => setFormData({ ...formData, initiators: e.target.value })}
                                            />
                                            <span className="ml-1 mt-1 block text-xs font-medium text-gray-500">Add IQNs separated by space, comma, or newline.</span>
                                        </div>

                                        <div className="flex justify-end pt-2">
                                            <Button
                                                type="submit"
                                                className="w-full sm:w-auto"
                                                onClick={handleCreate}
                                                disabled={!!ipError(formData.ipaddress) || !!ipMsg}
                                            >
                                                Create iSCSI Target
                                            </Button>
                                        </div>
                                    </form>
                                </div>

                                <PoolCapacityPanel stats={capStats} />
                            </div>

                            <div className="w-full">
                                <IscsiList
                                    volumes={volumes}
                                    onSubmit={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default QIscsi;
