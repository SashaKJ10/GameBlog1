import SnoopDog from '../images/UserImg/SnoopDog.jpg';

function Account({
                     userInfo,
                 }) {
    const classes = {
        imageContainer: `flex flex-col items-center`,
        roleContainer: `flex items-center justify-center py-3`,
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className={classes.imageContainer}>
                <img src={SnoopDog} className="w-15 h-15"/>
            </div>
            <div className="flex flex-col justify-center items-center pl-4">

                <div>
                    {userInfo?.email}
                </div>
                <div>
                    {userInfo?.password}
                </div>
                <div className={classes.roleContainer}>
                    <h1>
                        {(userInfo?.isAdmin ? 'admin' : '')}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Account;
