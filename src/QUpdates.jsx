import React, { useState, useEffect, useCallback } from 'react';
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
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Software Infrastructure</h1>
                                <p className="text-gray-500 mt-1 font-medium">Manage system versions and acquire new update packages</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => loadVersions()}
                                    bgColor="bg-white"
                                    textColor="text-gray-400"
                                    className="border border-gray-100 hover:text-indigo-500 rounded-xl shadow-sm transition-all"
                                    icon={<i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>}
                                />
                            </div>
                        </div>

                        {message.text && (
                            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                                }`}>
                                <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                {message.text}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Current Version Dashboard */}
                            <div className="lg:col-span-1">
                                <div className="bg-indigo-600 rounded-[2.5rem] p-8 sm:p-10 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group h-full flex flex-col">
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
                                    <div className="relative z-10 flex flex-col flex-1">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                                            <i className="fas fa-microchip text-xl"></i>
                                        </div>
                                        <div className="mt-auto">
                                            <p className="text-indigo-100 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Active Build</p>
                                            <h2 className="text-4xl sm:text-5xl border-b border-white/10 pb-6 font-black tracking-tighter mb-6">{currentVersion}</h2>
                                            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 rounded-full w-fit border border-white/10">
                                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">System Optimized</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Update Factory */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-sm border border-gray-100 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                                <i className="fas fa-rocket text-lg"></i>
                                            </div>
                                            <h3 className="text-xl font-black text-gray-800 tracking-tight">Update Factory</h3>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-4 block">Available Packages</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {versions.map((v, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => setSelectedVersion(v.text)}
                                                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${selectedVersion === v.text
                                                            ? 'bg-indigo-50 border-indigo-600 shadow-sm'
                                                            : 'bg-gray-50 border-transparent hover:bg-white hover:border-indigo-100 hover:shadow-sm'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedVersion === v.text ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400 group-hover:text-indigo-500 shadow-sm'}`}>
                                                                <i className="fas fa-box-open text-sm"></i>
                                                            </div>
                                                            <span className={`font-bold text-sm ${selectedVersion === v.text ? 'text-indigo-800' : 'text-gray-700'}`}>{v.text}</span>
                                                        </div>
                                                        {selectedVersion === v.text && <i className="fas fa-check-circle text-indigo-600 text-lg"></i>}
                                                    </div>
                                                ))}
                                                {versions.length === 0 && (
                                                    <div className="col-span-1 sm:col-span-2 py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                                        <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                                            <i className="fas fa-inbox text-gray-300"></i>
                                                        </div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No update packages found</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-8 mt-6 border-t border-gray-50">
                                            <Button
                                                onClick={handleUpdate}
                                                disabled={!selectedVersion || actionLoading === 'update'}
                                                bgColor="bg-indigo-600"
                                                className="px-8 py-3.5 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 flex items-center gap-3"
                                            >
                                                {actionLoading === 'update' ? (
                                                    <>
                                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        Applying...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-play text-[10px]"></i>
                                                        Apply Selection
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Package Acquisition Section */}
                        <div className="mt-8 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                        <i className="fas fa-cloud-download-alt text-xs"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-gray-800 tracking-tight">Package Acquisition</h3>
                                        <p className="text-xs text-gray-400 font-medium">Download updates from remote or local sources</p>
                                    </div>
                                </div>
                                <div className="flex bg-gray-50 p-1.5 rounded-full gap-2 w-fit border border-gray-100/50">
                                    <button
                                        type="button"
                                        onClick={() => setDownloadMethod('url')}
                                        style={{ borderRadius: '9999px' }}
                                        className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${downloadMethod === 'url' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:text-indigo-500 hover:bg-white'}`}
                                    >
                                        Public URL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDownloadMethod('share')}
                                        style={{ borderRadius: '9999px' }}
                                        className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${downloadMethod === 'share' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:text-indigo-500 hover:bg-white'}`}
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
                                        icon={<i className={`fas ${downloadMethod === 'url' ? 'fa-link' : 'fa-network-wired'} text-sm`}></i>}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <Button
                                        type="submit"
                                        disabled={!downloadPath || actionLoading === 'download'}
                                        bgColor="bg-white hover:bg-indigo-50"
                                        textColor="text-indigo-600"
                                        className="w-full py-3 border border-gray-100 hover:border-indigo-100 font-black text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3"
                                    >
                                        {actionLoading === 'download' ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                                Fetching...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-download text-[10px]"></i>
                                                Fetch Package
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QUpdates;
