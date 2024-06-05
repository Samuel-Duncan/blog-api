import { Link } from "react-router-dom"; // Import Link for routing
import LogOutButton from "./LogOutButton";

const LogInSuccess = () => {
  return (
    <div className="container mx-auto p-4 lg:p-20">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-3xl font-bold text-green-500">Login Successful!</h2>
        <p>You are now logged in.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
        <LogOutButton />
      </div>
    </div>
  );
};

export default LogInSuccess;
