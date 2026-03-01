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

export const fetchSystemMetrics = () => {
    // This will likely call a proxy that runs Getstats.sh or queries Prometheus
    return api.get('api/v1/info/performance');
};

export const fetchPrometheusMetrics = (query) => {
    // Direct or proxied Prometheus Query API
    return api.get('api/v1/prometheus/query', { params: { query } });
};

export const fetchServiceSummary = () => {
    // Consolidated summary from existing endpoints
    return api.get('api/v1/info/summary');
};
