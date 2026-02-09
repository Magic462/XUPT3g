import './Changeinfo.scss';
import '@/assets/icons/font_ejn49oukscw/iconfont.css';
import { useActiveItem } from '@/hooks/useActiveItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Upload from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import { postChangeInfo, getUserinfo } from '@/services/userinfo';
import { getAllDirection } from '@/services/directions';
import { Direction } from '@/types/direction';
import { Userchangeinfo, Userinfo } from '@/types/userinfo';
import { getPictureUrl } from '@/services/picture';
import { useSearchParams } from 'react-router-dom';
import { message } from '@/utils/message';

const Changeinfo = () => {
  const { activeItem: photoItem, handleItemClick: handlePhotoClick } =
    useActiveItem<string>('profile-photo');

  const [userinfo, setUserInfo] = useState<Userinfo>(null);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [formData, setFormData] = useState<Userchangeinfo>();
  const [errors, setErrors] = useState({
    tel: '', // 手机号错误提示
    password: '', // 密码错误提示
  });

  const [searchParams] = useSearchParams();
  // const urlUsername = searchParams.get('username');
  const currentUsername =
    searchParams.get('username') || localStorage.getItem('username');

  useEffect(() => {
    if (!currentUsername) return;
    const fetchUserinfo = async () => {
      try {
        const response = await getUserinfo(currentUsername);
        setUserInfo(response);
      } catch (error) {
        console.error('获取个人信息:', error);
      }
    };
    fetchUserinfo();
  }, [currentUsername]);

  useEffect(() => {
    const fetchDirection = async () => {
      try {
        const response = await getAllDirection();
        setDirections(response);
      } catch (err) {
        console.log('方向信息获取失败', err);
      }
    };

    fetchDirection();
  }, []);

  useEffect(() => {
    if (!userinfo || !currentUsername) return;

    if (userinfo) {
      setFormData({
        username: currentUsername,
        name: userinfo.name || '',
        gender: userinfo.gender ?? 1,
        classGrade: userinfo.classGrade || '',
        team: userinfo.team || '',
        company: userinfo.company || '',
        tel: userinfo.tel || '',
        signature: userinfo.signature || '',
        mienImg: userinfo.mienImg || '',
        portrait: userinfo.portrait || '',
        graduateImg: userinfo.graduateImg || '',
      });
    }
  }, [userinfo, currentUsername]);

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
      console.log('原本修改信息的接口调用传参', changeInfo);
      await postChangeInfo(changeInfo);

      message.success('修改成功');

      const response = await getUserinfo(currentUsername);

      setUserInfo(response);
      setFormData({
        username: currentUsername,
        name: response.name || '',
        gender: response.gender ?? 1,
        classGrade: response.classGrade || '',
        team: response.team || '',
        company: response.company || '',
        tel: response.tel || '',
        signature: response.signature || '',
        mienImg: response.mienImg || '',
        portrait: response.portrait || '',
        graduateImg: response.graduateImg || '',
      });
      setErrors({ tel: '', password: '' });
    } catch (err) {
      console.log('修改失败：', err);
      message.error('修改失败');
    }
  };

  const validateField = (field: string, value: string) => {
    let errorMsg = '';
    if (field === 'tel') {
      if (value && !/^\d{11}$/.test(value)) {
        errorMsg = '请输入11位有效手机号码';
      }
    } else if (field === 'password') {
      if (value && value.length < 6) {
        errorMsg = '密码长度不能少于6位';
      }
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return errorMsg === '';
  };

  const handleSubmit = async () => {
    if (!formData) return;

    const telValid = validateField('tel', formData.tel || '');
    const passwordValid = formData.password
      ? validateField('password', formData.password)
      : true; // 密码未填写则跳过校验

    // 如果校验失败，阻止提交
    if (!telValid || !passwordValid) {
      message.warning('请修正表单中的错误后再提交');
      return;
    }

    const data = { ...formData };

    // 如果 portrait 是 File，先上传图片
    if (data.portrait instanceof File) {
      const uploadRes = await fetchPictureUrl(data.portrait);

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

    // 处理graduate-img上传
    if (data.graduateImg instanceof File) {
      const uploadRes = await fetchPictureUrl(data.graduateImg);
      if (uploadRes?.success && uploadRes?.url) {
        data.graduateImg = uploadRes.url;
      } else {
        alert('毕业照上传失败，请重试');
        return;
      }
    }

    // 过滤表单中未填写字段，只提交已填写的
    const filteredData = Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (key === 'username') {
          acc[key] = value;
          return acc;
        }

        const originalValue = userinfo?.[key];
        if (value === '' || value === undefined || value === null) {
          if (
            originalValue !== '' &&
            originalValue !== undefined &&
            originalValue !== null
          ) {
            acc[key] = '';
          }
        } else {
          acc[key] = value;
        }

        return acc;
      },
      {} as Record<string, unknown>
    );

    await fetchChangeInfo(filteredData);
  };

  //限制图片格式、分辨率、大小
  const checkImageBeforeUpload = (
    file: File
  ): Promise<boolean | typeof Upload.LIST_IGNORE> => {
    const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(
      file.type
    );
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

  const navigate = useNavigate();

  // 返回上一步
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="changeinfo-container">
      {localStorage.getItem('status') === '0' ? (
        <div className="back-allmember" onClick={handleBack}>
          返回上一级
        </div>
      ) : (
        ''
      )}
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-shezhi`}></i>
          个人设置
        </h2>
      </div>
      {userinfo && directions && formData && (
        <div className="changeinfo-box">
          <div className="changeinfo-photochange-box">
            <div className="photo-box" title="点击或拖拽上传图片">
              <ImgCrop rotationSlider aspect={4 / 3}>
                <Upload
                  showUploadList={false}
                  beforeUpload={checkImageBeforeUpload}
                  customRequest={({ file, onSuccess }) => {
                    const fileObj = file as File;
                    setFormData((prev) => {
                      if (photoItem === 'profile-photo') {
                        return { ...prev, portrait: fileObj };
                      } else if (photoItem === 'mien-photo') {
                        return { ...prev, mienImg: fileObj };
                      } else if (photoItem === 'graduate-photo') {
                        return { ...prev, graduateImg: fileObj };
                      }
                      return prev;
                    });
                    onSuccess?.('ok');
                  }}
                >
                  <div className="image-wrapper">
                    <img
                      src={(() => {
                        const img =
                          photoItem === 'profile-photo'
                            ? formData?.portrait
                            : photoItem === 'mien-photo'
                              ? formData?.mienImg
                              : formData?.graduateImg;
                        const originalUrl =
                          photoItem === 'profile-photo'
                            ? userinfo.portrait
                            : photoItem === 'mien-photo'
                              ? userinfo.mienImg
                              : userinfo.graduateImg;

                        return img instanceof File
                          ? URL.createObjectURL(img)
                          : originalUrl;
                      })()}
                      alt="上传照片"
                      className="clickable-img"
                    />
                  </div>
                </Upload>
              </ImgCrop>
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
              {userinfo.isGraduate === 1 ? (
                <button
                  key="graduate-photo"
                  onClick={() => handlePhotoClick('graduate-photo')}
                  className={`${photoItem === 'graduate-photo' ? 'photo-choice-active' : ''}`}
                >
                  毕业照
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="changeinfo-basicchange-box">
            <div className="changeinfo-item">
              <label>姓 名</label>
              <input
                type="text"
                placeholder={'请填写姓名'}
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="changeinfo-item">
              <label>性 别</label>
              <select
                value={formData?.gender ?? 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: Number(e.target.value), // 将字符串转换为数字
                  })
                }
              >
                <option value={0}>男</option>
                <option value={1}>女</option>
              </select>
            </div>

            <div className="changeinfo-item">
              <label>专 业</label>
              <input
                type="text"
                value={formData.classGrade}
                placeholder={'请填写专业全称'}
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
                  value={formData?.team}
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
                placeholder={'已毕业同学可填写入职公司'}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                value={formData.company}
                disabled={userinfo.isGraduate === 0}
                className={userinfo.isGraduate === 1 ? 'gratuate-company' : ''}
              />
            </div>
            <div className="changeinfo-item">
              <label>电 话</label>
              <input
                type="text"
                value={formData.tel}
                placeholder={'请输入11位电话号码'}
                onChange={(e) =>
                  setFormData({ ...formData, tel: e.target.value })
                }
              />
              {errors.tel && <span className="error-tip">{errors.tel}</span>}
            </div>
            <div className="changeinfo-item">
              <label>签 名</label>
              <textarea
                value={formData.signature}
                placeholder={'请输入个性签名'}
                onChange={(e) =>
                  setFormData({ ...formData, signature: e.target.value })
                }
              />
            </div>
            <div className="changeinfo-item">
              <label>修改密码</label>
              <input
                placeholder={'密码至少六位'}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <span className="error-tip">{errors.password}</span>
              )}
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
