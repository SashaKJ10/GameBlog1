import BasketballLogo from '../images/logo/basketball.png';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { createGameAsync } from '../api/GamesApi.js';
import {useDispatch} from 'react-redux'
// import {saveItems} from '../utils/localStorage'
import {addGames} from '../app/gamesReducer'

function AddGame({
                     setGames,
                 }) {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        image: '',
        name: '',
        genres: [],
        platforms: [],
        id: 0,
        comments: []
    });
    const dispatch = useDispatch()
    let games = JSON.parse(localStorage.getItem('items'))
    console.log(games)
    localStorage.setItem("detailsValue", JSON.stringify(details))
    const handleCheckboxInfoGenres = (e) => {
        const {checked, value} = e.target;

        let newGenres = details.genres;
        if (checked) {
            newGenres = [...newGenres, value];
        } else {
            newGenres = newGenres.filter((genre) => genre !== value);
        }

        setDetails({
            ...details,
            genres: newGenres,
        });
    };

    const handleCheckboxInfoPlatforms = (e) => {
        const {checked, value} = e.target;

        let newPlatforms = details.platforms;
        if (checked) {
            newPlatforms = [...newPlatforms, value];
        } else {
            newPlatforms = newPlatforms.filter((platform) => platform !== value);
        }

        setDetails({
            ...details,
            platforms: newPlatforms,
        });
    };
    const classes = {
        inputFileStyles:
            'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
    };
    const platforms = JSON.parse(localStorage.getItem('platforms'))
    const genres = JSON.parse(localStorage.getItem("genres"))
    const handleFileRead = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setDetails({...details, image: base64});
    };

    const saveItems = (items) => {
        let json = JSON.stringify(items);
        localStorage.setItem('items', json);
    };

    const addGame = async (event) => {
        event.preventDefault();
        try {
          const createdGame = await createGameAsync(details);
          console.log(createdGame)
          if(createdGame){
          dispatch(addGames(createdGame))
          }
          setDetails({
            image: '',
            name: '',
            genres: [],
            platforms: [],
            description: '',
          });
          navigate('/');
        } catch (error) {
          console.error('Failed to add game:', error);
        }
      };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className="flex  items-center justify-center">
            <div className="flex justify-center items-center">
                <img src={BasketballLogo} className="object-contain h-500 w-500  "/>
            </div>
            <form className="flex flex-col py-10 px-10 justify-between items-center">
                <h1 className="text-black text-lg">Name</h1>
                <input
                    onChange={(e) => setDetails({...details, name: e.target.value})}
                    type="text"
                    placeholder="Name..."
                />
                <h1 className="text-black text-lg">Upload an image</h1>
                <input
                    type="file"
                    className={classes.inputFileStyles}
                    onChange={handleFileRead}
                />
                <h1 className="text-black text-lg">Genres</h1>
                <div className="flex flex-row gap-3">
                    {genres.map((genre) => (
                        <div>
                            <input
                                type="checkbox"
                                value={`${genre[1]}`}
                                onChange={handleCheckboxInfoGenres}
                            />
                            <label className="font-medium antialiased">{genre[1]}</label>
                        </div>
                    ))}
                </div>
                <h1 className="text-black text-lg">Platforms</h1>
                <div className="flex flex-row gap-3">
                    {platforms.map((platform) => (
                        <div>
                            <input
                                type="checkbox"
                                value={`${platform[1]}`}
                                onChange={handleCheckboxInfoPlatforms}
                            />
                            <label>{platform[1]}</label>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center gap-3 ">
          <textarea
              onChange={(e) =>
                  setDetails({...details, description: e.target.value})
              }
              className='mt-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
          >
            Description...
          </textarea>
                    <button
                        onClick={addGame}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddGame;
