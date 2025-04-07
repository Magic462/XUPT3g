import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import './Activities.scss';
import '@/assets/icons/font_9342xhmvru9/iconfont.css';
const activitiesData = [
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
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
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
    {
        title: 'Android小组参加GDG DevFest 2024西安站',
        timeDate: '2024-12-08',
        content: '2024年11月24日下午，西安的天空一片晴朗，阳光如同碎金般洒落在西安神州数码科技园的每一个角落。在这个充满科技气息的园区内，一场属于技术爱好者的盛会——GDG DevFest 2024西安站即将拉开帷幕。实验室的Android小组，一群怀揣着对技术无限热忱的年轻人，正迈着轻快而又激动的步伐，朝着活动现场进发',
        status: 'completed',
        imgSrc: './src/assets/activities/17336357070040458.webp',
    },
];
// 每页显示的活动数量
const ITEMS_PER_PAGE = 10;
const Activities = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTimelineNode, setActiveTimelineNode] = useState(null);
    const activitiesRef = useRef([]);
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
    const handlePageChange = (page) => {
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
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "activities-header", children: _jsx("h1", { children: "\u6D3B\u52A8\u5217\u8868" }) }), _jsx("div", { className: "activities-container", children: _jsxs("section", { className: "activities-lists", children: [getCurrentActivities().map((activity, index) => (_jsxs("div", { className: "activity-card", ref: (e) => {
                                activitiesRef.current[index] = e;
                            }, children: [_jsxs("div", { className: `timeline-node ${activeTimelineNode === index ? 'active' : ' '}`, children: [_jsx("span", { className: `timeline-node-time ${activeTimelineNode === index ? 'active' : ' '}`, children: activity.timeDate }), _jsx("i", { className: `timeline-node-icon iconfont icon-android ${activeTimelineNode === index ? 'active' : ' '}` })] }), _jsxs("div", { className: `activity-bref-box ${activeTimelineNode === index ? 'card-active' : ' '}`, children: [_jsxs("div", { className: "activity-bref-info", children: [_jsx("h3", { className: "activity-title", children: activity.title }), _jsxs("div", { className: "activity-date", children: ["\u53D1\u5E03\u4E8E ", activity.timeDate] }), _jsx("p", { className: "activity-content", children: activity.content })] }), _jsx("div", { className: "activity-bref-bg", children: _jsx("img", { src: activity.imgSrc, alt: "" }) })] })] }, index))), totalPages > 1 && (_jsxs("div", { className: "pagination", children: [_jsx("button", { className: "page-button", onClick: () => handlePageChange(currentPage - 1), disabled: currentPage === 1, children: "\u4E0A\u4E00\u9875" }), getPageNumbers().map((number) => (_jsx("button", { className: `page-button ${currentPage === number ? 'active' : ''}`, onClick: () => handlePageChange(number), children: number }, number))), _jsx("button", { className: "page-button", onClick: () => handlePageChange(currentPage + 1), disabled: currentPage === totalPages, children: "\u4E0B\u4E00\u9875" })] }))] }) })] }));
};
export default Activities;
