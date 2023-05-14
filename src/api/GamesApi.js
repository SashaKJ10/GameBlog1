import axios from "axios"

const API_BASE_URL = 'http://localhost:5000/games';

export const getGamesAsync = async () => {
    try {
        return (await axios.get(API_BASE_URL)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getGameByIdAsync = async (id) => {
    try {
        return (await axios.get(`${API_BASE_URL}/${id}`)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const createGameAsync = async (game) => {
    try {
        return (await axios.post(API_BASE_URL, game)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const updateGameAsync = async (id, game) => {
    try {
        return (await axios.put(`${API_BASE_URL}/${id}`, game)).data;
    } catch (error) {
        throw error.response.data;
    }
}

export const deleteGameAsync = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
}

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