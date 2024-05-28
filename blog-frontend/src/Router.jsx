import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import PostsList from './components/posts/PostsList';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/posts',
      element: <PostsList />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
