import React from 'react';
import { useState, useEffect } from 'react';
import Tabs from '../../components/Tabs';
import { getDirection } from '@/services/directions';

const fakeData = ['Web', 'Server', 'Android', 'iOS', 'HarmonyOS'];
const Video = () => {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<string>('');

  // 获取方向简介
  useEffect(() => {
    const fetchDirection = async () => {
      try {
        const response = await getDirection(true);
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

  // 调用获取视频接口

  return (
    <div>
      {platforms.length > 0 && (
        <Tabs tabs={platforms} onTabChange={setSelectedDirection} />
      )}
      {/* 传入视频 */}
    </div>
  );
};

export default Video;
