import { RouteObject } from 'react-router-dom';
import Layout from '../layout/Layout';
import Mine from '../pages/mine/Mine';
import Trainingplan from '../pages/trainplan/Trainplan';
import Activities from '../pages/activities/Activities';
import Members from '../pages/members/Members';
import Graduate from '../pages/Graduate/Graduate';
import Login from '../pages/login/Login';
import Blogs from '../pages/blogs/Blogs';
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
        path: '/graduate',
        element: <Graduate />,
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
