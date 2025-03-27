import { RouteObject } from 'react-router-dom';
import Layout from '../layout/Layout';
// 二级路由组件引入
import Mine from '../pages/mine/Mine';
import Trainingplan from '../pages/trainplan/Trainplan';
import Activities from '../pages/activities/Activities';
import Members from '../pages/members/Members';
import Graduate from '../pages/Graduate/Graduate';
import Login from '../pages/login/Login';
import Blogs from '../pages/blogs/Blogs';
import Home from '../pages/Home/Home';
// mine三级路由引入
import Settings from '@/pages/mine/subpages/settings/Settings';
import Donation from '@/pages/mine/subpages/donations/Donations';
import Editactivity from '@/pages/mine/subpages/editactivity/Editactivity';
import Editdirection from '@/pages/mine/subpages/editdirection/Editdirection';
import Editregister from '@/pages/mine/subpages/editregister/Editregister';
import Editdonation from '@/pages/mine/subpages/editdonation/Editdonation';
import Groupmember from '@/pages/mine/subpages/groupmember/Groupmember';
// mine/setting四级路由
import Myinfo from '@/pages/mine/subpages/settings/subrouter/myinfo/Myinfo';
import Changeinfo from '@/pages/mine/subpages/settings/subrouter/changeinfo/Changeinfo';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/activities', element: <Activities /> },
      { path: '/blogs', element: <Blogs /> },
      {
        path: '/mine',
        element: <Mine />,
        children: [
          { index: true, element: <Settings /> },
          {
            path: 'settings',
            element: <Settings />,
            children: [
              { index: true, element: <Myinfo /> },
              { path: 'myinfo', element: <Myinfo /> },
              { path: 'changeinfo', element: <Changeinfo /> },
            ],
          },
          { path: 'donation', element: <Donation /> },
          { path: 'editactivity', element: <Editactivity /> },
          { path: 'editdirection', element: <Editdirection /> },
          { path: 'editregister', element: <Editregister /> },
          { path: 'editdonation', element: <Editdonation /> },
          { path: 'groupmember', element: <Groupmember /> },
        ],
      },
      { path: '/members', element: <Members /> },
      { path: '/graduate', element: <Graduate /> },
      { path: '/trainingplan', element: <Trainingplan /> },
      { path: '/login', element: <Login /> },
    ],
  },
];

export default routes;
