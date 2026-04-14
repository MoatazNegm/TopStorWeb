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

export const fetchPartnerList = () => {
    return api.get('api/v1/partners/partnerlist');
};

export const addPartner = (data) => {
    // data format: { ip, pass, port, type, alias }
    return api.post('api/v1/partners/AddPartner', data);
};

export const deletePartner = (name) => {
    // name is the alias
    return api.post('api/v1/partners/partnerdel', { name });
};
