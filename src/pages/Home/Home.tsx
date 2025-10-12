import './Home.scss';
import { useEffect, useState } from 'react';
import { getRecentActivities } from '@/services/activities';
import { getQQcontact } from '@/services/qqcontact';
import { getDirection } from '@/services/directions';
import { Article } from '@/types/article';
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
  const [recentActivities, setRecentActivities] = useState([]);

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

  // 获取最近发布的七个活动
  useEffect(() => {
    const fetchRencentAcitivities = async () => {
      try {
        const res = await getRecentActivities();
        console.log(res.recentActivities);
        setRecentActivities(res.recentActivities);
      } catch (err) {
        console.error('获取文章失败: ', err);
      }
    };
    fetchRencentAcitivities();
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

      <section className="home-bref-intro-section">
        <h2>简介</h2>
        <p>
          西安邮电大学移动应用开发实验室，创建于2011年，位于西安邮电大学长安校区东区教学楼FZ155，专注于移动平台的应用开发。
        </p>
        <p>
          2012年与谷歌联合创建了“Google中国大学合作部--Android人才培养示范基地”，获得了谷歌在师资培训、课程资源等方面支持。先后获得了谷歌认证课程授权、参与谷歌支持教育部的国家大学生创新创业训练计划联合基金项目、参加谷歌的InnoCamp创新夏令营，以及谷歌的全国开发者大会、谷歌的全国教学论坛等。
        </p>
        <p>
          2020年实验室与Apple教育拓展团队合作成立iOSClub，秉承“求是，奋进”的理念，实验室同学可以和众多国内外优秀开发者接触并沟通交流，从而开阔国际视野和眼界格局，掌握国际移动应用软件开发的趋势和动态。
        </p>
        <p>
          2015、2016年连续两年由亚太电信组织（APT）与我国工业和信息化部主办的第十五期APT培训班在我校正在进行，来自印度、巴基斯坦、越南、马尔代夫、蒙古、菲律宾、斯里兰卡等十四位各国电信官员接受主题为“大数据技术在信息通信产业中的应用”的培训，实验室二次承担移动应用开发实验课程。
        </p>
        <p>
          在人才培养方面，实验室以培养同学们的综合能力、创新能力为主导，以提高专业素养为目的，以促同学们知识、能力、思维和素质全面协调的发展，构建了“逐级学习、知识点融合、竞赛驱动”的实验教学新体系。多年来，在互联网+、挑战杯、Imagine
          Cup微软创新杯、谷歌移动互联网创业挑战赛、全国物联网+大赛、华为创新杯、中国高校计算机大赛等具有影响力的大赛中，实验室成员获得省级以上奖80项以上，参与国家级、省级大学生创新创业训练计划项目30项以上。
        </p>
        <p>
          实验室成员纷纷就业于字节跳动、腾讯、阿里巴巴、百度、美团、360等国内外知名企业，具备了较高的就业质量，并获得了就业单位的美誉。
          实验室每年都会举办全校就业经验交流会，分享学习方法、感悟和就业经验，为学弟学妹们的学习、成长提供一些帮助。实验室广纳贤才，针对热爱移动应用开发的同学，每年都会举行纳新活动，只要对移动应用开发感兴趣的同学，欢迎来我们实验室进行交流！
        </p>
      </section>
      <section className="home-activity-section">
        <h2>近期活动</h2>
        <div className="home-activity-container">
          {recentActivities?.length > 0 ? (
            recentActivities?.map((activity) => (
              <div className={`home-activity-card`} key={activity.aid}>
                <div className="home-activity-card-content">
                  <p className="home-activity-card-title">{activity.title}</p>
                  <p className="home-activity-card-date">{activity.time}</p>
                  <p className="home-activity-card-summary">
                    {activity.summary}
                  </p>
                </div>
                <div className="home-activity-card-image">
                  <img src={activity.img} alt={activity.title} />
                </div>
              </div>
            ))
          ) : (
            <div className="home-activity-none">暂无活动</div>
          )}
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
