import { useState, useEffect } from 'react';
import './Home.scss';
import { getQQcontact } from '@/services/qqcontact';
import { getDirection } from '@/services/directions';
import layoutback from '@/assets/images/layoutback.gif';
import wxqr from '@/assets/images/wxqr.webp';

const fakeData = [
  { id: 1, name: 'Web', description: '构建用户界面和交互' },
  { id: 2, name: 'Server', description: '处理业务逻辑和数据存储' },
  { id: 3, name: 'Android', description: '机器学习与数据智能' },
  { id: 4, name: 'iOS', description: '机器学习与数据智能' },
  { id: 5, name: 'HarmonyOS', description: '机器学习与数据智能' },
];

const Home: React.FC = () => {
  // 获得当前年
  const now = new Date();
  const year = now.getFullYear();
  const [qqnumber, serQqNumber] = useState('');
  const [platforms, setPlatforms] = useState([]);

  // 获取方向简介
  useEffect(() => {
    const fetchDirection = async () => {
      try {
        const response = await getDirection(true);
        console.log(response);
        if (Array.isArray(response) && response.length > 0) {
          setPlatforms(response);
        } else {
          console.warn('后端返回数据为空或格式错误，使用假数据');
          setPlatforms(fakeData);
        }
      } catch (error) {
        console.log('获取qq号失败', error);
        setPlatforms(fakeData);
      }
    };
    fetchDirection();
  }, []);

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
  }, [platforms]);

  // 获取qq群联系方式
  useEffect(() => {
    const fetchQQ = async () => {
      try {
        const response = await getQQcontact();
        serQqNumber(response.qqnumber);
      } catch (error) {
        console.log('获取qq号失败', error);
      }
    };
    fetchQQ();
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-gif">
            <img src={layoutback} alt="" />
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
          {platforms.map((platform) => (
            <div
              className={`platform-card ${platform.delay ? `transition-delay-${platform.delay}` : ''}`}
              style={{
                transitionDelay: `${platform.delay}ms`,
              }}
              key={platform.delay}
            >
              <h3>{platform.name}</h3>
              <div className="platform-description">{platform.brefInfo}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-links">
          <div className="vx">微信公众号</div>
          <img src={wxqr} alt="" />
          <div className="qq">qq纳新群: {qqnumber}</div>
        </div>
        <div className="copyright">
          © {year} 西邮移动应用开发实验室. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
