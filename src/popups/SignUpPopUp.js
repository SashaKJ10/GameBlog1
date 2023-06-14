function SignUpPopUp({onClosePopUpHandler}){
    const classes = {
       buttonClass:
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer',
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-slate-200 gap-2'>
        <div>Cool. You are all signed up and ready to embark on your journey. Congrats🎉🎉🎉🎉🎉</div>
        <button onClick={onClosePopUpHandler} className={classes.buttonClass}>OK</button>
        </div>
    )
}
export default SignUpPopUp;