import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col">
      <h1 className="text-white">Not Found!</h1>
      <Link to="/" className="text-white">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
