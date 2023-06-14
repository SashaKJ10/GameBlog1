import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {userInfoSlice} from './userInfoReducer'
import {gamesSlice} from './gamesReducer'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'


const userInfoReducer = userInfoSlice.reducer;
const gameReducer = gamesSlice.reducer;

const persistConfig = {
    key: 'root',
    storage: storage,
  }

const reducer = combineReducers({
    userInfoReducer,
    gameReducer
})

const persistedReducer = persistReducer(persistConfig, reducer )

const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store;

