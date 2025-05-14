import { useState, useEffect, useRef } from 'react';
import './Activities.scss';
import '@/assets/icons/font_95rv9yhaqnu/iconfont.css';
import '@/assets/icons/font_5wqplvdpjmq/iconfont.css';
import StackCarousel from './components/stackcarousel';
import { Article } from '@/types/article';
import { getAllArticleInfo } from '@/services/activities';

const Activities: React.FC = () => {
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTimelineNode, setActiveTimelineNode] = useState<number | null>(
    null
  );
  const activitiesRef = useRef<Array<HTMLDivElement | null>>([]);
  // 获取活动数据
  const [activitiesData, setArticleList] = useState<Article[]>([]);
  useEffect(() => {
    getAllArticleInfo(currentPage)
      .then((res) => {
        console.log(res.activities);
        setArticleList(res.activities); // data 现在会被认为是 Article[] 类型
        setTotalPages(res.total);
        setPageNum(res.ITEMS_PER_PAGE);
      })
      .catch((err) => {
        console.error('获取文章失败: ', err);
      });
  }, [currentPage]);

  // 当前活动页
  // const getCurrentActivities = () => {
  //   const startIndex = (currentPage - 1) * pageNum;
  //   const endIndex = startIndex + pageNum;
  //   return activitiesData.slice(startIndex, endIndex);
  // };

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

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
                  <p className="activity-summary">{activity.summary}</p>
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
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-button-left"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="iconfont icon-youshuangxianjiantou1"></i>
            </button>

            <div className="page-button-pages">
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  className={`page-button ${currentPage === number ? 'active' : ''}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              className="page-button-right"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="iconfont icon-youshuangxianjiantou"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
