import { gsap } from 'gsap/gsap-core';
import { useEffect, useRef, useState } from 'react';
import './Footertop.scss';

const Footertop = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wavePath = pathRef.current;
    if (!wavePath) return;

    // 初始状态
    gsap.set(wavePath, {
      attr: {
        d: 'M0 20 C40 20 40 20 50 20 C60 20 60 20 100 20 L100 20 L0 20 Z',
      },
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (!hasAnimated && scrollY + innerHeight >= scrollHeight - 10) {
        setHasAnimated(true);
        animateWave(wavePath);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const animateWave = (target: SVGPathElement) => {
    gsap.to(target, {
      duration: 1.2,
      attr: {
        d: 'M 0 20 C 30 15 35 3 50 3 C 65 3 70 15 100 20 L 100 20 L 0 20 Z',
      },
      ease: 'elastic.out(1.2, 0.4)',
      onComplete: () => resetWave(target),
    });

    gsap.to('.common-back-top-box', {
      opacity: 1,
      duration: 1,
      ease: 'power1.out',
    });
  };

  const resetWave = (target: SVGPathElement) => {
    gsap.to(target, {
      duration: 0.8,
      attr: {
        d: 'M 0 20 C 30 15 35 3 50 3 C 65 3 70 15 100 20 L 100 20 L 0 20 Z',
      },
      ease: 'power2.out',
    });
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    gsap.to('.common-back-top-box', {
      opacity: 0,
      duration: 0.6,
      ease: 'power1.out',
      delay: 0.3,
      onComplete: () => {
        // 延迟检查页面是否再次到底部
        setTimeout(() => {
          const scrollY = window.scrollY;
          const innerHeight = window.innerHeight;
          const scrollHeight = document.documentElement.scrollHeight;
          const isStillAtBottom = scrollY + innerHeight >= scrollHeight - 10;

          setHasAnimated(isStillAtBottom);
        }, 300);
      },
    });
  };

  return (
    <div className="common-back-top-box" onClick={scrollTop}>
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
  );
};

export default Footertop;
