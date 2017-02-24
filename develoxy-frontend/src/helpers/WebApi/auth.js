import axios from 'axios';

export const checkUsername = (username) => {
    return axios.get(`/api/auth/check-username/${username}`);
}

export const register = (username) => {
    return axios.post('/api/auth/register', {
        username
    });
}

export const linkAccount = (token) => {
    return axios.post('/api/auth/link-account', {
        token
    });
}