import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Memlist from '@/components/Memlist';
// const Memlist = lazy(() => import('@/components/Memlist'));
import './Allmember.scss';
import { useActiveItem } from '@/hooks/useActiveItem';
const Allmember = () => {
    const [visibleIndexes, setVisibleIndexes] = useState([]);
    // const observerRef = useRef();
    const [dataList, setDataList] = useState([]);
    const [status, setStatus] = useState(0);
    const { activeItem: activeGroup, handleItemClick: handleGroupClick } = useActiveItem();
    const { activeItem: activeGraduate, handleItemClick: handleGraduateClick } = useActiveItem();
    const GroupsData = [
        { name: 'web' },
        { name: 'Android' },
        { name: 'Server' },
        { name: 'iOS' },
        { name: 'HarmonyOS' },
    ];
    // 这个之后要根据数据中现有的组去录入吧
    //   const CLICK_ITEMS = {
    //     WEB: 'web',
    //     ANDROID: 'android',
    //     SERVER: 'server',
    //     IOS: 'ios',
    //     HARMONYOS: 'harmonyos',
    //     };
    // 多数地方用到了这个封装成hook?
    //   const [teamClick, setTeamClick] = useState<keyof typeof CLICK_ITEMS | null>(
    //     null
    //   );
    useEffect(() => {
        // 模拟从后端获取数据，实际应用中需要使用axios等库进行真实请求
        const mockData = {
            status: 0,
            data: {
                dataList: [
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                    {
                        username: 'yangyuan',
                        name: '杨远',
                        team: 'Web',
                        graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
                        signature: '啊啊啊啊啊啊回来了',
                        company: 'shopee',
                    },
                ],
            },
        };
        setDataList(mockData.data.dataList);
        setStatus(mockData.status);
        // const observer = new IntersectionObserver((entries) => {
        //   entries.forEach((entry) => {
        //     if (entry.isIntersecting) {
        //       setVisibleIndexes((prev) => [...prev, entry.target.dataset.index]);
        //       observer.unobserve(entry.target); // 停止观察
        //     }
        //   });
        // });
        // const targets = document.querySelectorAll('.lazy-load');
        // targets.forEach((target) => observer.observe(target));
        // return () => {
        //   targets.forEach((target) => observer.unobserve(target));
        // };
    }, []);
    return (_jsxs("div", { className: "allmember-container", children: [_jsx("div", { className: "each-func-title", children: _jsx("h2", { className: "allmember-title", children: "\u6210\u5458\u5217\u8868" }) }), _jsxs("div", { className: "filter-buttons", children: [_jsx("div", { className: "filter-groups", children: GroupsData.map((item) => (_jsx("button", { onClick: () => handleGroupClick(item.name), className: `filter-button filter-btn-group ${activeGroup === item.name ? 'active' : ''}`, children: item.name }, item.name))) }), _jsxs("div", { className: "filter-ifgraduate", children: [_jsx("button", { onClick: () => handleGraduateClick('graduated'), className: `filter-button ${activeGraduate === 'graduated' ? 'active' : ''}`, children: "\u5DF2\u6BD5\u4E1A" }), _jsx("button", { onClick: () => handleGraduateClick('not-graduate'), className: `filter-button ${activeGraduate === 'not-graduate' ? 'active' : ''}`, children: "\u672A\u6BD5\u4E1A" })] })] }), dataList.map((item, index) => (_jsx(Memlist, { username: item.username, name: item.name, team: item.team, graduateImg: item.graduateImg, signature: item.signature, status: status }, index)))] }));
};
export default Allmember;
