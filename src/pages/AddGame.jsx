import BasketballLogo from '../images/logo/basketball.png';
import { useState } from 'react';
import {Navigate} from 'react-router-dom'

function AddGame({ details, addGame, setDetails, platforms, genres, handleCheckboxInfoGenres, checkedInfo, setCheckedInfo}) {
  const classes = {
    inputFileStyles:
      'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setDetails({ ...details, image: base64 });
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
        <img src={BasketballLogo} className="object-contain h-500 w-500  " />
      </div>
      <form className="flex flex-col py-10 px-10 justify-between items-center">
        <h1 className="text-black text-lg">Name</h1>
        <input
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
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
                onChange={(e) =>
                  setDetails({ ...details, platform: platform[1] })
                }
              />
              <label>{platform[1]}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-3 ">
          <textarea
            onChange={(e) =>
              setDetails({ ...details, description: e.target.value })
            }
            className='mt-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
          >
            Description...
          </textarea>
          <input
            type="text"
            onChange={(e) => setDetails({ ...details, id: e.target.value })}
          />
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
