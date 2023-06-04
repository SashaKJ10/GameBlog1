import {configureStore} from '@reduxjs/toolkit'
import {userInfoSlice} from './userInfoReducer'
const store = configureStore({reducer: userInfoSlice.reducer})



export default store

