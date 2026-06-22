import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

// Helper to get token
const getToken = () => localStorage.getItem('token');

// Request Interceptor: Standardizes all requests to match legacy backend requirements
api.interceptors.request.use((config) => {
    const token = getToken();

    // Global Header: X-Requested-With for backend security checks (XMLHttpRequest)
    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    // LEGACY BACKEND REQUIREMENT:
    // The backend's @login_required decorator reads from request.args.to_dict() ONLY.
    // It does NOT read from the JSON body or Form data.
    // Therefore, we must move all payload data to URL parameters regardless of HTTP method.
    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
        config.params = { ...config.params, ...config.data };
        delete config.data;
    }

    // Attach token to query params if available (Exclude Prometheus)
    if (token && token !== '0' && !config.url?.startsWith('prometheus/')) {
        config.params = { ...config.params, token };
    }

    // Append cache-buster (perfectly matches legacy jQuery behavior)
    config.params = { ...config.params, _: Date.now() };

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Handles authentication errors globally
api.interceptors.response.use((response) => {
    // Legacy backend returns 200 OK with { response: 'baduser' } for expired/invalid tokens
    if (response.data && response.data.response && String(response.data.response).includes('baduser')) {
        // Don't auto-reload for token validation calls — let the caller handle it
        if (response.config.url && response.config.url.includes('login/test')) {
            return response;
        }
        // FIX: Redirect to the NEW React login page instead of old login.html
        // By setting token to '0' and reloading, App.jsx will catch the change and show QLogin
        localStorage.setItem('token', '0');
        window.location.reload();
    }
    return response;
}, (error) => {
    // Handle actual HTTP errors (4xx, 5xx) if the backend starts using them
    if (error.response && error.response.status === 401) {
        localStorage.setItem('token', '0');
        window.location.reload();
    }
    return Promise.reject(error);
});

export default api;
