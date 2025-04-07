import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Memlist from '@/components/Memlist';
import './Groupmember.scss';
const Groupmember = () => {
    const [dataList, setDataList] = useState([]);
    const [status, setStatus] = useState(0);
    useEffect(() => {
        // 模拟从后端获取数据，实际应用中需要使用axios等库进行真实请求
        const mockData = {
            status: 1,
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
    }, []);
    return (_jsxs("div", { className: "groupmember-container", children: [_jsx("div", { className: "each-func-title", children: _jsx("h2", { className: "groupmember-title", children: "\u6210\u5458\u5217\u8868" }) }), _jsx("div", { className: "groupmember-items-box", children: dataList.map((item, index) => (_jsx(Memlist, { username: item.username, name: item.name, team: item.team, graduateImg: item.graduateImg, signature: item.signature, status: status }, index))) })] }));
};
export default Groupmember;
