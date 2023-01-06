import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BasketballLogo from '../images/logo/basketball.png';
import { GiAnts } from 'react-icons/gi';
function TopBar({ signedIn, userInfo, setSignedIn }) {
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
  return (
    <div className="fixed top-0 flex w-full bg-gray-200 shadow border">
      <div className="flex items-center justify-center">
        <GiAnts className="h-10 w-10" />
      </div>
      <div className="text-blue-600/100 p-2 text-xl mt-1.5">GameHub</div>
      <div className="border-l-4 border-indigo-500 border-1 h-25"></div>
      <div className="flex w-full justify-between">
        <div className="flex">
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
