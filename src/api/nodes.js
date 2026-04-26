import axios from 'axios';

// Helper to get token — matches old code: localStorage.getItem('token')
const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: '/',
});

// Matches legacy `postdata`/`$.ajax` behavior.
// Legacy `postdata` (dist/js/Qmain.js L182-194):
//   $.ajax({ url, dataType: "json", data })  -> jQuery defaults to GET, serializes data as ?k=v query string.
// Backend (fapi.py L113): `data = request.args.to_dict()` — reads ONLY from query string.
// Therefore everything must be on the URL, not in the body. FormData (file uploads) is the one exception.
api.interceptors.request.use((config) => {
    const token = getToken();

    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
        config.params = { ...config.params, ...config.data };
        delete config.data;
    }

    if (token) {
        config.params = { ...config.params, token };
    }

    // Cache-buster. Legacy `postdata` does NOT add one (jQuery defaults `cache: true` for dataType "json"),
    // but adding `_` (single underscore — matches jQuery's `cache: false` convention) is harmless: backend
    // ignores unrecognized keys. Do NOT use `__` (double underscore) — that's not what the legacy stack used.
    config.params = { ...config.params, _: Date.now() };

    return config;
}, (error) => {
    return Promise.reject(error);
});


export const fetchAllHostsInfo = () => {
    return api.get('api/v1/hosts/allinfo');
};

export const evacuateHost = (name) => {
    return api.get('api/v1/hosts/evacuate', { params: { name } });
};

// IMPORTANT: callers MUST send only the keys the user actually changed.
// Backend Hostconfig.py is key-presence driven:
//   if 'alias'   in arglist: ... put(alias/<name>) and broadcasts a sync entry
//   if 'cluster' in arglist: ... put(namespace/mgmtip) and broadcasts a sync entry
//   if 'ipaddr'  in arglist: ... DELETES ActivePartners/<name>, re-puts it, runs /TopStor/promserver.sh
//   if 'tz' / 'ntp' / 'gw' / 'dnsname' / 'configured' / port keys: each triggers its own broadcast/put.
// Sending an unchanged field will still re-run that branch — harmless for some, destructive for `ipaddr`.
export const configHost = (data) => {
    return api.get('api/v1/hosts/config', { params: data });
};

export const joinCluster = (name) => {
    return api.get('api/v1/hosts/joincluster', { params: { name } });
};

export const discoverHosts = () => {
    return api.get('api/v1/hosts/discover', { params: { name: 'nothing' } });
};

export const getHostConfig = async (nodeName) => {
    const response = await api.get('api/v1/hosts/getConfig', { params: { nodeName } });
    const blob = new Blob([response.data], { type: 'text/plain' });
    const fileName = nodeName + '_config.txt';
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

export const getAllHostConfigs = async () => {
    const response = await api.get('api/v1/hosts/getAllConfig', {
        responseType: 'blob',
        timeout: 240000,
    });
    const blob = new Blob([response.data], { type: 'application/zip' });
    const fileName = 'All_Config.zip';
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

export const updateDiscoveredNode = (data) => {
    return api.get('api/v1/hosts/config', { params: data });
};
