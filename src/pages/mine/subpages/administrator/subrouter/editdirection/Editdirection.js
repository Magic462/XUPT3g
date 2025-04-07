import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Editdirection.scss';
const directionData = [
    {
        name: 'web',
        ifexit: 1,
        bref_info: 'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
    },
    {
        name: 'iOS',
        ifexit: 1,
        bref_info: 'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
    },
    {
        name: 'Andriod',
        ifexit: 1,
        bref_info: 'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
    },
    {
        name: 'HarmonyOS',
        ifexit: 1,
        bref_info: 'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
    },
    {
        name: 'PM',
        ifexit: 1,
        bref_info: 'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
    },
];
const Renderdirectionitem = (item) => {
    return (_jsxs("div", { className: "direction-item-box", children: [_jsxs("div", { className: "direction-info-box", children: [_jsxs("div", { className: "direction-info-top-box", children: [_jsx("div", { className: "direction-name", children: item.name }), _jsx("div", { className: "direction-status", children: item.ifexit === 1 ? '现有' : '现无' })] }), _jsxs("div", { className: "direction-brefinfo", children: ["\u7B80\u4ECB: ", item.bref_info] })] }), _jsxs("div", { className: "direction-edit-btns", children: [_jsx("button", { className: "direction-edit-btn", children: "\u7F16\u8F91" }), _jsx("button", { className: "direction-move-btn", children: "\u79FB\u9664" })] })] }));
};
const Editdirection = () => {
    return (_jsxs("div", { className: "edit-direction-container", children: [_jsx("div", { className: "each-func-title", children: _jsx("h2", { children: "\u7F16\u8F91\u5B9E\u9A8C\u5BA4\u65B9\u5411" }) }), _jsx("div", { className: "edit-diretion-add-btn", children: _jsx("button", { children: "\u6DFB\u52A0\u65B9\u5411" }) }), _jsx("div", { className: "direction-item-container", children: directionData.map((item) => Renderdirectionitem(item)) })] }));
};
export default Editdirection;
