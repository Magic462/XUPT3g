import { useState, useEffect, useRef } from 'react';
import './Activities.scss';
import '@/assets/icons/font_95rv9yhaqnu/iconfont.css';
import '@/assets/icons/font_5wqplvdpjmq/iconfont.css';
import StackCarousel from './components/stackcarousel';
import Footerpagination from '@/components/FooterPagination';
import { Article } from '@/types/article';
import { getAllArticleInfo } from '@/services/activities';

const Activities: React.FC = () => {
  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTimelineNode, setActiveTimelineNode] = useState<number | null>(
    null
  );
  const activitiesRef = useRef<Array<HTMLDivElement | null>>([]);
  const [activitiesData, setArticleList] = useState<Article[]>([]);

  // 获取活动数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllArticleInfo(currentPage);
        setArticleList(res.activities);
        setPageNum(res.pageNum);
      } catch (err) {
        console.error('获取文章失败: ', err);
      }
    };

    fetchData();
  }, [currentPage]);

  // 给页面中间盒子添加动效
  useEffect(() => {
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
  }, [currentPage]); // ✅ 没有 window.scrollTo

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
              key={activity.aid}
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
              <a
                href={`/activities/${activity.aid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </a>
            </div>
          ))}
        </section>
        {/* 翻页 */}
        {pageNum > 1 && (
          <div className="tourist-pagination">
            {pageNum > 0 && (
              <Footerpagination
                pageNum={pageNum}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
