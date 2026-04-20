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
    if (token) {
        if (config.method === 'get') {
            config.params = { ...config.params, token };
        } else {
            // For POST, merge token into data object.
            // The transformRequest below will form-encode it.
            if (typeof config.data === 'object' && config.data !== null) {
                config.data = { ...config.data, token };
            } else {
                config.data = { token };
            }
        }
    }



    return config;
}, (error) => {
    return Promise.reject(error);
});


export const fetchAllHostsInfo = () => {
    return api.get('api/v1/hosts/allinfo');
};

export const evacuateHost = (name) => {
    return api.post('api/v1/hosts/evacuate', { name });
};

export const configHost = (data) => {
    // data should include: id, user, name, alias, ipaddr, ipaddrsubnet, nmports, cmports, dports, iports, tz, ntp, gw, dnsname, dnssearch, configured, discovered
    return api.post('api/v1/hosts/config', data);
};

export const joinCluster = (name) => {
    return api.post('api/v1/hosts/joincluster', { name });
};

export const discoverHosts = () => {
    return api.post('api/v1/hosts/discover', { name: 'nothing' });
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
    return api.post('api/v1/hosts/config', data);
};
