import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGameById } from '../api/DataLoader';

function GamesDetails() {
  const { id } = useParams();
  const [game, setGame] = useState({
    id: 0,
    image: '',
    name: '',
    description: '',
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    getGameById(id)
      .then((result) => {
        setGame(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <img className="w-500 h-500" src={game.image} />
        <div>Name: {game.name}</div>
        <div>Platforms: {[...game.platforms].join(' ,')}</div>
        <div>Genres: {[...game.genres].join(' ,')}</div>
        <div>Description: {game.description}</div>
      </div>
    </div>
  );
}

export default GamesDetails;
