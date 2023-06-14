import FilterForm from '../components/FilterForm.jsx';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {GrTrash} from 'react-icons/gr';
import Pagination from '../components/Pagination';
import {saveItems} from '../utils/localStorage.js'
import {deleteGameAsync  } from '../api/GamesApi.js';
import { useSelector, useDispatch } from 'react-redux';
import {removeGame} from '../app/gamesReducer.js'
function Games({games, setGames, globalSearch}) {
    const platforms = JSON.parse(localStorage.getItem('platforms'))
    const genres = JSON.parse(localStorage.getItem("genres"))
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const signedInUserInfo = useSelector(state => state.userInfoReducer)
    const gameInfo = useSelector(state => state.gameReducer)
    console.log(gameInfo)
    const lastPostIndex = page * limit;
    const firstPostIndex = lastPostIndex - limit;
    const dispatch = useDispatch()
    let filteredGames = gameInfo?.filter((game) => {
        if (!selectedGenres.every((genre) => game.genres.includes(genre))) {
            return false;
        }
        if (!selectedPlatforms.every((platform) => game.platforms.includes(platform))) {
            return false;
        }

        if (globalSearch) {
            return Object.values(game).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(globalSearch.toLowerCase());
                }
                return false;
            });
        }

        return true;
    });

    const paginatedFiltredGames = filteredGames.slice(
        firstPostIndex,
        lastPostIndex
    );

    const onDelete = async (id) => {
        try {
          await deleteGameAsync(id);
          const newItem = games.filter((item) => item.id !== id);
          dispatch(removeGame(id))
          saveItems(newItem);
        } catch (error) {
          console.error(error);
          // Handle error if necessary
        }
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

    return (
        <div className="mt-6.25">
            <div className="flex flex-row px-60  flex-wrap">
                {paginatedFiltredGames.map((item) => (
                    <div className='flex flex-col  justify-between items-center  rounded shadow  py-5 px-5'>
                        <div className="flex justify-center items-center">
                            <Link to={`/${item.id}`}>
                                <img className="w-15 h-15" src={item.image}/>
                            </Link>
                        </div>
                        <div className="font-bold text-lg">{item.name}</div>
                        <div>The description is: {item.description}</div>
                        <div>Genres: {[...item.genres].join(', ')}</div>
                        <div>Platform: {[...item.platforms].join(', ')}</div>
                        {signedInUserInfo.isAdmin ? (
                            <div className="flex items-center justify-between">
                                <GrTrash
                                    className="cursor-pointer"
                                    onClick={() => onDelete(item.id)}
                                />
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
            <div className="fixed top-16 border-shadow">
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
                filteredGamesCount={filteredGames.length}
            />
        </div>
    );
}

export default Games;
