import { gsap } from 'gsap/gsap-core';
import { useActiveItem } from '@/hooks/useActiveItem';
import './Directionplan.scss';
import { useEffect, useRef, useState } from 'react';

// 获取现有的方向数据
const nowDirections = [
  {
    name: 'Web',
    trainPlan: '',
  },
  {
    name: 'HarmonyOS',
    trainPlan: '',
  },
  {
    name: 'Android',
    trainPlan: '',
  },
  {
    name: 'iOS',
    trainPlan: '',
  },
  {
    name: 'Server',
    trainPlan: '',
  },
];

const Directionplan = () => {
  const { activeItem: planItem, handleItemClick: handlePlanClick } =
    useActiveItem<string>();
  const [hasAnimated, setHasAnimated] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wavePath = pathRef.current;
    const scrollContainer = document.querySelector('.mine-each-func');

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
    <div className="direction-plan-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-jiasupeiyangjihua`}></i>
          方向培养计划
        </h2>
      </div>
      <div className="direction-plan-btns">
        {nowDirections.map((item) => (
          <button
            key={item.name}
            onClick={() => handlePlanClick(item.name)}
            className={`${planItem === item.name ? 'direction-plan-btn-active' : ''}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="each-group-trainplan-box">
        <h3 className="each-group-traninplan-title">{planItem}方向培养计划</h3>
        <div className="direction-plan-page">
          <div className="plan-title"></div>
          <p>面向大一上</p>
          <h3>C语言基础知识</h3>
          <ul>
            <li>基础语法、数组操作、结构体、联合体、指针操作</li>
            <li>C语言内存分配基础，例如malloc等、文件操作</li>
            <li>
              链表增删改查：单链表、双向链表、循环链表；链表和数组的区别，从内存到使用上的区别
            </li>
          </ul>
          <h3>计算机基础</h3>
          <ul>
            <li>
              什么是原码、反码、补码，如何转换，它们与计算机、编程语言之间的关系
            </li>
            <li>int、double等如何存储，占多大内存</li>
            <li>小数、整数如何存储有什么区别，不同进制如何转换</li>
            <li>数组、链表分配的空间有什么区别，如何分配</li>
            <li>文件操作的原理</li>
          </ul>
          <h3>数据结构基础</h3>
          <ul>
            <li>能够在算法中熟练运用数组、链表</li>
            <li>学习字符串的基本算法，例如搜索、查找、增加等，掌握KMP的思想</li>
            <li>掌握冒泡、选择、快速、希尔、归并等排序算法</li>
            <li>学会使用枚举、二分、动态规划、递归、回溯、贪心等基础算法</li>
          </ul>
          <h3>接触开源</h3>
          <ul>
            <li>学会简单地使用git等版本控制工具</li>
            <li>学习使用github、gitee等开源平台，了解开源文化</li>
            <li>
              学习在CSDN、稀土掘金、博客园等平台寻找答案，自己注册一个CSDN账号发表自己的博客文章
            </li>
          </ul>
          <h3>关于咨询问题：</h3>
          <p>
            请了解提问的智慧-中国版。学习编程无法避免向他人提问，而任何优质回答都不是无偿的馈赠，未经思索的潦草提问，往往只能收获同样仓促的回应。如果你想得到某个问题的答案，请至少展现出你的思考。
          </p>
          <h2>大一下将进行方向的选择</h2>
          <p>
            移动应用开发实验室有五个方向可以进行学习，下面是关于这些方向的学习建议以及介绍，帮助大家了解。
          </p>

          <h3>iOS方向：</h3>
          <p>
            iOS开发是面向苹果移动设备（iPhone/iPad）的应用程序开发领域，以苹果生态为核心。
            3G iOS为Apple认证的教育拓展团队iOS Club。
            iOS的开发语言主要为Objective-C和swift，要求系统掌握Objective-C，熟练运用Xcode
            IDE。 学习路径遵循"OC语言基础→各个控件的特性"，推荐《Effective
            Objective-C 2.0》夯实底层逻辑，通过《疯狂 iOS 讲义》完成案例实操。
          </p>

          <h3>Web方向：</h3>
          <p>
            Web开发，简单来说，就是让互联网世界变得更丰富多彩的过程。无论是我们日常浏览的网页，还是各种在线应用，背后都离不开Web技术的支撑。
            这个领域涵盖的内容非常广，从基础的HTML、CSS和JavaScript，到更复杂的前后端框架、数据库、服务器部署，每一个环节都可能成为你探索的方向。
          </p>
          <p>
            如果你是刚刚接触Web开发，建议先从基础三剑客入手：
            <ul>
              <li>HTML：负责页面的结构，就像是房子的框架。</li>
              <li>CSS：负责页面的样式，比如颜色、布局，给房子“刷墙铺地板”。</li>
              <li>
                JavaScript：让页面动起来，比如点击按钮后的动画、表单的自动验证，就像是房子里的电路系统。
              </li>
            </ul>
            推荐的书籍：
            <ul>
              <li>《Head First HTML and CSS》（适合零基础，图文并茂）</li>
              <li>《JavaScript 高级程序设计》（红宝书，经典入门）</li>
            </ul>
          </p>
          <p>
            Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！
            “最好的学习方式，就是动手实践。”不妨试着做一个小项目，比如一个个人博客、一个在线待办事项应用，或者模仿你喜欢的网站。代码写多了，自然就懂了😉
            希望你能在Web开发的世界里找到自己的方向，一步步走下去✨
          </p>

          <h3>安卓方向：</h3>
          <p>
            安卓开发是指为运行Android操作系统的设备（如智能手机、平板电脑、智能手表等）构建应用程序的过程，比如我们平时使用的微信、支付宝、qq、Bilibili、wakeup等都属于安卓应用程序。
            3G的安卓组为Google大学合作部人才培养基地以及Android认证课程。
          </p>
          <p>
            Android开发以Java与Kotlin为双主流语言，其中Java作为官方早期首选语言，因其成熟生态与完整学习资源，仍是新人构建开发思维的理想起点。
            学习者需系统掌握Java
            SE核心语法，并深入理解面向对象编程（OOP）的四大特性——封装、继承、多态、抽象，这些设计思想不仅是安卓组件（Activity/Fragment）的构建基础，更是培养架构思维的核心方法论。
          </p>
          <p>
            推荐学习资源：
            <ul>
              <li>《第一行代码》</li>
              <li>《Android开发艺术探索》</li>
            </ul>
            技术博客：
            <ul>
              <li>
                郭霖的博客:{' '}
                <a
                  href="http://guolin.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  郭霖的Blog
                </a>
              </li>
              <li>
                掘金安卓专栏：
                <a
                  href="https://juejin.cn/android"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://juejin.cn/android
                </a>
              </li>
            </ul>
          </p>

          <h3>鸿蒙方向：</h3>
          <p>
            3G的鸿蒙方向为西安邮电大学与上海卓易科技的校企结合试点。
            HarmonyOS是华为自主研发的分布式操作系统，支持手机、平板、智能穿戴等多设备协同。
            其分布式架构可实现跨设备应用流转和数据共享，开发者使用ArkTS语言一次开发即可多端部署，开发者所使用的工具是Deveco
            Studio。
          </p>
          <p>
            学习HarmonyOS移动应用开发可从华为开发者联盟官网入手，推荐入门可以看：《HarmonyOS
            NEXT启程：零基础构建纯血鸿蒙应用》
          </p>

          <h3>后端方向：</h3>
          <p>
            后端开发是构建软件系统中“看不见的部分”，它主要负责处理数据存储、业务逻辑、服务器管理和与数据库的交互。
            简单来说，后端就像是一个强大的“大脑”，在用户看不到的地方默默工作，确保应用程序能够正常运行。
          </p>
          <p>
            后端开发的核心目标是确保应用程序的性能、安全性和稳定性，让用户在使用前端应用时能够获得流畅的体验。
          </p>
          <p>
            Java：从OOP语法到Spring生态/分布式架构，以企业级框架（Spring
            Boot+Cloud）为锚，在JVM调优与复杂业务中打磨系统设计能力；
            Go：用Goroutine +
            标准库筑基，借Gin/Gorm快速落地微服务，以云原生（Docker/K8s）为跳板，在高性能服务开发中重构代码思维。
          </p>
          <p>
            学习资源推荐：
            <ul>
              <li>《Java核心技术卷》</li>
              <li>《Spring实战》</li>
              <li>《深入理解Java虚拟机》</li>
              <li>《Spring Cloud与Docker微服务架构实战》</li>
              <li>《Go语言圣经》</li>
              <li>《Go语言趣学指南》</li>
              <li>《Go语言高级编程》</li>
            </ul>
          </p>
        </div>
      </div>

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
    </div>
  );
};

export default Directionplan;
