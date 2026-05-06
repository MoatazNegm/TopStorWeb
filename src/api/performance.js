import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: '/',
});

api.interceptors.request.use((config) => {
    const token = getToken();
    // Only append the token to our custom Flask API, not Prometheus
    if (token && !config.url.startsWith('prometheus/')) {
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
    return api.get('api/v1/info/performance');
};

export const fetchPrometheusQuery = (query) => {
    return api.get('prometheus/api/v1/query', { params: { query } });
};

export const pingHeartbeat = () => {
    // Hits the Flask endpoint to keep the 0.25s "Boost Mode" alive
    return api.post('api/v1/telemetry/heartbeat').catch(() => {});
};

export const fetchServiceSummary = () => {
    // Fetches live etcd inventory counts
    return api.get('api/v1/info/summary');
};
