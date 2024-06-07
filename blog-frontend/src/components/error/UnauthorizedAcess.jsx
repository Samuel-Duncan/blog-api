import { Link } from "react-router-dom";

const UnauthorizedAccess = () => {
  return (
    <div className="unauthorized-access space-y-4 p-4">
      <h1 className="text-3xl text-red-600">Oops! Unauthorized Access</h1>
      <p>
        You don't have permission to access this page. You need to be logged in
        to view this content.
      </p>
      <div className="actions space-x-4">
        <Link to="/log-in" className="btn">
          Log In
        </Link>
        <Link to="/sign-up" className="btn btn-primary">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
