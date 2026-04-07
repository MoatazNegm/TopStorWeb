import React, { useState } from 'react';
import { evacuateHost } from '../api/nodes';
import ServerNode from './Common/ServerNode';
import Button from './Common/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ActiveNodes = ({ hosts, allHosts, lostHosts, selectedHostName, onSelect, readyHostsCount, possibleHostsCount }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const selectedHost = allHosts ? allHosts[selectedHostName] : null;

    const handleEvacuate = async () => {
        if (!selectedHostName) return;
        try {
            await evacuateHost(selectedHostName);
        } catch (e) {
            console.error("Evacuation failed", e);
        }
    };

    // Old logic: evacuate disabled by default
    // Enabled only if selected host is "lost/Off" AND (readyCount - possibleCount) >= 2
    const isSelectedHostLost = selectedHostName && lostHosts && (
        Array.isArray(lostHosts)
            ? lostHosts.includes(selectedHostName) || lostHosts.some(h => (typeof h === 'object' ? h.name : h) === selectedHostName)
            : JSON.stringify(lostHosts).includes(selectedHostName)
    );

    const canEvacuate = isSelectedHostLost && (readyHostsCount - possibleHostsCount) >= 2;

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
                    <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="hostsactive">
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
                                            name={hostName}
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
                    <div className="p-6">
                        <Button
                            type="button"
                            id="activesubmit"
                            onClick={handleEvacuate}
                            disabled={!canEvacuate}
                            bgColor="bg-rose-500"
                        >
                            Evacuate Node
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveNodes;
