import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

export const login = (user, pass) => {
    // Legacy API uses GET for login with user/pass as params
    return api.get('api/v1/login', {
        params: { user, pass }
    });
};

export const logout = (token) => {
    return api.get('api/v1/logout', {
        params: { token }
    });
};
