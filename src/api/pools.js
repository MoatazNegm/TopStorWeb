import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: '/',
});

// Backend login_required reads request.args.to_dict() for ALL methods — never the JSON body.
// Move all payload data to URL params so the backend can see it, same fix as nodes.js.
api.interceptors.request.use((config) => {
    const token = getToken();

    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
        config.params = { ...config.params, ...config.data };
        delete config.data;
    }

    if (token) {
        config.params = { ...config.params, token };
    }

    config.params = { ...config.params, _: Date.now() };

    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    if (response.data && response.data.response && response.data.response.includes('baduser')) {
        window.location.replace('login.html');
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export const fetchPoolsInfo = () => {
    return api.get('api/v1/pools/poolsinfo');
};

export const fetchDgsInfo = () => {
    return api.get('api/v1/pools/dgsinfo');
};

export const createPool = (data) => {
    // Expected: { redundancy, useable, disks, cache, cache_bool, user }
    return api.post('api/v1/pools/newpool', data);
};

export const addDisksToPool = (data) => {
    // Expected: { pool, redundancy, useable, user }
    return api.post('api/v1/pools/addtopool', data);
};

export const deletePool = (data) => {
    // Expected: { pool, user }
    return api.post('api/v1/pools/delpool', data);
};

export const actionOnDisk = (data) => {
    // Expected: { ...diskData, action: 'online' | 'offline' }
    return api.post('api/v1/pools/actionOnDisk', data);
};

export const saveCacheSpares = (data) => {
    // Expected: { cache_disks, user }
    return api.post('api/v1/pools/cachespares', data);
};

export const deleteCacheSpares = (data) => {
    // Expected: { cache_disks, user }
    return api.post('api/v1/pools/delcachespares', data);
};
