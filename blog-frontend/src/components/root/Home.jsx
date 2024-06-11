import { Link } from "react-router-dom";
import AuthContext from "../../AuthProvider";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="mt-2 flex flex-col items-start space-y-8 px-4 py-2 sm:mt-8 sm:items-center sm:space-y-16 sm:p-4 sm:text-center">
        <h2 className="mt-24 text-5xl sm:mt-20 sm:text-8xl">Kith Blog</h2>
        {user && <p>Welcome {user.firstName}</p>}
        <Link to="/posts">
          <button
            type="button"
            className="btn inline-flex h-auto w-auto items-center justify-center rounded-lg  px-5 py-2.5 text-center text-lg font-medium text-neutral-300  focus:outline-none focus:ring-4 focus:ring-neutral-300 sm:h-20 sm:w-64 sm:text-xl"
          >
            View Posts
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
