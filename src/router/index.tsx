import { RouteObject } from 'react-router-dom';
import Layout from '../layout';
import Mine from '../pages/mine';
import Trainingplan from '../pages/trainplan';
import Activities from '../pages/activities';
import Members from '../pages/members';
import Login from '../pages/login';
import Blogs from '../pages/blogs/index';
import Home from '../pages/Home/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/activities',
        element: <Activities />,
      },
      {
        path: '/blogs',
        element: <Blogs />,
      },
      {
        path: '/mine',
        element: <Mine />,
      },
      {
        path: '/members',
        element: <Members />,
      },
      {
        path: '/trainingplan',
        element: <Trainingplan />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
];

export default routes;
