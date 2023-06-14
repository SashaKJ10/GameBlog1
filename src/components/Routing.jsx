import {Routes, Route} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import SignIn from '../pages/SignIn';
import React, {useState, Suspense, useEffect} from 'react';
import TopBar from './TopBar';
import GamesDetail from '../pages/GamesDetail';
import AddGame from '../pages/AddGame.jsx';
import Account from "../pages/Account.jsx";
import Games from "../pages/Games.jsx";
import {loginUserAsync, logoutUserAsync} from "../api/UsersApi";
import {getGamesAsync} from '../api/GamesApi'
import {useDispatch, useSelector} from "react-redux"
import { addUserInfo, removeUserInfo } from '../app/userInfoReducer';
import SignUp from '../pages/SignUp.jsx'
function Routing() {
    

    const [userInfo, setUserInfo] = useState({})
    const [games, setGames] = useState([]);
    const [globalSearch, setGlobalSearch] = useState('');
    const dispatch = useDispatch()
    const signedInUserInfo = useSelector(state => state.userInfoReducer)
    console.log(signedInUserInfo) 
    useEffect(() => {
        loadUserInfo();
         loadGames();         
    }, []);


    function loadUserInfo() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (signedInUserInfo && signedInUserInfo.email) {
            setUserInfo(userInfo);
        }
    }

    async function loadGames() {
        let items = await getGamesAsync()
        setGames(items);
    }

    function checkSignedIn() {
        return !!(signedInUserInfo && signedInUserInfo.email);
    }

    async function loginAsync(email, password) {
        const userInfo = await loginUserAsync(email, password);
        dispatch(addUserInfo(userInfo))
    }

    async function logoutAsync() {
        await logoutUserAsync();
        dispatch(removeUserInfo());
    }

    function updateGlobalSearch(search) {
        setGlobalSearch(search);
    }
    
    return (
        <div>
            <TopBar
                isSignedIn={checkSignedIn()}
                updateGlobalSearch={updateGlobalSearch}
                logoutAsync={logoutAsync}
            />
            <Suspense>
                <Routes>
                    <Route
                        path="/account"
                        element={
                            <Account
                            />
                        }
                    />
                    <Route
                        path="/editing"
                        element={
                            <AddGame
                                setGames={setGames}
                                
                            />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Games
                                games={games}
                                setGames={setGames}
                                globalSearch={globalSearch}
                            />
                        }
                    />
                    <Route
                        path="/:id"
                        element={
                            <GamesDetail games={games}/>
                        }
                    />
                    <Route path="*" element={<NotFoundPage/>}/>

                    <Route
                        path="/signin"
                        element={
                            <SignIn
                                isSignedIn={checkSignedIn()}
                                loginAsync={loginAsync}
                            />
                        }
                    />
                    <Route path='/signup' element={<SignUp/>}/>
                </Routes>
            </Suspense>
        </div>
    );
}

export default Routing;
