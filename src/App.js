import Routing from './components/Routing';
import {getCurrentUser} from "./api/UsersApi";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch();
    const genreValues = [
        [0, 'Shooter'],
        [1, 'Fantasy'],
    ];

    const platformValues = [
        [0, 'PC'],
        [1, 'Nintendo'],
        [2, 'PS5'],
    ];

    localStorage.setItem('genres', JSON.stringify(genreValues))
    localStorage.setItem('platforms', JSON.stringify(platformValues))

    useEffect(() => {
        dispatch(getCurrentUser("custom_email"));
    }, [dispatch]);

    return (
        <div className="flex flex-col top-3.7 absolute w-full">
            <Routing/>
        </div>
    );
}

export default App;