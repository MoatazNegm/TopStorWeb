import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, FolderPlus } from 'lucide-react';
import { fetchVolumesInfo, fetchGroupList, createVolume, updateVolume, deleteVolume, fetchVolumeStats } from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import { ipError } from './components/Common/NetFields';
import Dropdown from './components/Common/Dropdown';
import { pickGroups } from './components/Common/groupPick';
import { ipCollision } from './components/Common/ipCheck';
import NfsList from './components/NfsList';
import { PoolCapacityPanel, ProvisionHint, EfficiencyOptions, useCapacity } from './components/Common/Capacity';

const QNfs = () => {
    const [volumes, setVolumes] = useState([]);
    const [pools, setPools] = useState([]);
    const [groups, setGroups] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { stats: capStats, volumes: allVolumes, hosts: allHosts, reload: reloadCapacity } = useCapacity();

    // Form state
    const [formData, setFormData] = useState({
        pool: '',
        name: '',
        size: 1,
        ipaddress: '',
        Subnet: 24,
        compression: true,
        dedup: true,
        groups: [],
        rootname: 'root',
        rootid: 0,
        groupname: 'root',
        groupid: 0,
        active: true
    });

    // a NFS share shares its address with nothing: not with a node, a CIFS share, a home, an iSCSI LUN or another NFS share
    const ipMsg = ipCollision(formData.ipaddress, { kind: 'NFS' }, { hosts: allHosts, volumes: allVolumes });

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
        // the button's onClick runs this handler instead of the form submit, so the required fields of the form are checked here
        const form = e.currentTarget.form || e.currentTarget;
        if (form.reportValidity && !form.reportValidity()) return;
        if (formData.pool === '' || !pools[formData.pool]) { setError('Select a storage pool first'); return; }
        setError(null);
        if (ipError(formData.ipaddress) || ipMsg) return;
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
                compression: formData.compression ? 'on' : 'off',
                dedup: formData.dedup ? 'on' : 'off',
                rootname: formData.rootname,
                rootid: formData.rootid,
                groupname: formData.groupname,
                groupid: formData.groupid,
                active: formData.active ? 'active' : 'false'
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

    // the list collects the edits (address, groups, deletion); Submit sends them, one call per changed volume
    const handleSubmit = async (pending) => {
        const names = Object.keys(pending);
        const removing = names.filter((n) => pending[n].remove);
        if (removing.length > 0 && !window.confirm(`Delete ${removing.length} volume${removing.length === 1 ? '' : 's'}: ${removing.map((n) => n.split('_')[0]).join(', ')}?`)) return false;
        try {
            for (const name of names) {
                const p = pending[name];
                if (p.remove) {
                    await deleteVolume({ name, type: 'NFS', user: 'mezo' });
                } else {
                    await updateVolume({
                        volume: name,
                        type: 'NFS',
                        ...(p.address !== undefined ? { ipaddress: p.address, Subnet: p.subnet } : {}),
                        ...(p.groups !== undefined ? { groups: p.groups } : {}),
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
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">NFS Volumes</h1>
                                <p className="mt-1 text-sm text-gray-500">Unix-compatible network share administration</p>
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
                                        <h3 className="text-base font-semibold text-gray-800">New Volume</h3>
                                    </div>

                                <form onSubmit={handleCreate} className="space-y-5">
                                    <div className="flex flex-wrap items-end gap-4">
                                        <div className="w-40">
                                            <Dropdown
                                                label="Storage Pool"
                                                options={pools.map((p, idx) => ({ value: idx, label: p.text }))}
                                                value={formData.pool}
                                                placeholder="Select pool"
                                                onChange={(val) => setFormData({ ...formData, pool: val })}
                                            />
                                        </div>
                                        <div className="min-w-[10rem] flex-1">
                                            <Input
                                                label="Volume Name"
                                                required
                                                placeholder="Share name"
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

                                    <div className="grid grid-cols-[1fr_5rem_1fr_5rem] gap-4">
                                        <Input label="Root Name" required value={formData.rootname} onChange={(e) => setFormData({ ...formData, rootname: e.target.value })} />
                                        <Input label="Root ID" type="number" min="0" required value={formData.rootid} onChange={(e) => setFormData({ ...formData, rootid: e.target.value })} />
                                        <Input label="Group Name" required value={formData.groupname} onChange={(e) => setFormData({ ...formData, groupname: e.target.value })} />
                                        <Input label="Group ID" type="number" min="0" required value={formData.groupid} onChange={(e) => setFormData({ ...formData, groupid: e.target.value })} />
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
                                        <div className="flex flex-col gap-1.5 pt-6">
                                            <label className="flex cursor-pointer items-center whitespace-nowrap text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2 h-4 w-4 flex-shrink-0 rounded border-border text-brand-600 focus:ring-brand-100"
                                                    checked={formData.active}
                                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                                />
                                                Active
                                            </label>
                                            <EfficiencyOptions stacked compression={formData.compression} dedup={formData.dedup} onChange={(v) => setFormData({ ...formData, ...v })} />
                                        </div>
                                    </div>
                                    <ProvisionHint stat={capStats[pools[formData.pool]?.text]} size={formData.size} />

                                    <div>
                                        <Dropdown
                                            label="Allowed Groups"
                                            isMulti
                                            options={groups.map(g => ({ value: g.text, label: g.text }))}
                                            value={formData.groups}
                                            placeholder="Select groups"
                                            onChange={(val) => setFormData({ ...formData, groups: pickGroups(formData.groups, val, (g) => g === 'Everyone') })}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto"
                                            onClick={handleCreate}
                                            disabled={!!ipError(formData.ipaddress) || !!ipMsg}
                                        >
                                            Provision Volume
                                        </Button>
                                    </div>
                                </form>
                                </div>

                                <PoolCapacityPanel stats={capStats} />
                            </div>

                            <div className="w-full">
                                <NfsList
                                    volumes={volumes}
                                    groups={groups}
                                    onSubmit={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default QNfs;
