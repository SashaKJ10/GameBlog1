import axios from "axios"
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function SignIn({
                    userInfo,
                    setUserInfo,
                }) {
                    const navigate = useNavigate()
                    const signInHandler = async (e) => {
                        e.preventDefault();
                        try {
                          const res = await axios.post('http://localhost:5000/login', {
                            email: userInfo.email,
                            password: userInfo.password,
                          });
                          console.log(res.data)
                          setUserInfo(res.data)
                           alert('Login successful!');
                           localStorage.setItem("userInfoApi", JSON.stringify(res.data))
                           navigate("/")
                          console.log(userInfo)
                        } catch (err) {
                          if (err.response.status === 401) {
                            alert('Incorrect password');
                          } else if (err.response.status === 404) {
                            alert('User not found');
                          } else {
                            console.error(err);
                          }
                        }
                      };
        let storedUserInfo = JSON.parse(localStorage.getItem('userInfoApi') ?? '{}');

    
    useEffect(() => {
         storedUserInfo = JSON.parse(localStorage.getItem('userInfoApi') ?? '{}');
        if (Object.keys(storedUserInfo).length !== 0) {
          setUserInfo(storedUserInfo);
        }
      }, []);
      
    const classes = {
        buttonStyles:
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
        inputStyles:
            'shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    };
    return (
        <div className="flex justify-center h-screen">
            {Object.keys(storedUserInfo).length !== 0 ? (
                <div className="flex justify-center items-center text-lg">
                    You are signed in as {storedUserInfo.email}
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
