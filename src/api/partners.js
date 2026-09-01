import api from './client';

export const fetchPartnerList = () => {
    return api.get('api/v1/partners/partnerlist');
};

export const addPartner = (data) => {
    // data format: { ip, pass, port, type, alias }
    return api.post('api/v1/partners/AddPartner', data);
};

export const deletePartner = (name) => {
    // name is the alias
    return api.post('api/v1/partners/partnerdel', { name });
};

export const fetchFreePort = () => {
    // Backend picks a random free port in 3001-8000 (replies { port }).
    return api.get('api/v1/partners/freeport');
};
