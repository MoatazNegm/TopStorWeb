import React, { useState } from 'react';
import { evacuateHost } from '../api/nodes';
import ServerNode from './Common/ServerNode';
import Button from './Common/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ActiveNodes = ({ hosts, allHosts, lostHosts, selectedHostName, onSelect }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const selectedHost = allHosts ? allHosts[selectedHostName] : null;

    const handleEvacuate = async () => {
        if (!selectedHostName) return;
        try {
            await evacuateHost(selectedHostName);
            alert("Evacuation started");
        } catch (e) {
            console.error(e);
            alert("Evacuation failed");
        }
    };

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
                                const isLost = lostHosts.includes(host.name);
                                const fullHost = (allHosts && allHosts[host.name]) ? allHosts[host.name] : host;
                                const displayIp = fullHost.ip || fullHost.ipaddr || host.ip || host.ipaddr;
                                return (
                                    <div key={host.name}>
                                        <ServerNode
                                            name={host.name}
                                            ip={displayIp}
                                            state={isLost ? 'down' : 'up'}
                                            onClick={() => onSelect(host.name)}
                                            selected={selectedHostName === host.name}
                                        />
                                    </div>
                                );
                            })}
                            {hosts.length === 0 && (
                                <div className="col-span-full text-center py-8 text-gray-400 text-sm">
                                    No active nodes found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6">
                        <Button
                            type="button"
                            id="activesubmit"
                            onClick={handleEvacuate}
                            disabled={!selectedHostName}
                            bgColor="bg-rose-500"
                        >
                            Evacuate Node
                        </Button>
                        <p className="mt-2 text-xs text-gray-400">
                            * Evacuating a node will migrate its data to other healthy nodes in the cluster.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveNodes;
