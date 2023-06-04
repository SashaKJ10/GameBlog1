const userInfoReducer = (state = initialState.userInfo, action) => {
    switch (action.type) {
      case 'SET_USER_INFO':
        return action.payload;
      case 'REMOVE_USER_INFO':
        return {};
      default:
        return state;
    }
  };
  
  const gamesReducer = (state = initialState.games, action) => {
    switch (action.type) {
      case 'SET_GAMES':
        return action.payload;
      default:
        return state;
    }
  };
  
  const globalSearchReducer = (state = initialState.globalSearch, action) => {
    switch (action.type) {
      case 'UPDATE_GLOBAL_SEARCH':
        return action.payload;
      default:
        return state;
    }
  };
  
  const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    games: gamesReducer,
    globalSearch: globalSearchReducer,
  });
  
  export default rootReducer;
  