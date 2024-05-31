import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="box-border bg-gray-400 bg-opacity-100 shadow-lg">
        <div className="flex items-center justify-between px-3 py-4">
          <div className="drawer z-10">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <button
                className=" rounded-md px-0.5 py-0.5 text-sm hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                data-drawer-placement="left"
                type="button"
                data-drawer-target="drawer-navigation"
                data-drawer-show="drawer-navigation"
                aria-controls="drawer-navigation"
              >
                <label htmlFor="my-drawer" className="drawer-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2 text-black "
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6l16 0" />
                    <path d="M4 12l16 0" />
                    <path d="M4 18l16 0" />
                  </svg>
                </label>
              </button>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <li>
                  <Link to="/posts/create">Create Post</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* LOGO */}

          <h1 className="min-w-20 max-w-20">
            <Link to="/">
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className=""
                viewBox="0 0 900 383"
              >
                <path d="M0 191.5V383h900V0H0zm117-77c0 28.3.3 51.5.8 51.5s18.2-23.2 39.6-51.5L196.3 63h30.9c16.9 0 30.8.2 30.8.5s-16.4 22.2-36.4 48.7l-36.5 48.2 1.6 3c.9 1.7 19.8 37.4 42 79.4s40.3 76.5 40.3 76.7-13.6.4-30.2.3l-30.1-.3-30.1-57.7c-16.6-31.8-30.4-57.7-30.7-57.5s-7.5 8.7-15.7 19.2l-15.1 19-.1 38.7V320H63V63h54zm252 77V320h-54V63h54zM596 86v23h-66v211h-54V109h-65V63h185zm98 26.5V162h89V63h54v257h-55V212h-88v108h-54V63h54z" />
              </svg>
            </Link>
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;
