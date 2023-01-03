import FilterForm from '../components/FilterForm.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Games({
  game,
  setGame,
  saveItems,
  userInfo,
  platforms,
  genres,
  checkedInfo,
  checkInfoDetails,
}) {
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
    setGameInfo(game);
    const filteredGenres = game.filter((item) => {
      console.log(item.genres);
      return item.genres === currentGenre;
    });
    console.log(filteredGenres);
    setGame(filteredGenres);
    setCompleted({ ...completed, filteredCompletedGenres: true });
    if (completed.filteredCompletedGenres) {
      setGame(gameInfo);
      setCompleted({ ...completed, filteredCompletedGenres: false });
    }
  };

  const filteredPlatforms = (currentPlatform) => {
    setGameInfo(game);
    const filteredPlatforms = game.filter((item) => {
      console.log(item.genres);
      return item.platform === currentPlatform;
    });
    console.log(filteredPlatforms);
    setGame(filteredPlatforms);
    setCompleted({ ...completed, filteredCompletedPlatforms: true });
    if (completed.filteredCompletedPlatforms) {
      setGame(gameInfo);
      setCompleted({ ...completed, filteredCompletedPlatforms: false });
    }
  };

  const onDelete = (id) => {
    const newItem = game.filter((item) => item.id !== id);
    setGame(newItem);
    saveItems(newItem);
  };

  return (
    <div>
      <div className="flex flex-row px-60 justify-around flex-wrap">
        {game.map((item) => (
          <div className="">
            <div>
              <Link to={`/${item.id}`}>
                <img className="w-20 h-20" src={item.image} />
              </Link>
            </div>
            <div className="font-bold text-lg">{item.name}</div>
            <div>The description is: {item.description}</div>

            <div>
              Genres: {checkedInfo.genres[0]}{' '}
              {checkedInfo.genres[1] !== 'null' ? checkedInfo.genres[1] : null}{' '}
            </div>
            <div>Platform: {item.platform}</div>
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
          </div>
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
