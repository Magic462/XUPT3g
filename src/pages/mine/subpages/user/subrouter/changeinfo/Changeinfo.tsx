import { useActiveItem } from '@/hooks/useActiveItem';
import './Changeinfo.scss';
import '@/assets/icons/font_ejn49oukscw/iconfont.css';
// import { getUseinfo } from '@/services/userinfo';
import { useEffect, useState } from 'react';

const peo = {
  portrait: '//mobile.xupt.edu.cn/res/15342187758400435.gif',
  gender: '男',
  classGrade: '软件1302',
  year: 2013,
  tel: '15229098768',
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
  const { activeItem: photoItem, handleItemClick: handlePhotoClick } =
    useActiveItem<string>();

  const [userinfo, setUserInfo] = useState(null);

  // useEffect(()=>{
  //   const fetchUserinfo = async () => {
  //     try {
  //       const response = await getUseinfo();
  //       setUserInfo(response);
  //     } catch (error) {
  //       console.error('获取验证码失败:', error);
  //     }
  //   };

  //   fetchUserinfo()
  // },[])

  return (
    <div className="changeinfo-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-shezhi`}></i>
          个人设置
        </h2>
      </div>
      <div className="changeinfo-box">
        <div className="changeinfo-photochange-box">
          <div className="photo-box">
            <img
              src="http://mobile.xupt.edu.cn/res/15342187758400435.gif"
              alt=""
            />
          </div>
          <div className="change-photo-btn">
            <button
              key="profile-photo"
              onClick={() => handlePhotoClick('profile-photo')}
              className={photoItem === 'profile-photo' ? 'active' : ''}
            >
              小头像
            </button>
            <button
              key="mien-photo"
              onClick={() => handlePhotoClick('mien-photo')}
              className={photoItem === 'mien-photo' ? 'active' : ''}
            >
              风采照
            </button>
          </div>
          {/* <div className="mien-photo-box">
            <img
              src="http://mobile.xupt.edu.cn/res/15342187758400435.gif"
              alt=""
            />
          </div> */}
        </div>
        <div className="changeinfo-basicchange-box">
          <div className="changeinfo-item">
            <label>姓 名</label>
            <input type="text" placeholder={peo.name} />
          </div>
          <div className="changeinfo-item">
            <label>专 业</label>
            <input type="text" placeholder={peo.classGrade} />
          </div>
          <div className="changeinfo-item">
            <label>组 别</label>
            {/* <select name="" id="">
              <option value="">Web</option>
              <option value="">Android</option>
              <option value="">Server</option>
              <option value="">iOS</option>
              <option value="">HarmonyOS</option>
              <option value="">PM</option>
              <option value="">Windows</option>
            </select> */}
            <input type="text" placeholder={peo.group} />
          </div>
          <div className="changeinfo-item">
            <label>公 司</label>
            <input type="text" placeholder={peo.company} />
          </div>
          <div className="changeinfo-item">
            <label>电 话</label>
            <input type="text" placeholder={peo.tel} />
          </div>
          <div className="changeinfo-item">
            <label>签 名</label>
            <input type="text" placeholder={peo.signature} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changeinfo;
