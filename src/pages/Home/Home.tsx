import { useState, useEffect } from 'react';
import './Home.scss';
import '../../assets/wxqr.webp'

const Home: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  // 获得当前年
  const now = new Date();
  const year = now.getFullYear();

  const platforms = [
    {
      id: 'web',
      name: 'Web',
      delay: 0,
      description:
        'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
    },
    {
      id: 'server',
      name: 'Server',
      delay: 100,
      description:
        '服务器开发让你能够处理后端逻辑，保障应用的稳定和安全。了解服务器的构建，能让你的应用运行得更顺畅！',
    },
    {
      id: 'android',
      name: 'Android',
      delay: 200,
      description:
        '安卓开发为你打开了移动应用的大门，应用程序的每一次更新都能提升用户体验，快来尝试吧！',
    },
    {
      id: 'ios',
      name: 'iOS',
      delay: 300,
      description:
        'iOS开发注重用户体验，精致的界面让每个应用都独具魅力。用你的创意实现应用的灵魂！',
    },
    {
      id: 'harmony',
      name: 'HarmonyOS',
      delay: 400,
      description:
        '鸿蒙系统为多设备体验提供了可能，了解其特性，你将能够创建跨平台的应用！',
    },
  ];

  // 使用IntersectionObserver 接口监听元素是否进入视口，并实现只要进入视口反复出现动画
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 元素进入视口，添加动画类名
                entry.target.classList.add('show');
            } else {
                // 元素离开视口，移除动画类名
                entry.target.classList.remove('show');
            }
        });
    });

    const cards = document.querySelectorAll('.platform-card');
    cards.forEach((card) => {
        observer.observe(card);
    });

    return () => {
        observer.disconnect();
    };
}, []);

  // 实现即将滚动到platforms-section时卡片依次弹出
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const platformsSection = document.querySelector('.platforms-section');
  //     if (platformsSection) {
  //       const sectionTop = platformsSection.getBoundingClientRect().top;
  //       const windowHeight = window.innerHeight;

  //       if (sectionTop < windowHeight * 0.9) {
  //         platforms.forEach((platform, index) => {
  //           setTimeout(() => {
  //             setVisibleCards((prev) => [...new Set([...prev, index])]);
  //           }, platform.delay);
  //         });
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);


  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-gif">
            {/* < img src="./src/assets/layoutback.gif" alt="" /> */}
            <video autoPlay loop muted>
              <source src="./src/assets/layoutback.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
            // <div
            //   key={platform.id}
            //   className={`platform-card ${visibleCards.includes(index) ? 'show' : ''}`}
            //   style={{
            //     transform: visibleCards.includes(index)
            //       ? 'translateY(0) translateX(0)'
            //       : 'translateY(100px) translateX(100px)',
            //     transitionDelay: `${platform.delay}ms`,
            //   }}
            // >
            <div
            key={platform.id}
            className={`platform-card ${platform.delay ? `transition-delay-${platform.delay}` : ''}`}
            style={{
                transitionDelay: `${platform.delay}ms`,
            }}
        >
              <h3>{platform.name}</h3>
              <div className="platform-description">{platform.description}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-links">
          <div className="vx">
            微信公众号
          </div>
          <img src='./src/assets/wxqr.webp' alt="" />
          <div className="qq">qq纳新群: 1623728627</div>
        </div>
        <div className="copyright">
          © {year} 西邮移动应用开发实验室. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
