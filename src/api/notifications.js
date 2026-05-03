import api from './client';

export const fetchNotification = () => api.get('api/v1/info/notification');
