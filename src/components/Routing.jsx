import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import SignIn from '../pages/SignIn';
import React, {useState, lazy, Suspense, useEffect} from 'react';
import TopBar from './TopBar';
import GamesDetail from '../pages/GamesDetail';
import AddGame from '../pages/AddGame.jsx';
import Account from "../pages/Account.jsx"
function Routing({
  
}) {
  const [users, setUsers] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    password: '',
    email: '',
  });

  const [games, setGames] = useState([]);

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem('items') ?? '[]');
    setGames(items);
    localStorage.setItem('admin', 'sasha023@gmail.com');
  }, []);

  localStorage.setItem('signedIn', JSON.stringify(signedIn))
  let signedInUser = JSON.parse(localStorage.getItem("signedIn"))
  // TODO: Task 2 - move genres and platforms to localStorage and get their values from localStorage on related pages ✔
  const genreValues = [
    [0, 'Shooter'],
    [1, 'Fantasy'],
  ];
  
  const platformValues = [
    [0, 'PC'],
    [1, 'Nintendo'],
    [2, 'PS5'],
  ];
  localStorage.setItem('genres', JSON.stringify(genreValues))
  localStorage.setItem('platforms', JSON.stringify(platformValues))

  
  const [globalSearch, setGlobalSearch] = useState('');
  localStorage.setItem("globalSearch", globalSearch)
  const Games = lazy(() => import('../pages/Games.jsx'));

    useEffect(() => {
        setUserInfo(JSON.parse(
            localStorage.getItem('userInfo')
        ))
    }, [])
    
    const platforms = JSON.parse(localStorage.getItem('platforms'))
    const genres = JSON.parse(localStorage.getItem("genres"))
  return (
    <div>
      <TopBar
        setSignedIn={setSignedIn}
        setGlobalSearch={setGlobalSearch}
      />
      <Suspense>
        <Routes>
          <Route
            path="/account"
            element={  
                signedInUser ? (
                  <Account userInfo={userInfo} signedIn={signedIn} />
                ) : (
                  <Navigate to="/" replace />
                )}
        
            
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
                genres={genres}
                platforms={platforms}
                globalSearch={globalSearch}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <GamesDetail
                games={games}
                userInfo={userInfo}
                signedIn={signedIn}
                setGames={setGames}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/signin"
            element={
              <SignIn
                users={users}
                setUsers={setUsers}
                signedIn={signedIn}
                setSignedIn={setSignedIn}
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
