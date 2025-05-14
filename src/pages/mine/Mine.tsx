import { useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './Mine.scss';
import '@/assets/icons/font_4k8jwf31qbs/iconfont.css';
import '@/assets/icons/font_f7int92srzr/iconfont.css';
import '@/assets/icons/font_ry8o2ikys/iconfont.css';
import '@/assets/icons/font_95rv9yhaqnu/iconfont.css';
import { useActiveItem } from '@/hooks/useActiveItem';
import Por from '../../assets/wxqr.webp';

// 用户数据
const userData = {
  // portrait: '//mobile.xupt.edu.cn/res/15342187758400435.',
  portrait: Por,
};

// 导航栏项
const EXPANDABLE_ITEMS = {
  SETTING: 'setting',
  DONATIONEDIT: 'donationEdit',
  ACTIVITY: 'activity',
  DIRECTION: 'direction',
  MEMBEREDIT: 'memberEdit',
  DONATION: 'donation',
  MEMBER: 'member',
  DIRECTIONPLAN: 'directionplan',
  EDITTRAININGPLAN: 'edittrainplan',
} as const;

type ExpandableItem = (typeof EXPANDABLE_ITEMS)[keyof typeof EXPANDABLE_ITEMS];

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
    key: EXPANDABLE_ITEMS.DIRECTIONPLAN,
    icon: 'icon-jiasupeiyangjihua',
    label: '方向培养计划',
    path: '/mine/user/directionplan',
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
    icon: 'icon-chengyuan',
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
  {
    key: EXPANDABLE_ITEMS.EDITTRAININGPLAN,
    icon: 'icon-jiasupeiyangjihua',
    label: '培养方案',
    path: '/mine/admin/edittrainplan',
  },
];

const Mine = () => {
  // 从一级路由Layout读取showSubNav状态
  const { showSubNav, setShowSubNav } = useOutletContext<{
    showSubNav: boolean;
    setShowSubNav: (value: boolean) => void;
  }>();

  // 管理员/用户身份识别
  const [role, setRole] = useState('user');

  // 点击子盒子冒泡触发父盒子的点击事件,传递子盒子的key给父盒子,再传给useActiveItem然后得到激活状态展开对应的子盒子的子内容?
  const navigate = useNavigate();
  const { activeItem: expandItem, handleItemClick: handleExpandItem } =
    useActiveItem<ExpandableItem>();
  // 统一处理导航和展开,点击传递盒子的key和path
  const handleNavClick = (item: ExpandableItem, path?: string) => {
    if (path) {
      navigate(path);
    }

    handleExpandItem(item);
  };

  // 用户退出，并且清除本地下载的token
  const userExit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('status')
    localStorage.removeItem('username')
    // alert('确认退出登陆')
    navigate('/');
  };

  // 左侧导航各个item渲染
  const RenderNavItem = (item: {
    key: ExpandableItem;
    icon: string;
    label: string;
    path?: string;
    children?: Array<{ path: string; label: string }>;
  }) => {
    // 当前导航项是否处于展开
    const isActive = expandItem === item.key;

    return (
      <li key={item.key} className={`nav-${item.key}`}>
        <span onClick={() => handleNavClick(item.key, item.path)}>
          <div className="">
            <i className={`nav-icon iconfont ${item.icon}`}></i>
            {item.label}
          </div>
          <i
            className={`nav-icon-expand iconfont icon-jiantou_liebiaoxiangyou ${isActive ? 'expand-active' : ''}`}
          ></i>
        </span>
        {item.children && isActive && (
          <ul className="nav-each-func-box">
            {item.children.map((child) => (
              <li key={child.path} onClick={() => navigate(child.path)}>
                {child.label}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="mine-container">
      {/* 左侧导航栏 */}
      {showSubNav && (
        <div className="mine-leftnav">
          <div className="leftnav-profile-container">
            <div className="leftnav-profile-box">
              <img src={userData.portrait} alt="" />
            </div>
          </div>
          {role === 'user' ? (
            // 用户端
            <section className="nav-user">
              <h3 className="nav-title">个人端</h3>
              <ul className="user-func">
                {userNavItem.map((item) => RenderNavItem(item))}
              </ul>
              <button
                onClick={() => setRole(role === 'user' ? 'admin' : 'user')}
              >
                交换身份
              </button>
            </section>
          ) : (
            // 管理员端
            <section className="nav-administrator">
              <h3 className="nav-title">管理员端</h3>
              <ul className="administrator-func">
                {adminNavItem.map((item) => RenderNavItem(item))}
              </ul>
              <button
                onClick={() => setRole(role === 'user' ? 'admin' : 'user')}
              >
                交换身份
              </button>
            </section>
          )}
          <div className="leftnav-exit">
            <button onClick={() => userExit()}>exit</button>
          </div>
        </div>
      )}
      {/* 右侧模块内容，三级路由 */}
      <div className="mine-each-func">
        <Outlet />
      </div>
    </div>
  );
};

export default Mine;
