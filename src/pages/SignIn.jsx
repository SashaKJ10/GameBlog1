import { useState } from 'react';
function SignIn({
  users,
  setUsers,
  userInfo,
  setUserInfo,
  setSignedIn,
  signedIn,
}) {
  const signInHandler = (e) => {
    e.preventDefault();
    setUsers([...users, userInfo]);
    setSignedIn(true);
    localStorage.setItem('user', signedIn);
    let userInfoStr = JSON.stringify(userInfo);
    localStorage.setItem('userInfo', userInfoStr);
  };
  const signedInUser = localStorage.getItem('user');
  let signedUserInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');

  const classes = {
    buttonStyles:
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
    inputStyles:
      'shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
  };
  return (
    <div>
      {signedInUser ? (
        <div className=" flex items-center justify-center text-lg">
          You are signed in as {signedUserInfo.name}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div>
            <label>UserName</label>
            <div className="py-3">
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className={classes.inputStyles}
              />
            </div>
            <label>Email</label>
            <div className="py-3">
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className={classes.inputStyles}
              />
            </div>
            <div className="py-3">
              <button className={classes.buttonStyles} onClick={signInHandler}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
