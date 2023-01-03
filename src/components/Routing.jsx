import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import Account from '../pages/Account';
import SignIn from '../pages/SignIn';
import React, { useState, lazy, Suspense } from 'react';
import TopBar from './TopBar';
import GamesDetail from '../pages/GamesDetail';
import AddGame from '../pages/AddGame.jsx';
function Routing({
  game,
  details,
  addGame,
  setDetails,
  setGame,
  saveItems,
  handleCheckboxInfoGenres,
  checkedInfo,
  setCheckedInfo,
  checkInfoDetails,
  setCheckInfoDetails,
}) {
  const [users, setUsers] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    password: '',
    email: '',
  });
  const genres = [
    [0, 'Shooter'],
    [1, 'Fantasy'],
  ];

  const platforms = [
    [0, 'PC'],
    [1, 'Nintendo'],
    [2, 'PS5'],
  ];
  let signedInUser = localStorage.getItem('user');
  const Games = lazy(() => import('../pages/Games.jsx'));
  // const AddGame = lazy(() => import('../pages/AddGame.jsx'));
  const Account = lazy(() => import('../pages/Account.jsx'));

  return (
    <div>
      <TopBar
        signedIn={signedIn}
        userInfo={userInfo}
        setSignedIn={setSignedIn}
      />
      <Suspense>
        <Routes>
          <Route
            path="/account"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                {signedInUser ? (
                  <Account userInfo={userInfo} signedIn={signedIn} />
                ) : (
                  <Navigate to="/" replace />
                )}
              </Suspense>
            }
          />
          <Route
            path="/editing"
            element={
              <Suspense fallback={<h2>Loading...</h2>}>
                <AddGame
                  details={details}
                  addGame={addGame}
                  setDetails={setDetails}
                  platforms={platforms}
                  genres={genres}
                  handleCheckboxInfoGenres={handleCheckboxInfoGenres}
                  checkedInfo={checkedInfo}
                  setCheckedInfo={setCheckedInfo}
                />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<h2>Loading...</h2>}>
                <Games
                  game={game}
                  setGame={setGame}
                  saveItems={saveItems}
                  userInfo={userInfo}
                  genres={genres}
                  platforms={platforms}
                  checkedInfo={checkedInfo}
                  checkInfoDetails={checkInfoDetails}
                />
              </Suspense>
            }
          />
          <Route path="/:id" element={<GamesDetail game={game} />} />
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
