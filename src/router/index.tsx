import { Navigate, RouteObject } from 'react-router-dom';
// 实现路由懒加载
import { Suspense, lazy } from 'react';

import Layout from '../layout/Layout';
// 二级路由组件引入
// import Mine from '../pages/mine/Mine';
// import Trainingplan from '../pages/trainplan/Trainplan';
// import Activities from '../pages/activities/Activities';
// import Members from '../pages/members/Members';
// import Graduate from '../pages/Graduate/Graduate';
// import Login from '../pages/login/Login';
// import Register from '../pages/register/Register';
// import Blogs from '../pages/blogs/Blogs';
import Home from '../pages/Home/Home';
// // mine三级路由引入
// import Administrator from '@/pages/mine/subpages/administrator/Administrator';
// import User from '@/pages/mine/subpages/user/User';
// // mine/admin四级路由
// import Allactivity from '@/pages/mine/subpages/administrator/subrouter/allactivity/Allactivity';
// import Allmember from '@/pages/mine/subpages/administrator/subrouter/allmember/Allmember';
// import Editdirection from '@/pages/mine/subpages/administrator/subrouter/editdirection/Editdirection';
// import Editdonation from '@/pages/mine/subpages/administrator/subrouter/editdonation/Editdonation';
// import Postactivity from '@/pages/mine/subpages/administrator/subrouter/postactivity/Postactivity';
// import Verifymember from '@/pages/mine/subpages/administrator/subrouter/verifymember/Verifymember';
// // mine/changeinfo
// import Changeinfo from '@/pages/mine/subpages/user/subrouter/changeinfo/Changeinfo';
// import Donation from '@/pages/mine/subpages/user/subrouter/donations/Donations';
// import Groupmember from '@/pages/mine/subpages/user/subrouter/groupmember/Groupmember';
// import Myinfo from '@/pages/mine/subpages/user/subrouter/myinfo/Myinfo';

// const routes: RouteObject[] = [
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { path: '/', element: <Home /> },
//       { path: '/activities', element: <Activities /> },
//       { path: '/blogs', element: <Blogs /> },
//       {
//         path: '/mine',
//         element: <Mine />,
//         children: [
//           {
//             path: 'admin',
//             element: <Administrator></Administrator>,
//             children: [
//               { path: 'allactivity', element: <Allactivity></Allactivity> },
//               { path: 'allmember', element: <Allmember></Allmember> },
//               {
//                 path: 'editdirection',
//                 element: <Editdirection></Editdirection>,
//               },
//               { path: 'editdonation', element: <Editdonation></Editdonation> },
//               { path: 'postactivity', element: <Postactivity></Postactivity> },
//               { path: 'verifymember', element: <Verifymember></Verifymember> },
//             ],
//           },
//           {
//             path: 'user',
//             element: <User></User>,
//             children: [
//               {
//                 index: true,
//                 element: <Navigate to="myinfo" replace />,
//               },
//               { path: 'changeinfo', element: <Changeinfo></Changeinfo> },
//               { path: 'Myinfo', element: <Myinfo></Myinfo> },
//               { path: 'groupmember', element: <Groupmember></Groupmember> },
//               { path: 'donation', element: <Donation></Donation> },
//             ],
//           },
//         ],
//       },
//       { path: '/members', element: <Members /> },
//       { path: '/graduate', element: <Graduate /> },
//       { path: '/trainingplan', element: <Trainingplan /> },
//       { path: '/login', element: <Login /> },
//       { path: '/register', element: <Register /> },
//     ],
//   },
// ];

// 懒加载组件
const Mine = lazy(() => import('../pages/mine/Mine'));
const Trainingplan = lazy(() => import('../pages/trainplan/Trainplan'));
const Activities = lazy(() => import('../pages/activities/Activities'));
const Members = lazy(() => import('../pages/members/Members'));
const Graduate = lazy(() => import('../pages/Graduate/Graduate'));
const Login = lazy(() => import('../pages/login/Login'));
const Register = lazy(() => import('../pages/register/Register'));
const Blogs = lazy(() => import('../pages/blogs/Blogs'));
// import Notfound from '@/pages/notfound/Notfound';
const Notfound = lazy(() => import('../pages/notfound/Notfound'));
// const Home = lazy(() => import('../pages/Home/Home'));

// mine三级路由引入
const Administrator = lazy(
  () => import('@/pages/mine/subpages/administrator/Administrator')
);
const User = lazy(() => import('@/pages/mine/subpages/user/User'));

// mine/admin四级路由
const Allactivity = lazy(
  () =>
    import(
      '@/pages/mine/subpages/administrator/subrouter/allactivity/Allactivity'
    )
);
const Allmember = lazy(
  () =>
    import('@/pages/mine/subpages/administrator/subrouter/allmember/Allmember')
);
const Editdirection = lazy(
  () =>
    import(
      '@/pages/mine/subpages/administrator/subrouter/editdirection/Editdirection'
    )
);
const Editdonation = lazy(
  () =>
    import(
      '@/pages/mine/subpages/administrator/subrouter/editdonation/Editdonation'
    )
);
const Postactivity = lazy(
  () =>
    import(
      '@/pages/mine/subpages/administrator/subrouter/postactivity/Postactivity'
    )
);
const Verifymember = lazy(
  () =>
    import(
      '@/pages/mine/subpages/administrator/subrouter/verifymember/Verifymember'
    )
);
const Edittrainplan = lazy(
  () =>
    import(
      '@/pages/mine/subpages/administrator/subrouter/edittrainplan/Edittrainplan'
    )
);

// mine/user
const Changeinfo = lazy(
  () => import('@/pages/mine/subpages/user/subrouter/changeinfo/Changeinfo')
);
const Donation = lazy(
  () => import('@/pages/mine/subpages/user/subrouter/donations/Donations')
);
const Groupmember = lazy(
  () => import('@/pages/mine/subpages/user/subrouter/groupmember/Groupmember')
);
const Myinfo = lazy(
  () => import('@/pages/mine/subpages/user/subrouter/myinfo/Myinfo')
);
const Directionplan = lazy(
  () =>
    import('@/pages/mine/subpages/user/subrouter/directionplan/Directionplan')
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/activities',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Activities />
          </Suspense>
        ),
      },
      {
        path: '/blogs',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: '/mine',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Mine />
          </Suspense>
        ),
        children: [
          {
            path: 'admin',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Administrator />
              </Suspense>
            ),
            children: [
              {
                path: 'allactivity',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Allactivity />
                  </Suspense>
                ),
              },
              {
                path: 'allmember',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Allmember />
                  </Suspense>
                ),
              },
              {
                path: 'editdirection',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Editdirection />
                  </Suspense>
                ),
              },
              {
                path: 'editdonation',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Editdonation />
                  </Suspense>
                ),
              },
              {
                path: 'postactivity',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Postactivity />
                  </Suspense>
                ),
              },
              {
                path: 'verifymember',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Verifymember />
                  </Suspense>
                ),
              },
              {
                path: 'edittrainplan',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Edittrainplan />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: 'user',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <User />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: <Navigate to="myinfo" replace />,
              },
              {
                path: 'changeinfo',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Changeinfo />
                  </Suspense>
                ),
              },
              {
                path: 'myinfo',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Myinfo />
                  </Suspense>
                ),
              },
              {
                path: 'groupmember',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Groupmember />
                  </Suspense>
                ),
              },
              {
                path: 'donation',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Donation />
                  </Suspense>
                ),
              },
              {
                path: 'directionplan',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Directionplan />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: '/members',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Members />
          </Suspense>
        ),
      },
      {
        path: '/graduate',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Graduate />
          </Suspense>
        ),
      },
      {
        path: '/trainingplan',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Trainingplan />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Notfound />,
  },
];

export default routes;
