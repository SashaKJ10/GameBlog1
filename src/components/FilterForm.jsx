const FilterForm = ({
  genres,
  platforms,
  filterByGenres,
  filterByPlatforms,
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
                    onChange={(event) => filterByGenres(event, genre[1])}
                />
                <label>{genre[1]}</label>
              </div>
          ))}
        </div>
        <div className="py-5">
          <div>Platforms: </div>
          {
            // TODO: Write platform filter here
          }
        </div>
      </div>
    </div>
  );
};
export default FilterForm;
