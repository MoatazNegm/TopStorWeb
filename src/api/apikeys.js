import api from './client';

// API keys: named credentials for scripts and applications. The name is the
// user name of the key; the secret is returned only once, by create/regenerate.
export const fetchApiKeys = () => api.get('api/v1/apikeys/list');

// data: { name, access: 'read' | 'write' }
export const createApiKey = (data) => api.post('api/v1/apikeys/create', data);

// New secret for an existing name (the old one stops working at once).
export const regenerateApiKey = (name, access) =>
    api.post('api/v1/apikeys/regenerate', access ? { name, access } : { name });

export const revokeApiKey = (name) => api.post('api/v1/apikeys/revoke', { name });

export const deleteApiKey = (name) => api.post('api/v1/apikeys/delete', { name });

export const API_GUIDE_URL = 'docs/API-USER-GUIDE.md';
