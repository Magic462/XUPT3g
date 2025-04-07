import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './Home.scss';
import '../../assets/wxqr.webp';
const Home = () => {
    const [visibleCards, setVisibleCards] = useState([]);
    // 获得当前年
    const now = new Date();
    const year = now.getFullYear();
    const platforms = [
        {
            id: 'web',
            name: 'Web',
            delay: 0,
            description: 'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
        },
        {
            id: 'server',
            name: 'Server',
            delay: 100,
            description: '服务器开发让你能够处理后端逻辑，保障应用的稳定和安全。了解服务器的构建，能让你的应用运行得更顺畅！',
        },
        {
            id: 'android',
            name: 'Android',
            delay: 200,
            description: '安卓开发为你打开了移动应用的大门，应用程序的每一次更新都能提升用户体验，快来尝试吧！',
        },
        {
            id: 'ios',
            name: 'iOS',
            delay: 300,
            description: 'iOS开发注重用户体验，精致的界面让每个应用都独具魅力。用你的创意实现应用的灵魂！',
        },
        {
            id: 'harmony',
            name: 'HarmonyOS',
            delay: 400,
            description: '鸿蒙系统为多设备体验提供了可能，了解其特性，你将能够创建跨平台的应用！',
        },
    ];
    // 使用IntersectionObserver 接口监听元素是否进入视口，并实现只要进入视口反复出现动画
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 元素进入视口，添加动画类名
                    entry.target.classList.add('show');
                }
                else {
                    // 元素离开视口，移除动画类名
                    entry.target.classList.remove('show');
                }
            });
        });
        const cards = document.querySelectorAll('.platform-card');
        cards.forEach((card) => {
            observer.observe(card);
        });
        return () => {
            observer.disconnect();
        };
    }, []);
    // 实现即将滚动到platforms-section时卡片依次弹出
    // useEffect(() => {
    //   const handleScroll = () => {
    //     const platformsSection = document.querySelector('.platforms-section');
    //     if (platformsSection) {
    //       const sectionTop = platformsSection.getBoundingClientRect().top;
    //       const windowHeight = window.innerHeight;
    //       if (sectionTop < windowHeight * 0.9) {
    //         platforms.forEach((platform, index) => {
    //           setTimeout(() => {
    //             setVisibleCards((prev) => [...new Set([...prev, index])]);
    //           }, platform.delay);
    //         });
    //       }
    //     }
    //   };
    //   window.addEventListener('scroll', handleScroll);
    //   return () => window.removeEventListener('scroll', handleScroll);
    // }, []);
    return (_jsxs("div", { className: "home-container", children: [_jsx("section", { className: "hero", children: _jsxs("div", { className: "hero-content", children: [_jsx("div", { className: "hero-gif", children: _jsxs("video", { autoPlay: true, loop: true, muted: true, children: [_jsx("source", { src: "./src/assets/layoutback.mp4", type: "video/mp4" }), "Your browser does not support the video tag."] }) }), _jsxs("div", { className: "hero-tip", children: [_jsx("h1", { children: "\u897F\u90AE\u79FB\u52A8\u5E94\u7528\u5F00\u53D1\u5B9E\u9A8C\u5BA4" }), _jsx("p", { children: "\u63A2\u7D22\u79FB\u52A8\u5E94\u7528\u5F00\u53D1\u7684\u65E0\u9650\u53EF\u80FD" })] })] }) }), _jsxs("section", { className: "platforms-section", children: [_jsx("h2", { children: "\u6280\u672F\u5E73\u53F0" }), _jsx("div", { className: "platforms-container", children: platforms.map((platform, index) => (
                        // <div
                        //   key={platform.id}
                        //   className={`platform-card ${visibleCards.includes(index) ? 'show' : ''}`}
                        //   style={{
                        //     transform: visibleCards.includes(index)
                        //       ? 'translateY(0) translateX(0)'
                        //       : 'translateY(100px) translateX(100px)',
                        //     transitionDelay: `${platform.delay}ms`,
                        //   }}
                        // >
                        _jsxs("div", { className: `platform-card ${platform.delay ? `transition-delay-${platform.delay}` : ''}`, style: {
                                transitionDelay: `${platform.delay}ms`,
                            }, children: [_jsx("h3", { children: platform.name }), _jsx("div", { className: "platform-description", children: platform.description })] }, platform.id))) })] }), _jsxs("footer", { className: "home-footer", children: [_jsxs("div", { className: "footer-links", children: [_jsx("div", { className: "vx", children: "\u5FAE\u4FE1\u516C\u4F17\u53F7" }), _jsx("img", { src: './src/assets/wxqr.webp', alt: "" }), _jsx("div", { className: "qq", children: "qq\u7EB3\u65B0\u7FA4: 1623728627" })] }), _jsxs("div", { className: "copyright", children: ["\u00A9 ", year, " \u897F\u90AE\u79FB\u52A8\u5E94\u7528\u5F00\u53D1\u5B9E\u9A8C\u5BA4. All rights reserved."] })] })] }));
};
export default Home;
