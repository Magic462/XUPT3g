import React, { useState, useEffect } from 'react';
import Peohome from '@/components/Peohome';
import './Myinfo.scss';
import { getUserinfo } from '@/services/userinfo';
import { Userinfo } from '@/types/userinfo';

const Myinfo: React.FC = () => {
  const [dataList, setDataList] = useState<Userinfo | null>(null);
  // const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    const fetchUserinfo = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await getUserinfo(username);
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
