import axios from 'axios';

// Helper to get token — matches old code: localStorage.getItem('token')
const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: '/',
});

// Matches old jQuery $.ajax behavior:
// - GET: token as query param
// - POST: token merged into form-encoded body
api.interceptors.request.use((config) => {
    const token = getToken();

    // The legacy backend reads from request.args.to_dict() universally for all API data.
    // The old frontend 'postdata' function unknowingly defaulted to GET method in jQuery.
    // Therefore, all payload objects MUST be sent as URL parameters regardless of POST/GET.
    // FormData represents file uploads which should uniquely remain in the body.
    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
        config.params = { ...config.params, ...config.data };
        delete config.data; // Send empty body for non-files
    }

    if (token) {
        config.params = { ...config.params, token };
    }

    // Append cache-buster to prevent identical GET requests from being swallowed by browser cache
    // This perfectly matches legacy jQuery behavior which added &_=timestamp
    config.params = { ...config.params, _: Date.now() };

    return config;



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

export const configHost = (data) => {
    // data should include: id, user, name, alias, ipaddr, ipaddrsubnet, nmports, cmports, dports, iports, tz, ntp, gw, dnsname, dnssearch, configured, discovered
    return api.get('api/v1/hosts/config', { params: data });
};

export const joinCluster = (name) => {
    return api.get('api/v1/hosts/joincluster', { params: { name } });
};

export const discoverHosts = () => {
    return api.get('api/v1/hosts/discover', { params: { name: 'nothing' } });
};

// Fix #17: Download config — creates blob and triggers file download (matches old code)
export const getHostConfig = async (nodeName) => {
    const response = await api.get('api/v1/hosts/getConfig', { params: { nodeName } });
    // Old code: creates Blob as text/plain, triggers <a download> click
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
    // Old code: creates Blob as application/zip, triggers <a download> click
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
    // Old code calls 'api/v1/hosts/config' with discovered: true flag
    return api.get('api/v1/hosts/config', { params: data });
};
