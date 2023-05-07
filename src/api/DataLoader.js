import axios from "axios"

const API_BASE_URL = 'http://localhost:5000'
export const getGameById = (id) => {
    return new Promise((resolve, reject) => {
        getAllGames().then(result => {
            try {
                let game = result.find(game => game.id == id);
                if (game == null) {
                    reject('Game is not found');
                } else {
                    resolve(game);
                }
            } catch (ex) {
                reject(ex);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export const getAllGames = () => {
    return new Promise((resolve, reject) => {
        try {
            let games = JSON.parse(localStorage.getItem('items') ?? '[]');
            resolve(games);
        } catch (ex) {
            reject(ex);
        }
    });
}


export const getCurrentUser = async(email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user?email=${email}`)
        return response.data
    }catch(error){
        throw error.response.data;
    }
}

export const getUsers = async() => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`)
        return response.data
    }catch(error){
        throw error.response.data;
    }
}

export const loginUser = async(email, password) => {
    try{
    const response = await axios.post(`${API_BASE_URL}/login`, {email, password})
    }catch(error){
        throw error.response.data;

    }

    
}   