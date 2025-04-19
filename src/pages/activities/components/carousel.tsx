const carouselData = [
  {
    title: '00Android小组参加GDG DevFest 2024西安站',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
    midOrder: -2,
  },
  {
    title: '111啊哈哈哈哈啊哈哈哈啊哈哈哈啊哈哈',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17325230781181098.webp',
    midOrder: -1,
  },
  {
    title: '22嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻西西i下西ii嘻嘻嘻嘻嘻嘻嘻',
    timeDate: '2024-12-08',
    content: '2024年11月24日下午，西安的天空',
    status: 'completed',
    imgSrc: './src/assets/activities/17325230781181098.webp',
    midOrder: 0,
  },
  {
    title: '33的白人弄完热播i环绕接口规范时间粉红色色哦啤酒反绒皮王继鹏',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
    midOrder: 1,
  },
  {
    title: '44你不会是对哦按段大局电脑那我到i到平均法哦覅加啊四坡放假安排',
    timeDate: '2024-12-08',
    content:
      '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
    status: 'completed',
    imgSrc: './src/assets/activities/17336357070040458.webp',
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
    if (dir === 'left') {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

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

    if (currentIndex === -4) {
      track.style.transition = 'transform 0.4s ease';
      track.style.transform = `translateX(${2 * slideWidth}px)`;
      track.style.transition = 'none';
      setCurrentIndex(2);
    } else if (currentIndex === 4) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${-2 * slideWidth}px)`;
      setCurrentIndex(-2);
    } else {
      track.style.transition = 'transform 0.4s ease';
      track.style.transform = `translateX(${currentIndex * slideWidth}px)`;
    }
  }, [currentIndex]);

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
