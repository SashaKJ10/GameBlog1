import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {userInfoSlice} from './userInfoReducer'

const userInfoReducer = userInfoSlice.reducer;

const reducer = combineReducers({
    userInfoReducer,
})

const store = configureStore({
    reducer,
})

export default store;

