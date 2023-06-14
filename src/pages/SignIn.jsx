import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
function SignIn({
    isSignedIn,
    loginAsync,
}) {
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState({});
    const signedInUserInfo = useSelector(state => state.userInfoReducer)

    const signInHandler = async (e) => {
        e.preventDefault();
        try {
            await loginAsync(signInData.email, signInData.password);
            alert('Login successful!');
            navigate("/");
        } catch (ex) {
            alert(ex.error);
        }
    };

    function updateEmail(e) {
        setSignInData({...signInData, email: e.target.value});
    }

    function updatePassword(e) {
        setSignInData({...signInData, password: e.target.value})
    }

    const classes = {
        buttonStyles:
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
        inputStyles:
            'shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    };

    return (
        <div className="flex justify-center h-screen">
            {signedInUserInfo.email ? (
                <div className="flex justify-center items-center text-lg">
                    You are signed in as {signedInUserInfo.email}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <label>Email</label>
                        <div className="py-3">
                            <input
                                type="text"
                                onChange={updateEmail}
                                className={classes.inputStyles}
                            />
                        </div>
                        <label>Password</label>
                        <div className="py-3">
                            <input
                                type="password"
                                onChange={updatePassword}
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
