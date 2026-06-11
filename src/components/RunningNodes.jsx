import React, { useState, useEffect, useRef, useCallback } from 'react';
import { configHost, getHostConfig, getAllHostConfigs } from '../api/nodes';
import ServerNode from './Common/ServerNode';
import Button from './Common/Button';
import { ChevronDown } from 'lucide-react';

const TIMEZONE_OPTIONS = [
    { city: '0', timeZoneId: '-1', value: '-100', label: '-----------' },
    { city: 'International', timeZoneId: '1', value: '-12', label: '(GMT-12:00) International Date Line West' },
    { city: 'Midway', timeZoneId: '2', value: '-11', label: '(GMT-11:00) Midway Island, Samoa' },
    { city: 'Hawaii', timeZoneId: '3', value: '-10', label: '(GMT-10:00) Hawaii' },
    { city: 'Alaska', timeZoneId: '4', value: '-9', label: '(GMT-09:00) Alaska' },
    { city: 'Pacific', timeZoneId: '5', value: '-8', label: '(GMT-08:00) Pacific Time (US & Canada)' },
    { city: 'Tijuana', timeZoneId: '6', value: '-8', label: '(GMT-08:00) Tijuana, Baja California' },
    { city: 'Arizona', timeZoneId: '7', value: '-7', label: '(GMT-07:00) Arizona' },
    { city: 'Chihuahua', timeZoneId: '8', value: '-7', label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan' },
    { city: 'Mountain', timeZoneId: '9', value: '-7', label: '(GMT-07:00) Mountain Time (US & Canada)' },
    { city: 'Canada', timeZoneId: '10', value: '-6', label: '(GMT-06:00) Central America' },
    { city: 'Canada', timeZoneId: '11', value: '-6', label: '(GMT-06:00) Central Time (US & Canada)' },
    { city: 'Guadalajara', timeZoneId: '12', value: '-6', label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey' },
    { city: 'Saskatchewan', timeZoneId: '13', value: '-6', label: '(GMT-06:00) Saskatchewan' },
    { city: 'Lima', timeZoneId: '14', value: '-5', label: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco' },
    { city: 'Lima', timeZoneId: '15', value: '-5', label: '(GMT-05:00) Eastern Time (US & Canada)' },
    { city: 'Indiana', timeZoneId: '16', value: '-5', label: '(GMT-05:00) Indiana (East)' },
    { city: 'Atlantic', timeZoneId: '17', value: '-4', label: '(GMT-04:00) Atlantic Time (Canada)' },
    { city: 'Caracas', timeZoneId: '18', value: '-4', label: '(GMT-04:00) Caracas, La Paz' },
    { city: 'Manaus', timeZoneId: '19', value: '-4', label: '(GMT-04:00) Manaus' },
    { city: 'Santiago', timeZoneId: '20', value: '-4', label: '(GMT-04:00) Santiago' },
    { city: 'Brasilia', timeZoneId: '22', value: '-3', label: '(GMT-03:00) Brasilia' },
    { city: 'Buenos', timeZoneId: '23', value: '-3', label: '(GMT-03:00) Buenos Aires, Georgetown' },
    { city: 'Greenland', timeZoneId: '24', value: '-3', label: '(GMT-03:00) Greenland' },
    { city: 'Montevideo', timeZoneId: '25', value: '-3', label: '(GMT-03:00) Montevideo' },
    { city: 'Verde', timeZoneId: '27', value: '-1', label: '(GMT-01:00) Cape Verde Is.' },
    { city: 'Azores', timeZoneId: '28', value: '-1', label: '(GMT-01:00) Azores' },
    { city: 'Casablanca', timeZoneId: '29', value: '0', label: '(GMT+00:00) Casablanca, Monrovia, Reykjavik' },
    { city: 'Greenwich', timeZoneId: '30', value: '0', label: '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London' },
    { city: 'Amsterdam', timeZoneId: '31', value: '1', label: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna' },
    { city: 'Belgrade', timeZoneId: '32', value: '1', label: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague' },
    { city: 'Brussels', timeZoneId: '33', value: '1', label: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris' },
    { city: 'Sarajevo', timeZoneId: '34', value: '1', label: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb' },
    { city: 'GMT+1', timeZoneId: '35', value: '1', label: '(GMT+01:00) West Central Africa' },
    { city: 'Amman', timeZoneId: '36', value: '2', label: '(GMT+02:00) Amman' },
    { city: 'Athens', timeZoneId: '37', value: '2', label: '(GMT+02:00) Athens, Bucharest, Istanbul' },
    { city: 'Beirut', timeZoneId: '38', value: '2', label: '(GMT+02:00) Beirut' },
    { city: 'Cairo', timeZoneId: '39', value: '2', label: '(GMT+02:00) Cairo' },
    { city: 'Harare', timeZoneId: '40', value: '2', label: '(GMT+02:00) Harare, Pretoria' },
    { city: 'Helsinki', timeZoneId: '41', value: '2', label: '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius' },
    { city: 'Jerusalem', timeZoneId: '42', value: '2', label: '(GMT+02:00) Jerusalem' },
    { city: 'Minsk', timeZoneId: '43', value: '2', label: '(GMT+02:00) Minsk' },
    { city: 'Windhoek', timeZoneId: '44', value: '2', label: '(GMT+02:00) Windhoek' },
    { city: 'Kuwait', timeZoneId: '45', value: '3', label: '(GMT+03:00) Kuwait, Riyadh, Baghdad' },
    { city: 'Moscow', timeZoneId: '46', value: '3', label: '(GMT+03:00) Moscow, St. Petersburg, Volgograd' },
    { city: 'Nairobi', timeZoneId: '47', value: '3', label: '(GMT+03:00) Nairobi' },
    { city: 'Tbilisi', timeZoneId: '48', value: '3', label: '(GMT+03:00) Tbilisi' },
    { city: 'Tehran', timeZoneId: '49', value: '3.5', label: '(GMT+03:30) Tehran' },
    { city: 'Dhabi', timeZoneId: '50', value: '4', label: '(GMT+04:00) Abu Dhabi, Muscat' },
    { city: 'Baku', timeZoneId: '51', value: '4', label: '(GMT+04:00) Baku' },
    { city: 'Yerevan', timeZoneId: '52', value: '4', label: '(GMT+04:00) Yerevan' },
    { city: 'Kabul', timeZoneId: '53', value: '4.5', label: '(GMT+04:30) Kabul' },
    { city: 'Yekaterinburg', timeZoneId: '54', value: '5', label: '(GMT+05:00) Yekaterinburg' },
    { city: 'Islamabad', timeZoneId: '55', value: '5', label: '(GMT+05:00) Islamabad, Karachi, Tashkent' },
    { city: 'Jayawardenapura', timeZoneId: '56', value: '5.5', label: '(GMT+05:30) Sri Jayawardenapura' },
    { city: 'Chennai', timeZoneId: '57', value: '5.5', label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi' },
    { city: 'Kath', timeZoneId: '58', value: '5.75', label: '(GMT+05:45) Kathmandu' },
    { city: 'Almaty', timeZoneId: '59', value: '6', label: '(GMT+06:00) Almaty, Novosibirsk' },
    { city: 'Astana', timeZoneId: '60', value: '6', label: '(GMT+06:00) Astana, Dhaka' },
    { city: 'Yangon', timeZoneId: '61', value: '6.5', label: '(GMT+06:30) Yangon (Rangoon)' },
    { city: 'Jakarta', timeZoneId: '62', value: '7', label: '(GMT+07:00) Bangkok, Hanoi, Jakarta' },
    { city: 'Krasnoyarsk', timeZoneId: '63', value: '7', label: '(GMT+07:00) Krasnoyarsk' },
    { city: 'Hong', timeZoneId: '64', value: '8', label: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi' },
    { city: 'Lumpur', timeZoneId: '65', value: '8', label: '(GMT+08:00) Kuala Lumpur, Singapore' },
    { city: 'Irkutsk', timeZoneId: '66', value: '8', label: '(GMT+08:00) Irkutsk, Ulaan Bataar' },
    { city: 'Perth', timeZoneId: '67', value: '8', label: '(GMT+08:00) Perth' },
    { city: 'Taipei', timeZoneId: '68', value: '8', label: '(GMT+08:00) Taipei' },
    { city: 'Osaka', timeZoneId: '69', value: '9', label: '(GMT+09:00) Osaka, Sapporo, Tokyo' },
    { city: 'Seoul', timeZoneId: '70', value: '9', label: '(GMT+09:00) Seoul' },
    { city: 'Yakutsk', timeZoneId: '71', value: '9', label: '(GMT+09:00) Yakutsk' },
    { city: 'Adelaide', timeZoneId: '72', value: '9.5', label: '(GMT+09:30) Adelaide' },
    { city: 'Darwin', timeZoneId: '73', value: '9.5', label: '(GMT+09:30) Darwin' },
    { city: 'Brisbane', timeZoneId: '74', value: '10', label: '(GMT+10:00) Brisbane' },
    { city: 'Canberra', timeZoneId: '75', value: '10', label: '(GMT+10:00) Canberra, Melbourne, Sydney' },
    { city: 'Hobart', timeZoneId: '76', value: '10', label: '(GMT+10:00) Hobart' },
    { city: 'Guam', timeZoneId: '77', value: '10', label: '(GMT+10:00) Guam, Port Moresby' },
    { city: 'Vladivostok', timeZoneId: '78', value: '10', label: '(GMT+10:00) Vladivostok' },
    { city: 'Magadan', timeZoneId: '79', value: '11', label: '(GMT+11:00) Magadan, Solomon Is., New Caledonia' },
    { city: 'Auckland', timeZoneId: '80', value: '12', label: '(GMT+12:00) Auckland, Wellington' },
    { city: 'Fiji', timeZoneId: '81', value: '12', label: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.' },
];

const RunningNodes = ({ hosts, allHosts, selectedHostName, onSelect, onRefresh }) => {
    const [formData, setFormData] = useState({
        alias: '',
        ipaddr: '',
        ipaddrsubnet: 24,
        nmports: [],
        cmports: [],
        dports: [],
        iports: [],
        cluster: '',
        mgmtSub: 24,
        tz: '-100',
        tzCity: '',
        tzLabel: '',
        ntp: '',
        ntpName: '',
        gw: '',
        dnsname: '',
        dnssearch: '',
        configured: false
    });
    const [isExpanded, setIsExpanded] = useState(true);
    const [availablePorts, setAvailablePorts] = useState([]);
    const [bondInfo, setBondInfo] = useState({ bNode: 'bond 1', bCluster: 'bond 2', bData: 'bond 3', bInternet: 'bond 4' });

    const nmportsRef = useRef(null);
    const cmportsRef = useRef(null);
    const dportsRef = useRef(null);
    const iportsRef = useRef(null);
    const tzRef = useRef(null);

    const selectedHostListItem = selectedHostName
        ? hosts.find(h => (h.name === selectedHostName || h.alias === selectedHostName))
        : null;

    // Resolve selected host safely whether allHosts is keyed by name, alias, or ids.
    const selectedHostFromAll = selectedHostName && allHosts
        ? (allHosts[selectedHostName] || Object.values(allHosts).find(h => h && (h.name === selectedHostName || h.alias === selectedHostName)))
        : null;

    // Derived state for the "selected" host object — always current server data
    const selectedHost = selectedHostFromAll || selectedHostListItem || null;

    const selectedHostIndex = selectedHostName
        ? hosts.findIndex(h => (h.name === selectedHostName || h.alias === selectedHostName))
        : -1;

    // Snapshot of original host data for change-detection on submit
    const [hostConfig, setHostConfig] = useState(null);

    const computeBondInfo = useCallback(() => {
        const $ = window.$;
        if (!$ || !$.fn.select2) return;

        const nmVal = ($('#nmports').val() || []).sort().join(',');
        const cmVal = ($('#cmports').val() || []).sort().join(',');
        const dVal = ($('#dports').val() || []).sort().join(',');
        const iVal = ($('#iports').val() || []).sort().join(',');

        let bNode = 'bond 1';
        let bCluster = (cmVal === nmVal && cmVal !== '') ? 'bond 1' : 'bond 2';
        let bData;
        if (dVal === nmVal && dVal !== '') bData = 'bond 1';
        else if (dVal === cmVal && dVal !== '') bData = 'bond 2';
        else bData = 'bond 3';

        let bInternet;
        if (iVal === nmVal && iVal !== '') bInternet = 'bond 1';
        else if (iVal === cmVal && iVal !== '') bInternet = 'bond 2';
        else if (iVal === dVal && iVal !== '') bInternet = 'bond 3';
        else bInternet = 'bond 4';

        setBondInfo({ bNode, bCluster, bData, bInternet });
    }, []);

    const setupPortExclusivity = useCallback(() => {
        const $ = window.$;
        if (!$ || !$.fn.select2) return;

        $('#nmports, #cmports, #dports, #iports').off('select2:select select2:unselect');

        const dataBondBoxes = ['nmports', 'cmports', 'dports'];

        dataBondBoxes.forEach(function (currentId) {
            $('#' + currentId).on('select2:select', function () {
                const currentVals = $('#' + currentId).val() || [];

                dataBondBoxes.forEach(function (otherId) {
                    if (currentId === otherId) return;
                    const otherVals = $('#' + otherId).val() || [];
                    const hasOverlap = currentVals.some(p => otherVals.includes(p));

                    if (hasOverlap) {
                        const union = [...new Set([...currentVals, ...otherVals])];
                        $('#' + otherId).val(union).trigger('change');
                        if (union.length !== currentVals.length) {
                            $('#' + currentId).val(union).trigger('change');
                        }
                    }
                });
                refreshIportsAvailability();
                computeBondInfo();
                syncPortsToReactState();
            });
        });

        dataBondBoxes.forEach(function (currentId) {
            $('#' + currentId).on('select2:unselect', function (e) {
                const removedPort = e.params.data.id;

                dataBondBoxes.forEach(function (otherId) {
                    if (currentId === otherId) return;
                    const otherVals = $('#' + otherId).val() || [];
                    if (otherVals.includes(removedPort)) {
                        const newOtherVals = otherVals.filter(p => p !== removedPort);
                        $('#' + otherId).val(newOtherVals).trigger('change');
                    }
                });
                refreshIportsAvailability();
                computeBondInfo();
                syncPortsToReactState();
            });
        });

        $('#iports').on('select2:select select2:unselect', function () {
            refreshIportsAvailability();
            computeBondInfo();
            syncPortsToReactState();
        });

        refreshIportsAvailability();
    }, [computeBondInfo]);

    const refreshIportsAvailability = () => {
        const $ = window.$;
        if (!$) return;

        const dataPorts = new Set();
        ['nmports', 'cmports', 'dports'].forEach(id => {
            ($('#' + id).val() || []).forEach(p => dataPorts.add(p));
        });

        const iPorts = new Set($('#iports').val() || []);

        $('#iports option').each(function () {
            const port = $(this).val();
            $(this).prop('disabled', dataPorts.has(port));
        });

        ['nmports', 'cmports', 'dports'].forEach(id => {
            $('#' + id + ' option').each(function () {
                const port = $(this).val();
                $(this).prop('disabled', iPorts.has(port));
            });
        });
    };

    const syncPortsToReactState = () => {
        const $ = window.$;
        if (!$) return;
        setFormData(prev => ({
            ...prev,
            nmports: $('#nmports').val() || [],
            cmports: $('#cmports').val() || [],
            dports: $('#dports').val() || [],
            iports: $('#iports').val() || [],
        }));
    };

    // Ensure form is blanked for new config entries when a host is selected
    useEffect(() => {
        if (!selectedHostName) {
            setFormData({
                alias: '', ipaddr: '', ipaddrsubnet: 24,
                nmports: [], cmports: [], dports: [], iports: [],
                cluster: '', mgmtSub: 24, tz: '-100', tzCity: '', tzLabel: '',
                ntp: '', ntpName: '', gw: '', dnsname: '', dnssearch: '',
                configured: false
            });
            setAvailablePorts([]);
            setHostConfig(null);
            return;
        }

        const host = selectedHost;
        if (!host) return;

        let parsedPorts = [];
        if (host.phy_ports && Array.isArray(host.phy_ports)) {
            parsedPorts = host.phy_ports.filter(p => p.trim() !== '').map(p => p.trim());
        } else if (host.ports && host.ports.length >= 1 && Array.isArray(host.ports[0])
            && typeof host.ports[0][1] === 'string') {
            parsedPorts = host.ports[0][1].split('/').map(p => p.trim());
        } else if (host.ports && typeof host.ports === 'string') {
            parsedPorts = host.ports.split('/').map(p => p.trim()).filter(p => p !== '');
        } else if (Array.isArray(host.ports)) {
            parsedPorts = host.ports;
        }

        // Initialize form with empty/default values for NEW configurations
        // The right-hand gray boxes will still show the existing host config via `selectedHost`
        const newFormData = {
            alias: '',
            ipaddr: '',
            ipaddrsubnet: 24,
            nmports: [],
            cmports: [],
            dports: [],
            iports: [],
            cluster: '',
            mgmtSub: 24,
            tz: '-100',
            tzCity: '',
            tzLabel: '',
            ntp: '',
            ntpName: '',
            gw: '',
            dnsname: '',
            dnssearch: '',
            // Keep the initial checkbox synced to avoid accidental status flips on submit
            configured: host.configured === 'no'
        };

        setFormData(newFormData);
        setAvailablePorts(parsedPorts);
        setHostConfig(JSON.parse(JSON.stringify(host)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedHostName, selectedHost]);

    useEffect(() => {
        const $ = window.$;
        if (!$) return;

        if ($.fn.inputmask) {
            $(".ipaddress").inputmask({ alias: "ip", placeholder: "xxx.xxx.xxx.xxx", showMaskOnHover: false, showMaskOnFocus: true });
        }

        const select2Options = { theme: 'bootstrap4', width: '100%' };
        if ($.fn.select2) {
            $(tzRef.current).select2(select2Options).on('change', (e) => {
                const value = $(e.target).val();
                setFormData(prev => ({ ...prev, tz: value }));
            });
        }

        return () => {
            if ($.fn.select2) {
                try {
                    if ($(tzRef.current).hasClass("select2-hidden-accessible")) {
                        $(tzRef.current).select2('destroy');
                    }
                } catch (e) { /* ignore */ }
            }
        };
    }, []);

    useEffect(() => {
        const $ = window.$;
        if (!$ || !$.fn.select2) return;

        const portData = availablePorts.map(p => ({ id: p, text: p }));

        const portIds = ['nmports', 'cmports', 'dports', 'iports'];
        portIds.forEach(id => {
            const $el = $('#' + id);
            try {
                if ($el.hasClass("select2-hidden-accessible")) {
                    $el.select2('destroy');
                }
            } catch (e) { /* ignore */ }
            $el.empty();
            $el.select2({ data: portData, placeholder: 'Select ports', width: '100%', theme: 'bootstrap4' });
        });

        $('#nmports').val(formData.nmports).trigger('change.select2');
        $('#cmports').val(formData.cmports).trigger('change.select2');
        $('#dports').val(formData.dports).trigger('change.select2');
        $('#iports').val(formData.iports).trigger('change.select2');

        setupPortExclusivity();
        computeBondInfo();
        $(tzRef.current).val(formData.tz).trigger('change.select2');

        return () => {
            portIds.forEach(id => {
                try {
                    const $el = $('#' + id);
                    if ($el.hasClass("select2-hidden-accessible")) {
                        $el.select2('destroy');
                    }
                } catch (e) { /* ignore */ }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availablePorts]);

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
        if (!selectedHost || !hostConfig) {
            console.warn("Submit aborted: No host or host config.", { selectedHost, hostConfig });
            return;
        }

        const $ = window.$;

        const looksLikeMaskPlaceholder = (s) => {
            if (s == null) return true;
            const v = String(s);
            if (v.trim() === '') return true;
            if (v.includes('_')) return true;
            return false;
        };

        const readField = (selector, fallback) => {
            const dom = $ ? ($(selector).val() ?? '') : '';
            const val = (dom !== '' ? dom : (fallback ?? ''));
            return String(val);
        };

        const actAlias = readField('#BoxName', formData.alias);
        const actIpaddr = readField('#IPAddress', formData.ipaddr);
        const actIpaddrsubnet = readField('#ipaddrsubnet', formData.ipaddrsubnet);
        const actCluster = readField('#Mgmt', formData.cluster);
        const actMgmtSub = readField('#MgmtSub', formData.mgmtSub);
        const actNtp = readField('#NTP', formData.ntp);
        const actNtpName = readField('#NTPname', formData.ntpName);
        const actGw = readField('#GW', formData.gw);
        const actDnsname = readField('#DNSname', formData.dnsname);
        const actDnssearch = readField('#DNSsearch', formData.dnssearch);

        const currentNmports = $ ? ($('#nmports').val() || []) : formData.nmports;
        const currentCmports = $ ? ($('#cmports').val() || []) : formData.cmports;
        const currentDports = $ ? ($('#dports').val() || []) : formData.dports;
        const currentIports = $ ? ($('#iports').val() || []) : formData.iports;

        let tochange = 0;
        const hostsubmit = {};

        // alias
        if (actAlias.length > 3 && !looksLikeMaskPlaceholder(actAlias) && actAlias !== hostConfig.alias) {
            hostsubmit.alias = actAlias;
            tochange = 1;
        }

        // ipaddr / subnet
        if (actIpaddr.length > 3 && !actIpaddr.includes('_') && actIpaddr !== hostConfig.ipaddr) {
            hostsubmit.ipaddr = actIpaddr;
            hostsubmit.ipaddrsubnet = actIpaddrsubnet;
            tochange = 1;
        }
        if (String(actIpaddrsubnet) !== String(hostConfig.ipaddrsubnet)) {
            if (actIpaddr.length > 3 && !actIpaddr.includes('_')) {
                hostsubmit.ipaddr = actIpaddr;
                hostsubmit.ipaddrsubnet = actIpaddrsubnet;
                tochange = 1;
            }
        }

        // ports
        const portChecks = [
            { key: 'nmports', current: currentNmports },
            { key: 'cmports', current: currentCmports },
            { key: 'dports', current: currentDports },
            { key: 'iports', current: currentIports },
        ];
        portChecks.forEach(({ key, current }) => {
            const currentVal = current || [];
            let configVal = hostConfig[key];
            if (key === 'dports' && !configVal) configVal = hostConfig.dataport;
            if (typeof configVal === 'string') {
                configVal = configVal.split(',').map(s => s.trim());
            } else if (!Array.isArray(configVal)) {
                configVal = [];
            }
            if (currentVal.length > 0 && JSON.stringify([...currentVal].sort()) !== JSON.stringify([...configVal].sort())) {
                hostsubmit[key] = currentVal.join(',');
                tochange = 1;
            }
        });

        // cluster
        const currentCluster = actCluster + '/' + actMgmtSub;
        if (actCluster.length > 3 && !actCluster.includes('_') && currentCluster !== hostConfig.cluster) {
            hostsubmit.cluster = currentCluster;
            tochange = 1;
        }

        // timezone
        if (formData.tz !== '-100') {
            let tzflag = 0;
            const selectedTzOption = TIMEZONE_OPTIONS.find(opt => opt.value === formData.tz && opt.timeZoneId !== '-1');
            if (selectedTzOption) {
                try {
                    const currentTzText = hostConfig.tz ? hostConfig.tz.split('%')[1].replace('!', ':').replace(/\^/g, ',').replace(/_/g, ' ') : '';
                    if (selectedTzOption.label !== currentTzText) tzflag = 1;
                } catch { tzflag = 1; }
                if (tzflag > 0) {
                    const encodedText = selectedTzOption.label
                        .split(' ').join('_')
                        .split(',').join('^')
                        .split(':').join('!');
                    hostsubmit.tz = selectedTzOption.city + '%' + encodedText;
                    tochange = 1;
                }
            }
        }

        // ntp (IP)
        if (actNtp.length > 3 && !actNtp.includes('_') && actNtp !== hostConfig.ntp) {
            hostsubmit.ntp = actNtp;
            tochange = 1;
        }
        // ntp (name)
        if (actNtpName.length > 3 && !looksLikeMaskPlaceholder(actNtpName) && actNtpName !== hostConfig.ntp) {
            hostsubmit.ntp = actNtpName;
            tochange = 1;
        }

        // gateway
        if (actGw.length > 3 && !actGw.includes('_') && actGw !== hostConfig.gw) {
            hostsubmit.gw = actGw;
            tochange = 1;
        }

        // DNS
        if (actDnsname.length > 3 && !actDnsname.includes('_') && actDnsname !== (hostConfig.dnsname || '')) {
            hostsubmit.dnsname = actDnsname;
            hostsubmit.dnssearch = actDnssearch;
            tochange = 1;
        }
        if (actDnssearch.length > 3 && !looksLikeMaskPlaceholder(actDnssearch) && actDnssearch !== (hostConfig.dnssearch || '')) {
            hostsubmit.dnssearch = actDnssearch;
            hostsubmit.dnsname = actDnsname;
            tochange = 1;
        }

        // configured
        if (formData.configured === false && hostConfig.configured === 'no') {
            hostsubmit.configured = 'yes';
            tochange = 1;
        }
        if (formData.configured === true && hostConfig.configured !== 'no') {
            hostsubmit.configured = 'no';
            tochange = 1;
        }

        if (tochange > 0) {
            hostsubmit.id = selectedHostIndex;
            hostsubmit.user = 'mezo';
            hostsubmit.name = selectedHostName;
            try {
                await configHost(hostsubmit);
                onRefresh();
            } catch (err) {
                console.error("Failed to update node", err);
            }
        } else {
            console.log("No changes detected; nothing sent.");
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
                    <h3 className="text-lg font-semibold text-gray-800">Run Nodes</h3>
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
                            {hosts.map(host => {
                                const hostName = host.name || host.alias;
                                return (
                                    <div key={hostName}>
                                        <ServerNode
                                            name={hostName}
                                            ip={host.ip || host.ipaddr}
                                            state="up"
                                            onClick={() => onSelect(hostName)}
                                            selected={selectedHostName === hostName}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Config Form */}
                    <div className="p-6" id="runninghosts">
                        <form onSubmit={handleSubmit} className="space-y-6 hostform">

                            {/* Join Cluster Switch */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <label className="text-sm font-medium text-gray-700">Ready to join an existing cluster</label>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300 transition runningnodes"
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
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 runningnodes"
                                        id="BoxName"
                                        name="alias"
                                        value={formData.alias}
                                        onChange={handleChange}
                                        disabled={!selectedHost}
                                        placeholder="Node Name"
                                    />
                                </div>
                                <div className="lg:col-span-5 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono text-center lg:text-left truncate">
                                    <span id="cBoxName">{selectedHost ? (selectedHost.alias || '') : 'select a node...'}</span>
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
                                                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress runningnodes"
                                                id="IPAddress"
                                                name="ipaddr"
                                                value={formData.ipaddr}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                            <input
                                                type="number"
                                                min="8" max="32" step="8"
                                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 runningnodes"
                                                id="ipaddrsubnet"
                                                name="ipaddrsubnet"
                                                value={formData.ipaddrsubnet}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-1">
                                                <select ref={nmportsRef} className="select2 multiple w-full runningnodes" multiple="multiple" id="nmports" name="nmports" data-placeholder="Select ports" disabled={!selectedHost}>
                                                </select>
                                            </div>
                                            <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                                <span id="bNode">{bondInfo.bNode}</span>
                                            </div>
                                            <div className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                                <span id="cIPAddress">{selectedHost ? `${selectedHost.ipaddr || ''}/${selectedHost.ipaddrsubnet || '24'}` : 'select a node...'}</span>
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
                                                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress runningnodes"
                                                id="Mgmt"
                                                name="cluster"
                                                value={formData.cluster}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                            <input
                                                type="number"
                                                min="8" max="32" step="8"
                                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 runningnodes"
                                                id="MgmtSub"
                                                name="mgmtSub"
                                                value={formData.mgmtSub}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-1">
                                                <select ref={cmportsRef} className="select2 multiple w-full runningnodes" multiple="multiple" id="cmports" name="cmports" data-placeholder="Select ports" disabled={!selectedHost}>
                                                </select>
                                            </div>
                                            <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                                <span id="bCluster">{bondInfo.bCluster}</span>
                                            </div>
                                            <div className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                                <span id="cMgmt">{selectedHost ? (selectedHost.cluster || '') : 'select a node...'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Data Ports */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Data Ports</label>
                                <div className="lg:col-span-4">
                                    <select ref={dportsRef} className="select2 multiple w-full runningnodes" multiple="multiple" id="dports" name="dports" data-placeholder="Select ports" disabled={!selectedHost}>
                                    </select>
                                </div>
                                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="bData">{bondInfo.bData}</span>
                                </div>
                                <div className="lg:col-span-4 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="dataPorts">{selectedHost ? (parsePortDisplay(selectedHost.dports || selectedHost.dataport) || 'not set') : 'select a node...'}</span>
                                </div>
                            </div>

                            {/* Internet Ports */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Internet Ports</label>
                                <div className="lg:col-span-4">
                                    <select ref={iportsRef} className="select2 multiple w-full runningnodes" multiple="multiple" id="iports" name="iports" data-placeholder="Select ports" disabled={!selectedHost}>
                                    </select>
                                </div>
                                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="bInternet">{bondInfo.bInternet}</span>
                                </div>
                                <div className="lg:col-span-4 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="internetPorts">{selectedHost ? (parsePortDisplay(selectedHost.iports) || 'not set') : 'select a node...'}</span>
                                </div>
                            </div>

                            {/* Time Zone */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Time Zone</label>
                                <div className="lg:col-span-4">
                                    <select ref={tzRef} className="select2 w-full runningnodes" id="TZ" name="tz" disabled={!selectedHost}>
                                        {TIMEZONE_OPTIONS.map(opt => (
                                            <option
                                                key={opt.timeZoneId}
                                                value={opt.value}
                                                data-city={opt.city}
                                                data-timezoneid={opt.timeZoneId}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="lg:col-span-5 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="cTZ">{selectedHost ? displayTZ(selectedHost.tz) : 'select a node...'}</span>
                                </div>
                            </div>

                            {/* NTP Server */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">NTP Server</label>
                                <div className="lg:col-span-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="xxx.xxx.xxx.xxx"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress runningnodes"
                                            id="NTP"
                                            name="ntp"
                                            value={formData.ntp}
                                            onChange={handleChange}
                                            disabled={!selectedHost}
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-500 whitespace-nowrap">Name</label>
                                            <input
                                                type="text"
                                                placeholder="NTP Name"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 runningnodes"
                                                id="NTPname"
                                                name="ntpName"
                                                value={formData.ntpName}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-3 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="cNTP">{selectedHost ? (selectedHost.ntp || 'select a node...') : 'select a node...'}</span>
                                </div>
                            </div>

                            {/* DNS Server */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">DNS Server</label>
                                <div className="lg:col-span-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="xxx.xxx.xxx.xxx"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress runningnodes"
                                            id="DNSname"
                                            name="dnsname"
                                            value={formData.dnsname}
                                            onChange={handleChange}
                                            disabled={!selectedHost}
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-500 whitespace-nowrap">Search</label>
                                            <input
                                                type="text"
                                                placeholder="Domain Name"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 runningnodes"
                                                id="DNSsearch"
                                                name="dnssearch"
                                                value={formData.dnssearch}
                                                onChange={handleChange}
                                                disabled={!selectedHost}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-3 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="cDNS">{selectedHost ? `${selectedHost.dnsname || ''}/${selectedHost.dnssearch || ''}` : 'select a node...'}</span>
                                </div>
                            </div>

                            {/* Gateway */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <label className="lg:col-span-3 text-sm font-semibold text-gray-700">Gateway/router</label>
                                <div className="lg:col-span-4">
                                    <input
                                        type="text"
                                        placeholder="xxx.xxx.xxx.xxx"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 ipaddress runningnodes"
                                        id="GW"
                                        name="gw"
                                        value={formData.gw}
                                        onChange={handleChange}
                                        disabled={!selectedHost}
                                    />
                                </div>
                                <div className="lg:col-span-5 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 font-mono truncate">
                                    <span id="cGW">{selectedHost ? (selectedHost.gw || '') : 'select a node...'}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-gray-100 mt-6">
                                <Button
                                    type="submit"
                                    id="readysubmit"
                                    disabled={!selectedHost}
                                    bgColor="bg-emerald-600"
                                    onClick={handleSubmit}
                                >
                                    Update Node
                                </Button>

                                <button
                                    type="button"
                                    id="getConfig"
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

// Helper: display port values from server data (handles string or array)
function parsePortDisplay(val) {
    if (!val) return '';
    if (typeof val === 'string') return val.split(',').map(s => s.trim()).join(', ');
    if (Array.isArray(val)) return val.join(', ');
    return String(val);
}

export default RunningNodes;