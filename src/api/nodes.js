import axios from 'axios';

// Helper to get token — matches old code: localStorage.getItem('token')
const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: '/',
});

// Matches old jQuery $.ajax behavior:
// - GET: token as query param
// - POST: token merged into form-encoded body
// - Global Header: X-Requested-With for backend security checks
api.interceptors.request.use((config) => {
    const token = getToken();

    // Standardize headers to match jQuery $.ajax defaults
    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    // The legacy backend reads from request.args.to_dict() universally for all API data.
    // The old frontend 'postdata' function unknowingly defaulted to GET method in jQuery.
    // Therefore, all payload objects MUST be sent as URL parameters regardless of POST/GET.
    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
        config.params = { ...config.params, ...config.data };
        delete config.data; 
    }

    if (token) {
        config.params = { ...config.params, token };
    }

    // Append cache-buster (perfectly matches legacy behavior)
    config.params = { ...config.params, _: Date.now() };

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Matches legacy Qmain.js:183-187
api.interceptors.response.use((response) => {
    if (response.data && response.data.response && response.data.response.includes('baduser')) {
        window.location.replace('login.html');
    }
    return response;
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
