import React, { useState, useEffect } from 'react';
import { joinCluster, updateDiscoveredNode } from '../api/nodes';
import ServerNode from './Common/ServerNode';
import Button from './Common/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DiscoveredNodes = ({ hosts, allHosts, selectedHostName, onSelect, onDiscover, onRefresh }) => {
    const [formData, setFormData] = useState({
        alias: '',
        ipaddr: '',
        ipaddrsubnet: 24,
        port: 'Port'
    });
    const [originalData, setOriginalData] = useState({ alias: '', ipaddr: '', ipaddrsubnet: 24 });
    const [isExpanded, setIsExpanded] = useState(true);
    const [isJoining, setIsJoining] = useState(false);

    // Fix #16: Get the selected host object directly from the array. The old code used `allhosts['possible'][index]`.
    // The name may not perfectly match the alias initially depending on the UI state, but `hosts` array contains the source of truth for possible hosts.
    const selectedHostIndex = selectedHostName ? hosts.findIndex(h => (h.name === selectedHostName || h.alias === selectedHostName)) : -1;
    const selectedHostListItem = selectedHostIndex !== -1 ? hosts[selectedHostIndex] : null;

    useEffect(() => {
        if (selectedHostListItem) {
            const initialFormState = {
                alias: selectedHostListItem.alias || selectedHostListItem.name || '',
                ipaddr: selectedHostListItem.ipaddr || selectedHostListItem.ip || '',
                ipaddrsubnet: selectedHostListItem.ipaddrsubnet || 24,
                port: selectedHostListItem.port || 'Port'
            };
            setFormData(initialFormState);
            setOriginalData({
                alias: initialFormState.alias,
                ipaddr: initialFormState.ipaddr,
                ipaddrsubnet: initialFormState.ipaddrsubnet
            });
        } else {
            setFormData({
                alias: '',
                ipaddr: '',
                ipaddrsubnet: 24,
                port: 'Port'
            });
            setOriginalData({ alias: '', ipaddr: '', ipaddrsubnet: 24 });
        }
    }, [selectedHostListItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Match legacy updateButtonState: show "Update and Add to Cluster" whenever fields have content
    const hasDataForButton = (formData.alias && formData.alias.trim().length > 0) ||
        (formData.ipaddr && formData.ipaddr.trim().length > 0 && !formData.ipaddr.includes('__'));

    // Fix #8: Two-step "Update and Add to Cluster" flow
    const handleJoin = async () => {
        if (!selectedHostName || !selectedHostListItem) return;
        setIsJoining(true);
        try {
            let tochange = 0;
            const hostsubmit = {};

            // Match Legacy updateDiscoveredNode L279-282
            if (formData.alias.length > 3 && formData.alias !== originalData.alias) {
                hostsubmit.alias = formData.alias;
                tochange = 1;
            }

            // Match Legacy updateDiscoveredNode L284-298
            // Note: Legacy uses double-underscore "__" for the submission guard
            if (formData.ipaddr.length > 3 && !formData.ipaddr.includes('__')) {
                if (formData.ipaddr !== originalData.ipaddr || String(formData.ipaddrsubnet) !== String(originalData.ipaddrsubnet)) {
                    hostsubmit.ipaddr = formData.ipaddr;
                    hostsubmit.ipaddrsubnet = formData.ipaddrsubnet;
                    tochange = 1;
                }
            }

            if (tochange > 0) {
                // Step 1: Update the discovered node configuration
                // Match Legacy payload exactly (L301-305)
                const updatePayload = {
                    ...hostsubmit,
                    id: selectedHostListItem.id,
                    user: 'mezo',
                    name: selectedHostListItem.name,
                    discovered: true
                };

                await updateDiscoveredNode(updatePayload);

                // Step 2: Wait before joining cluster (matching old code's 10-second delay L486)
                await new Promise(resolve => setTimeout(resolve, 10000));
            }

            // Step 3: Join the cluster (Match Legacy joinNodeToCluster L320-330)
            await joinCluster(selectedHostListItem.name);
            if (onRefresh) onRefresh();
        } catch (e) {
            console.error("Join cluster failed", e);
        } finally {
            setIsJoining(false);
        }
    };

    const btnText = isJoining ? 'Joining...' : (hasDataForButton ? 'Update and Add to Cluster' : 'Add to Cluster');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 relative">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-500"></div>
            <div
                className="px-6 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <button
                        className={`text-gray-400 hover:text-blue-600 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                        <ChevronDown size={20} />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-800">Discovered Nodes</h3>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); if (onDiscover) onDiscover(); }}
                    className="bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-all"
                    id="refresh2"
                >
                    discovery
                </button>
            </div>

            {isExpanded && (
                <>
                    {/* Nodes Grid */}
                    <div className="p-6 bg-gray-50/50 border-b border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="hostspossible">
                            {hosts.length === 0 ? (
                                <div className="col-span-full text-center text-sm text-gray-400 py-6">
                                    No discovered nodes. Click <strong>discovery</strong> to scan.
                                </div>
                            ) : hosts.map(host => {
                                const hostName = host.name || host.alias;
                                return (
                                    <div key={hostName}>
                                        <ServerNode
                                            name={hostName}
                                            ip={host.ip || host.ipaddr}
                                            state="discovered"
                                            onClick={() => onSelect(hostName)}
                                            selected={selectedHostName === hostName}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Config Form */}
                    <div className="p-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <form className='space-y-6 hostform'>
                            {/* Node Name */}
                            <div className="grid grid-cols-12 gap-6 items-center">
                                <label className="col-span-12 sm:col-span-3 text-sm font-semibold text-gray-700">Node Name</label>
                                <div className="col-span-12 sm:col-span-9 md:col-span-5">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 discoverednodes"
                                        id="DiscoveredBoxName"
                                        name="alias"
                                        value={formData.alias}
                                        onChange={handleChange}
                                        disabled={!selectedHostListItem || isJoining}
                                        placeholder="Node Name"
                                    />
                                </div>
                            </div>

                            {/* Node Address */}
                            <div className="grid grid-cols-12 gap-6 items-center">
                                <label className="col-span-12 sm:col-span-3 text-sm font-semibold text-gray-700">Node Address</label>
                                <div className="col-span-12 sm:col-span-9">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* IP Input */}
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="xxx.xxx.xxx.xxx"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress discoverednodes"
                                                id="DiscoveredIPAddress"
                                                name="ipaddr"
                                                value={formData.ipaddr}
                                                onChange={handleChange}
                                                disabled={!selectedHostListItem || isJoining}
                                            />
                                        </div>
                                        {/* Port Select */}
                                        <div className="sm:w-32">
                                            <select
                                                name="port"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 appearance-none bg-white discoverednodes"
                                                id="DiscoveredNodePorts"
                                                value={formData.port}
                                                onChange={handleChange}
                                                disabled={!selectedHostListItem || isJoining}
                                            >
                                                <option>Port</option>
                                            </select>
                                        </div>
                                        {/* Subnet */}
                                        <div className="flex items-center gap-3 sm:w-40">
                                            <label className="text-sm font-medium text-gray-600 whitespace-nowrap">Subnet</label>
                                            <input
                                                type="number"
                                                min="8"
                                                max="32"
                                                step="8"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 discoverednodes"
                                                id="Discoveredipaddrsubnet"
                                                name="ipaddrsubnet"
                                                value={formData.ipaddrsubnet}
                                                onChange={handleChange}
                                                disabled={!selectedHostListItem || isJoining}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-gray-100 mt-6">
                                <Button
                                    type="button"
                                    id="updateAndJoinBtn"
                                    onClick={handleJoin}
                                    disabled={!selectedHostListItem || isJoining}
                                    bgColor="bg-blue-600"
                                >
                                    {btnText}
                                </Button>

                                <button
                                    type="button"
                                    id="refresh"
                                    onClick={(e) => { if (onDiscover) onDiscover(); }}
                                    className="btn btn-block bg-gradient-info btn-lg hidden sm:block text-gray-500 hover:text-blue-600 font-medium text-sm transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                                >
                                    discovery
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default DiscoveredNodes;
