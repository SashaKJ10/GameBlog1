import FilterForm from '../components/FilterForm.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GrTrash } from 'react-icons/gr';
import Card from '../containers/Card';
import Pagination from '../components/Pagination';
import { BiArrowBack } from 'react-icons/bi';

function Games({ games, setGames, saveItems, userInfo, platforms, genres }) {
  const classes = {
    inputFileStyles:
      'block w-full w-40 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
    button:
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
    button2:
      'bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
  };

  const admin = localStorage.getItem('admin');

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState({ textContent: '' });
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const addComment = () => {
    const post = [...comments, text];
    setComments(post);
  };

  const onDelete = (id) => {
    const newItem = games.filter((item) => item.id !== id);
    setGames(newItem);
    saveItems(newItem);
  };

  const filterByGenres = (event, value) => {
    let newSelectedGenres = selectedGenres;
    if (event.target.checked) {
      newSelectedGenres = [...newSelectedGenres, value];
    } else {
      newSelectedGenres = newSelectedGenres.filter((genre) => genre !== value);
    }

    setSelectedGenres(newSelectedGenres);
  };

  const filterByPlatforms = (event, value) => {
    let newSelectedPlatforms = selectedPlatforms;
    if (event.target.checked) {
      newSelectedPlatforms = [...selectedPlatforms, value];
    } else {
      newSelectedPlatforms = newSelectedPlatforms.filter(
        (platform) => platform !== value
      );
    }
    setSelectedPlatforms(newSelectedPlatforms);
  };

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

  const lastPostIndex = page * limit;
  const firstPostIndex = lastPostIndex - limit;
  const paginatedFiltredGames = filteredGames.slice(
    firstPostIndex,
    lastPostIndex
  );

  console.log(paginatedFiltredGames);
  return (
    <div>
      <div className="flex flex-row px-60  flex-wrap">
        {paginatedFiltredGames.map((item) => (
          <Card>
            <div className="flex justify-center items-center">
              <Link to={`/${item.id}`}>
                <img className="w-15 h-15" src={item.image} />
              </Link>
            </div>
            <div className="font-bold text-lg">{item.name}</div>
            <div>The description is: {item.description}</div>
            <div>Genres: {[...item.genres].join(', ')}</div>
            <div>Platform: {[...item.platforms].join(', ')}</div>
            {userInfo?.email === admin ? (
              <div className="flex items-center justify-between">
                <GrTrash
                  className="cursor-pointer"
                  onClick={() => onDelete(item.id)}
                />
              </div>
            ) : null}
          </Card>
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
      <div className="fixed top-15 border shadow">
        <FilterForm
          genres={genres}
          platforms={platforms}
          filterByGenres={filterByGenres}
          filterByPlatforms={filterByPlatforms}
        />
      </div>

      <Pagination
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
export default Games;
