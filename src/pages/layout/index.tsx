import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.scss'; // 引入样式文件

const Layout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [lastScrollTime, setLastScrollTime] = useState(Date.now());
    
    const menuItems = [
        { path: '/activities', label: 'Activities' },
        { path: '/blogs', label: 'Blogs' },
        { path: '/members', label: 'Members' },
        { path: '/mine', label: 'Mine' },
        { path: '/trainingplan', label: 'Training Plan' },
        { path: '/login', label: 'Login' }
    ];

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <div className="main-layout">
            <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
                <button 
                    className="menu-toggle"
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
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
                        <a onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>
                            Laboratory
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
                            <a href="#">Terms of Use</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Form CRS</a>
                        </div>
                        <p>© 2024 Laboratory. All rights reserved.</p>
                    </div>
                </div>
            </div>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;