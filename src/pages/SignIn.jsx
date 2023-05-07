import {useState} from "react"
function SignIn({
                    userInfo,
                    setUserInfo,
                }) {
    // TODO: Task 3.1 - Remove this state field entirely ✔

    const signInHandler = (e) => {
        e.preventDefault();
        let updatedUserInfo = {...userInfo, isAdmin: userInfo.email === "sasha023@gmail.com"};
        setUserInfo(updatedUserInfo);
        // TODO: Task 3.2 - Remove this setUsers usage ✔
        let updatedUserInfoStr = JSON.stringify(updatedUserInfo);
        localStorage.setItem('userInfo', updatedUserInfoStr);
    };
    let signedUserInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');

    const classes = {
        buttonStyles:
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
        inputStyles:
            'shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    };
    return (
        <div className="flex justify-center h-screen">
            {Object.values(signedUserInfo).length !== 0 ? (
                <div className="flex justify-center items-center text-lg">
                    You are signed in as {signedUserInfo?.email}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <label>Email</label>
                        <div className="py-3">
                            <input
                                type="text"
                                onChange={(e) =>
                                    setUserInfo({...userInfo, email: e.target.value})
                                }
                                className={classes.inputStyles}
                            />
                        </div>
                        <label>Password</label>
                        <div className="py-3">
                            <input
                                type="password"
                                onChange={(e) =>
                                    setUserInfo({...userInfo, password: e.target.value})
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
