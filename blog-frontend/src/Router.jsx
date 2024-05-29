import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import Home from "./components/root/Home";
import PostsList from "./components/posts/PostsList";
import PostForm from "./components/posts/PostForm";
import PostDetails from "./components/posts/PostDetails";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/posts",
          element: <PostsList />,
        },
        {
          path: "/posts/create",
          element: <PostForm />,
        },
        {
          path: "/posts/:postId",
          element: <PostDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
