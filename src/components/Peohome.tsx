import React from 'react';
// import axios from 'axios';
import './Peohome.scss';
import { Userinfo } from '@/types/userinfo';

const Peohome: React.FC<Userinfo> = ({
  portrait,
  gender,
  classGrade,
  year,
  tel,
  isGraduate,
  username,
  name,
  team,
  mienImg,
  signature,
  company,
}) => {
  // const [userInfo, setUserInfo] = useState<UserData | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get<ResponseData>('这里替换为实际后端接口地址');
  //             if (response.status === 0) {
  //                 setUserInfo(response.data.data);
  //             }
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         } finally {
  //             setIsLoading(false);
  //         }
  //     };

  //     fetchData();
  // }, []);

  // if (isLoading) {
  //     return <div>Loading...</div>;
  // }

  // if (!userInfo) {
  //     return <div>Failed to fetch data</div>;
  // }

  return (
    <div className="peo-home-container">
      <div className="header-section">
        <div className="header-photo-box">
          <img src={portrait} alt={name} className="photo" />
        </div>
        <div className="user-info">
          <h2>{name}</h2>
          {isGraduate ? <span>已毕业</span> : <span>未毕业</span>}
        </div>
      </div>
      <div className="basic-info-section">
        <h3>基本信息</h3>
        <div className="basic-info-box">
          <div className="basic-info-section-left">
            <div className="info-item">
              <label>用户昵称</label>
              <span>{username}</span>
            </div>
            <div className="info-item">
              <label>性 别</label>
              <span>{gender === 1 ? '女' : '男'}</span>
            </div>
            <div className="info-item">
              <label>专 业</label>
              <span>{classGrade}</span>
            </div>
            <div className="info-item">
              <label>组 别</label>
              <span>{team}</span>
            </div>
            <div className="info-item">
              <label>就职公司</label>
              <span>{company}</span>
              {/* 这里接口数据未明确公司字段，可按需处理 */}
            </div>
            <div className="info-item">
              <label>电 话</label>
              <span>{tel}</span>
            </div>
            <div className="info-item">
              <label>个性签名</label>
              <span>{signature}</span>
              {/* 接口数据未包含签名字段，可按需处理 */}
            </div>
            <div className="info-item">
              <label>入学年</label>
              <span>{year}</span>
            </div>
          </div>
          <div className="basic-info-section-right">
            <div className="info-item mien-box">
              <label>风采照</label>
              <div className="mien-photo-box">
                {/* <img src='res/17137928617381890.jpg'></img> */}
                <img src={mienImg}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peohome;
