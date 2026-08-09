import React, { useState, useEffect, useCallback } from 'react';
import {
    AlertTriangle,
    Check,
    Download,
    ExternalLink,
    Inbox,
    Link as LinkIcon,
    Package,
    Play,
    RefreshCw,
    Rocket,
    Server,
    Share2,
} from 'lucide-react';
import { fetchSoftwareVersions, applySoftwareUpdate, downloadSoftware } from './api/software';
import Button from './components/Common/Button';
import Input from './components/Common/Input';

const QUpdates = () => {
    const [currentVersion, setCurrentVersion] = useState('...');
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // 'update' | 'download'
    const [selectedVersion, setSelectedVersion] = useState('');
    const [downloadPath, setDownloadPath] = useState('');
    const [downloadMethod, setDownloadMethod] = useState('url'); // 'url' | 'share'
    const [message, setMessage] = useState({ type: '', text: '' });

    const loadVersions = useCallback(async (isInitial = false) => {
        try {
            const res = await fetchSoftwareVersions();
            setCurrentVersion(res.data.current || 'Unknown');
            setVersions(res.data.versions || []);
        } catch (err) {
            console.error("Failed to load versions", err);
        } finally {
            if (isInitial) setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadVersions(true);
        const interval = setInterval(() => loadVersions(), 5000);
        return () => clearInterval(interval);
    }, [loadVersions]);

    const handleUpdate = async () => {
        if (!selectedVersion) return;
        if (!window.confirm(`Are you sure you want to update to ${selectedVersion}? System may restart.`)) return;

        setActionLoading('update');
        try {
            await applySoftwareUpdate(selectedVersion);
            setMessage({ type: 'success', text: `Update to ${selectedVersion} initiated successfully.` });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to initiate update process.' });
        } finally {
            setActionLoading(null);
        }
    };

    const handleDownload = async (e) => {
        e.preventDefault();
        if (!downloadPath) return;

        setActionLoading('download');
        try {
            await downloadSoftware({ method: downloadMethod, path: downloadPath });
            setMessage({ type: 'success', text: 'Download process started.' });
            setDownloadPath('');
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to start download.' });
        } finally {
            setActionLoading(null);
        }
    };

    return (
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Software Updates</h1>
                                <p className="mt-1 text-sm text-gray-500">Manage system versions and acquire new update packages</p>
                            </div>
                            <Button onClick={() => loadVersions()} variant="secondary" icon={<RefreshCw size={15} />}>
                                Sync Now
                            </Button>
                        </div>

                        {message.text && (
                            <div className={`mt-6 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${message.type === 'success' ? 'border-success-100 bg-success-50 text-success-600' : 'border-danger-100 bg-danger-50 text-danger-600'
                                }`}>
                                {message.type === 'success' ? <Check size={14} /> : <AlertTriangle size={14} />}
                                {message.text}
                            </div>
                        )}

                        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="lg:col-span-1">
                                <div className="flex h-full flex-col rounded-lg border border-border bg-brand-600 p-6 text-white">
                                    <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-md bg-white/20">
                                        <Server size={17} />
                                    </div>
                                    <div className="mt-auto">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-100">Active Build</p>
                                        <h2 className="mt-2 text-4xl font-semibold tracking-tight">{currentVersion}</h2>
                                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                                            <span className="h-2 w-2 rounded-full bg-success-500" />
                                            System Optimized
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-5">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                                <Rocket size={17} />
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-800">Update Factory</h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div className="flex-1">
                                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Available Packages</p>
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                {versions.map((v, idx) => (
                                                    <button
                                                        type="button"
                                                        key={idx}
                                                        onClick={() => setSelectedVersion(v.text)}
                                                        className={`group flex items-center justify-between rounded-md border px-4 py-3 text-left transition-colors ${selectedVersion === v.text
                                                            ? 'border-brand-500 bg-brand-50'
                                                            : 'border-border bg-surface-muted hover:border-brand-100 hover:bg-surface'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`flex h-8 w-8 items-center justify-center rounded-md ${selectedVersion === v.text ? 'bg-brand-600 text-white' : 'bg-surface text-brand-600'}`}>
                                                                <Package size={14} />
                                                            </div>
                                                            <span className={`text-sm font-semibold ${selectedVersion === v.text ? 'text-brand-700' : 'text-gray-700'}`}>{v.text}</span>
                                                        </div>
                                                        {selectedVersion === v.text && <Check size={16} className="text-brand-600" />}
                                                    </button>
                                                ))}
                                                {versions.length === 0 && (
                                                    <div className="col-span-1 rounded-md border border-dashed border-border bg-surface-muted py-10 text-center sm:col-span-2">
                                                        <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-gray-400">
                                                            <Inbox size={16} />
                                                        </span>
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">No update packages found</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-5 flex justify-end border-t border-border pt-4">
                                            <Button
                                                onClick={handleUpdate}
                                                disabled={!selectedVersion || actionLoading === 'update'}
                                                icon={actionLoading === 'update' ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                                            >
                                                {actionLoading === 'update' ? 'Applying...' : 'Apply Selection'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg border border-border bg-surface p-5">
                            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <Download size={16} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-800">Package Acquisition</h3>
                                        <p className="text-sm text-gray-500">Download updates from remote or local sources</p>
                                    </div>
                                </div>
                                <div className="inline-flex gap-2 rounded-full border border-border bg-surface-muted p-1">
                                    <button
                                        type="button"
                                        onClick={() => setDownloadMethod('url')}
                                        className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${downloadMethod === 'url' ? 'bg-brand-600 text-white' : 'text-gray-600 hover:bg-surface hover:text-brand-600'}`}
                                    >
                                        Public URL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDownloadMethod('share')}
                                        className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${downloadMethod === 'share' ? 'bg-brand-600 text-white' : 'text-gray-600 hover:bg-surface hover:text-brand-600'}`}
                                    >
                                        Network Share
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleDownload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div className="md:col-span-3">
                                    <Input
                                        label={downloadMethod === 'url' ? 'Source URL (HTTP/HTTPS)' : 'Network Path (SMB/NFS)'}
                                        placeholder={downloadMethod === 'url' ? "https://updates.quickstor.com/v2.4.tar.gz" : "\\\\storage\\updates\\v2.4.bin"}
                                        value={downloadPath}
                                        onChange={(e) => setDownloadPath(e.target.value)}
                                        required
                                        icon={downloadMethod === 'url' ? <LinkIcon size={14} /> : <Share2 size={14} />}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <Button
                                        type="submit"
                                        disabled={!downloadPath || actionLoading === 'download'}
                                        variant="secondary"
                                        className="w-full"
                                        icon={actionLoading === 'download' ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                                    >
                                        {actionLoading === 'download' ? 'Fetching...' : 'Fetch Package'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    );
};

export default QUpdates;
