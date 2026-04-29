import api from './client';

export const fetchUserList = () => {
    return api.get('api/v1/users/userlist');
};

export const fetchGroupList = () => {
    return api.get('api/v1/users/grouplist');
};

export const addUser = (userData) => {
    // userData format: { name, Volpool, groups, Password, Volsize, HomeAddress, HomeSubnet, Myname }
    return api.post('api/v1/users/UnixAddUser', userData);
};

export const deleteUser = (name) => {
    return api.post('api/v1/users/userdel', { name, Myname: 'mezo' });
};

export const updateUserGroups = (name, groups) => {
    // groups is a comma-separated string
    return api.post('api/v1/users/userchange', { name, groups });
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
