import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { fetchLogs } from './api/logs';
import { fetchAllHostsInfo } from './api/nodes';
import LogList from './components/LogList';

const QLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const aliasesRef = useRef({});
    const aliasesAt = useRef(0);

    const loadData = useCallback(async () => {
        try {
            const res = await fetchLogs();
            if (res.data?.alllogs) {
                // node names are shown as their alias; a node without alias ('' or etcd's '_1') keeps its name
                let aliases = aliasesRef.current;
                try {
                    if (Date.now() - aliasesAt.current < 30000) throw new Error('aliases are fresh');   // allinfo at most every 30 s
                    aliasesAt.current = Date.now();
                    const hosts = await fetchAllHostsInfo();
                    const all = hosts.data?.all;
                    if (all && typeof all === 'object') {
                        aliases = Object.fromEntries(Object.entries(all).map(([h, v]) => [h, typeof v?.alias === 'string' ? v.alias.trim() : '']));
                        aliasesRef.current = aliases;
                    }
                } catch (e) { /* keep the aliases already known */ }
                setLogs(res.data.alllogs.map((l) => {
                    const a = aliases[l.host];
                    return a && a !== '_1' ? { ...l, host: a } : l;
                }));
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
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">System Logs</h1>
                                <p className="mt-1 text-sm text-gray-500">System-wide event tracking and audit oversight</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-6">
                        {error && (
                            <div className="flex items-center gap-2 rounded-lg border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
                                <AlertTriangle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        {loading && (
                            <div className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-gray-500">
                                Syncing logs...
                            </div>
                        )}

                        <LogList logs={logs} />
                        </div>
                    </div>
                </div>
    );
};

export default QLogs;
