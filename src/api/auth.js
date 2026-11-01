import api from './client';

export const login = (user, pass) => {
    // Legacy API uses GET for login with user/pass as params
    return api.get('api/v1/login', {
        params: { user, pass }
    });
};

export const logout = (token) => {
    // a short timeout: the browser logout must not hang on a node that does not answer
    return api.get('api/v1/logout', {
        params: { token },
        timeout: 5000
    });
};

export const validateToken = (token) => {
    return api.get('api/v1/login/test', {
        params: { token }
    });
};
