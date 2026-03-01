import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: '/',
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        if (config.method === 'get') {
            config.params = { ...config.params, token };
        } else {
            config.data = { ...config.data, token };
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchVolumesInfo = (type) => {
    return api.get(`api/v1/volumes/${type}/volumesinfo`);
};

export const fetchGroupList = () => {
    return api.get('api/v1/volumes/grouplist');
};

export const createVolume = (data) => {
    // Expected data: { type, pool, name, ipaddress, Subnet, groups, Myname, size, owner }
    return api.post('api/v1/volumes/create', data);
};

export const updateVolume = (data) => {
    // Expected data: { volume, ..., type }
    return api.post('api/v1/volumes/config', data);
};

export const deleteVolume = (data) => {
    // Expected data: { name, type, user }
    return api.post('api/v1/volumes/volumedel', data);
};

export const fetchVolumeStats = () => {
    return api.get('api/v1/volumes/stats');
};

export const fetchAdConfig = async () => {
    try {
        const [domName, domType, dcServer] = await Promise.all([
            api.get('requestdata.php', { params: { file: 'Data/DomName.txt' } }),
            api.get('requestdata.php', { params: { file: 'Data/Domtype.txt' } }).catch(() => ({ data: 'Workgroup' })),
            api.get('requestdata.php', { params: { file: 'Data/DCserver.txt' } }).catch(() => ({ data: '' }))
        ]);

        return {
            domainName: domName.data.trim(),
            domainType: domType.data.trim(), // 'Domain' or 'Workgroup'
            dcServer: dcServer.data.trim()
        };
    } catch (err) {
        console.error("Failed to fetch AD config", err);
        return { domainName: '', domainType: 'Workgroup', dcServer: '' };
    }
};
export const fetchUserList = () => {
    return api.get('api/v1/users/userlist');
};

export const fetchSnapshotsInfo = () => {
    return api.get('api/v1/volumes/snapshots/snapshotsinfo');
};

export const fetchVolumeList = () => {
    return api.get('api/v1/volumes/volumelist');
};

export const createSnapshot = (data) => {
    return api.post('api/v1/volumes/snapshots/create', data);
};

export const deleteSnapshot = (name) => {
    return api.post('api/v1/volumes/snapshots/snapshotdel', { name, user: 'mezo' });
};

export const rollbackSnapshot = (name) => {
    return api.post('api/v1/volumes/snapshots/snaprollback', { name, user: 'mezo' });
};

export const deleteSnapshotPeriod = (name) => {
    return api.post('api/v1/volumes/snapshots/perioddelete', { name, user: 'mezo' });
};

export default api;
