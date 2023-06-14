import {useState} from "react"
import {signUserUpAsync} from '../api/UsersApi'
import SignUpPopUp from "../popups/SignUpPopUp"
function SignUp(){

    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const [isPopUpTrue, setIsPopUpTrue] = useState(false)
    const classes = {
        inputClass: 
        'shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        buttonClass:
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
    }

        function emailHandler(e){
            setEmail(e.target.value)
            
        }

        function passwordHandler(e){
            setPassword(e.target.value)
        }

        async function onSignUpHandler(e){
            e.preventDefault()
            if (email === '' || password === '') {
                return;
            }
            
            try {
                await signUserUpAsync(email, password)
                onOpenPopUpHandler()
                setEmail('')
                setPassword('')
                console.log("Success")
            }catch(error){
                console.error(error)
            }
        }

        function onClosePopUpHandler(){
            setIsPopUpTrue(false)
        }

        function onOpenPopUpHandler(){
            setIsPopUpTrue(true)
        }
    return (
        <div >
        {!isPopUpTrue ? (
            <div className="flex flex-col justify-center items-center max-width h-screen gap-10">
            <div>Email</div>
            <input onChange={emailHandler} placeholder='Enter your email...' type="email" className={classes.inputClass}/>
            <div>Password</div>
            <input onChange={passwordHandler} placeholder='Enter your password...' type='password' className={classes.inputClass}/>
            <button className={classes.buttonClass} onClick={onSignUpHandler}>Sign Up Now</button>
            </div>
            )
            : (
            <div>
                <SignUpPopUp onClosePopUpHandler={onClosePopUpHandler}/>
            </div>
            )
}
            </div>
    )
}
export default SignUp;