import SnoopDog from '../images/UserImg/SnoopDog.jpg';
import { useSelector } from 'react-redux';
import {loadStateFromStorage} from '../utils/reduxLocalState'

function Account({
    
                 }) {
    const classes = {
        imageContainer: `flex flex-col items-center`,
        roleContainer: `flex items-center justify-center py-3`,
    };
    const signedInUserInfo = useSelector(state => state.userInfoReducer)
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className={classes.imageContainer}>
                <img src={SnoopDog} className="w-15 h-15"/>
            </div>
            <div className="flex flex-col justify-center items-center pl-4">

                <div>
                    {signedInUserInfo.email}
                </div>
                <div>
                    {signedInUserInfo.password}
                </div>
                <div className={classes.roleContainer}>
                    <h1>
                        {(signedInUserInfo.isAdmin ? 'admin' : '')}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Account;
