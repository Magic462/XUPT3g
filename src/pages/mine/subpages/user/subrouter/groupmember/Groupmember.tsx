import React, { useState, useEffect } from 'react';
import Memlist from '@/pages/mine/subpages/administrator/subrouter/allmember/components/Memlist';
import './Groupmember.scss';

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

const Groupmember: React.FC = () => {
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    // 模拟从后端获取数据，实际应用中需要使用axios等库进行真实请求
    const mockData: ResponseData = {
      status: 1,
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
    <div className="groupmember-container">
      <div className="each-func-title">
        <h2 className="groupmember-title">
          <i className={`each-func-icons iconfont icon-chengyuan`}></i>
          成员列表
        </h2>
      </div>
      <div className="groupmember-items-box">
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
    </div>
  );
};

export default Groupmember;
