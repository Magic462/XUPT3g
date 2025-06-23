import React, { useState, useEffect } from 'react';
import Memlist from '@/components/Memlist';
import './Groupmember.scss';
import { Members } from '@/types/members';
import { getUserinfo } from '@/services/userinfo';
import { getMembers } from '@/services/members';

const Groupmember: React.FC = () => {
  const [team, setTeam] = useState<string | null>(null);
  const [dataList, setDataList] = useState<Members[]>([]);
  const fetchGroup = async () => {
    // const response = await getGroupMembers(userInfo.team);
    // setDataList(response.data.dataList);
    const response = await getUserinfo(localStorage.getItem('username'));
    console.log(response);
    setTeam(response.team);
  };

  const fetchMembers = async (direction: string) => {
    const response = await getMembers(false, direction);
    // setDataList(response.data.dataList)
    console.log(response);
    setDataList(response.data);
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  useEffect(() => {
    if (team) {
      fetchMembers(team);
    }
  }, [team]);

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
