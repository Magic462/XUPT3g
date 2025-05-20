import { useActiveItem } from '@/hooks/useActiveItem';
import './Changeinfo.scss';
import '@/assets/icons/font_ejn49oukscw/iconfont.css';
import { postChangeInfo, getUseinfo } from '@/services/userinfo';
import { useEffect, useState } from 'react';
import Upload from 'antd/es/upload'; // 只引入 Upload
import ImgCrop from 'antd-img-crop';
import { getAllDirection } from '@/services/directions';
import { Direction } from '@/types/direction';

const Changeinfo = () => {
  const { activeItem: photoItem, handleItemClick: handlePhotoClick } =
    useActiveItem<string>('profile-photo');

  const [userinfo, setUserInfo] = useState(null);
  const [directions, setDirections] = useState<Direction[]>([]);

  useEffect(() => {
    const fetchUserinfo = async () => {
      try {
        const response = await getUseinfo();
        setUserInfo(response);
      } catch (error) {
        console.error('获取个人信息:', error);
      }
    };

    fetchUserinfo();
  }, []);

  useEffect(() => {
    const fetchDirection = async () => {
      try {
        const response = await getAllDirection();
        console.log(response);
        setDirections(response);
      } catch (err) {
        console.log('方向信息获取失败', err);
      }
    };

    fetchDirection();
  }, []);

  const fetchChangeinfo = async (changeInfo) => {
    try {
      const response = await postChangeInfo(changeInfo);
      console.log(response);
    } catch (err) {
      console.log('修改失败：', err);
    }
  };

  return (
    <div className="changeinfo-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-shezhi`}></i>
          个人设置
        </h2>
      </div>
      {userinfo && directions && (
        <div className="changeinfo-box">
          <div className="changeinfo-photochange-box">
            <div className="photo-box">
              {photoItem === 'profile-photo' ? (
                <ImgCrop rotationSlider>
                  <Upload
                    showUploadList={false}
                    customRequest={({ file, onSuccess }) => {
                      const url = URL.createObjectURL(file as File);
                      setUserInfo((prev) =>
                        prev ? { ...prev, portrait: url } : prev
                      );
                      onSuccess?.('ok');
                    }}
                  >
                    <div className="image-wrapper">
                      <img
                        src={userinfo.portrait}
                        alt="头像"
                        className="clickable-img"
                      />
                    </div>
                  </Upload>
                </ImgCrop>
              ) : (
                <ImgCrop rotationSlider aspect={4 / 3}>
                  <Upload
                    showUploadList={false}
                    customRequest={({ file, onSuccess }) => {
                      const url = URL.createObjectURL(file as File);
                      setUserInfo((prev) =>
                        prev ? { ...prev, mienImg: url } : prev
                      );
                      onSuccess?.('ok');
                    }}
                  >
                    <div className="image-wrapper">
                      <img
                        src={userinfo.mienImg}
                        alt="风采照"
                        className="clickable-img"
                      />
                    </div>
                  </Upload>
                </ImgCrop>
              )}
            </div>

            <div className="change-photo-btn">
              <button
                key="profile-photo"
                onClick={() => handlePhotoClick('profile-photo')}
                className={`${photoItem === 'profile-photo' ? 'photo-choice-active' : ''}`}
              >
                小头像
              </button>
              <button
                key="mien-photo"
                onClick={() => handlePhotoClick('mien-photo')}
                className={`${photoItem === 'mien-photo' ? 'photo-choice-active' : ''}`}
              >
                风采照
              </button>
            </div>
          </div>

          <div className="changeinfo-basicchange-box">
            <div className="changeinfo-item">
              <label>姓 名</label>
              <input type="text" placeholder={userinfo.name} />
            </div>
            <div className="changeinfo-item">
              <label>姓 别</label>
              <input
                type="text"
                placeholder={userinfo.gender === 1 ? '女' : '男'}
              />
            </div>
            <div className="changeinfo-item">
              <label>专 业</label>
              <input type="text" placeholder={userinfo.classGrade} />
            </div>
            <div className="changeinfo-item">
              <label>组 别</label>
              <select name="" id="">
                {/* { directions&& directions.map(item)=>{console.log(item)} } */}
                {/* {directions &&
                  directions.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))} */}
                {/* <option value=""></option> */}
                {/* <option value="">Web</option>
                <option value="">Android</option>
                <option value="">Server</option>
                <option value="">iOS</option>
                <option value="">HarmonyOS</option>
                <option value="">PM</option>
                <option value="">Windows</option> */}
              </select>
              {/* <input type="text" placeholder={userinfo.group} /> */}
            </div>

            <div className="changeinfo-item">
              <label>公 司</label>
              <input type="text" placeholder={userinfo.company} />
            </div>
            <div className="changeinfo-item">
              <label>电 话</label>
              <input type="text" placeholder={userinfo.tel} />
            </div>
            <div className="changeinfo-item">
              <label>签 名</label>
              <input type="text" placeholder={userinfo.signature} />
            </div>
          </div>
          <div className="changeinfo-post-btnbox">
            <button
              onClick={() => {
                fetchChangeinfo({
                  username: 'dengaiqi',
                  gender: '0',
                  name: '等等等',
                });
              }}
            >
              保存修改
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Changeinfo;
