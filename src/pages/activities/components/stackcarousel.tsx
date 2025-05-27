import React, { useEffect, useState } from 'react';
import './stackcarousel.scss';
import { getRecentActivities } from '@/services/activities';
import { Article } from '@/types/article';

const initialOrder = [
  'first',
  'second',
  'right',
  'left',
  'left',
  'left',
  'last',
];

const StackCarousel: React.FC = () => {
  const [order, setOrder] = useState<string[]>([...initialOrder]);
  const [index, setIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth >= 991
  );
  const [recentActivities, setRecentActivities] = useState<Article[]>([]);

  // 获取最近发布的七个活动
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRecentActivities();
        console.log(res.recentActivities);
        setRecentActivities(res.recentActivities);
      } catch (err) {
        console.error('获取文章失败: ', err);
      }
    };

    fetchData();
  }, []);

  // 模拟栈
  const handlePrev = () => {
    const newOrder = [...order];
    newOrder.push(newOrder.shift()!);
    setOrder(newOrder);

    setIndex(
      (prev) => (prev - 1 + recentActivities.length) % recentActivities.length
    );
  };

  const handleNext = () => {
    const newOrder = [...order];
    newOrder.unshift(newOrder.pop()!);
    setOrder(newOrder);

    setIndex((prev) => (prev + 1) % recentActivities.length);
  };

  const handleIndicatorClick = (targetIdx: number) => {
    const diff = targetIdx - index;
    const newOrder = [...order];

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        newOrder.unshift(newOrder.pop()!);
      }
    } else if (diff < 0) {
      for (let i = 0; i < -diff; i++) {
        newOrder.push(newOrder.shift()!);
      }
    }

    setOrder(newOrder);
    setIndex(targetIdx);
  };

  // 屏幕尺寸大于991px的时候才显示轮播图里活动文章的封面
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsLargeScreen(window.innerWidth >= 991);
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div className="carousel-out">
      <div className="carousel-inner">
        <div className="carousel-inner-viewbox">
          <i
            className="iconfont icon-youshuangxianjiantou1"
            onClick={handlePrev}
          ></i>
          {recentActivities.map((item, i) => (
            <div
              key={item.aid}
              className={`carousel-recent-box`}
              id={order[i]}
              onClick={() =>
                window.open(
                  `/activities/${item.aid}`,
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              // onClick={() => console.log(1)}
            >
              <div className="carousel-recent-title">{item.title}</div>
              {/* 大尺寸才显示活动文章封面 */}
              {isLargeScreen && (
                <div className="carousel-recent-cover">
                  <img src={item.img} alt="" />
                </div>
              )}
            </div>
          ))}
        </div>

        <i
          className="iconfont icon-youshuangxianjiantou"
          onClick={handleNext}
        ></i>
      </div>

      <div className="carousel-dots">
        {recentActivities.map((_, i) => (
          <p
            key={i}
            onClick={() => handleIndicatorClick(i)}
            className={i === index ? 'active' : ''}
          ></p>
        ))}
      </div>
    </div>
  );
};

export default StackCarousel;
