import api from './volumes'; // Reuse the established axios instance

export const fetchSoftwareVersions = () => {
    return api.get('api/v1/software/versions');
};

export const applySoftwareUpdate = (version) => {
    return api.post('api/v1/software/apply', { version });
};

/**
 * Download software from a URL or Network Share
 * @param {Object} params - { method: 'url'|'share', path: string }
 */
export const downloadSoftware = (params) => {
    // Note: Derived from legacy form logic
    const endpoint = params.method === 'url' ? 'api/v1/software/download/url' : 'api/v1/software/download/share';
    return api.post(endpoint, { [params.method === 'url' ? 'url' : 'share']: params.path });
};
