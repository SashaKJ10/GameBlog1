import { Link } from 'react-router-dom';
function NotFoundPage() {
  return (
    <div>
      404 Not Found go to <Link to="/">Home</Link>
    </div>
  );
}

export default NotFoundPage;
