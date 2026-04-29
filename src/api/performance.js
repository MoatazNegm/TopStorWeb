import api from './client';

export const fetchSystemMetrics = () => {
    return api.get('api/v1/info/performance');
};

export const fetchPrometheusQuery = (query) => {
    // Hits the Apache proxy which forwards directly to port 9090
    return api.get('prometheus/query', { params: { query } });
};

export const pingHeartbeat = () => {
    // Hits the Flask endpoint to keep the 0.25s "Boost Mode" alive
    return api.post('api/v1/telemetry/heartbeat').catch(() => {});
};

export const fetchServiceSummary = () => {
    // Fetches live etcd inventory counts
    return api.get('api/v1/info/summary');
};
