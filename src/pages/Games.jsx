import FilterForm from '../components/FilterForm.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GrTrash } from 'react-icons/gr';
import Card from '../containers/Card';
import Pagination from '../components/Pagination';

function Games({ games, setGames, saveItems, userInfo, platforms, genres, filteredGames,  selectedGenres, selectedPlatforms,setSelectedGenres, setSelectedPlatforms, paginatedFiltredGames, totalPages, setTotalPages, limit, setLimit, page, setPage }) {
  const admin = localStorage.getItem('admin');

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

  return (
    <div className="mt-6.25">
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
        paginatedFiltredGames={paginatedFiltredGames}
        filteredGames={filteredGames}
      />
    </div>
  );
}
export default Games;
