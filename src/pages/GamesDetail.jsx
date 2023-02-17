import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGameById } from '../api/DataLoader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CommentList from '../components/CommentList';
function GamesDetails({ userInfo, signedIn }) {
  const { id } = useParams();
  const [game, setGame] = useState({
    id: 0,
    image: '',
    name: '',
    description: '',
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    getGameById(id)
      .then((result) => {
        setGame(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-900">
      <div className="">
        <TransitionGroup component={null}>
          <CSSTransition timeout={500} classNames="fade">
            <div className="flex flex-col items-center justify-center">
              <img
                className="w-500 h-500 rounded-lg  overflow-hidden shadow-lg transform duration-500 ease-in-out hover:scale-105 z-5"
                src={game.image}
              />
              <div className="px-6 py-4 bg-blue-300 rounded-lg shadow-lg mt-3">
                <div className="font-bold font-julee text-4xl mb-2">
                  Name: {game.name}
                </div>
                <div className="text-base font-julee text-gray-700">
                  Platforms: {[...game.platforms].join(' ,')}
                </div>
                <div className="text-base font-julee text-gray-700 mt-2">
                  Genres: {[...game.genres].join(' ,')}
                </div>
                <div className="text-2xl font-julee text-gray-800 mt-3">
                  Description: {game.description}
                </div>
              </div>
              <div className="">
                <CommentList userInfo={userInfo} signedIn={signedIn} />
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default GamesDetails;
