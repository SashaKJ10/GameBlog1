import Routing from './components/Routing';
import TopBar from './components/TopBar';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [details, setDetails] = useState({
    image: '',
    name: '',
    genres: [],
    platforms: [],
    id: 0,
  });

  const handleCheckboxInfoGenres = (e) => {
    const { checked, value } = e.target;

    let newGenres = details.genres;
    if (checked) {
      newGenres = [...newGenres, value];
    } else {
      newGenres = newGenres.filter((genre) => genre !== value);
    }

    setDetails({
      ...details,
      genres: newGenres,
    });
  };

  const handleCheckboxInfoPlatforms = (e) => {
    const { checked, value } = e.target;

    let newPlatforms = details.platforms;
    if (checked) {
      newPlatforms = [...newPlatforms, value];
    } else {
      newPlatforms = newPlatforms.filter((platform) => platform !== value);
    }

    setDetails({
      ...details,
      platforms: newPlatforms,
    });
  };

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem('items') ?? '[]');
    console.log(items);
    setGames(items);
    localStorage.setItem('admin', 'sasha023@gmail.com');
  }, []);

  const saveItems = (items) => {
    let json = JSON.stringify(items);
    localStorage.setItem('items', json);
  };

  const addGame = (e) => {
    e.preventDefault();
    let newGames = [...games, details];
    console.log(newGames);
    setGames(newGames);
    setDetails({
      image: '',
      name: '',
      genres: [],
      platforms: [],
      id: 0,
    });

    saveItems(newGames);
    navigate('/');
  };

  return (
    <div className="flex-row items-start">
      <div className="absolute top-13 w-full">
        <Routing
          games={games}
          details={details}
          addGame={addGame}
          setDetails={setDetails}
          setGames={setGames}
          saveItems={saveItems}
          handleCheckboxInfoGenres={handleCheckboxInfoGenres}
          handleCheckboxInfoPlatforms={handleCheckboxInfoPlatforms}
          game={games}
        />
      </div>
    </div>
  );
}

export default App;
