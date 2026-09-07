import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { fetchAllHostsInfo, discoverHosts } from './api/nodes';
import Button from './components/Common/Button';
import RunningNodes from './components/RunningNodes';
import DiscoveredNodes from './components/DiscoveredNodes';
import ActiveNodes from './components/ActiveNodes';

const QNodes = () => {
    const [hostsInfo, setHostsInfo] = useState({ ready: [], active: [], possible: [], lost: [] });
    const [selectedHost, setSelectedHost] = useState({ ready: null, active: null, possible: null, lost: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isMounted = useRef(true);
    const firstLoad = useRef(true);
    const pollTimer = useRef(null);

    const loadData = useCallback(async () => {
        if (!isMounted.current) return;

        try {
            const response = await fetchAllHostsInfo();
            if (response.data && isMounted.current) {
                setHostsInfo((prev) => {
                    if (JSON.stringify(prev) === JSON.stringify(response.data)) {
                        return prev;
                    }
                    return response.data;
                });
                setError(null);
            }
        } catch (err) {
            if (isMounted.current) {
                if (err.code !== 'ERR_CANCELED' && err.message !== 'Request aborted') {
                    console.error('Failed to load hosts', err);
                }
                setError(err);
            }
        } finally {
            if (isMounted.current) {
                if (firstLoad.current) {
                    firstLoad.current = false;
                    setLoading(false);
                }
                pollTimer.current = setTimeout(loadData, 5000);
            }
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        loadData();

        return () => {
            isMounted.current = false;
            if (pollTimer.current) {
                clearTimeout(pollTimer.current);
                pollTimer.current = null;
            }
        };
    }, [loadData]);

    const handleHostSelect = (state, hostName) => {
        setSelectedHost((prev) => {
            const newState = { ...prev };
            newState[state] = newState[state] === hostName ? null : hostName;
            return newState;
        });
    };

    const handleDiscover = async () => {
        if (!isMounted.current) return;
        setLoading(true);
        try {
            await discoverHosts();
            await loadData();
        } catch (discoverError) {
            console.error('Discovery failed', discoverError);
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    const refreshData = async () => {
        await loadData();
    };


    return (
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Node Status</h1>
                                <p className="mt-1 text-sm text-gray-500">Monitor cluster nodes, configure networking, and manage membership</p>
                            </div>
                            <Button onClick={refreshData} variant="secondary" icon={<RefreshCw size={15} />}>
                                Sync Now
                            </Button>
                        </div>

                        <div className="mt-6 space-y-6">
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
                                    <AlertTriangle size={16} />
                                    <span>Failed to sync host status.</span>
                                </div>
                            )}

                            {loading && (
                                <div className="rounded-lg border border-border bg-surface px-4 py-6 text-sm text-gray-500">Loading nodes...</div>
                            )}

                            <RunningNodes
                                hosts={hostsInfo.ready || []}
                                allHosts={hostsInfo.all || {}}
                                selectedHostName={selectedHost.ready}
                                onSelect={(name) => handleHostSelect('ready', name)}
                                onRefresh={refreshData}
                            />

                            <ActiveNodes
                                hosts={hostsInfo.active || []}
                                allHosts={hostsInfo.all || {}}
                                lostHosts={hostsInfo.lost || []}
                                selectedHostName={selectedHost.active}
                                onSelect={(name) => handleHostSelect('active', name)}
                                readyHostsCount={(hostsInfo.ready || []).length}
                                possibleHostsCount={(hostsInfo.possible || []).length}
                                onRefresh={refreshData}
                            />

                            <DiscoveredNodes
                                hosts={hostsInfo.possible || []}
                                allHosts={hostsInfo.all || {}}
                                selectedHostName={selectedHost.possible}
                                onSelect={(name) => handleHostSelect('possible', name)}
                                onDiscover={handleDiscover}
                                onRefresh={refreshData}
                            />
                        </div>
                    </div>
                </div>
    );
};

export default QNodes;

