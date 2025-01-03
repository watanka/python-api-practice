import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/users';

export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup/`, userData);
    return response.data;
}

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    return response.data;
}

export const refreshToken = async (refresh) => {
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh})
    return response.data;
}