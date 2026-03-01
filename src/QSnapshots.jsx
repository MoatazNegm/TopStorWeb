import React, { useState, useEffect, useCallback } from 'react';
import {
    fetchSnapshotsInfo,
    fetchVolumeList,
    createSnapshot,
    deleteSnapshot,
    rollbackSnapshot,
    deleteSnapshotPeriod
} from './api/volumes';
import { fetchPoolsInfo } from './api/pools';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import SnapshotList from './components/SnapshotList';
import SnapshotPeriodsList from './components/SnapshotPeriodsList';
import CustomTimePicker from './components/CustomTimePicker';

const QSnapshots = () => {
    const [pools, setPools] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const [snapshots, setSnapshots] = useState({ Once: [], Minutely: [], Hourly: [], Weekly: [], allsnaps: [] });
    const [periods, setPeriods] = useState({ Minutelyperiod: [], Hourlyperiod: [], Weeklyperiod: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Once');

    // Selection state
    const [selection, setSelection] = useState({ pool: '', volume: '' });

    // Individual tab form states
    const [forms, setForms] = useState({
        Once: { name: '' },
        Minutely: { every: 10, keep: 5 },
        Hourly: { sminute: 0, every: 1, keep: 1 },
        Weekly: { stime: '11:50 PM', sday: 'Sat', keep: 1 }
    });

    const loadData = useCallback(async () => {
        try {
            const [poolsRes, volsRes, snapsRes] = await Promise.all([
                fetchPoolsInfo(),
                fetchVolumeList(),
                fetchSnapshotsInfo()
            ]);

            setPools(poolsRes.data.results || []);
            setVolumes(volsRes.data || []);

            const snapsData = snapsRes.data;
            setSnapshots({
                Once: snapsData.Once || [],
                Minutely: snapsData.Minutely || [],
                Hourly: snapsData.Hourly || [],
                Weekly: snapsData.Weekly || [],
                allsnaps: snapsData.allsnaps || []
            });
            setPeriods({
                Minutelyperiod: snapsData.Minutelyperiod || [],
                Hourlyperiod: snapsData.Hourlyperiod || [],
                Weeklyperiod: snapsData.Weeklyperiod || []
            });
        } catch (err) {
            console.error("Failed to load snapshots data", err);
            setError("Failed to synchronize with snapshots API");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, [loadData]);

    const filteredVolumes = selection.pool === ''
        ? []
        : volumes.filter(v => v.pool === pools[selection.pool].text);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!selection.volume) {
            setError("Please select a volume first");
            return;
        }

        try {
            const poolObj = pools[selection.pool];
            const volObj = volumes.find(v => v.id === selection.volume);

            const payload = {
                snapsel: activeTab,
                pool: poolObj.text,
                volume: volObj.fullname,
                owner: poolObj.owner,
                ...forms[activeTab]
            };

            // Format Weekly time for backend if needed (legacy uses AM/PM sometimes but component uses 24h)
            if (activeTab === 'Weekly') {
                payload.every = forms.Weekly.sday;
            }

            await createSnapshot(payload);

            // Success reset
            if (activeTab === 'Once') setForms(prev => ({ ...prev, Once: { name: '' } }));
            loadData();
        } catch (err) {
            setError("Failed to create snapshot/period");
        }
    };

    const handleSnapshotDelete = async (name) => {
        if (!window.confirm(`Delete snapshot ${name}?`)) return;
        try {
            await deleteSnapshot(name);
            loadData();
        } catch (err) {
            setError("Failed to delete snapshot");
        }
    };

    const handleRollback = async (name) => {
        if (!window.confirm(`Rollback volume to snapshot ${name}? THIS CANNOT BE UNDONE.`)) return;
        try {
            await rollbackSnapshot(name);
            loadData();
        } catch (err) {
            setError("Failed to rollback volume");
        }
    };

    const handlePeriodDelete = async (id) => {
        if (!window.confirm(`Stop this snapshot schedule?`)) return;
        try {
            await deleteSnapshotPeriod(id);
            loadData();
        } catch (err) {
            setError("Failed to delete schedule period");
        }
    };

    const tabs = ['Once', 'Minutely', 'Hourly', 'Weekly'];

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-lg text-gray-500 font-medium tracking-tight">Point-in-time volume recovery and scheduling</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={loadData}
                                    bgColor="bg-white"
                                    textColor="text-gray-400"
                                    className="border border-gray-100 hover:text-indigo-500 rounded-xl"
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

                        {/* Top Selection Bar */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-wrap items-center gap-6">
                            <div className="flex-1 min-w-[200px]">
                                <Dropdown
                                    label="Source Pool"
                                    options={pools.map((p, idx) => ({ value: idx, label: p.text }))}
                                    value={selection.pool}
                                    placeholder="Select Pool..."
                                    onChange={(val) => setSelection({ pool: val, volume: '' })}
                                />
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <Dropdown
                                    label="Target Volume"
                                    options={filteredVolumes.map(v => ({ value: v.id, label: v.text }))}
                                    value={selection.volume}
                                    disabled={!selection.pool}
                                    placeholder="Select Volume..."
                                    onChange={(val) => setSelection({ ...selection, volume: val })}
                                />
                            </div>
                        </div>

                        {/* Main Creation Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                            {/* Tab Headers */}
                            <div className="flex border-b border-gray-50 bg-gray-50/30">
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                                            ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="p-8">
                                <form onSubmit={handleCreate} className="space-y-6">
                                    {activeTab === 'Once' && (
                                        <div className="flex items-end gap-6">
                                            <div className="flex-1">
                                                <Input
                                                    label="Snapshot Name"
                                                    required
                                                    disabled={!selection.volume}
                                                    placeholder="Manual-Snap-01..."
                                                    value={forms.Once.name}
                                                    onChange={(e) => setForms({ ...forms, Once: { name: e.target.value } })}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={!selection.volume || forms.Once.name.length < 3}
                                                bgColor="bg-indigo-600"
                                                className="px-8 py-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 !rounded-2xl"
                                                onClick={handleCreate}
                                            >
                                                Snap Now
                                            </Button>
                                        </div>
                                    )}
                                    旋
                                    {activeTab === 'Minutely' && (
                                        <div className="flex items-end gap-6">
                                            <div className="w-32">
                                                <Input
                                                    label="Every (Mins)"
                                                    type="number"
                                                    min="1"
                                                    max="59"
                                                    value={forms.Minutely.every}
                                                    onChange={(e) => setForms({ ...forms, Minutely: { ...forms.Minutely, every: e.target.value } })}
                                                />
                                            </div>
                                            <div className="w-32">
                                                <Input
                                                    label="Keep (Snaps)"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={forms.Minutely.keep}
                                                    onChange={(e) => setForms({ ...forms, Minutely: { ...forms.Minutely, keep: e.target.value } })}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={!selection.volume}
                                                bgColor="bg-indigo-600"
                                                className="px-6 py-2.5 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 !rounded-2xl"
                                                onClick={handleCreate}
                                            >
                                                Create Schedule
                                            </Button>
                                        </div>
                                    )}

                                    {activeTab === 'Hourly' && (
                                        <div className="flex items-end gap-6 flex-wrap">
                                            <div className="w-24">
                                                <Input
                                                    label="At Min"
                                                    type="number"
                                                    min="0"
                                                    max="59"
                                                    value={forms.Hourly.sminute}
                                                    onChange={(e) => setForms({ ...forms, Hourly: { ...forms.Hourly, sminute: e.target.value } })}
                                                />
                                            </div>
                                            <div className="w-32">
                                                <Input
                                                    label="Every (Hrs)"
                                                    type="number"
                                                    min="1"
                                                    max="48"
                                                    value={forms.Hourly.every}
                                                    onChange={(e) => setForms({ ...forms, Hourly: { ...forms.Hourly, every: e.target.value } })}
                                                />
                                            </div>
                                            <div className="w-32">
                                                <Input
                                                    label="Keep (Snaps)"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={forms.Hourly.keep}
                                                    onChange={(e) => setForms({ ...forms, Hourly: { ...forms.Hourly, keep: e.target.value } })}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={!selection.volume}
                                                bgColor="bg-indigo-600"
                                                className="px-6 py-2.5 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 !rounded-2xl"
                                                onClick={handleCreate}
                                            >
                                                Create Schedule
                                            </Button>
                                        </div>
                                    )}

                                    {activeTab === 'Weekly' && (
                                        <div className="flex items-end gap-6 flex-wrap">
                                            <div className="w-48">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">At Time</label>
                                                <CustomTimePicker
                                                    value={forms.Weekly.stime}
                                                    disabled={!selection.volume}
                                                    onChange={(val) => setForms({ ...forms, Weekly: { ...forms.Weekly, stime: val } })}
                                                />
                                            </div>
                                            <div className="w-48">
                                                <Dropdown
                                                    label="On Day"
                                                    options={['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => ({ value: day, label: day }))}
                                                    value={forms.Weekly.sday}
                                                    disabled={!selection.volume}
                                                    onChange={(val) => setForms({ ...forms, Weekly: { ...forms.Weekly, sday: val } })}
                                                />
                                            </div>
                                            <div className="w-32">
                                                <Input
                                                    label="Keep"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={forms.Weekly.keep}
                                                    onChange={(e) => setForms({ ...forms, Weekly: { ...forms.Weekly, keep: e.target.value } })}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={!selection.volume}
                                                bgColor="bg-indigo-600"
                                                className="px-6 py-2.5 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 !rounded-2xl"
                                                onClick={handleCreate}
                                            >
                                                Create Schedule
                                            </Button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="space-y-8">
                            {activeTab === 'Once' ? (
                                <SnapshotList
                                    snapshots={snapshots.Once}
                                    onRollback={handleRollback}
                                    onDelete={handleSnapshotDelete}
                                    title="Manual Snapshots"
                                    subtitle="On-demand volume states"
                                />
                            ) : (
                                <>
                                    <SnapshotPeriodsList
                                        periods={periods[`${activeTab}period`] || []}
                                        onDelete={handlePeriodDelete}
                                        type={activeTab}
                                    />
                                    <SnapshotList
                                        snapshots={snapshots[activeTab]}
                                        onRollback={handleRollback}
                                        onDelete={handleSnapshotDelete}
                                        title={`${activeTab} Automated Snapshots`}
                                        subtitle={`Scheduled ${activeTab.toLowerCase()} captures`}
                                    />
                                </>
                            )}

                            {/* Global Snapshot List */}
                            <SnapshotList
                                snapshots={snapshots.allsnaps}
                                onRollback={handleRollback}
                                onDelete={handleSnapshotDelete}
                                title="Comprehensive Snapshot History"
                                subtitle="Combined view of all volume captures"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default QSnapshots;
