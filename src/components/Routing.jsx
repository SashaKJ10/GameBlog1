import {Routes, Route} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import SignIn from '../pages/SignIn';
import React, {useState, Suspense, useEffect} from 'react';
import TopBar from './TopBar';
import GamesDetail from '../pages/GamesDetail';
import AddGame from '../pages/AddGame.jsx';
import Account from "../pages/Account.jsx";
import Games from "../pages/Games.jsx";

function Routing() {
    // TODO: Task 2.1 - Remove user and admin fields from localStorage and replace them with userInfo data ✔
    // TODO: Task 2.2 - Move users to SignIn.jsx and take them from local storage ✔
    const [userInfo, setUserInfo] = useState({
        isAdmin: false, // should be false by default ✔
        password: '',
        email: '',
    });

    const [games, setGames] = useState([]);

    useEffect(() => {
        let items = JSON.parse(localStorage.getItem('items') ?? '[]');
        setGames(items);
    }, []);

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.email) {
            setUserInfo(userInfo);
        }
    }, [])

    const [globalSearch, setGlobalSearch] = useState('');

    return (
        <div>
            <TopBar
                setGlobalSearch={setGlobalSearch}
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
                                userInfo={userInfo}
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
                                setUserInfo={setUserInfo}
                            />
                        }
                    />
                </Routes>
            </Suspense>
        </div>
    );
}

export default Routing;
