import { useParams } from 'react-router-dom';
function GamesDetails() {
  const { id } = useParams();
  return (
    <div>
      <div>This is the game number {id}</div>
    </div>
  );
}

export default GamesDetails;
