import { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.scss';
import useClickOutside from '../hooks/useClickOutside';
import '@/assets/icons/font_4k8jwf31qbs/iconfont.css';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // 统一管理所有状态
  const [uiState, setUiState] = useState({
    menuOpen: true,
    mainMenuOpen: false,
    isMobile: false,
    showSubNav: false,
  });


  // 记录是否已登录
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 检查用户是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

const menuItems = isLoggedIn
    ? [
        { path: '/activities', label: '活动' },
        { path: '/members', label: '成员风采' },
        { path: '/graduate', label: '毕业去处' },
        { path: '/trainingplan', label: '培养计划' },
        { path: '/mine', label: '我的' },
      ]
    : [
        { path: '/activities', label: '活动' },
        { path: '/members', label: '成员风采' },
        { path: '/graduate', label: '毕业去处' },
        { path: '/trainingplan', label: '培养计划' },
        { path: '/login', label: '登录' }
      ];


  const now = new Date();
  const year = now.getFullYear();
  const isMinePage = location.pathname.startsWith('/mine');

  // 初始化的检测
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setUiState((prev) => ({
        ...prev,
        isMobile,
        // 非移动端自动展开二级导航
        showSubNav: !isMobile || prev.showSubNav,
      }));
    };

    setIsHydrated(true);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 点击外部关闭主菜单
  useClickOutside(menuRef as React.RefObject<HTMLElement>, () => {
    if (uiState.menuOpen) {
      setUiState((prev) => ({ ...prev, menuOpen: false, mainMenuOpen: true }));
    }
  });

  // 滚动关闭主菜单
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;

      if (currentScrollY > lastScrollY && uiState.menuOpen) {
        const scrollSpeed = (currentScrollY - lastScrollY) / timeDiff;
        if (scrollSpeed > 0.1 || currentScrollY - lastScrollY > 25) {
          setUiState((prev) => ({ ...prev, menuOpen: false }));
        }
      }

      setLastScrollY(currentScrollY);
      setLastScrollTime(currentTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastScrollTime, uiState.menuOpen]);

  // 菜单切换
  const toggleMenu = () => {
    setUiState((prev) => ({
      ...prev,
      menuOpen: !prev.menuOpen,
      mainMenuOpen: !prev.mainMenuOpen,
    }));
  };

  const toggleSubNav = () => {
    setUiState((prev) => ({
      ...prev,
      showSubNav: !prev.showSubNav,
    }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="main-layout">
      <div
        ref={menuRef}
        className={`menu-container ${uiState.menuOpen ? 'open' : ''} ${
          isMinePage && !uiState.menuOpen && uiState.isMobile
            ? 'menu-height'
            : ''
        }`}
      >
        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {isHydrated &&
          isMinePage &&
          uiState.isMobile &&
          uiState.mainMenuOpen && (
            <button className="menu-submine-toggle" onClick={toggleSubNav}>
              <i className="iconfont icon-chengyuan"></i>
            </button>
          )}

        <div className="menu-text">
          {'Mobile App Development'.split('').map((char, index) => (
            <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </div>
      </div>

      <div className={`side-menu ${uiState.menuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <div className="menu-header">
            <a
              onClick={() => handleNavigation('/')}
              style={{ cursor: 'pointer' }}
            >
              首 页
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
              <div>Find us:</div>
              <div className="address">西邮东区逸夫楼FZ155</div>
            </div>
            <p>© {year} Laboratory. All rights reserved.</p>
          </div>
        </div>
      </div>

      <main className="main-content">
        <Outlet
          context={{
            showSubNav: uiState.showSubNav,
            setShowSubNav: (value: boolean) =>
              setUiState((prev) => ({ ...prev, showSubNav: value })),
          }}
        />
      </main>
    </div>
  );
};

export default MainLayout;
