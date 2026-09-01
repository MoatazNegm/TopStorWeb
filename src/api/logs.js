import api from './client';

export const fetchLogs = () => {
    return api.get('api/v1/info/logs');
};

export const fetchOneDayLog = () => {
    return api.get('api/v1/info/onedaylog');
};
