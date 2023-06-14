import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
const defaultState = []


export const gamesSlice = createSlice({
    name: 'gameSlice',
    initialState: defaultState,
    reducers: {
        addGames(state, action){
            return [...state, action.payload]
        },
        removeGame(state, action) {
            return state.filter(game => game.id !== action.payload)
        }
    }
})

export const { addGames, removeGame } = gamesSlice.actions;

