import { Navigate, replace, RouteObject } from 'react-router-dom';
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
import Administrator from '@/pages/mine/subpages/administrator/Administrator';
import User from '@/pages/mine/subpages/user/User';
// mine/admin四级路由
import Allactivity from '@/pages/mine/subpages/administrator/subrouter/allactivity/Allactivity';
import Allmember from '@/pages/mine/subpages/administrator/subrouter/allmember/Allmember';
import Editdirection from '@/pages/mine/subpages/administrator/subrouter/editdirection/Editdirection';
import Editdonation from '@/pages/mine/subpages/administrator/subrouter/editdonation/Editdonation';
import Postactivity from '@/pages/mine/subpages/administrator/subrouter/postactivity/Postactivity';
import Verifymember from '@/pages/mine/subpages/administrator/subrouter/verifymember/Verifymember';
// mine/changeinfo
import Changeinfo from '@/pages/mine/subpages/user/subrouter/changeinfo/Changeinfo';
import Donation from '@/pages/mine/subpages/user/subrouter/donations/Donations';
import Groupmember from '@/pages/mine/subpages/user/subrouter/groupmember/Groupmember';
import Myinfo from '@/pages/mine/subpages/user/subrouter/myinfo/Myinfo';

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
          {
            path: 'admin',
            element: <Administrator></Administrator>,
            children: [
              { path: 'allactivity', element: <Allactivity></Allactivity> },
              { path: 'allmember', element: <Allmember></Allmember> },
              {
                path: 'editdirection',
                element: <Editdirection></Editdirection>,
              },
              { path: 'editdonation', element: <Editdonation></Editdonation> },
              { path: 'postactivity', element: <Postactivity></Postactivity> },
              { path: 'verifymember', element: <Verifymember></Verifymember> },
            ],
          },
          {
            path: 'user',
            element: <User></User>,
            children: [
              {
                index: true,
                element: <Navigate to="myinfo" replace />,
              },
              { path: 'changeinfo', element: <Changeinfo></Changeinfo> },
              { path: 'Myinfo', element: <Myinfo></Myinfo> },
              { path: 'groupmember', element: <Groupmember></Groupmember> },
              { path: 'donation', element: <Donation></Donation> },
            ],
          },
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
