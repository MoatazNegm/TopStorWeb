import React, { useState, useEffect, useRef } from 'react';
import { configHost, getHostConfig, getAllHostConfigs } from '../api/nodes';
import ServerNode from './Common/ServerNode';
import Button from './Common/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const RunningNodes = ({ hosts, allHosts, selectedHostName, onSelect, onRefresh }) => {
    const [formData, setFormData] = useState({
        alias: '',
        ipaddr: '',
        ipaddrsubnet: 24,
        nmports: [],
        cmports: [],
        dports: [],
        cluster: '',
        mgmtSub: 24,
        tz: '-100',
        ntp: '',
        ntpName: '',
        gw: '',
        dnsname: '',
        dnssearch: '',
        configured: false
    });
    const [isExpanded, setIsExpanded] = useState(true);

    const nmportsRef = useRef(null);
    const cmportsRef = useRef(null);
    const dportsRef = useRef(null);
    const tzRef = useRef(null);

    // Derived state for the "selected" host object
    const selectedHost = allHosts ? allHosts[selectedHostName] : null;

    useEffect(() => {
        if (selectedHost) {
            // Populate form
            setFormData({
                alias: selectedHost.alias || '',
                ipaddr: selectedHost.ipaddr || selectedHost.ip || '',
                ipaddrsubnet: selectedHost.ipaddrsubnet || 24,
                nmports: selectedHost.nmports ? (typeof selectedHost.nmports === 'string' ? selectedHost.nmports.split(',') : selectedHost.nmports) : [],
                cmports: selectedHost.cmports ? (typeof selectedHost.cmports === 'string' ? selectedHost.cmports.split(',') : selectedHost.cmports) : [],
                dports: selectedHost.dports ? (typeof selectedHost.dports === 'string' ? selectedHost.dports.split(',') : selectedHost.dports) : [],
                cluster: selectedHost.cluster ? selectedHost.cluster.split('/')[0] : (selectedHost.ipaddr || selectedHost.ip || '').split('.').slice(0, 3).join('.') + '.0',
                mgmtSub: selectedHost.cluster ? selectedHost.cluster.split('/')[1] || 24 : 24,
                tz: selectedHost.tz || '-100',
                ntp: selectedHost.ntp || '',
                ntpName: selectedHost.ntpName || selectedHost.ntp || '',
                gw: selectedHost.gw || '',
                dnsname: selectedHost.dnsname || '',
                dnssearch: selectedHost.dnssearch || '',
                configured: selectedHost.configured !== 'no'
            });
        } else {
            // Reset form
            setFormData({
                alias: '',
                ipaddr: '',
                ipaddrsubnet: 24,
                nmports: [],
                cmports: [],
                dports: [],
                cluster: '',
                mgmtSub: 24,
                tz: '-100',
                ntp: '',
                ntpName: '',
                gw: '',
                dnsname: '',
                dnssearch: '',
                configured: false
            });
        }
    }, [selectedHost]);

    // Integrate Select2 and Inputmask
    useEffect(() => {
        // @ts-ignore
        const $ = window.$;
        if (!$) return;

        // Initialize Select2
        const select2Options = { theme: 'bootstrap4', width: '100%' };
        if ($.fn.select2) {
            $(nmportsRef.current).select2(select2Options).on('change', (e) => {
                const values = $(e.target).val();
                setFormData(prev => ({ ...prev, nmports: values }));
            });
            $(cmportsRef.current).select2(select2Options).on('change', (e) => {
                const values = $(e.target).val();
                setFormData(prev => ({ ...prev, cmports: values }));
            });
            $(dportsRef.current).select2(select2Options).on('change', (e) => {
                const values = $(e.target).val();
                setFormData(prev => ({ ...prev, dports: values }));
            });
            $(tzRef.current).select2(select2Options).on('change', (e) => {
                const value = $(e.target).val();
                setFormData(prev => ({ ...prev, tz: value }));
            });
        }

        // Initialize Inputmask
        if ($.fn.inputmask) {
            $(".ipaddress").inputmask({ alias: "ip", placeholder: "xxx.xxx.xxx.xxx", showMaskOnHover: false, showMaskOnFocus: true });
        }

        return () => {
            if ($.fn.select2) {
                $(nmportsRef.current).select2('destroy');
                $(cmportsRef.current).select2('destroy');
                $(dportsRef.current).select2('destroy');
                $(tzRef.current).select2('destroy');
            }
        };
    }, []);

    // Sync Select2 values when formData changes (e.g. on host selection)
    useEffect(() => {
        // @ts-ignore
        const $ = window.$;
        if (!$ || !$.fn.select2) return;
        $(nmportsRef.current).val(formData.nmports).trigger('change.select2');
        $(cmportsRef.current).val(formData.cmports).trigger('change.select2');
        $(dportsRef.current).val(formData.dports).trigger('change.select2');
        $(tzRef.current).val(formData.tz).trigger('change.select2');
    }, [formData.nmports, formData.cmports, formData.dports, formData.tz]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedHost) return;

        const payload = {
            id: selectedHostName,
            name: selectedHostName,
            user: 'mezo',
            alias: formData.alias,
            ipaddr: formData.ipaddr,
            ipaddrsubnet: formData.ipaddrsubnet,
            nmports: formData.nmports.join(','),
            cmports: formData.cmports.join(','),
            dports: formData.dports.join(','),
            cluster: formData.cluster + '/' + formData.mgmtSub,
            tz: formData.tz,
            ntp: formData.ntp || formData.ntpName,
            gw: formData.gw,
            dnsname: formData.dnsname,
            dnssearch: formData.dnssearch,
            configured: formData.configured ? 'yes' : 'no'
        };

        try {
            await configHost(payload);
            onRefresh();
        } catch (err) {
            console.error(err);
            alert("Failed to update node");
        }
    };

    const displayTZ = (tzStr) => {
        if (!tzStr || tzStr === '-100') return 'not set yet';
        try {
            return tzStr.split('%')[1].replace('!', ':').replace(/\^/g, ',').replace(/_/g, ' ');
        } catch {
            return tzStr;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 relative">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-500"></div>
            {/* Header */}
            <div
                className="px-6 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <button className={`text-gray-400 hover:text-emerald-600 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown size={20} />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-800">Running Nodes</h3>
                </div>
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); getAllHostConfigs(); }}
                    className="hidden sm:block bg-white border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-all"
                >
                    Download all configs
                </button>
            </div>

            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Nodes Grid */}
                    <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="hostsready">
                            {hosts.map(host => (
                                <div key={host.name}>
                                    <ServerNode
                                        name={host.name}
                                        ip={host.ip || host.ipaddr}
                                        state="up"
                                        onClick={() => onSelect(host.name)}
                                        selected={selectedHostName === host.name}
                                    />
                                </div>
                            ))}
                            {hosts.length === 0 && (
                                <div className="col-span-full text-center py-8 text-gray-400 text-sm">
                                    No running nodes found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Config Form */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Join Cluster Switch */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <label className="text-sm font-medium text-gray-700">Ready to join an existing cluster</label>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300 transition"
                                        id="customSwitch1"
                                        name="configured"
                                        checked={formData.configured}
                                        onChange={handleChange}
                                        disabled={!selectedHost}
                                    />
                                </div>
                            </div>

                            {/* Node Name */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Node Name</label>
                                <div className="lg:col-span-4">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400"
                                        name="alias"
                                        value={formData.alias}
                                        onChange={handleChange}
                                        disabled={!selectedHost}
                                    />
                                </div>
                                <div className="lg:col-span-5 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono text-center lg:text-left truncate">
                                    {selectedHost ? formData.alias : 'select a node...'}
                                </div>
                            </div>

                            {/* Node Address */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Node Address</label>
                                <div className="lg:col-span-9">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="xxx.xxx.xxx.xxx"
                                                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress"
                                                name="ipaddr"
                                                value={formData.ipaddr}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                            <input
                                                type="number"
                                                min="8" max="32" step="8"
                                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400"
                                                name="ipaddrsubnet"
                                                value={formData.ipaddrsubnet}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-1">
                                                <select ref={nmportsRef} className="select2 multiple w-full" multiple="multiple" name="nmports" disabled={!selectedHost}>
                                                    <option>eth1</option>
                                                    <option>eth2</option>
                                                    <option>eth3</option>
                                                    <option>eth4</option>
                                                </select>
                                            </div>
                                            <div className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                                {selectedHost ? `${formData.ipaddr}/${formData.ipaddrsubnet}` : 'select a node...'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cluster Address */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Cluster Address</label>
                                <div className="lg:col-span-9">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="xxx.xxx.xxx.xxx"
                                                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress"
                                                name="cluster"
                                                value={formData.cluster}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                            <input
                                                type="number"
                                                min="8" max="32" step="8"
                                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400"
                                                name="mgmtSub"
                                                value={formData.mgmtSub}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-1">
                                                <select ref={cmportsRef} className="select2 multiple w-full" multiple="multiple" name="cmports" disabled={!selectedHost}>
                                                    <option>eth1</option>
                                                    <option>eth2</option>
                                                    <option>eth3</option>
                                                    <option>eth4</option>
                                                </select>
                                            </div>
                                            <div className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                                {selectedHost ? `${formData.cluster}/${formData.mgmtSub}` : 'select a node...'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Data Ports */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Data Ports</label>
                                <div className="lg:col-span-4">
                                    <select ref={dportsRef} className="select2 multiple w-full" multiple="multiple" name="dports" disabled={!selectedHost}>
                                        <option>eth1</option>
                                        <option>eth2</option>
                                        <option>eth3</option>
                                        <option>eth4</option>
                                    </select>
                                </div>
                                <div className="lg:col-span-5 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    {selectedHost ? formData.dports.join(', ') : 'select a node...'}
                                </div>
                            </div>

                            {/* Time Zone */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Time Zone</label>
                                <div className="lg:col-span-4">
                                    <select ref={tzRef} className="select2 w-full" name="tz" disabled={!selectedHost}>
                                        <option value="-100">-----------</option>
                                        <option value="-12">(GMT-12:00) International Date Line West</option>
                                        <option value="-11">(GMT-11:00) Midway Island, Samoa</option>
                                        <option value="-10">(GMT-10:00) Hawaii</option>
                                        {/* ... Add other options from Qnodes.html if needed ... */}
                                        <option value="2">(GMT+02:00) Cairo</option>
                                    </select>
                                </div>
                                <div className="lg:col-span-5 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    {selectedHost ? displayTZ(formData.tz) : 'select a node...'}
                                </div>
                            </div>

                            {/* NTP Server */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">NTP Server</label>
                                <div className="lg:col-span-9">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="xxx.xxx.xxx.xxx"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress"
                                            name="ntp"
                                            value={formData.ntp}
                                            onChange={handleChange}
                                            disabled={!selectedHost}
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-500 whitespace-nowrap">Name:</label>
                                            <input
                                                type="text"
                                                placeholder="NTP Name"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400"
                                                name="ntpName"
                                                value={formData.ntpName}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DNS Server */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">DNS Server</label>
                                <div className="lg:col-span-9">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="xxx.xxx.xxx.xxx"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress"
                                            name="dnsname"
                                            value={formData.dnsname}
                                            onChange={handleChange}
                                            disabled={!selectedHost}
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-500 whitespace-nowrap">Search:</label>
                                            <input
                                                type="text"
                                                placeholder="Domain Name"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400"
                                                name="dnssearch"
                                                value={formData.dnssearch}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gateway */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Gateway</label>
                                <div className="lg:col-span-4">
                                    <input
                                        type="text"
                                        placeholder="xxx.xxx.xxx.xxx"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress"
                                        name="gw"
                                        value={formData.gw}
                                        onChange={handleChange}
                                        disabled={!selectedHost}
                                    />
                                </div>
                                <div className="lg:col-span-5 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    {selectedHost ? formData.gw : 'select a node...'}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-gray-100 mt-6">
                                <Button
                                    type="submit"
                                    disabled={!selectedHost}
                                    bgColor="bg-emerald-600"
                                    onClick={handleSubmit}
                                >
                                    Update Node Config
                                </Button>

                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); getHostConfig(selectedHostName); }}
                                    disabled={!selectedHost}
                                    className={`
                                        w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border
                                        ${!selectedHost
                                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                                        }
                                    `}
                                >
                                    Download Config
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RunningNodes;
