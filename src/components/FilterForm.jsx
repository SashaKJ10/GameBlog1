import { useState, useEffect } from 'react';
const FilterForm = ({
  platforms,
  genres,
  filteredGenres,
  filteredPlatforms,
}) => {
  return (
    <div className="flex flex-col justify-around">
      <div className="px-10">
        <h1>Filters</h1>
        <div className="py-5">
          <div>Genres: </div>
          {genres.map((genre) => (
            <div className="flex flex-row">
              <input
                type="checkbox"
                onChange={() => filteredGenres(genre[1])}
              />
              <label>{genre[1]}</label>
            </div>
          ))}
        </div>
        <div>Platforms: </div>
        {platforms.map((platform) => (
          <div className="flex flex-row">
            <input
              type="checkbox"
              onChange={() => filteredPlatforms(platform[1])}
            />
            <label>{platform[1]}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterForm;
