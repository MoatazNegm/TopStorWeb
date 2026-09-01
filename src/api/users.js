import api from './client';

export const fetchUserList = () => {
    return api.get('api/v1/users/userlist', { params: { tenant: 'Cluster' } });
};

export const fetchGroupList = () => {
    return api.get('api/v1/users/grouplist', { params: { tenant: 'Cluster' } });
};

export const addUser = (userData) => {
    // userData format: { name, Volpool, groups, Password, Volsize, HomeAddress, HomeSubnet, Myname }
    return api.post('api/v1/users/UnixAddUser', userData);
};

export const deleteUser = (name) => {
    return api.post('api/v1/users/userdel', { name, tenant: 'Cluster' });
};

export const updateUserGroups = (name, groups) => {
    // groups is a comma-separated string of group text names
    return api.post('api/v1/users/userchange', { name, groups, tenant: 'Cluster' });
};

export const changePassword = (username, password) => {
    return api.post('api/v1/user/changepass', { username, password });
};

export const fetchUserAuths = (username) => {
    return api.get('api/v1/users/userauths', { params: { username } });
};
export const updateUserPrivileges = (username, auths) => {
    // auths is a comma-separated string of "id-checked" values
    return api.post('api/v1/users/usersauth', { tochange: username, auths });
};

export const changeUserHome = (name, fields) => {
    // Quota and address restriction of a user's home folder. The backend route is added in a separate flow; the contract:
    //   POST api/v1/users/userhomechange  { name, tenant, Volsize?: '<GB>', HomeAddress?: 'a.b.c.d', HomeSubnet?: '8|16|24|32' }
    // Only users that have a home folder (a pool other than NoHome) are sent.
    return api.post('api/v1/users/userhomechange', { name, tenant: 'Cluster', ...fields });
};
