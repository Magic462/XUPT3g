import React, { useState, useEffect } from 'react';
import Peohome from '@/components/Peohome';
import './Myinfo.scss';
// import Por from '../../../../../../assets/wxqr.webp'
import { getUseinfo } from '@/services/userinfo';

interface DataItem {
  portrait: string; // 头像
  gender: string;
  classGrade: string;
  year: number;
  tel: string;
  isGraduate: boolean;
  username: string;
  name: string;
  team: string;
  mienImg: string; // 风采照
  signature: string; // 个性签名
  company: string;
}

// interface ResponseData {
//   status: number;
//   data: DataItem;
// }

const Myinfo: React.FC = () => {
  const [dataList, setDataList] = useState<DataItem | null>(null);
  // const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    const fetchUserinfo = async () => {
      try {
        const response = await getUseinfo();
        console.log(response);
        setDataList(response);
      } catch (error) {
        console.error('获取个人信息:', error);
      }
    };

    fetchUserinfo();
  }, []);

  return (
    <div className="myinfo-container">
      <div className="each-func-title">
        <h2 className="myinfo-title">
          <i className={`each-func-icons iconfont icon-shezhi`}></i>
          个人信息
        </h2>
      </div>
      {dataList && (
        <Peohome
          portrait={dataList.portrait}
          gender={dataList.gender}
          classGrade={dataList.classGrade}
          year={dataList.year}
          tel={dataList.tel}
          isGraduate={dataList.isGraduate}
          username={dataList.username}
          name={dataList.name}
          team={dataList.team}
          mienImg={dataList.mienImg}
          signature={dataList.signature}
          company={dataList.company}
        />
      )}
    </div>
  );
};

export default Myinfo;
