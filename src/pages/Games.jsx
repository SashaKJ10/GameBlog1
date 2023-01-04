import FilterForm from '../components/FilterForm.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Games({ games, setGames, saveItems, userInfo, platforms, genres }) {
  const classes = {
    inputFileStyles:
      'block w-full w-40 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
    button:
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
    button2:
      'bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
  };
  const [comments, setComments] = useState([]);
  const [text, setText] = useState({ textContent: '' });
  const [completed, setCompleted] = useState({
    filteredCompletedGenres: false,
    filteredCompletedPlatforms: false,
  });
  const [gameInfo, setGameInfo] = useState([]);
  const addComment = () => {
    const post = [...comments, text];
    setComments(post);
  };

  const admin = localStorage.getItem('admin');

  const filteredGenres = (currentGenre) => {
    setGameInfo(games);
    const filteredGenres = games.filter((item) => {
      console.log(item.genres);
      return item.genres === currentGenre;
    });
    console.log(filteredGenres);
    setGames(filteredGenres);
    setCompleted({ ...completed, filteredCompletedGenres: true });
    if (completed.filteredCompletedGenres) {
      setGames(gameInfo);
      setCompleted({ ...completed, filteredCompletedGenres: false });
    }
  };

  const filteredPlatforms = (currentPlatform) => {
    setGameInfo(games);
    const filteredPlatforms = games.filter((item) => {
      console.log(item.genres);
      return item.platform === currentPlatform;
    });
    console.log(filteredPlatforms);
    setGames(filteredPlatforms);
    setCompleted({ ...completed, filteredCompletedPlatforms: true });
    if (completed.filteredCompletedPlatforms) {
      setGames(gameInfo);
      setCompleted({ ...completed, filteredCompletedPlatforms: false });
    }
  };

  const onDelete = (id) => {
    const newItem = games.filter((item) => item.id !== id);
    setGames(newItem);
    saveItems(newItem);
  };

  return (
    <div>
      <div className="flex flex-row px-60 justify-around flex-wrap">
        {games.map((item) => (
          <div className="">
            <div>
              <Link to={`/${item.id}`}>
                <img className="w-20 h-20" src={item.image} />
              </Link>
            </div>
            <div className="font-bold text-lg">{item.name}</div>
            <div>The description is: {item.description}</div>
            <div>Genres: {[...item.genres].join(', ')}</div>
            <div>Platform: {[...item.platforms].join(', ')}</div>
            {userInfo?.email === admin ? (
              <button
                className={classes.button2}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            ) : null}
          </div>
        ))}

        {/* <div className="flex flex-row items-center justify-center gap-2 w-full">
          <div className="flex flex-1 justify-end items-end">
            <input
              className={classes.inputFileStyles}
              onChange={(e) =>
                setText({ ...text, textContent: e.target.value })
              }
              type="text"
              />
          </div>qq
          <button className={classes.button} onClick={addComment}>
            Post
            </button>
            </div>
            <div>
            {comments.map((comment) => (
            <div>{comment.textContent}</div>
          ))}
        </div> */}
      </div>
      <div className="fixed top-15">
        <FilterForm
          genres={genres}
          platforms={platforms}
          filteredGenres={filteredGenres}
          filteredPlatforms={filteredPlatforms}
        />
      </div>
    </div>
  );
}
export default Games;
