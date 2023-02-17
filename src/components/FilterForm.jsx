const FilterForm = ({
  genres,
  platforms,
  filterByGenres,
  filterByPlatforms,
}) => {
  return (
    <div className="flex flex-col items-center justify-center relative bottom-5 bg-gray-300 p-10 rounded-lg">
      <div className="mb-5 font-bold text-lg">Genres:</div>
      <div className="flex flex-col flex-wrap">
        {genres.map((genre) => (
          <div className="flex items-center mr-5 mb-5">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              onChange={(event) => filterByGenres(event, genre[1])}
            />
            <label className="ml-2 text-gray-700">{genre[1]}</label>
          </div>
        ))}
      </div>
      <div className="mb-5 font-bold text-lg">Platforms:</div>
      <div className="flex flex-col flex-wrap">
        {platforms.map((platform) => (
          <div className="flex items-center mr-5 mb-5">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              onChange={(event) => filterByPlatforms(event, platform[1])}
            />
            <label className="ml-2 text-gray-700">{platform[1]}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterForm;
