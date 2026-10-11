import api from './client';

export const fetchCommandLog = () => {
    return api.get('api/v1/info/commandlog');
};
