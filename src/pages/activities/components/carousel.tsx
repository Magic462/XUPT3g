const carouselData = [
  {
    title: '00Android小组参加GDG DevFest 2024西安站',
    midOrder: -2,
  },
  {
    title: '111啊哈哈哈哈啊哈哈哈啊哈哈哈啊哈哈',
    midOrder: -1,
  },
  {
    title: '22嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻西西i下西ii嘻嘻嘻嘻嘻嘻嘻',
    midOrder: 0,
  },
  {
    title: '33的白人弄完热播i环绕接口规范时间粉红色色哦啤酒反绒皮王继鹏',
    midOrder: 1,
  },
  {
    title: '44你不会是对哦按段大局电脑那我到i到平均法哦覅加啊四坡放假安排',
    midOrder: 2,
  },
];

import { useState, useRef, useEffect } from 'react';
// import { useEffect } from 'react';
import './carousel.scss';

const Carousel = () => {
  const slides = [
    carouselData[carouselData.length - 3],
    carouselData[carouselData.length - 2],
    carouselData[carouselData.length - 1],
    ...carouselData,
    carouselData[0],
    carouselData[1],
    carouselData[2],
  ];
  const [currentIndex, setCurrentIndex] = useState(-2);
  const [slideWidth, setSlideWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  // 计算slideWodth
  useEffect(() => {
    const items = trackRef.current?.querySelectorAll('.activities-recent-item');
    if (!items || items.length < 2) return;

    const first = items[0].getBoundingClientRect();
    const second = items[1].getBoundingClientRect();
    setSlideWidth(first.left - second.left);
  }, []);

  const handleDirection = (dir: 'left' | 'right') => {
    if (dir === 'left' && currentIndex !== -3) {
      setCurrentIndex((prev) => prev - 1);
    } else if (dir === 'right' && currentIndex !== 3) {
      setCurrentIndex((prev) => prev + 1);
    } else if (currentIndex === 3 || currentIndex === -3) {
      console.log('嘻嘻');
      setCurrentIndex(-2);
    }
  };

  // 初始移动首元素到中间
  useEffect(() => {
    console.log(currentIndex);
    const track = trackRef.current;
    if (track) {
      track.style.transition = 'transform 0.4s ease';
      track.style.transform = `translateX(${currentIndex * slideWidth}px)`;
    }
  });

  // 无限滚动修正
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (currentIndex === -3) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${2 * slideWidth}px)`;
      setCurrentIndex(2);
    } else if (currentIndex === 3) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${-2 * slideWidth}px)`;
      setCurrentIndex(-2);
    } else {
      track.style.transition = 'transform .3s ease';
      track.style.transform = `translateX(${currentIndex * slideWidth}px)`;
    }
  }, [currentIndex]);

  // 控制盒子显示动效

  // 渲染轮播
  return (
    <>
      <div
        className="rencent-to-left recent-to-button"
        onClick={() => {
          handleDirection('left');
        }}
      >
        <i className="iconfont icon-zuojiantou"></i>
      </div>

      <div className="activities-recent-container">
        <div ref={trackRef} className="activities-recent-box track-box">
          {slides.map((item) => (
            <div
              // key={index}
              // className="activities-recent-item"
              className={`activities-recent-item ${item.midOrder === currentIndex ? 'mid-active' : ''}`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      <div
        className="rencent-to-right recent-to-button"
        onClick={() => {
          handleDirection('right');
        }}
      >
        <i className="iconfont icon-youjiantou"></i>
      </div>
    </>
  );
};

export default Carousel;
