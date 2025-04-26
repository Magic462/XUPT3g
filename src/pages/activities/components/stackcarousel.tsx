import React, { useEffect, useState } from 'react';
import './stackcarousel.scss';

const images = [
  {
    title: '00我实验室同学参加Google InnoCamp 2017谷歌创新特训营阿海',
    imgSrc: './src/assets/activities/17336357070040458.webp',
    midOrder: -4,
  },
  {
    title: '11Android小组参加GDG DevFest 2024西安站',
    imgSrc: './src/assets/activities/17336357070040458.webp',
    midOrder: -2,
  },
  {
    title: '22啊哈哈哈哈啊哈哈哈啊哈哈哈啊哈哈',
    imgSrc: './src/assets/activities/17325230781181098.webp',
    midOrder: -1,
  },
  {
    title: '33嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻西西i下西ii嘻嘻嘻嘻嘻嘻嘻',
    imgSrc: './src/assets/activities/17325230781181098.webp',
    midOrder: 0,
  },
  {
    title: '44的白人弄完热播i环绕接口规范时间粉红色色哦啤酒反绒皮王继鹏',
    imgSrc: './src/assets/activities/17325230781181098.webp',
    midOrder: 1,
  },
  {
    title: '55你不会是对哦按段大局电脑那我到i到平均法哦覅加啊四坡放假安排',
    imgSrc: './src/assets/activities/17325230781181098.webp',

    midOrder: 2,
  },
  {
    title: '66你不会是对哦按段大局电脑那我到i到平均法哦覅加啊四坡放假安排',
    imgSrc: './src/assets/activities/17325230781181098.webp',
    midOrder: 3,
  },
];

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

  // 模拟栈
  const handlePrev = () => {
    const newOrder = [...order];
    newOrder.push(newOrder.shift()!);
    setOrder(newOrder);

    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    const newOrder = [...order];
    newOrder.unshift(newOrder.pop()!);
    setOrder(newOrder);

    setIndex((prev) => (prev + 1) % images.length);
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
          {images.map((item, i) => (
            <div key={i} className={`carousel-recent-box`} id={order[i]}>
              <div className="carousel-recent-title">{item.title}</div>
              {/* 大尺寸才显示活动文章封面 */}
              {isLargeScreen && (
                <div className="carousel-recent-cover">
                  <img src={item.imgSrc} alt="" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-arrow">
        <i
          className="iconfont icon-youshuangxianjiantou1"
          onClick={handlePrev}
        ></i>
        <i
          className="iconfont icon-youshuangxianjiantou"
          onClick={handleNext}
        ></i>
      </div>

      <div className="carousel-dots">
        {images.map((_, i) => (
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
