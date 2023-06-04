import {createSlice} from '@reduxjs/toolkit'

const defaultState = {email: '', isAdmin: false}

export const userInfoSlice = createSlice({
    name: 'userInfoR',
    initialState: defaultState,
    reducers: {
        getUserInfo(state, action) {
            console.log("check")
            state.userInfo2 = action.payload;
        },
        addUserInfo(state, action) {
            return {...state, ...action.payload}
        },
        removeUserInfo(state, action) {
            return {}
        }
    }
})

export const { addUserInfo, removeUserInfo } = userInfoSlice.actions;

// export const userInfoReducer = (state = defaultState, action) => {
// switch(action.type){
//     case 'ADD_USERINFO':
//         return {...state, ...action.payload}
//         case 'REMOVE_USERINFO': 
//         return {}
// }
// }
