import React, { useState, useEffect, useCallback } from 'react';
import { fetchVolumesInfo, fetchGroupList, createVolume, updateVolume, deleteVolume, fetchVolumeStats } from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import S3BucketsList from './components/S3BucketsList';
import VolumeInsights from './components/VolumeInsights';

const QS3Buckets = () => {
    const [volumes, setVolumes] = useState([]);
    const [pools, setPools] = useState([]);
    const [groups, setGroups] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        poolIndex: '',
        name: '',
        Subnet: 24,
        size: 1,
        accesskey: '',
        secretkey: '',
        groups: [],
        apiPort: 9000,
        consolePort: 9001,
        active: true,
    });

    const showToast = useCallback((detail) => {
        window.dispatchEvent(new CustomEvent('app-toast', { detail }));
    }, []);

    const loadData = useCallback(async () => {
        try {
            setError(null);
            const [volsRes, poolsRes, groupsRes, statsRes] = await Promise.all([
                fetchVolumesInfo('S3'),
                fetchPoolsInfo(),
                fetchGroupList(),
                fetchVolumeStats().catch(() => ({ data: {} }))
            ]);

            const loadedVolumes = volsRes.data.allvolumes || [];
            setVolumes(loadedVolumes);
            setPools(poolsRes.data.results || []);
            setGroups(groupsRes.data.results || []);
            setStats(statsRes.data);

            return loadedVolumes;
        } catch (err) {
            console.error('Failed to load S3 bucket data', err);
            setError('Failed to synchronize with buckets API');
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshUntilVisible = useCallback(async (bucketName) => {
        const expected = String(bucketName || '').toLowerCase();

        for (let attempt = 0; attempt < 4; attempt += 1) {
            const latest = await loadData();
            const exists = (latest || []).some((vol) => {
                const candidate = String(vol?.text || vol?.name || vol?.fullname || '').toLowerCase();
                return candidate.includes(expected);
            });

            if (exists) return true;
            await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        return false;
    }, [loadData]);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, [loadData]);

    const handleCreate = async (e) => {
        e.preventDefault();

        const poolObj = pools.find((pool, idx) => String(idx) === String(formData.poolIndex));
        const bucketName = formData.name.trim();
        const accessKey = formData.accesskey.trim();
        const secretKey = formData.secretkey.trim();

        if (!poolObj) {
            setError('Select a storage pool before provisioning the bucket.');
            showToast({
                type: 'error',
                title: 'S3 Buckets',
                body: 'Select a storage pool before provisioning the bucket.',
            });
            return;
        }

        if (!bucketName || !accessKey || !secretKey) {
            setError('Complete all required bucket fields before provisioning.');
            showToast({
                type: 'error',
                title: 'S3 Buckets',
                body: 'Complete all required bucket fields before provisioning.',
            });
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const payload = {
                type: 'S3',
                pool: poolObj.text,
                name: bucketName,
                Subnet: formData.Subnet,
                size: `${formData.size}G`,
                accesskey: accessKey,
                secretkey: secretKey,
                groups: (formData.groups || []).join(',') || 'NoGroup',
                apiPort: formData.apiPort,
                consolePort: formData.consolePort,
                active: formData.active ? 'active' : 'false',
                owner: poolObj.owner,
            };

            showToast({
                type: 'info',
                title: 'S3 Buckets',
                body: `Provisioning request sent for ${bucketName}.`,
            });

            const createRes = await createVolume(payload);
            const apiResponse = String(createRes?.data?.response || '').toLowerCase();
            const apiError = String(createRes?.data?.error || createRes?.data?.message || '').trim();

            if (apiResponse.includes('baduser') || apiResponse.includes('fail') || apiResponse.includes('error')) {
                throw new Error(apiError || createRes?.data?.response || 'Failed to create S3 bucket volume');
            }

            setFormData({
                poolIndex: '',
                name: '',
                Subnet: 24,
                size: 1,
                accesskey: '',
                secretkey: '',
                groups: [],
                apiPort: 9000,
                consolePort: 9001,
                active: true,
            });

            setSubmitting(false);

            refreshUntilVisible(bucketName)
                .then((appeared) => {
                    if (appeared) {
                        showToast({
                            type: 'info',
                            title: 'S3 Buckets',
                            body: `Bucket ${bucketName} was created and is now visible in the list.`,
                        });
                    } else {
                        showToast({
                            type: 'warning',
                            title: 'S3 Buckets',
                            body: `Bucket ${bucketName} is still not visible after waiting. Provisioning may have failed on the owner node.`,
                        });
                    }
                })
                .catch(() => {
                    showToast({
                        type: 'warning',
                        title: 'S3 Buckets',
                        body: `Bucket ${bucketName} provisioning is in progress. Refresh to verify final state.`,
                    });
                });

            return;
        } catch (err) {
            const message = err?.response?.data?.error || err?.response?.data?.message || err?.message || 'Failed to create S3 bucket volume';
            setError(message);
            showToast({
                type: 'error',
                title: 'S3 Buckets',
                body: message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (volName, values) => {
        try {
            await updateVolume({
                volume: volName,
                type: 'S3',
                ...values
            });
            loadData();
        } catch (err) {
            setError('Failed to update S3 bucket volume');
        }
    };

    const handleDelete = async (volName) => {
        if (!window.confirm(`Are you sure you want to delete bucket ${volName.split('_')[0]}?`)) return;
        try {
            await deleteVolume({ name: volName, type: 'S3', user: 'mezo' });
            loadData();
        } catch (err) {
            setError('Failed to delete S3 bucket volume');
        }
    };

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-gray-800 tracking-tight">S3 Buckets</h1>
                                <p className="text-gray-500 mt-1 font-medium">MinIO-backed object storage bucket administration</p>
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                        <i className="fas fa-cloud text-xs"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">New Bucket Volume</h3>
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
                                            label="Bucket Name"
                                            required
                                            placeholder="bucket-name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

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

                                        <div className="grid grid-cols-2 gap-6">
                                            <Input
                                                label="Access Key"
                                                required
                                                placeholder="bucket-admin"
                                                value={formData.accesskey}
                                                onChange={(e) => setFormData({ ...formData, accesskey: e.target.value })}
                                            />
                                            <Input
                                                label="Secret Key"
                                                type="password"
                                                required
                                                placeholder="Enter a strong secret"
                                                value={formData.secretkey}
                                                onChange={(e) => setFormData({ ...formData, secretkey: e.target.value })}
                                            />
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

                                        <div className="grid grid-cols-2 gap-6">
                                            <Input
                                                label="API Port"
                                                disabled
                                                value={formData.apiPort}
                                            />
                                            <Input
                                                label="Console Port"
                                                disabled
                                                value={formData.consolePort}
                                            />
                                        </div>

                                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Creating an S3 bucket volume reserves dataset storage on the node, and the service IP is auto-assigned from the selected storage owner node.
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            bgColor="bg-indigo-600"
                                            className="px-6 py-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5"
                                            disabled={submitting}
                                        >
                                            {submitting ? 'Provisioning...' : 'Provision Bucket'}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <VolumeInsights volumes={volumes} stats={stats} />
                        </div>

                        <div className="w-full">
                            <S3BucketsList
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

export default QS3Buckets;
