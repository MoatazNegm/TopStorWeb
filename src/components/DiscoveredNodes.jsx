import React, { useState, useEffect, useRef } from 'react';
import { joinCluster } from '../api/nodes';
import ServerNode, { nodeLabel } from './Common/ServerNode';
import { IpInput, SubnetInput, ipError } from './Common/NetFields';
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
    const [joinStatus, setJoinStatus] = useState('');
    const [joinResult, setJoinResult] = useState('');

    // Tracks whether this component is still mounted, so the IP-change poll
    // loop below can stop itself instead of updating state after unmount.
    const isMountedRef = useRef(true);
    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    // Fix #16: Get the selected host object directly from the array. The old code used `allhosts['possible'][index]`.
    // The name may not perfectly match the alias initially depending on the UI state, but `hosts` array contains the source of truth for possible hosts.
    const selectedHostIndex = selectedHostName ? hosts.findIndex(h => (h.name === selectedHostName || h.alias === selectedHostName)) : -1;

    const selectedHostKey = selectedHostName || '';

    const selectedHostListItem = React.useMemo(() => {
        if (!selectedHostKey) return null;
        return hosts.find(h => (h.name === selectedHostKey || h.alias === selectedHostKey)) || null;
    }, [hosts, selectedHostKey]);

    React.useEffect(() => {
        if (selectedHostKey) {
            const host = hosts.find(h => (h.name === selectedHostKey || h.alias === selectedHostKey));
            if (host) {
                const initialFormState = {
                    alias: host.alias || host.name || '',
                    ipaddr: host.ipaddr || host.ip || '',
                    ipaddrsubnet: host.ipaddrsubnet || 24,
                    port: host.port || 'Port'
                };
                setFormData(initialFormState);
                    setOriginalData({
                        alias: initialFormState.alias,
                        ipaddr: initialFormState.ipaddr,
                        ipaddrsubnet: initialFormState.ipaddrsubnet
                    });
            }
        } else {
            setFormData({
                alias: '',
                ipaddr: '',
                ipaddrsubnet: 24,
                port: 'Port'
            });
            setOriginalData({ alias: '', ipaddr: '', ipaddrsubnet: 24 });
        }
    }, [selectedHostKey]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Match legacy updateButtonState: show "Update and Add to Cluster" whenever fields have content
    const hasDataForButton = (formData.alias && formData.alias.trim().length > 0) ||
        (formData.ipaddr && formData.ipaddr.trim().length > 0 && !formData.ipaddr.includes('__'));

    // One call does it all: alias / node ip typed in the form travel with the join request, the
    // primary puts them (and the cluster address) in the node's tojoin key, the node acknowledges
    // and restarts with them. No separate config call and no waiting for the node to change its IP.
    // an address that is typed but not valid keeps Join disabled
    const hasNetError = Boolean(ipError(formData.ipaddr));

    const handleJoin = async () => {
        if (!selectedHostName || !selectedHostListItem || hasNetError) return;
        setIsJoining(true);
        setJoinStatus('');
        setJoinResult('');
        try {
            const extra = {};
            if (formData.alias.length > 3 && formData.alias !== originalData.alias) {
                extra.alias = formData.alias;
            }
            if (formData.ipaddr.length > 3 && !formData.ipaddr.includes('__')) {
                if (formData.ipaddr !== originalData.ipaddr || String(formData.ipaddrsubnet) !== String(originalData.ipaddrsubnet)) {
                    extra.ipaddr = formData.ipaddr;
                    extra.ipaddrsubnet = formData.ipaddrsubnet;
                }
            }

            setJoinStatus('Joining cluster...');
            const response = await joinCluster(selectedHostListItem.name, extra);
            const status = response && response.data && response.data.joinstatus;
            if (status) setJoinResult(status);
            if (!isMountedRef.current) return;
            if (onRefresh) onRefresh();
        } catch (e) {
            console.error("Join cluster failed", e);
        } finally {
            if (isMountedRef.current) {
                setIsJoining(false);
                setJoinStatus('');
            }
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
                    <div className="p-3 bg-gray-50/50 border-b border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex flex-wrap gap-3" id="hostspossible">
                            {hosts.length === 0 ? (
                                <div className="col-span-full text-center text-sm text-gray-400 py-6">
                                    No discovered nodes. Click <strong>discovery</strong> to scan.
                                </div>
                            ) : hosts.map(host => {
                                const hostName = host.name || host.alias;
                                return (
                                    <div key={hostName}>
                                        <ServerNode
                                            name={nodeLabel(host, allHosts)}
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
                                            <IpInput wrapperClassName="block w-full"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 discoverednodes"
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
                                            <SubnetInput
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
                                    disabled={!selectedHostListItem || isJoining || hasNetError}
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
                            {isJoining && joinStatus && (
                                <p className="text-sm text-gray-500 mt-2">{joinStatus}</p>
                            )}
                            {!isJoining && joinResult && (
                                <p className="text-sm text-gray-500 mt-2">{joinResult}</p>
                            )}
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default DiscoveredNodes;

