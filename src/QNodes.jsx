import React, { useState, useEffect, useCallback } from 'react';
import { fetchAllHostsInfo, discoverHosts } from './api/nodes';
import RunningNodes from './components/RunningNodes';
import DiscoveredNodes from './components/DiscoveredNodes';
import ActiveNodes from './components/ActiveNodes'; // For the "Nodes Status" / Evacuate section

const HOST_STATES = ["ready", "active", "possible", "lost"];

const QNodes = () => {
    const [hostsInfo, setHostsInfo] = useState({ ready: [], active: [], possible: [], lost: [] });
    const [selectedHost, setSelectedHost] = useState({ ready: null, active: null, possible: null, lost: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        try {
            const response = await fetchAllHostsInfo();
            // QNodes.js expects response in a specific format. 
            // Assuming response.data is the "newhosts" object from QNodes.js logic
            // newhosts has "all" and specific state keys? No, QNodes.js says:
            // newhosts["all"] is compared. 
            // response.data likely contains { all: {...}, ready: [...], active: [...], ... }
            if (response.data) {
                setHostsInfo(prev => {
                    // Basic diffing or just replace. React handles diffing DOM.
                    // We just update state.
                    return response.data;
                });
            }
        } catch (err) {
            console.error("Failed to load hosts", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000); // Polling every 5s
        return () => clearInterval(interval);
    }, [loadData]);

    const handleHostSelect = (state, hostName) => {
        setSelectedHost(prev => {
            const newState = { ...prev };
            // Toggle selection
            if (newState[state] === hostName) {
                newState[state] = null;
            } else {
                newState[state] = hostName;
            }
            return newState;
        });
    };

    const handleDiscover = async () => {
        setLoading(true);
        try {
            await discoverHosts();
            await loadData(); // Immediate refresh
        } catch (e) {
            console.error("Discovery failed", e);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async () => {
        await loadData();
    };


    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header">
                    <div className="container-fluid"></div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        {/* Running Nodes Card */}
                        <div className="mb-8">
                            <RunningNodes
                                hosts={hostsInfo.ready || []}
                                allHosts={hostsInfo.all || {}}
                                selectedHostName={selectedHost.ready}
                                onSelect={(name) => handleHostSelect('ready', name)}
                                onRefresh={refreshData}
                            />
                        </div>

                        {/* Active Nodes / Evacuate Card */}
                        <div className="mb-8">
                            <ActiveNodes
                                hosts={hostsInfo.active || []}
                                allHosts={hostsInfo.all || {}}
                                lostHosts={hostsInfo.lost || []}
                                selectedHostName={selectedHost.active}
                                onSelect={(name) => handleHostSelect('active', name)}
                                readyHostsCount={(hostsInfo.ready || []).length}
                                possibleHostsCount={(hostsInfo.possible || []).length}
                            />
                        </div>

                        {/* Discovered Nodes Card */}
                        <div className="mb-8">
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
            </div>
        </div>
    );
};

export default QNodes;
