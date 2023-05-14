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

function Routing() {
    const [userInfo, setUserInfo] = useState({});
    const [games, setGames] = useState([]);
    const [globalSearch, setGlobalSearch] = useState('');

    useEffect(() => {
        loadUserInfo();
        loadGames();
    }, []);

    function loadUserInfo() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.email) {
            setUserInfo(userInfo);
        }
    }

    function loadGames() {
        let items = JSON.parse(localStorage.getItem('items') ?? '[]');
        setGames(items);
    }

    function checkSignedIn() {
        return !!(userInfo && userInfo?.email);
    }

    async function loginAsync(email, password) {
        const userInfo = await loginUserAsync(email, password);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUserInfo(userInfo);
    }

    async function logoutAsync() {
        await logoutUserAsync();
        localStorage.removeItem('userInfo');
        setUserInfo({});
    }

    function updateGlobalSearch(search) {
        setGlobalSearch(search);
    }
    
    return (
        <div>
            <TopBar
                userInfo={userInfo}
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
                                userInfo={userInfo}
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
                            <GamesDetail/>
                        }
                    />
                    <Route path="*" element={<NotFoundPage/>}/>

                    <Route
                        path="/signin"
                        element={
                            <SignIn
                                userInfo={userInfo}
                                isSignedIn={checkSignedIn()}
                                loginAsync={loginAsync}
                            />
                        }
                    />
                </Routes>
            </Suspense>
        </div>
    );
}

export default Routing;
