import './Changeinfo.scss';
import '@/assets/icons/font_ejn49oukscw/iconfont.css';
import { useActiveItem } from '@/hooks/useActiveItem';
import { useEffect, useState } from 'react';
import Upload from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import { postChangeInfo, getUseinfo } from '@/services/userinfo';
import { getAllDirection } from '@/services/directions';
import { Direction } from '@/types/direction';
import { Userchangeinfo, Userinfo } from '@/types/userinfo';

const Changeinfo = () => {
  const { activeItem: photoItem, handleItemClick: handlePhotoClick } =
    useActiveItem<string>('profile-photo');

  const [userinfo, setUserInfo] = useState<Userinfo>(null);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [formData, setFormData] = useState<Userchangeinfo>();

  useEffect(() => {
    const fetchUserinfo = async () => {
      try {
        const response = await getUseinfo();
        console.log(response);
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

  useEffect(() => {
    if (userinfo) {
      setFormData({
        username: localStorage.getItem('username'),
        name: userinfo.name || '',
        gender: userinfo.gender || 1,
        classGrade: userinfo.classGrade || '',
        team: userinfo.team || '',
        company: userinfo.company || '',
        tel: userinfo.tel || '',
        signature: userinfo.signature || '',
        mienImg: userinfo.mienImg || '',
        portrait: userinfo.portrait || '',
      });
    }
  }, [userinfo]);

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
                    beforeUpload={(file) => {
                      const isJpg = file.type === 'image/jpeg';
                      if (!isJpg) {
                        alert('只允许上传 JPG 格式的图片');
                      }
                      return isJpg || Upload.LIST_IGNORE;
                    }}
                    customRequest={({ file, onSuccess }) => {
                      const url = URL.createObjectURL(file as File);
                      setUserInfo((prev) =>
                        prev ? { ...prev, portrait: url } : prev
                      );
                      setFormData({ ...formData, portrait: url });
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
                    beforeUpload={(file) => {
                      const isJpg = file.type === 'image/jpeg';
                      if (!isJpg) {
                        alert('只允许上传 JPG 格式的图片');
                      }
                      return isJpg || Upload.LIST_IGNORE;
                    }}
                    customRequest={({ file, onSuccess }) => {
                      const url = URL.createObjectURL(file as File);
                      setUserInfo((prev) =>
                        prev ? { ...prev, mienImg: url } : prev
                      );
                      setFormData({ ...formData, mienImg: url });
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
              <input
                type="text"
                placeholder={userinfo.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="changeinfo-item">
              <label>姓 别</label>
              <input
                type="text"
                placeholder={userinfo.gender === 1 ? '女' : '男'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value === '女' ? 1 : 0,
                  })
                }
              />
            </div>
            <div className="changeinfo-item">
              <label>专 业</label>
              <input
                type="text"
                placeholder={userinfo.classGrade}
                onChange={(e) =>
                  setFormData({ ...formData, classGrade: e.target.value })
                }
              />
            </div>
            {directions && (
              <div className="changeinfo-item">
                <label>组 别</label>
                <select
                  name="组别"
                  id=""
                  value={formData?.team || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, team: e.target.value });
                  }}
                >
                  {directions.map((item: Direction) => (
                    <option value={item.name} key={item.tid}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="changeinfo-item">
              <label>公 司</label>
              <input
                type="text"
                placeholder={userinfo.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                disabled={localStorage.getItem('status') === '1'}
                className={
                  localStorage.getItem('status') === '1'
                    ? 'gratuate-company'
                    : ''
                }
              />
            </div>
            <div className="changeinfo-item">
              <label>电 话</label>
              <input
                type="text"
                placeholder={userinfo.tel}
                onChange={(e) =>
                  setFormData({ ...formData, tel: e.target.value })
                }
              />
            </div>
            <div className="changeinfo-item">
              <label>签 名</label>
              <textarea
                placeholder={userinfo.signature}
                onChange={(e) =>
                  setFormData({ ...formData, signature: e.target.value })
                }
              />
            </div>
          </div>
          <div className="changeinfo-post-btnbox">
            <button
              onClick={() => {
                fetchChangeinfo(formData);
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
