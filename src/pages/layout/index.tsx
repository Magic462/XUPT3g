import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <ul>
        <li className="" onClick={() => navigate('/')}>
          首页
        </li>
        <li className="" onClick={() => navigate('/blogs')}>
          博客
        </li>
        <li className="" onClick={() => navigate('/activities')}>
          动态
        </li>
        <li className="" onClick={() => navigate('/members')}>
          成员
        </li>
        <li className="" onClick={() => navigate('/trainplan')}>
          培养计划
        </li>
        <li className="" onClick={() => navigate('/login')}>
          登录
        </li>
        <li className="" onClick={() => navigate('/mine')}>
          我的
        </li>
      </ul>

      {/* 二级路由出口 */}
      <Outlet />
    </>
  );
};

export default Layout;
