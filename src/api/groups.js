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

export const fetchGroupList = () => {
    return api.get('api/v1/groups/grouplist');
};

export const fetchUserOptions = () => {
    return api.get('api/v1/groups/userlist');
};

export const addGroup = (groupData) => {
    // groupData format: { name, users, Myname }
    return api.post('api/v1/groups/UnixAddgroup', groupData);
};

export const deleteGroup = (name) => {
    return api.post('api/v1/groups/groupdel', { name, Myname: 'mezo' });
};

export const updateGroupUsers = (name, users) => {
    // users is a comma-separated string
    return api.post('api/v1/groups/groupchange', { name, users });
};
