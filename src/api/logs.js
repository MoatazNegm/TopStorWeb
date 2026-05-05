import api from './client';

export const fetchLogs = () => {
    return api.get('api/v1/info/logs');
};
