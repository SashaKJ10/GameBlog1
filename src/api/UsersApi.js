import axios from "axios"
import {userInfoSlice} from "../app/userInfoReducer"

const {getUserInfo} = userInfoSlice.actions;
const API_BASE_URL = 'http://localhost:5000/users';

export const getUsers = async () => {
    try {
        return (await axios.get(API_BASE_URL)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getCurrentUser = (email) =>
    async (dispatch) => {
        try {
            await axios.get(`${API_BASE_URL}?email=${email}`)
                .then((response) => dispatch(getUserInfo(response.data)))
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

export const signUserUpAsync = async(email, password) => {
    const body = {
        email, password
    }
    try {
        await axios.post(`${API_BASE_URL}/signup`, body)
    }catch(error){
        throw error.response.data
    }
}