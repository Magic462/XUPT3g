import React, { useState, useEffect } from 'react';
import Memlist from '@/components/Memlist';
import './Groupmember.scss';
import { Members } from '@/types/members';

const Groupmember: React.FC = () => {
  const [dataList, setDataList] = useState<Members[]>([]);

  useEffect(() => {
    // 模拟从后端获取数据，实际应用中需要使用axios等库进行真实请求
    const mockData = {
      status: 1,
      data: {
        dataList: [
          {
            uid: 1,
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            portrait: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
            isGraduate: 0,
            gender: 1,
            year: 2021,
            tel: '12345678901',
            mienImg: '',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            classGrade: '计科2101',
          },
        ],
      },
    };
    setDataList(mockData.data.dataList);
  }, []);

  return (
    <div className="groupmember-container">
      <div className="each-func-title">
        <h2 className="groupmember-title">
          <i className={`each-func-icons iconfont icon-chengyuan`}></i>
          成员列表
        </h2>
      </div>
      <div className="groupmember-items-box">
        {dataList.map((item) => (
          <Memlist
            key={item.uid}
            member={item}
            onHandlerDelete={() => {}}
            onHandleDelAid={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Groupmember;
