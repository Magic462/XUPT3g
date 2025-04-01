import React, { useState, useEffect } from 'react';
import Memlist from '@/components/Memlist';
import './Allmember.scss';

interface DataItem {
  username: string;
  name: string;
  team: string;
  graduateImg: string;
  signature: string;
  company: string;
}

interface ResponseData {
  status: number;
  data: {
    dataList: DataItem[];
  };
}

const Allmember: React.FC = () => {
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    // 模拟从后端获取数据，实际应用中需要使用axios等库进行真实请求
    const mockData: ResponseData = {
      status: 0,
      data: {
        dataList: [
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
        ],
      },
    };
    setDataList(mockData.data.dataList);
    setStatus(mockData.status);
  }, []);

  return (
    <div className="allmember-container">
      <div className="each-func-title">
        <h2 className="allmember-title">成员列表</h2>
      </div>
      <div className="filter-buttons">
        <button className="filter-button">Web</button>
        <button className="filter-button">Android</button>
        <button className="filter-button">Server</button>
        <button className="filter-button">iOS</button>
        <button className="filter-button">HarmonyOS</button>
        <button className="filter-button">已毕业</button>
        <button className="filter-button">未毕业</button>
      </div>
      {dataList.map((item, index) => (
        <Memlist
          key={index}
          username={item.username}
          name={item.name}
          team={item.team}
          graduateImg={item.graduateImg}
          signature={item.signature}
          status={status}
        />
      ))}
    </div>
  );
};

export default Allmember;
