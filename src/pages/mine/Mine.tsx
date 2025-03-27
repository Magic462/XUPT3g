import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Mine.scss';
import '@/assets/icons/font_4k8jwf31qbs/iconfont.css';

const Mine = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  return (
    <div className="mine-container">
      {/* 左侧导航栏 */}
      <div className="mine-leftnav">
        {role === 'user' ? (
          // 用户端
          <section className="nav-user">
            <h3 className="nav-title">个人端</h3>
            <ul className="user-func">
              <li
                className="nav-setting"
                // onClick={() => navigate('/mine/settings')}
              >
                <i className="nav-icon iconfont icon-shezhi"></i>
                设置
                <ul className="nav-setting-box">
                  <li
                    className="nav-setting-info"
                    onClick={() => navigate('/mine/settings/myinfo')}
                  >
                    个人信息
                  </li>
                  <li
                    className="nav-setting-infoset"
                    onClick={() => navigate('/mine/settings/changeinfo')}
                  >
                    个人设置
                  </li>
                </ul>
              </li>
              <li
                className="nav-donation"
                onClick={() => navigate('/mine/donation')}
              >
                <i className="nav-icon iconfont icon-aixinjuankuan"></i>
                捐款信息
              </li>
              <li
                className="nav-members"
                onClick={() => navigate('/mine/groupmember')}
              >
                <i className="nav-icon iconfont icon-chengyuan"></i>
                成员
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
              <li
                className="nav-edit-donation"
                onClick={() => navigate('/mine/editdonation')}
              >
                编辑捐款信息
              </li>
              <li
                className="nav-edit-activity"
                onClick={() => navigate('/mine/editactivity')}
              >
                发布动态
              </li>
              <li
                className="nav-edit-verify"
                onClick={() => navigate('/mine/editregister')}
              >
                审核注册
              </li>
              <li
                className="nav-edit-direction"
                onClick={() => navigate('/mine/editdirection')}
              >
                管理方向
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
