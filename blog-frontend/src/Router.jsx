import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import Home from "./components/root/Home";
import ProtectedRoute from "./ProtectedRoute";
import PostsList from "./components/posts/PostsList";
import PostCreate from "./components/posts/PostCreate";
import PostEdit from "./components/posts/PostEdit";
import PostDetails from "./components/posts/PostDetails";
import SignUpForm from "./components/auth/SignUpForm";
import LogInForm from "./components/auth/LogInForm";
import LogInSuccess from "./components/auth/LogInSuccess";

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
          path: "/sign-up",
          element: <SignUpForm />,
        },
        {
          path: "/log-in",
          element: <LogInForm />,
        },
        {
          path: "/log-in-success",
          element: <LogInSuccess />,
        },
        {
          path: "/posts",
          element: <PostsList />,
        },
        {
          path: "/posts/create",
          element: (
            <ProtectedRoute>
              <PostCreate />
            </ProtectedRoute>
          ),
        },
        {
          path: "/posts/edit/:postId",
          element: (
            <ProtectedRoute>
              <PostEdit />
            </ProtectedRoute>
          ),
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
