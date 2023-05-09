import {useState} from 'react';
import {Link} from 'react-router-dom';
import {GiSwordSlice} from 'react-icons/gi';

function TopBar({
                    setGlobalSearch
                }) {
    const [search, setSearch] = useState('');
    const [clickInfo, setClickInfo] = useState({
        gameButtonClicked: false,
        signInButtonClicked: false,
        accountButtonClicked: false,
        addGameButtonClicked: false,
    });

    const classes = {
        button:
            'bg-green-500/75 whitespace-nowrap hover:bg-green-600/75 text-white font-bold py-2 px-2 rounded cursor-pointer',
        buttonClicked:
            'bg-blue-500/75 whitespace-nowrap hover:bg-blue-600/75 text-white font-bold py-2 px-2 rounded cursor-pointer',
    };

    let signedUserInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');

    const LogOut = () => {
        if (Object.values(signedUserInfo).length !== 0) {
            localStorage.removeItem('userInfo');
            window.location.reload(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        setGlobalSearch(search);
    }

    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    return (
        <div className="fixed top-0 flex w-full bg-gray-500 shadow border-gray-300 z-10">
            <div
                className="cursor-default flex items-center mx-2 my-1 px-2 py-1 rounded-lg border-2
                      border-t-emerald-300 border-r-red-300 border-b-blue-300 border-l-pink-300"
            >
                <GiSwordSlice className="w-10 h-10 text-white"/>
                <span className="ml-1 text-white text-xl">GameHub</span>
            </div>
            <div className="flex w-full justify-between">
                <div className="flex items-center">
                    <div className="px-2">
                        {Object.values(signedUserInfo).length !== 0 ? (
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
                    <div className="px-2">
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

                <form
                    className="flex items-center w-1/2"
                    onSubmit={submit}
                >
                    <label for="simple-search" class="sr-only">
                        Search
                    </label>
                    <div className="relative w-full mr-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearchChange}
                            required
                        />
                    </div>
                    <button type="submit" className={classes.button}>
                        <svg
                            className="w-5 h-5"
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
                        <span className="sr-only">Search</span>
                    </button>
                </form>

                <div className="flex items-center">
                    <div className="px-2">
                        {signedUserInfo?.email === signedUserInfo.isAdmin && Object.values(signedUserInfo).length !== 0 ? (
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
                    <div className="px-2">
                        {Object.values(signedUserInfo).length !== 0 ? (
                            <h2 className="cursor-default flex justify-content items-center text-bold text-white whitespace-nowrap">
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
                    <div className="px-2">
                        {Object.values(signedUserInfo).length !== 0 ? (
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
