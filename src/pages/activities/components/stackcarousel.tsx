import React, { useEffect, useRef, useState } from 'react';
import './stackcarousel.scss';

const images = [
  {
    title: '00Android小组参加GDG DevFest 2024西安站',
    midOrder: -4,
  },
  {
    title: '11Android小组参加GDG DevFest 2024西安站',
    midOrder: -2,
  },
  {
    title: '22啊哈哈哈哈啊哈哈哈啊哈哈哈啊哈哈',
    midOrder: -1,
  },
  {
    title: '33嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻西西i下西ii嘻嘻嘻嘻嘻嘻嘻',
    midOrder: 0,
  },
  {
    title: '44的白人弄完热播i环绕接口规范时间粉红色色哦啤酒反绒皮王继鹏',
    midOrder: 1,
  },
  {
    title: '55你不会是对哦按段大局电脑那我到i到平均法哦覅加啊四坡放假安排',
    midOrder: 2,
  },
  {
    title: '66你不会是对哦按段大局电脑那我到i到平均法哦覅加啊四坡放假安排',
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
  // const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div className="carousel-out">
      <div className="carousel-inner">
        <div className="carousel-inner-viewbox">
          {images.map((item, i) => (
            <div key={i} className={`carousel-recent-box`} id={order[i]}>
              <div className="carousel-recent-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-arrow">
        <i className="iconfont icon-zuojiantou" onClick={handlePrev}></i>
        <i className="iconfont icon-youjiantou" onClick={handleNext}></i>
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
