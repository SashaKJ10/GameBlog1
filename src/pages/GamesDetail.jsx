import { useParams } from 'react-router-dom';
function GamesDetails({ games }) {
  const { id } = useParams();
  console.log(id);
  console.log(games[0].id);
  return (
    <div>
      {games.map((game) =>
        game.id === id ? (
          <div className="flex flex-col items-center justify-center ">
            <img className="w-500 h-500" src={game.image} />
            <div>Name: {game.name}</div>
            <div>Platforms: {[...game.platforms].join(' ,')}</div>
            <div>Genres: {[...game.genres].join(' ,')}</div>
            <div>Description: {game.description}</div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default GamesDetails;
