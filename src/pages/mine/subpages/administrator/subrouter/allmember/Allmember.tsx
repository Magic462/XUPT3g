import React, { useState, useEffect } from 'react';
import Memlist from '@/components/Memlist';
import './Allmember.scss';
import { useActiveItem } from '@/hooks/useActiveItem';

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
  const { activeItem: activeGroup, handleItemClick: handleGroupClick } =
    useActiveItem<string>();

  const { activeItem: activeGraduate, handleItemClick: handleGraduateClick } =
    useActiveItem<string>();
  const GroupsData = [
    { name: 'web' },
    { name: 'Android' },
    { name: 'Server' },
    { name: 'iOS' },
    { name: 'HarmonyOS' },
  ];
  // 这个之后要根据数据中现有的组去录入吧
  //   const CLICK_ITEMS = {
  //     WEB: 'web',
  //     ANDROID: 'android',
  //     SERVER: 'server',
  //     IOS: 'ios',
  //     HARMONYOS: 'harmonyos',
  //     };
  // 多数地方用到了这个封装成hook?
  //   const [teamClick, setTeamClick] = useState<keyof typeof CLICK_ITEMS | null>(
  //     null
  //   );

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
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
          {
            username: 'yangyuan',
            name: '杨远',
            team: 'Web',
            graduateImg: '//mobile.xupt.edu.cn/res/14957725307919851.jpg',
            signature: '啊啊啊啊啊啊回来了',
            company: 'shopee',
          },
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
        <div className="filter-groups">
          {GroupsData.map((item) => (
            <button
              key={item.name}
              onClick={() => handleGroupClick(item.name)}
              className={`filter-button filter-btn-group ${activeGroup === item.name ? 'active' : ''}`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="filter-ifgraduate">
          <button
            onClick={() => handleGraduateClick('graduated')}
            className={`filter-button ${activeGraduate === 'graduated' ? 'active' : ''}`}
          >
            已毕业
          </button>
          <button
            onClick={() => handleGraduateClick('not-graduate')}
            className={`filter-button ${activeGraduate === 'not-graduate' ? 'active' : ''}`}
          >
            未毕业
          </button>
        </div>
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
