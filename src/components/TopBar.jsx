import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiAnts } from 'react-icons/gi';
function TopBar({ signedIn, userInfo, setSignedIn, games }) {
  let [clickInfo, setClickInfo] = useState({
    gameButtonClicked: false,
    signInButtonClicked: false,
    accountButtonClicked: false,
    addGameButtonClicked: false,
  });

  const classes = {
    button:
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
    buttonClicked:
      'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
  };
  let admin = localStorage.getItem('admin');
  let signedInUser = localStorage.getItem('user');
  const LogOut = (e) => {
    if (signedInUser) {
      setSignedIn(false);
      localStorage.removeItem('user');
      console.log(signedInUser);
      localStorage.removeItem('userInfo');
    }
  };
  let signedUserInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
  useEffect(() => {
    window.addEventListener('load', (event) => {
      setSignedIn(true);
    });
  });
  const filterInput = (e) => {
    let lowerCase = e.target.value.toLowerCase();

    games.filter((game) => game.name.includes(lowerCase));
  };
  return (
    <div className="fixed top-0 flex w-full bg-gray-500 shadow border-gray-300">
      <div className="flex items-center justify-center">
        <GiAnts className="h-10 w-10" />
      </div>
      <div className="text-white-600/100 p-2 text-xl mt-1.5">GameHub</div>
      <div className="border-l-4 border-indigo-500 border-1 h-25"></div>
      <div className="flex w-full justify-between">
        <div className="flex ">
          <div className="px-2 mt-3 mb-1">
            {signedInUser ? (
              <Link
                to="/account"
                onClick={(e) =>
                  setClickInfo({
                    ...(clickInfo = false),
                    accountButtonClicked: true,
                  })
                }
                className={
                  clickInfo.accountButtonClicked
                    ? classes.buttonClicked
                    : classes.button
                }
              >
                Account
              </Link>
            ) : null}
          </div>
          <div className="px-2 mt-3 mb-1">
            <Link
              to="/"
              onClick={(e) =>
                setClickInfo({
                  ...(clickInfo = false),
                  gameButtonClicked: true,
                })
              }
              className={
                clickInfo.gameButtonClicked
                  ? classes.buttonClicked
                  : classes.button
              }
            >
              Games
            </Link>
          </div>
        </div>

        <form class="flex items-center">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>

        <div className="flex">
          <div className="px-2 mt-3 mb-1">
            {signedUserInfo?.email === admin && signedInUser ? (
              <Link
                to="/editing"
                onClick={(e) =>
                  setClickInfo({
                    ...(clickInfo = false),
                    addGameButtonClicked: true,
                  })
                }
                className={
                  clickInfo.addGameButtonClicked
                    ? classes.buttonClicked
                    : classes.button
                }
              >
                Add Game
              </Link>
            ) : null}
          </div>
          <div className="px-2 mt-3 mb-1">
            {signedInUser ? (
              <h2 className="flex justify-content items-center text-bold ">
                {signedUserInfo?.email}
              </h2>
            ) : (
              <Link
                to="/signin"
                onClick={(e) =>
                  setClickInfo({
                    ...(clickInfo = false),
                    signInButtonClicked: true,
                  })
                }
                className={
                  clickInfo.signInButtonClicked
                    ? classes.buttonClicked
                    : classes.button
                }
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="px-2 mt-3 mb-1">
            {signedInUser ? (
              <button className={classes.button} onClick={(e) => LogOut(e)}>
                Log out
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
