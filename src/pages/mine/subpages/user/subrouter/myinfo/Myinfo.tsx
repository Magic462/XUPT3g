import React, { useState, useEffect } from 'react';
import Peohome from '@/components/Peohome';
import './Myinfo.scss';
import Por from '../../../../../../assets/wxqr.webp'

interface DataItem {
  portrait: string; // 头像
  gender: string;
  classGrade: string;
  year: number;
  phone: string;
  isGraduate: boolean;
  username: string;
  name: string;
  team: string;
  mienImg: string; // 风采照
  signature: string; // 个性签名
  company: string;
}

interface ResponseData {
  status: number;
  data: DataItem;
}

const Myinfo: React.FC = () => {
  const [dataList, setDataList] = useState<DataItem | null>(null);
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    // 模拟从后端获取数据，实际应用中需要使用axios等库进行真实请求
    const mockData: ResponseData = {
      status: 0,
      data: {
        portrait: Por,
        gender: '男',
        classGrade: '软件1302',
        year: 2013,
        phone: '15229098768',
        isGraduate: true,
        username: 'yangyuan',
        name: '杨远',
        team: 'Web',
        mienImg: '//mobile.xupt.edu.cn/res/14905423740937914.jpg',
        // "graduateImg": "//mobile.xupt.edu.cn/res/14957725307919851.jpg",
        signature: '啊啊啊啊啊啊回来了',
        company: 'shopee',
      },
    };
    setDataList(mockData.data);
    setStatus(mockData.status);
  }, []);

  return (
    <div className="myinfo-container">
      <div className="each-func-title">
        <h2 className="myinfo-title">个人信息</h2>
      </div>
      {dataList && (
        <Peohome
          portrait={dataList.portrait}
          gender={dataList.gender}
          classGrade={dataList.classGrade}
          year={dataList.year}
          phone={dataList.phone}
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
