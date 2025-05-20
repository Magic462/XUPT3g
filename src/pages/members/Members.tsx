import React from 'react';
import { useState, useEffect } from 'react';
import People from '../../components/People';
import Tabs from '../../components/Tabs';
import { getMembers } from '@/services/members';
import { Members } from '@/types/members';
import { getDirection } from '@/services/directions';

const fakeData = ['Web', 'Server', 'Android', 'iOS', 'HarmonyOS'];
const Member = () => {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<string>('');
  const [membersMap, setMembersMap] = useState<Record<string, Members[]>>({});
  // 获取方向简介
  useEffect(() => {
    const fetchDirection = async () => {
      try {
        const response = await getDirection();
        // console.log(response);
        const platforms = [...new Set(response.map((item) => item.name))];
        // console.log(platforms);
        if (Array.isArray(platforms) && platforms.length > 0) {
          setPlatforms(platforms);
          setSelectedDirection(platforms[0]);
        } else {
          console.warn('后端返回数据为空或格式错误，使用假数据');
          setPlatforms(fakeData);
          setSelectedDirection(fakeData[0]);
        }
      } catch (error) {
        console.log('获取方向失败', error);
        setPlatforms(fakeData);
        setSelectedDirection(fakeData[0]);
      }
    };
    fetchDirection();
  }, []);

  // Tab懒加载
  useEffect(() => {
    // 模拟数据获取
    if (!selectedDirection || membersMap[selectedDirection]) return;
    const fetchData = async () => {
      try {
        const response = await getMembers(false, selectedDirection);
        // console.log(data);
        const data = response.data;
        console.log(data);

        setMembersMap((prev) => ({ ...prev, [selectedDirection]: data }));
      } catch (error) {
        console.error('获取成员失败', error);
      } finally {
        // setLoadingMap((prev) => ({ ...prev, [selectedDirection]: false }));
      }
    };
    fetchData();
  }, [selectedDirection, membersMap]);

  return (
    <div>
      {platforms.length > 0 && (
        <Tabs tabs={platforms} onTabChange={setSelectedDirection} />
      )}
      {/* 传入props:mienImg */}
      <People members={membersMap[selectedDirection] || []} imgKey="mienImg" />
    </div>
  );
};

export default Member;
