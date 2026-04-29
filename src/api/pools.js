import api from './client';

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
