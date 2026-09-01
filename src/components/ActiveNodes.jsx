import React, { useState, useEffect } from 'react';
import { evacuateHost, configHost } from '../api/nodes';
import ServerNode, { nodeLabel } from './Common/ServerNode';
import Button from './Common/Button';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

const ActiveNodes = ({ hosts, allHosts, lostHosts, selectedHostName, onSelect, readyHostsCount, possibleHostsCount, onRefresh }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    // Double check for the destructive action: pressing Evacuate only arms it, the confirm button then does it.
    const [armed, setArmed] = useState(false);
    const selectedHost = allHosts ? allHosts[selectedHostName] : null;

    const handleEvacuate = () => {
        if (!selectedHostName) return;
        setArmed(true);
    };

    // Eject the selected node, reset it and make it ready to join a new cluster. It uses the same two calls as before:
    // evacuate (eject) and hosts/config with configured=no (what the "ready to join" check box did through Update Node).
    const handleEjectReset = async () => {
        if (!selectedHostName) return;
        try {
            await evacuateHost(selectedHostName);
            const index = hosts.findIndex(h => (typeof h === 'object' ? h.name : h) === selectedHostName);
            await configHost({ configured: 'no', id: index, user: 'mezo', name: selectedHostName });
            if (onRefresh) onRefresh();
        } catch (e) {
            console.error("Eject and reset failed", e);
        } finally {
            setArmed(false);
        }
    };

    // Old logic: evacuate disabled by default
    // Enabled only if selected host is "lost/Off" AND (readyCount - possibleCount) >= 2
    const isSelectedHostLost = selectedHostName && lostHosts && (
        Array.isArray(lostHosts)
            ? lostHosts.includes(selectedHostName) || lostHosts.some(h => (typeof h === 'object' ? h.name : h) === selectedHostName)
            : JSON.stringify(lostHosts).includes(selectedHostName)
    );

    // Fix #13: Match old code's two-step logic:
    // Step 1: disable if ready - possible < 2
    // Step 2: override enable if host is Off/lost (old code re-enables regardless of count)
    let canEvac = (readyHostsCount - possibleHostsCount) >= 2;
    if (isSelectedHostLost) {
        canEvac = true; // "Off" status overrides the count check
    }
    const canEvacuate = selectedHostName && canEvac;

    useEffect(() => { setArmed(false); }, [selectedHostName, canEvacuate]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 relative">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-rose-500"></div>
            {/* Header */}
            <div
                className="px-6 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <button className={`text-gray-400 hover:text-rose-600 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown size={20} />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-800">Nodes Status</h3>
                </div>
            </div>

            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Nodes Grid */}
                    <div className="p-3 bg-gray-50/50 border-b border-gray-100">
                        <div className="flex flex-wrap gap-3" id="hostsactive">
                            {hosts.map(host => {
                                const hostName = typeof host === 'object' ? host.name : host;
                                const isLost = lostHosts && (
                                    Array.isArray(lostHosts)
                                        ? lostHosts.includes(hostName) || lostHosts.some(h => (typeof h === 'object' ? h.name : h) === hostName)
                                        : JSON.stringify(lostHosts).includes(hostName)
                                );
                                const fullHost = (allHosts && allHosts[hostName]) ? allHosts[hostName] : host;
                                const displayIp = fullHost.ip || fullHost.ipaddr || (typeof host === 'object' ? (host.ip || host.ipaddr) : '');
                                return (
                                    <div key={hostName}>
                                        <ServerNode
                                            name={nodeLabel(host, allHosts)}
                                            ip={displayIp}
                                            state={isLost ? 'down' : 'up'}
                                            onClick={() => onSelect(hostName)}
                                            selected={selectedHostName === hostName}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 flex flex-wrap items-center justify-between gap-3">
                        {/* Evacuate and Cancel have exactly the same size and place; Cancel (blue) replaces Evacuate once it was pressed */}
                        {armed ? (
                            <Button
                                type="button"
                                id="evacuatecancel"
                                onClick={() => setArmed(false)}
                                variant="primary"
                                className="w-44"
                            >
                                Cancel
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                id="activesubmit"
                                onClick={handleEvacuate}
                                disabled={!canEvacuate}
                                bgColor="bg-rose-500"
                                className="w-44"
                            >
                                Evacuate Node
                            </Button>
                        )}
                        {/* Only while Evacuate can be pressed: first a serious notice, after Evacuate was pressed the same place is the confirm button */}
                        {canEvacuate && (armed ? (
                            <Button
                                type="button"
                                id="ejectreset"
                                onClick={handleEjectReset}
                                bgColor="bg-rose-500"
                            >
                                Eject, reset and be ready to join a new cluster
                            </Button>
                        ) : (
                            <p id="ejectresetnotice" className="flex items-center gap-2 text-sm font-semibold text-danger-700">
                                <AlertTriangle size={16} className="flex-shrink-0" />
                                Eject, reset and be ready to join a new cluster
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveNodes;
