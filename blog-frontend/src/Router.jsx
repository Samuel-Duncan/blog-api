import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import PostsList from "./components/posts/PostsList";
import PostDetails from "./components/posts/PostDetails";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/posts",
          element: <PostsList />,
        },
        {
          path: "/posts/:postId", // Define dynamic route with `:postId` placeholder
          element: <PostDetails />, // Replace with the component for individual posts
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
