const FilterForm = ({
  genres,
  platforms,
  filterByGenres,
  filterByPlatforms,
}) => {
  return (
    <div className="flex flex-col justify-around">
      <div className="px-10">
        <div className="py-5">
          <div>Genres: </div>
          {genres.map((genre) => (
            <div className="flex flex-row">
              <input
                type="checkbox"
                onChange={(event) => filterByGenres(event, genre[1])}
              />
              <label>{genre[1]}</label>
            </div>
          ))}
        </div>
        <div className="py-5">
          <div>Platforms: </div>
          {platforms.map((platform) => (
            <div className="flex flex-row">
              <input
                type="checkbox"
                onChange={(event) => filterByPlatforms(event, platform[1])}
              />
              <label>{platform[1]}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilterForm;
