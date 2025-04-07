import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useActiveItem } from '@/hooks/useActiveItem';
import './Changeinfo.scss';
import '@/assets/icons/font_ejn49oukscw/iconfont.css';
const peo = {
    portrait: '//mobile.xupt.edu.cn/res/15342187758400435.gif',
    gender: '男',
    classGrade: '软件1302',
    year: 2013,
    phone: '15229098768',
    isGraduate: true,
    username: 'yangyuan',
    name: '杨远',
    group: 'Web',
    mienImg: '//mobile.xupt.edu.cn/res/14905423740937914.jpg',
    // "graduateImg": "//mobile.xupt.edu.cn/res/14957725307919851.jpg",
    signature: '啊啊啊啊啊啊回来了',
    company: 'shopee',
};
const Changeinfo = () => {
    const { activeItem: photoItem, handleItemClick: handlePhotoClick } = useActiveItem();
    return (_jsxs("div", { className: "changeinfo-container", children: [_jsx("div", { className: "each-func-title", children: _jsx("h2", { children: "\u4E2A\u4EBA\u8BBE\u7F6E" }) }), _jsxs("div", { className: "changeinfo-box", children: [_jsxs("div", { className: "changeinfo-photochange-box", children: [_jsx("div", { className: "photo-box", children: _jsx("img", { src: "http://mobile.xupt.edu.cn/res/15342187758400435.gif", alt: "" }) }), _jsxs("div", { className: "change-photo-btn", children: [_jsx("button", { onClick: () => handlePhotoClick('profile-photo'), className: photoItem === 'profile-photo' ? 'active' : '', children: "\u5C0F\u5934\u50CF" }, "profile-photo"), _jsx("button", { onClick: () => handlePhotoClick('mien-photo'), className: photoItem === 'mien-photo' ? 'active' : '', children: "\u98CE\u91C7\u7167" }, "mien-photo")] })] }), _jsxs("div", { className: "changeinfo-basicchange-box", children: [_jsxs("div", { className: "changeinfo-item", children: [_jsx("label", { children: "\u59D3 \u540D" }), _jsx("input", { type: "text", placeholder: peo.name })] }), _jsxs("div", { className: "changeinfo-item", children: [_jsx("label", { children: "\u4E13 \u4E1A" }), _jsx("input", { type: "text", placeholder: peo.classGrade })] }), _jsxs("div", { className: "changeinfo-item", children: [_jsx("label", { children: "\u7EC4 \u522B" }), _jsx("input", { type: "text", placeholder: peo.group })] }), _jsxs("div", { className: "changeinfo-item", children: [_jsx("label", { children: "\u516C \u53F8" }), _jsx("input", { type: "text", placeholder: peo.company })] }), _jsxs("div", { className: "changeinfo-item", children: [_jsx("label", { children: "\u7535 \u8BDD" }), _jsx("input", { type: "text", placeholder: peo.phone })] }), _jsxs("div", { className: "changeinfo-item", children: [_jsx("label", { children: "\u7B7E \u540D" }), _jsx("input", { type: "text", placeholder: peo.signature })] })] })] })] }));
};
export default Changeinfo;
