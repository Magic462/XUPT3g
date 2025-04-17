import { useState, useEffect, useRef, useReducer } from 'react';
import './Activities.scss';
// import '@/assets/icons/font_9342xhmvru9/iconfont.css';
import '@/assets/icons/font_95rv9yhaqnu/iconfont.css';

const activitiesData = [
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17325230781181098.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content: '2024年11月24日下午，西安的天空',
    status: 'completed',
    imgSrc: './src/assets/activities/17325230781181098.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
  {
    title: 'Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
  },
];

// 每页显示的活动数量
const ITEMS_PER_PAGE = 10;

const Activities: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTimelineNode, setActiveTimelineNode] = useState<number | null>(
    null
  );
  const activitiesRef = useRef<Array<HTMLDivElement | null>>([]);

  // 总页数
  const totalPages = Math.ceil(activitiesData.length / ITEMS_PER_PAGE);

  // 当前活动页
  const getCurrentActivities = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return activitiesData.slice(startIndex, endIndex);
  };

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

  // 顶部轮播图，显示近期的六个活动，最中间的是最近的一个活动
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const rawSlides = ['1', '2', '3', '4', '5', '6'];
  const slides = [
    rawSlides[0],
    rawSlides[rawSlides.length - 5],
    rawSlides[rawSlides.length - 4],
    rawSlides[rawSlides.length - 3],
    rawSlides[rawSlides.length - 2],
    rawSlides[rawSlides.length - 1],
    ...rawSlides,
    rawSlides[0],
  ];

  useEffect(() => {
    // slideWidth的初始化
    const items = trackRef.current?.querySelectorAll('.activities-recent-item');
    if (!items || items.length < 2) return;

    const realFirst = items[2].getBoundingClientRect();
    const realSecond = items[3].getBoundingClientRect();

    const realFirstCenter = realFirst.left + realFirst.width / 2;
    const realSecondCenter = realSecond.left + realSecond.width / 2;

    const distance = Math.abs(realSecondCenter - realFirstCenter);
    console.log(distance);
    setSlideWidth(distance);
  }, []);

  // 点击滑动当前index变换
  const carouselHandle = (direction: 'left' | 'right') => {
    if (!trackRef.current || slideWidth === 0) return;

    // 点击之后当前计数一个切换
    if (direction === 'left') {
      setCurrentIndex(currentIndex - 1);
      console.log('点击后' + currentIndex);
    } else {
      setCurrentIndex(currentIndex + 1);
      console.log('点击后' + currentIndex);
    }
  };

  // 点击左右按钮进行滚动
  useEffect(() => {
    const track = trackRef.current;
    track.style.transition = 'transform 0.4s ease-in-out';
    track.style.transform = `translateX(${currentIndex * slideWidth}px)`;
  }, [currentIndex, slideWidth]);

  return (
    <div className="activities-container">
      <header className="activities-header">
        {/* <h1>活动列表</h1> */}
        {/* 最近活动模块轮播盒子显示五个？ */}
        <div
          className="rencent-to-left recent-to-button"
          onClick={() => {
            carouselHandle('left');
          }}
        >
          <i>《</i>
        </div>
        <div className="activities-recent-container">
          <div ref={trackRef} className="activities-recent-box track-box">
            {slides.map((item) => (
              <div className="activities-recent-item">{item}</div>
            ))}
          </div>
        </div>
        <div
          className="rencent-to-right recent-to-button"
          onClick={() => {
            carouselHandle('right');
          }}
        >
          <i>》</i>
        </div>
      </header>
      {/* 活动列表*/}
      <div className="activities-lists-container">
        {/* 活动盒子以及旁边的时间轴 */}
        <section className="activities-lists">
          {getCurrentActivities().map((activity, index) => (
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
                  {activity.timeDate}
                </span>
                <i
                  className={`timeline-node-icon iconfont icon-a-svg-path1 ${activeTimelineNode === index ? 'active' : ' '}`}
                ></i>
              </div>

              {/* 活动卡片小盒子 */}
              <div
                className={`activity-bref-box ${activeTimelineNode === index ? 'card-active' : ' '}`}
              >
                {/* <div className="activity-bref-box-cover"> */}
                {/* 文字信息盒子 */}
                <div className="activity-bref-info">
                  <h3 className="activity-title">{activity.title}</h3>
                  <div className="activity-date">
                    发布于 {activity.timeDate}
                  </div>
                  <p className="activity-content">{activity.content}</p>
                </div>

                {/* 活动封面盒子 */}
                <div className="activity-bref-bg">
                  <img src={activity.imgSrc} alt="" />
                </div>
              </div>
              {/* </div> */}
            </div>
          ))}

          {/* 翻页 */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                上一页
              </button>

              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  className={`page-button ${currentPage === number ? 'active' : ''}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}

              <button
                className="page-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Activities;
