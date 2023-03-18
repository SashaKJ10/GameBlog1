import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import SignIn from '../pages/SignIn';
import React, { useState, lazy, Suspense, useMemo } from 'react';
import TopBar from './TopBar';
import GamesDetail from '../pages/GamesDetail';
import AddGame from '../pages/AddGame.jsx';
function Routing({
  games,
  details,
  addGame,
  setDetails,
  setGames,
  saveItems,
  handleCheckboxInfoGenres,
  handleCheckboxInfoPlatforms,
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
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  
  const lastPostIndex = page * limit;
  const firstPostIndex = lastPostIndex - limit;
  
  const filteredGames = games.filter((game) => {
    if (!selectedGenres.every((genre) => game.genres.includes(genre))) {
      return false;
    }
    if (
      !selectedPlatforms.every((platform) => game.platforms.includes(platform))
      ) {
        return false;
      }
      return true;
    });
    
    const paginatedFiltredGames = filteredGames.slice(
      firstPostIndex,
      lastPostIndex
    );
    useMemo(() => {
      localStorage.setItem('paginated', paginatedFiltredGames)
    }, [paginatedFiltredGames])
    let gamesContent = localStorage.getItem('items');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(games);
  const Games = lazy(() => import('../pages/Games.jsx'));
  const Account = lazy(() => import('../pages/Account.jsx'));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    const filtered = games.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setGames(filtered);
  };

  return (
    <div>
      <TopBar
        signedIn={signedIn}
        userInfo={userInfo}
        setSignedIn={setSignedIn}
        games={games}
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        paginatedFiltredGames={paginatedFiltredGames}
        setGames={setGames}
      />
      <Suspense>
        <Routes>
          <Route
            path="/account"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                {signedIn ? (
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
              // <Suspense fallback={<h2>Loading...</h2>}>
              <AddGame
                details={details}
                addGame={addGame}
                setDetails={setDetails}
                platforms={platforms}
                genres={genres}
                handleCheckboxInfoGenres={handleCheckboxInfoGenres}
                handleCheckboxInfoPlatforms={handleCheckboxInfoPlatforms}
              />
              // </Suspense>
            }
          />
          <Route
            path="/"
            element={
              // <Suspense fallback={<h2>Loading...</h2>}>
              <Games
                games={games}
                setGames={setGames}
                saveItems={saveItems}
                userInfo={userInfo}
                genres={genres}
                platforms={platforms}
                filteredGames={filteredGames}
                selectedPlatforms={selectedPlatforms}
                selectedGenres={selectedGenres}
                setSelectedPlatforms={setSelectedPlatforms}
                setSelectedGenres={setSelectedGenres}
                paginatedFiltredGames={paginatedFiltredGames}
                totalPages={totalPages}
                setTotalPages={setTotalPages}
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
              />
              // </Suspense>
            }
          />
          <Route
            path="/:id"
            element={
              <GamesDetail
                games={games}
                userInfo={userInfo}
                signedIn={signedIn}
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
