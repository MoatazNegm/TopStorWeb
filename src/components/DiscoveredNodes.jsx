import React, { useState, useEffect } from 'react';
import { joinCluster } from '../api/nodes';
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
    const [isExpanded, setIsExpanded] = useState(true);

    const selectedHost = allHosts ? allHosts[selectedHostName] : null;

    useEffect(() => {
        if (selectedHost) {
            setFormData({
                alias: selectedHost.alias || selectedHost.name || '',
                ipaddr: selectedHost.ipaddr || selectedHost.ip || '',
                ipaddrsubnet: selectedHost.ipaddrsubnet || 24,
                port: selectedHost.port || 'Port'
            });
        }
    }, [selectedHost]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Old code: #possiblesubmit only calls joincluster with { name }
    // No configHost pre-call
    const handleJoin = async () => {
        if (!selectedHostName) return;
        try {
            await joinCluster(selectedHostName);
            onRefresh();
        } catch (e) {
            console.error("Join cluster failed", e);
        }
    };

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
                    onClick={(e) => { e.stopPropagation(); onDiscover(); }}
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
                            {hosts.map(host => (
                                <div key={host.name}>
                                    <ServerNode
                                        name={host.name}
                                        ip={host.ip || host.ipaddr}
                                        state="discovered"
                                        onClick={() => onSelect(host.name)}
                                        selected={selectedHostName === host.name}
                                    />
                                </div>
                            ))}
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
                                        disabled={!selectedHost}
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
                                                disabled={!selectedHost}
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
                                                disabled={!selectedHost}
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
                                                disabled={!selectedHost}
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
                                    disabled={!selectedHost}
                                    bgColor="bg-blue-600"
                                >
                                    Add to Cluster
                                </Button>

                                <button
                                    type="button"
                                    id="refresh"
                                    onClick={onDiscover}
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
