import './Changeinfo.scss';
import '@/assets/icons/font_ejn49oukscw/iconfont.css';
import { useActiveItem } from '@/hooks/useActiveItem';
import { useEffect, useState } from 'react';
import Upload from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import { postChangeInfo, getUserinfo } from '@/services/userinfo';
import { getAllDirection } from '@/services/directions';
import { Direction } from '@/types/direction';
import { Userchangeinfo, Userinfo } from '@/types/userinfo';
import { getPictureUrl } from '@/services/picture';
const { Dragger } = Upload;

const Changeinfo = () => {
  const { activeItem: photoItem, handleItemClick: handlePhotoClick } =
    useActiveItem<string>('profile-photo');

  const [userinfo, setUserInfo] = useState<Userinfo>(null);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [formData, setFormData] = useState<Userchangeinfo>();

  useEffect(() => {
    const fetchUserinfo = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await getUserinfo(username);
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

  // 调用上传图片接口函数
  const fetchPictureUrl = async (picture) => {
    try {
      const response = await getPictureUrl(picture);
      return response;
    } catch (err) {
      console.log('上传图片失败', err);
    }
  };

  // 调用修改个人信息接口函数
  const fetchChangeInfo = async (changeInfo) => {
    try {
      const response = await postChangeInfo(changeInfo);
      console.log(response);
    } catch (err) {
      console.log('修改失败：', err);
    }
  };

  const handleSubmit = async () => {
    const data = { ...formData }; // 拷贝一份防止污染

    // 如果 portrait 是 File，先上传图片
    if (data.portrait instanceof File) {
      const uploadRes = await fetchPictureUrl(data.portrait);
      console.log(uploadRes);

      if (uploadRes?.success && uploadRes?.url) {
        data.portrait = uploadRes.url;
      } else {
        alert('头像上传失败，请重试');
        return;
      }
    }

    // 2. 处理 mienImg 上传
    if (data.mienImg instanceof File) {
      const uploadRes = await fetchPictureUrl(data.mienImg);
      if (uploadRes?.success && uploadRes?.url) {
        data.mienImg = uploadRes.url;
      } else {
        alert('风采照上传失败，请重试');
        return;
      }
    }

    await fetchChangeInfo(data);
  };

  //限制图片格式、分辨率、大小
const checkImageBeforeUpload = (file: File): Promise<boolean | typeof Upload.LIST_IGNORE> => {
  const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
  if (!isValidType) {
    alert('只允许上传 JPG/PNG/WEBP 格式的图片');
    return Promise.resolve(Upload.LIST_IGNORE);
  }

  const isLt2M = file.size <= 2 * 1024 * 1024;
  if (!isLt2M) {
    alert('图片不能超过 2MB');
    return Promise.resolve(Upload.LIST_IGNORE);
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        const { width, height } = image;
        if (width < 300 || height < 300) {
          alert('图片分辨率不能低于 300×300');
          resolve(Upload.LIST_IGNORE);
        } else {
          resolve(true);
        }
      };
      image.onerror = () => {
        alert('图片读取失败');
        resolve(Upload.LIST_IGNORE);
      };
      image.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
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
                  <Dragger
                    showUploadList={false}
                    accept="image/jpeg,image/png,image/webp"
                    // beforeUpload={(file) => {
                    //   const isValidType = [
                    //     'image/jpeg',
                    //     'image/png',
                    //     'image/webp',
                    //   ].includes(file.type);
                    //   if (!isValidType) {
                    //     alert('只允许上传 JPG/PNG/WEBP 格式的图片');
                    //     return Upload.LIST_IGNORE;
                    //   }
                    //   const isLt2M = file.size <= 2 * 1024 * 1024;
                    //   if (!isLt2M) {
                    //     alert('图片不能超过 2MB');
                    //     return Upload.LIST_IGNORE;
                    //   }
                    //   return true;
                    // }}
                    beforeUpload={checkImageBeforeUpload}
                    customRequest={({ file, onSuccess }) => {
                      const fileObj = file as File;
                      // 只更新 formData，保留 File 对象
                      setFormData((prev) => ({
                        ...prev,
                        portrait: fileObj,
                      }));
                      onSuccess?.('ok');
                    }}
                  >
                    <div className="image-wrapper">
                      <img
                        src={
                          formData?.portrait instanceof File
                            ? URL.createObjectURL(formData.portrait)
                            : userinfo.portrait
                        }
                        alt="头像"
                        className="clickable-img"
                      />
                    </div>
                  </Dragger>
                </ImgCrop>
              ) : (
                // 风采照上传部分
                <ImgCrop rotationSlider aspect={4 / 3}>
                  <Upload
                    showUploadList={false}
                    // beforeUpload={(file) => {
                    //   const isValidType = [
                    //     'image/jpeg',
                    //     'image/png',
                    //     'image/webp',
                    //   ].includes(file.type);
                    //   if (!isValidType) {
                    //     alert('只允许上传 JPG/PNG/WEBP 格式的图片');
                    //     return Upload.LIST_IGNORE;
                    //   }
                    //   const isLt2M = file.size <= 2 * 1024 * 1024;
                    //   if (!isLt2M) {
                    //     alert('图片不能超过 2MB');
                    //     return Upload.LIST_IGNORE;
                    //   }
                    //   return true;
                    // }}
                    beforeUpload={checkImageBeforeUpload}
                    customRequest={({ file, onSuccess }) => {
                      const fileObj = file as File;
                      // 只更新 formData，保留 File 对象
                      setFormData((prev) => ({
                        ...prev,
                        mienImg: fileObj,
                      }));
                      onSuccess?.('ok');
                    }}
                  >
                    <div className="image-wrapper">
                      <img
                        src={
                          formData?.mienImg instanceof File
                            ? URL.createObjectURL(formData.mienImg)
                            : userinfo.mienImg
                        }
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
                handleSubmit();
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
