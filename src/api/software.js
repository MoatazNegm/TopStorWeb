import api from './volumes'; // Reuse the established axios instance

export const fetchSoftwareVersions = () => {
    return api.get('api/v1/software/versions');
};

export const applySoftwareUpdate = (version) => {
    return api.post('api/v1/software/apply', { version });
};

/**
 * Download an update package.  QSD5.352 (QC 696): the page posted to api/v1/software/download/url and .../share, routes
 * that never existed (404, always "Failed to start download.").  The backend route is api/v1/software/update
 * (fapi.py updateSoftware -> downloadSoftwareUpdate.sh) with source-type http | nfs | cifs.
 * @param {Object} params - { method: 'url'|'share', path: string, username?: string, password?: string }
 *   url:   path = http(s)://...                       -> source-type=http source=<url>
 *   share: path = <server>:/<dir>/<file>  (NFS)        -> source-type=nfs  source=<server> location=<dir> version=<file>
 *          path = \\<server>\<share>\...\<file> or //<server>/<share>/.../<file> (SMB, user + password)
 *                                                      -> source-type=cifs source=<server> location=<share/dir> version=<file>
 */
export const parseSharePath = (path) => {
    const value = String(path || '').trim();
    const nfs = value.match(/^([^\\/:\s]+):\/?(.+)\/([^/]+)$/);
    if (nfs) return { type: 'nfs', server: nfs[1], location: nfs[2].replace(/^\/+/, ''), file: nfs[3] };
    const smb = value.replace(/\\/g, '/').match(/^\/\/([^/\s]+)\/(.+)\/([^/]+)$/);
    if (smb) return { type: 'cifs', server: smb[1], location: smb[2], file: smb[3] };
    return null;
};

export const downloadSoftware = (params) => {
    if (params.method === 'url') {
        return api.post('api/v1/software/update', { 'source-type': 'http', source: params.path });
    }
    const share = parseSharePath(params.path);
    if (!share) {
        return Promise.reject(new Error('Use <server>:/<folder>/<file> for NFS or \\\\<server>\\<share>\\<file> for SMB.'));
    }
    const body = { 'source-type': share.type, source: share.server, location: share.location, version: share.file };
    if (share.type === 'cifs') {
        body.username = params.username || '';
        body.password = params.password || '';
    }
    return api.post('api/v1/software/update', body);
};
