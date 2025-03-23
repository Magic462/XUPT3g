import React, { useState, useEffect } from 'react';
import './Home.scss';

const Home: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const platforms = [
    { id: 'web', name: 'Web', initialY: 0, delay: 0 },
    { id: 'server', name: 'Server', initialY: 100, delay: 200 },
    { id: 'android', name: 'Android', initialY: 200, delay: 400 },
    { id: 'ios', name: 'iOS', initialY: 300, delay: 600 },
    { id: 'harmony', name: '鸿蒙', initialY: 400, delay: 800 },
  ];

  useEffect(() => {
    // 页面加载完成后设置加载状态
    setIsLoaded(true);

    // 初始显示所有卡片
    setVisibleCards(platforms.map((_, index) => index));

    const handleScroll = () => {
      const platformsSection = document.querySelector('.platforms-section');
      if (platformsSection) {
        const sectionTop = platformsSection.getBoundingClientRect().top;
        const sectionHeight = platformsSection.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;

        // 计算滚动进度，只有当section完全进入视口时才开始计算
        let scrollProgress = 0;
        if (sectionTop <= 0) {
          scrollProgress = Math.min(
            1,
            Math.abs(sectionTop) / (sectionHeight - windowHeight)
          );
        }

        setScrollOffset(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-gif">
            <img src="./src/assets/layoutback.gif" alt="" />
          </div>
          <div className="hero-tip">
            <h1>西邮移动应用开发实验室</h1>
            <p>探索移动应用开发的无限可能</p>
          </div>
        </div>
      </section>

      <section className="platforms-section">
        <h2>技术平台</h2>
        <div className="platforms-container">
          {platforms.map((platform, index) => (
            <div
              key={platform.id}
              className={`platform-card ${visibleCards.includes(index) ? 'show' : ''}`}
              style={{
                transform: `translate3d(${-scrollOffset * 220}px, ${platform.initialY * (1 - scrollOffset) * 0.5}px, 0)`,
                transition: isLoaded ? 'transform 0.1s ease-out' : 'none',
              }}
            >
              <h3>{platform.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-links">
          <a href="#">关于我们</a>
          <a href="#">加入我们</a>
          <a href="#">联系我们</a>
        </div>
        <div className="copyright">
          © 2024 西邮移动应用开发实验室. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
