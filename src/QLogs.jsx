import React, { useState, useEffect, useCallback } from 'react';
import { fetchLogs } from './api/logs';
import LogList from './components/LogList';

const QLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        try {
            const res = await fetchLogs();
            if (res.data?.alllogs) {
                setLogs(res.data.alllogs);
            }
        } catch (err) {
            console.error("Failed to load logs", err);
            setError("Communication failure with log service");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 2000); // Poll every 2s to match legacy Qlogs.js
        return () => clearInterval(interval);
    }, [loadData]);

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <p className="text-lg text-gray-500 font-medium tracking-tight">System-wide event tracking and audit oversight</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={loadData} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-xl font-medium shadow-sm transition-all flex items-center">
                                    <i className="fas fa-sync-alt mr-2 opacity-70"></i> Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content px-4 pb-12">
                    <div className="container-fluid">
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-2xl flex items-center gap-4 mb-4">
                                <i className="fas fa-exclamation-triangle text-xl"></i>
                                <span className="font-bold">{error}</span>
                            </div>
                        )}

                        <LogList logs={logs} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QLogs;
