import { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.scss'; // 引入样式文件
import useClickOutside from '../hooks/useClickOutside';
import '@/assets/icons/font_4k8jwf31qbs/iconfont.css';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // 用于控制二级侧边栏显示
  const [showSubNav, setShowSubNav] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { path: '/activities', label: '动态' },
    // { path: '/blogs', label: '博客' },
    { path: '/members', label: '成员风采' },
    { path: '/graduate', label: '毕业去向' },
    { path: '/mine', label: '我的' },
    { path: '/trainingplan', label: '培养计划' },
    { path: '/login', label: '登录' },
  ];

    // 获得当前年
    const now = new Date();
    const year = now.getFullYear();

  // 使用 useClickOutside Hook 监听点击外部
  useClickOutside(menuRef as React.RefObject<HTMLElement>, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  // 鼠标移动就收缩菜单
  // const [lastMouseY, setLastMouseY] = useState(window.innerHeight / 2);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  useEffect(() => {
      const handleScroll = () => {
          const currentScrollY = window.scrollY;
          const currentTime = Date.now();
          const timeDiff = currentTime - lastScrollTime;

          // 如果向下滚动，且菜单是打开状态
          if (currentScrollY > lastScrollY && isMenuOpen) {
              // 计算滚动速度（像素/毫秒）
              const scrollSpeed = (currentScrollY - lastScrollY) / timeDiff;

              // 如果滚动速度大于0.1像素/毫秒，或者滚动距离大于25像素，则关闭菜单
              if (scrollSpeed > 0.1 || currentScrollY - lastScrollY > 25) {
                  setIsMenuOpen(false);
              }
          }

          setLastScrollY(currentScrollY);
          setLastScrollTime(currentTime);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastScrollTime, isMenuOpen]);

  // 控制菜单闭合
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 跳转路径
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // 检测路由进入mine没
  const isMinePage = location.pathname.startsWith('/mine');

  // 监听页面尺寸隐藏默认二级导航
  useEffect(() => {
    const handleResize = () => {
      // 非移动端尺寸,Mine导航一直展开
      if (window.innerWidth > 768) {
        setShowSubNav(true);
      } else {
        setShowSubNav(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="main-layout">
      
      <div
        ref={menuRef}
        className={`menu-container ${isMenuOpen ? 'open' : ''}`}
      >
        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        {isMinePage && window.innerWidth <= 768 && (
          <button
            className="menu-submine-toggle"
            onClick={() => {
              setShowSubNav(!showSubNav);
            }}
          >
            <i className="iconfont icon-chengyuan"></i>
          </button>
        )}
        <div className="menu-text">
          <span>M</span>
          <span>o</span>
          <span>b</span>
          <span>i</span>
          <span>l</span>
          <span>e</span>
          <span>&nbsp;</span>
          <span>A</span>
          <span>p</span>
          <span>p</span>
          <span>&nbsp;</span>
          <span>D</span>
          <span>e</span>
          <span>v</span>
          <span>e</span>
          <span>l</span>
          <span>o</span>
          <span>p</span>
          <span>m</span>
          <span>e</span>
          <span>n</span>
          <span>t</span>
        </div>
      </div>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <div className="menu-header">
            <a
              onClick={() => handleNavigation('/')}
              style={{ cursor: 'pointer' }}
            >
              首页
            </a>
          </div>

          <nav className="menu-nav">
            {menuItems.map((item) => (
              <a
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={location.pathname === item.path ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="menu-footer">
            <div className="footer-links">
              {/* <img src="src\assets\address.webp" alt="" /> */}
              {/* <div className="address">
                <div>Find us:</div>
                <div>西邮东区逸夫楼FZ155</div>
              </div> */}
                <div>Find us:</div>
                <div className="address">西邮东区逸夫楼FZ155</div>
            </div>
            <p>© {year} Laboratory. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      <main className="main-content">
        <Outlet context={{ showSubNav, setShowSubNav }} />
      </main>
    </div>
  );
};

export default MainLayout;
