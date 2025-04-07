import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Peohome from '@/components/Peohome';
import './Myinfo.scss';
const Myinfo = () => {
    const [dataList, setDataList] = useState(null);
    const [status, setStatus] = useState(0);
    useEffect(() => {
        // 模拟从后端获取数据，实际应用中需要使用axios等库进行真实请求
        const mockData = {
            status: 0,
            data: {
                portrait: '//mobile.xupt.edu.cn/res/15342187758400435.gif',
                gender: '男',
                classGrade: '软件1302',
                year: 2013,
                phone: '15229098768',
                isGraduate: true,
                username: 'yangyuan',
                name: '杨远',
                team: 'Web',
                mienImg: '//mobile.xupt.edu.cn/res/14905423740937914.jpg',
                // "graduateImg": "//mobile.xupt.edu.cn/res/14957725307919851.jpg",
                signature: '啊啊啊啊啊啊回来了',
                company: 'shopee',
            },
        };
        setDataList(mockData.data);
        setStatus(mockData.status);
    }, []);
    return (_jsxs("div", { className: "myinfo-container", children: [_jsx("div", { className: "each-func-title", children: _jsx("h2", { className: "myinfo-title", children: "\u4E2A\u4EBA\u4FE1\u606F" }) }), dataList && (_jsx(Peohome, { portrait: dataList.portrait, gender: dataList.gender, classGrade: dataList.classGrade, year: dataList.year, phone: dataList.phone, isGraduate: dataList.isGraduate, username: dataList.username, name: dataList.name, team: dataList.team, mienImg: dataList.mienImg, signature: dataList.signature, company: dataList.company }))] }));
};
export default Myinfo;
