import Routing from './components/Routing';

function App() {
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

    return (
        <div className="flex flex-col top-3.7 absolute w-full">
            <Routing/>
        </div>
    );
}

export default App;
