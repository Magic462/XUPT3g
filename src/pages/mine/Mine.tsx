import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Mine.scss';
import '@/assets/icons/font_4k8jwf31qbs/iconfont.css';
import '@/assets/icons/font_f7int92srzr/iconfont.css';

const Mine = () => {
  const navigate = useNavigate();
  // 管理员/用户身份识别
  const [role, setRole] = useState('user');
  // 四级组件是否展开
  // 使用一个状态变量记录三级组件展开的xiang
  const [expandItem, setExpandItem] = useState(null);

  const EXPANDABLE_ITEMS = {
    SETTING: 'setting',
    DONATIONEDIT: 'donationEdit',
    ACTIVITY: 'activity',
    DIRECTION: 'direction',
    MEMBEREDIT: 'memberEdit',
    DONATION: 'donation',
    MEMBER: 'member',
  };

  // 切换哪一个为展开状态
  const toggleExpand = (item) => {
    setExpandItem(expandItem === item ? null : item);
  };

  return (
    <div className="mine-container">
      {/* 左侧导航栏 */}
      <div className="mine-leftnav">
        {role === 'user' ? (
          // 用户端
          <section className="nav-user">
            <h3 className="nav-title">个人端</h3>
            <ul className="user-func">
              <li className="nav-setting">
                <span onClick={() => toggleExpand(EXPANDABLE_ITEMS.SETTING)}>
                  <i className="nav-icon iconfont icon-shezhi"></i>
                  设置
                </span>
                {expandItem === EXPANDABLE_ITEMS.SETTING ? (
                  <ul className="nav-each-func-box">
                    <li
                      className="nav-setting-info"
                      onClick={() => navigate('/mine/user/myinfo')}
                    >
                      个人信息
                    </li>
                    <li
                      className="nav-setting-infoset"
                      onClick={() => navigate('/mine/user/changeinfo')}
                    >
                      个人设置
                    </li>
                  </ul>
                ) : (
                  ''
                )}
              </li>
              <li
                className="nav-donation"
                onClick={() => navigate('/mine/user/donation')}
              >
                <span onClick={() => toggleExpand(EXPANDABLE_ITEMS.DONATION)}>
                  <i className="nav-icon iconfont icon-aixinjuankuan"></i>
                  捐款信息
                </span>
                {/* {expandItem === EXPANDABLE_ITEMS.DONATION ? (
                  <ul>
                    <li>捐款列表</li>
                  </ul>
                ) : (
                  ''
                )} */}
              </li>
              <li
                className="nav-members"
                onClick={() => navigate('/mine/user/groupmember')}
              >
                <span onClick={() => toggleExpand(EXPANDABLE_ITEMS.MEMBER)}>
                  <i className="nav-icon iconfont icon-chengyuan"></i>
                  成员列表
                </span>
                {/* {expandItem === EXPANDABLE_ITEMS.MEMBER ? (
                  <ul>
                    <li>成员信息</li>
                  </ul>
                ) : (
                  ''
                )} */}
              </li>
            </ul>
            <button onClick={() => setRole(role === 'user' ? 'admin' : 'user')}>
              交换身份
            </button>
          </section>
        ) : (
          // 管理员端
          <section className="nav-administrator">
            <h3 className="nav-title">管理员端</h3>
            <ul className="administrator-func">
              {/* 编辑捐款信息 */}
              <li
                className="nav-edit-donation"
                onClick={() => navigate('/mine/admin/editdonation')}
              >
                <span
                  onClick={() => toggleExpand(EXPANDABLE_ITEMS.DONATIONEDIT)}
                >
                  <i className="nav-icon iconfont icon-aixinjuankuan"></i>
                  捐款管理
                </span>
                {/* {expandItem === EXPANDABLE_ITEMS.DONATIONEDIT ? (
                  <ul className="nav-each-func-box">
                    <li>捐款列表</li>
                  </ul>
                ) : (
                  ''
                )} */}
              </li>
              {/* 发布动态 */}
              <li className="nav-edit-activity">
                <span onClick={() => toggleExpand(EXPANDABLE_ITEMS.ACTIVITY)}>
                  <i className="nav-icon iconfont icon-dongtai"></i>
                  发布动态
                </span>
                {expandItem === EXPANDABLE_ITEMS.ACTIVITY ? (
                  <ul className="nav-each-func-box">
                    <li onClick={() => navigate('/mine/admin/postactivity')}>
                      新建动态
                    </li>
                    <li onClick={() => navigate('/mine/admin/allactivity')}>
                      动态列表
                    </li>
                  </ul>
                ) : (
                  ''
                )}
              </li>
              {/* 管理成员 */}
              <li
                className="nav-edit-verify"
                // onClick={() => navigate('/mine/admin')}
              >
                <span onClick={() => toggleExpand(EXPANDABLE_ITEMS.MEMBEREDIT)}>
                  {' '}
                  <i className="nav-icon iconfont icon-shenhe"></i>
                  成员管理
                </span>
                {expandItem === EXPANDABLE_ITEMS.MEMBEREDIT ? (
                  <ul className="nav-each-func-box">
                    <li onClick={() => navigate('/mine/admin/allmember')}>
                      成员列表
                    </li>
                    <li onClick={() => navigate('/mine/admin/verifymember')}>
                      审核注册
                    </li>
                  </ul>
                ) : (
                  ' '
                )}
              </li>
              {/* 管理方向 */}
              <li
                className="nav-edit-direction"
                onClick={() => navigate('/mine/admin/editdirection')}
              >
                <span onClick={() => toggleExpand(EXPANDABLE_ITEMS.DIRECTION)}>
                  <i className="nav-icon iconfont icon-guanli"></i>
                  方向管理
                </span>
                {/* {expandItem === EXPANDABLE_ITEMS.DIRECTION ? (
                  <ul className="nav-each-func-box">
                    <li>实验室方向</li>
                  </ul>
                ) : (
                  ''
                )} */}
              </li>
            </ul>
            <button onClick={() => setRole(role === 'user' ? 'admin' : 'user')}>
              交换身份
            </button>
          </section>
        )}
      </div>

      {/* 右侧模块内容，三级路由 */}
      <div className="mine-each-func">
        <Outlet />
      </div>
    </div>
  );
};

export default Mine;
