import { Navigate, RouteObject } from 'react-router-dom';
// 实现路由懒加载
import { Suspense, lazy } from 'react';
import { useEffect,useState } from 'react';
import Layout from '../layout/Layout';
import Loading from '../components/Loading';
const Home = lazy(() => import('../pages/Home/Home'));
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
// 测试Loading
// const LoadingWrapper = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 设置定时器，持续显示加载状态
//     const timer = setInterval(() => {
//       setLoading(true);
//     }, 1000); // 每秒保持加载状态

//     // 清理定时器
//     return () => clearInterval(timer);
//   }, []);

//   return loading ? <Loading /> : <Home />;
// };
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
            {/* <LoadingWrapper /> */}
          </Suspense>
        ),
      },
      {
        path: '/activities',
        element: (
          <Suspense fallback={<Loading />}>
            <Activities />
          </Suspense>
        ),
      },
      {
        path: '/blogs',
        element: (
          <Suspense fallback={<Loading />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: '/mine',
        element: (
          <Suspense fallback={<Loading />}>
            <Mine />
          </Suspense>
        ),
        children: [
          {
            path: 'admin',
            element: (
              <Suspense fallback={<Loading />}>
                <Administrator />
              </Suspense>
            ),
            children: [
              {
                path: 'allactivity',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Allactivity />
                  </Suspense>
                ),
              },
              {
                path: 'allmember',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Allmember />
                  </Suspense>
                ),
              },
              {
                path: 'editdirection',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Editdirection />
                  </Suspense>
                ),
              },
              {
                path: 'editdonation',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Editdonation />
                  </Suspense>
                ),
              },
              {
                path: 'postactivity',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Postactivity />
                  </Suspense>
                ),
              },
              {
                path: 'verifymember',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Verifymember />
                  </Suspense>
                ),
              },
              {
                path: 'edittrainplan',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Edittrainplan />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: 'user',
            element: (
              <Suspense fallback={<Loading />}>
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
                  <Suspense fallback={<Loading />}>
                    <Changeinfo />
                  </Suspense>
                ),
              },
              {
                path: 'myinfo',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Myinfo />
                  </Suspense>
                ),
              },
              {
                path: 'groupmember',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Groupmember />
                  </Suspense>
                ),
              },
              {
                path: 'donation',
                element: (
                  <Suspense fallback={<Loading />}>
                    <Donation />
                  </Suspense>
                ),
              },
              {
                path: 'directionplan',
                element: (
                  <Suspense fallback={<Loading />}>
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
          <Suspense fallback={<Loading />}>
            <Members />
          </Suspense>
        ),
      },
      {
        path: '/graduate',
        element: (
          <Suspense fallback={<Loading />}>
            <Graduate />
          </Suspense>
        ),
      },
      {
        path: '/trainingplan',
        element: (
          <Suspense fallback={<Loading />}>
            <Trainingplan />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<Loading />}>
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
