import { useState, useEffect, useRef } from 'react';
import './Activities.scss';
import '@/assets/icons/font_95rv9yhaqnu/iconfont.css';
import '@/assets/icons/font_5wqplvdpjmq/iconfont.css';
import StackCarousel from './components/stackcarousel';
import Footerpagination from './components/footerpagination';
import { Article } from '@/types/article';
import { getAllArticleInfo } from '@/services/activities';

const Activities: React.FC = () => {
  const [pageNum, setPageNum] = useState(0);
  // const [totalActivity, setTotalActivity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const getCurrentPage =
  const [activeTimelineNode, setActiveTimelineNode] = useState<number | null>(
    null
  );
  const activitiesRef = useRef<Array<HTMLDivElement | null>>([]);
  // 获取活动数据
  const [activitiesData, setArticleList] = useState<Article[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllArticleInfo(currentPage);
        setArticleList(res.activities);
        // setTotalActivity(res.total);
        setPageNum(res.pageNum);
      } catch (err) {
        console.error('获取文章失败: ', err);
      }
    };

    fetchData();
  }, [currentPage]);

  // 滑动计算scroll控制盒子动效
  useEffect(() => {
    // 翻页返回顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      activitiesRef.current.forEach((ref, index) => {
        if (ref) {
          const { top, bottom } = ref.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveTimelineNode(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className="activities-container">
      <header className="activities-header">
        <StackCarousel></StackCarousel>
      </header>
      {/* 活动列表*/}
      <div className="activities-lists-container">
        {/* 活动盒子以及旁边的时间轴 */}
        <section className="activities-lists">
          {activitiesData.map((activity, index) => (
            <div
              key={index}
              className="activity-card"
              ref={(e) => {
                activitiesRef.current[index] = e;
              }}
            >
              {/* 侧边时间轴 */}
              <div
                className={`timeline-node ${activeTimelineNode === index ? 'active' : ' '}`}
              >
                <span
                  className={`timeline-node-time ${activeTimelineNode === index ? 'active' : ' '}`}
                >
                  {activity.time}
                </span>
                <i
                  className={`timeline-node-icon iconfont icon-a-svg-path1 ${activeTimelineNode === index ? 'active' : ' '}`}
                ></i>
              </div>

              {/* 活动卡片小盒子 */}
              <div
                className={`activity-bref-box ${activeTimelineNode === index ? 'card-active' : ' '}`}
              >
                {/* 文字信息盒子 */}
                <div className="activity-bref-info">
                  <h3 className="activity-title">{activity.title}</h3>
                  <div className="activity-date">发布于 {activity.time}</div>
                  <div className="activity-summary-box">
                    <p className="activity-summary">{activity.summary}</p>
                  </div>
                </div>

                {/* 活动封面盒子 */}
                <div className="activity-bref-bg">
                  <img src={activity.img} alt="" />
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* 翻页 */}
        {pageNum > 1 && (
          <>
            <div className="test-pagination">
              {pageNum > 0 && (
                <Footerpagination
                  pageNum={pageNum}
                  onPageChange={setCurrentPage}
                  currentPage={currentPage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Activities;
