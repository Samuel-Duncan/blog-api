import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div
        aria-labelledby="drawer-navigation-label"
        className="fixed left-0 top-0 z-40 h-screen w-72 -translate-x-full overflow-y-auto bg-neutral-300 p-4 transition-transform"
        id="drawer-navigation"
        tabIndex="-1"
      >
        <h5
          className="text-base font-semibold uppercase text-gray-900"
          id="drawer-navigation-label"
        >
          Menu
        </h5>
        {/* CLOSE BTN */}
        <button
          aria-controls="drawer-left-navigation"
          className="absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-900 hover:bg-gray-400 focus:bg-gray-400"
          data-drawer-hide="drawer-left-navigation"
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        {/* CONTENT */}
        <div className="overflow-y-auto py-4">
          <nav>
            <ul role="list" className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  className="group flex items-center rounded-lg p-2 text-gray-400 hover:bg-gray-400"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-900 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="ms-3 text-gray-900">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="posts"
                  className="group flex items-center rounded-lg p-2 text-gray-400 hover:bg-gray-400"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-gray-900 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  <span className="ms-3 flex-1 whitespace-nowrap text-gray-900">
                    Posts
                  </span>
                </Link>
              </li>
              <li>
                <a
                  className="group flex items-center rounded-lg p-2 text-gray-400 hover:bg-gray-400"
                  href="#"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-gray-900 transition duration-75"
                    fill="none"
                    viewBox="0 0 18 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="ms-3 flex-1 whitespace-nowrap text-gray-900">
                    Sign In
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;
