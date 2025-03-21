import { RouteObject } from 'react-router-dom';
import Layout from '../pages/layout';
import Mine from '../pages/mine';
import Trainingplan from '../pages/trainplan';
import Activities from '../pages/activities';
import Members from '../pages/members';
import Login from '../pages/login';
import Blogs from '../pages/blogs';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/blogs',
        element: <Blogs />,
      },
      {
        path: '/trainplan',
        element: <Trainingplan />,
      },
      {
        path: '/activities',
        element: <Activities />,
      },
      {
        path: '/members',
        element: <Members />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/mine',
        element: <Mine />,
      },
    ],
  },
  // 默认路径为首页
  {
    path: '*',
    element: <Layout />,
  },
];

export default routes;
