import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
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
        if (!selection.volume && selection.volume !== 0) {
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
                const timeMatch = forms.Weekly.stime.match(/(\d+):(\d+)\s*(AM|PM)/i);
                if (timeMatch) {
                    let h = parseInt(timeMatch[1]);
                    const m = timeMatch[2];
                    const p = timeMatch[3].toUpperCase();
                    if (p === 'PM' && h !== 12) h += 12;
                    if (p === 'AM' && h === 12) h = 0;
                    payload.stime = `${String(h).padStart(2, '0')}:${m}`;
                }
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
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-lg text-gray-500 font-medium tracking-tight">Point-in-time volume recovery and scheduling</p>
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

                        {/* Top Selection Bar */}
                        <div className="mb-8 flex flex-wrap items-center gap-6 rounded-lg border border-border bg-surface p-6 shadow-sm">
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
                                    disabled={!selection.pool && selection.pool !== 0}
                                    placeholder="Select Volume..."
                                    onChange={(val) => setSelection({ ...selection, volume: val })}
                                />
                            </div>
                        </div>

                        {/* Main Creation Card */}
                        <div className="mb-8 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                            {/* Tab Headers */}
                            <div className="flex border-b border-gray-50 bg-gray-50/30">
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 border-b-2 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${activeTab === tab
                                            ? 'border-brand-600 bg-surface text-brand-700'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
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
                                                    disabled={!selection.volume && selection.volume !== 0}
                                                    placeholder="Manual-Snap-01..."
                                                    value={forms.Once.name}
                                                    onChange={(e) => setForms({ ...forms, Once: { name: e.target.value } })}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={(!selection.volume && selection.volume !== 0) || forms.Once.name.length < 3}
                                                variant="primary"
                                                className="px-6"
                                                onClick={handleCreate}
                                            >
                                                Snap Now
                                            </Button>
                                        </div>
                                    )}

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
                                                disabled={!selection.volume && selection.volume !== 0}
                                                variant="primary"
                                                className="px-6"
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
                                                disabled={!selection.volume && selection.volume !== 0}
                                                variant="primary"
                                                className="px-6"
                                                onClick={handleCreate}
                                            >
                                                Create Schedule
                                            </Button>
                                        </div>
                                    )}

                                    {activeTab === 'Weekly' && (
                                        <div className="flex items-end gap-6 flex-wrap">
                                            <div className="w-48">
                                                <label className="mb-1.5 ml-1 block text-sm font-medium text-gray-700">At Time</label>
                                                <CustomTimePicker
                                                    value={forms.Weekly.stime}
                                                    disabled={!selection.volume && selection.volume !== 0}
                                                    onChange={(val) => setForms({ ...forms, Weekly: { ...forms.Weekly, stime: val } })}
                                                />
                                            </div>
                                            <div className="w-48">
                                                <Dropdown
                                                    label="On Day"
                                                    options={['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => ({ value: day, label: day }))}
                                                    value={forms.Weekly.sday}
                                                    disabled={!selection.volume && selection.volume !== 0}
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
                                                disabled={!selection.volume && selection.volume !== 0}
                                                variant="primary"
                                                className="px-6"
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
    );
};

export default QSnapshots;


