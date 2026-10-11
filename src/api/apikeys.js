import api from './client';
import guideText from '../docs/API-USER-GUIDE.md?raw';

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

// The guide is bundled with the UI (src/docs, imported as raw text) so the
// download works on every node whatever the web root holds. Keep it in step
// with TopStor/API-USER-GUIDE.md.

export const API_GUIDE_URL = URL.createObjectURL(
    new Blob([guideText], { type: 'text/markdown;charset=utf-8' })
);
