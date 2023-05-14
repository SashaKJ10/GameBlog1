import axios from "axios"

const API_BASE_URL = 'http://localhost:5000/users';

export const getUsers = async () => {
    try {
        return (await axios.get(API_BASE_URL)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getCurrentUser = async (email) => {
    try {
        return (await axios.get(`${API_BASE_URL}?email=${email}`)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const loginUserAsync = async (email, password) => {
    try {
        const body = {
            email,
            password
        };
        return (await axios.post(`${API_BASE_URL}/login`, body)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const logoutUserAsync = async () => {
    try {
        await axios.post(`${API_BASE_URL}/logout`);
    } catch (error) {
        throw error.response.data;
    }
}