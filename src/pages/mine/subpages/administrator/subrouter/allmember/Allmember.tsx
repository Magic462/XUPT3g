import React, { useState, useEffect } from 'react';
// import { lazy, Suspense,useRef } from 'react';
import Memlist from '@/pages/mine/subpages/administrator/subrouter/allmember/components/Memlist';
// const Memlist = lazy(() => import('@/components/Memlist'));
import './Allmember.scss';
import { useActiveItem } from '@/hooks/useActiveItem';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

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
const GroupsData = [
  { name: 'Web' },
  { name: 'Android' },
  { name: 'Server' },
  { name: 'iOS' },
  { name: 'HarmonyOS' },
  { name: 'other' },
];

const Allmember: React.FC = () => {
  // const [visibleIndexes, setVisibleIndexes] = useState([]);
  // const observerRef = useRef();

  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [status, setStatus] = useState<number>(0);
  const { activeItem: activeGroup, handleItemClick: handleGroupClick } =
    useActiveItem<string>(GroupsData[0].name);

  const { activeItem: activeGraduate, handleItemClick: handleGraduateClick } =
    useActiveItem<string>('graduated');

  const [isDeleteModal, setIsDeleteModal] = useState(false);

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
    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       setVisibleIndexes((prev) => [...prev, entry.target.dataset.index]);
    //       observer.unobserve(entry.target); // 停止观察
    //     }
    //   });
    // });

    // const targets = document.querySelectorAll('.lazy-load');
    // targets.forEach((target) => observer.observe(target));

    // return () => {
    //   targets.forEach((target) => observer.unobserve(target));
    // };
  }, []);

  return (
    <div className="allmember-container">
      <div className="each-func-title">
        <h2 className="allmember-title">
          <i className={`each-func-icons iconfont icon-chengyuan`}></i>
          成员列表
        </h2>
      </div>
      <div className="filter-buttons">
        <div className="filter-teams">
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
      <div className="allmember-item-box">
        {dataList.map((item, index) => (
          <Memlist
            key={index}
            username={item.username}
            name={item.name}
            team={item.team}
            graduateImg={item.graduateImg}
            signature={item.signature}
            status={status}
            // 控制删除弹窗
            onHandlerDelete={setIsDeleteModal}
          />
        ))}
      </div>
      {isDeleteModal && (
        <DeleteConfirmModal
          remindMessage="确认删除该成员吗"
          onHandlerDelete={setIsDeleteModal}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default Allmember;
