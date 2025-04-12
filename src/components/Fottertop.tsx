import { gsap } from 'gsap/gsap-core';
import { useEffect, useRef, useState } from 'react';
import './Footertop.scss';

const Footertop = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wavePath = pathRef.current;
    const scrollContainer = document.querySelector('.mine-each-func'); // 这里是重点！

    if (!wavePath || !scrollContainer) return;

    // 波浪的初始状态
    gsap.set(wavePath, {
      attr: {
        d: 'M0 20 C40 20 40 20 50 20 C60 20 60 20 100 20 L100 20 L0 20 Z',
      },
    });

    const handleScroll = () => {
      const scrollY = scrollContainer.scrollTop;
      const innerHeight = scrollContainer.clientHeight;
      const scrollHeight = scrollContainer.scrollHeight;
      // console.log(scrollY, innerHeight, scrollHeight);

      if (!hasAnimated && scrollY + innerHeight >= scrollHeight - 10) {
        setHasAnimated(true);
        animateWave(wavePath);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  // 主要动画函数
  const animateWave = (target: SVGPathElement) => {
    gsap.to(target, {
      duration: 1.2,
      attr: {
        d: 'M 0 20 C 30 15 35 3 50 3 C 65 3 70 15 100 20 L 100 20 L 0 20 Z',
      },
      ease: 'elastic.out(1.2, 0.4)',
      onComplete: () => resetWave(target),
    });

    // 容器渐显
    gsap.to('.back-top-box ', {
      opacity: 1,
      duration: 1,
      ease: 'power1.out',
    });
  };

  // 波浪回弹时候定格在主要动画的状态
  const resetWave = (target: SVGPathElement) => {
    gsap.to(target, {
      duration: 0.8,
      attr: {
        d: 'M 0 20 C 30 15 35 3 50 3 C 65 3 70 15 100 20 L 100 20 L 0 20 Z',
      },
      ease: 'power2.out',
    });
  };

  // 回到容器顶部,bingqie波浪收回
  const scrollTop = () => {
    const scrollContainer = document.querySelector('.mine-each-func');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // 淡出回到顶部模块（可选）
      gsap.to('.back-top-box', {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.out',
        delay: 0.3,
        onComplete: () => {
          setHasAnimated(false); // 重置状态，方便之后重新滑到底又触发
        },
      });
    }
  };

  return (
    <>
      {/* 这个锚点用于撑高页面，确保可以触发滚动到底部逻辑 */}
      <div style={{ height: '3rem' }} id="wave-anchor" />

      {/* 回到顶部动画盒子 */}
      <div className="back-top-box" onClick={scrollTop}>
        <svg
          viewBox="0 0 100 20"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={pathRef} id="wave-path" fill="#000000" />
        </svg>
        <p className="back-to-top-title">回到顶部</p>
      </div>
    </>
  );
};
