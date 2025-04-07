import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './Mine.scss';
import '@/assets/icons/font_4k8jwf31qbs/iconfont.css';
import '@/assets/icons/font_f7int92srzr/iconfont.css';
import { useActiveItem } from '@/hooks/useActiveItem';
const EXPANDABLE_ITEMS = {
    SETTING: 'setting',
    DONATIONEDIT: 'donationEdit',
    ACTIVITY: 'activity',
    DIRECTION: 'direction',
    MEMBEREDIT: 'memberEdit',
    DONATION: 'donation',
    MEMBER: 'member',
};
// 用户端导航配置
const userNavItem = [
    {
        key: EXPANDABLE_ITEMS.SETTING,
        icon: 'icon-shezhi',
        label: '设置',
        children: [
            { path: '/mine/user/myinfo', label: '个人信息' },
            { path: '/mine/user/changeinfo', label: '个人设置' },
        ],
    },
    {
        key: EXPANDABLE_ITEMS.DONATION,
        icon: 'icon-aixinjuankuan',
        label: '捐款信息',
        path: '/mine/user/donation',
    },
    {
        key: EXPANDABLE_ITEMS.MEMBER,
        icon: 'icon-chengyuan',
        label: '成员列表',
        path: '/mine/user/groupmember',
    },
];
// 管理员端导航配置
const adminNavItem = [
    {
        key: EXPANDABLE_ITEMS.DONATIONEDIT,
        icon: 'icon-aixinjuankuan',
        label: '捐款管理',
        path: '/mine/admin/editdonation',
    },
    {
        key: EXPANDABLE_ITEMS.ACTIVITY,
        icon: 'icon-dongtai',
        label: '发布动态',
        children: [
            { path: '/mine/admin/postactivity', label: '新建动态' },
            { path: '/mine/admin/allactivity', label: '动态列表' },
        ],
    },
    {
        key: EXPANDABLE_ITEMS.MEMBEREDIT,
        icon: 'icon-shenhe',
        label: '成员管理',
        children: [
            { path: '/mine/admin/allmember', label: '成员列表' },
            { path: '/mine/admin/verifymember', label: '审核注册' },
        ],
    },
    {
        key: EXPANDABLE_ITEMS.DIRECTION,
        icon: 'icon-guanli',
        label: '方向管理',
        path: '/mine/admin/editdirection',
    },
];
// const RenderNavItem = (item: {
//   key: ExpandableItem;
//   icon: string;
//   label: string;
//   path?: string;
//   children?: Array<{ path: string; label: string }>;
// }) => {
//   const navigate = useNavigate();
//   const { activeItem: expandItem, handleItemClick: handleExpandItem } =
//     useActiveItem<ExpandableItem>();
//   // 统一处理导航和展开,点击传递盒子的key和path
//   const handleNavClick = (item: ExpandableItem, path?: string) => {
//     if (path) {
//       navigate(path);
//     }
//     handleExpandItem(item);
//   };
//   // 当前导航项是否处于展开
//   const isActive = expandItem === item.key;
//   return (
//     <li key={item.key} className={`nav-${item.key}`}>
//       <span onClick={() => handleNavClick(item.key, item.path)}>
//         <i className={`nav-icon iconfont ${item.icon}`}></i>
//         {item.label}
//       </span>
//       {item.children && isActive && (
//         <ul className="nav-each-func-box">
//           {item.children.map((child) => (
//             <li key={child.path} onClick={() => navigate(child.path)}>
//               {child.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// };
const Mine = () => {
    // 从一级路由Layout读取showSubNav状态
    const { showSubNav, setShowSubNav } = useOutletContext();
    // 管理员/用户身份识别
    const [role, setRole] = useState('user');
    // 点击子盒子冒泡触发父盒子的点击事件,传递子盒子的key给父盒子,再传给useActiveItem然后得到激活状态展开对应的子盒子的子内容?
    const navigate = useNavigate();
    const { activeItem: expandItem, handleItemClick: handleExpandItem } = useActiveItem();
    // 统一处理导航和展开,点击传递盒子的key和path
    const handleNavClick = (item, path) => {
        if (path) {
            navigate(path);
        }
        handleExpandItem(item);
    };
    const RenderNavItem = (item) => {
        // 当前导航项是否处于展开
        const isActive = expandItem === item.key;
        return (_jsxs("li", { className: `nav-${item.key}`, children: [_jsxs("span", { onClick: () => handleNavClick(item.key, item.path), children: [_jsx("i", { className: `nav-icon iconfont ${item.icon}` }), item.label] }), item.children && isActive && (_jsx("ul", { className: "nav-each-func-box", children: item.children.map((child) => (_jsx("li", { onClick: () => navigate(child.path), children: child.label }, child.path))) }))] }, item.key));
    };
    return (_jsxs("div", { className: "mine-container", children: [showSubNav && (_jsx("div", { className: "mine-leftnav", children: role === 'user' ? (
                // 用户端
                _jsxs("section", { className: "nav-user", children: [_jsx("h3", { className: "nav-title", children: "\u4E2A\u4EBA\u7AEF" }), _jsx("ul", { className: "user-func", children: userNavItem.map((item) => RenderNavItem(item)) }), _jsx("button", { onClick: () => setRole(role === 'user' ? 'admin' : 'user'), children: "\u4EA4\u6362\u8EAB\u4EFD" })] })) : (
                // 管理员端
                _jsxs("section", { className: "nav-administrator", children: [_jsx("h3", { className: "nav-title", children: "\u7BA1\u7406\u5458\u7AEF" }), _jsx("ul", { className: "administrator-func", children: adminNavItem.map((item) => RenderNavItem(item)) }), _jsx("button", { onClick: () => setRole(role === 'user' ? 'admin' : 'user'), children: "\u4EA4\u6362\u8EAB\u4EFD" })] })) })), _jsx("div", { className: "mine-each-func", children: _jsx(Outlet, {}) })] }));
};
export default Mine;
