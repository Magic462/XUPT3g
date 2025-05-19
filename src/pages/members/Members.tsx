import React from 'react';
import { useState,useEffect } from 'react';
import People from '../../components/People';
import Photo from '../../assets/face.webp';
// import Photo from '//mobile.xupt.edu.cn/res/14957725307919851.jpg'
import Img from '../../assets/face.webp';
import Tabs from '../../components/Tabs';
import { getMembers } from '@/services/members';
import { Members } from '@/types/members';
import { getDirection } from '@/services/directions';

const fakeData = ['Web','Server','Android','iOS','HarmonyOS'];
const Member = () => {
  // 假数据
  // const members = [
  //   {
  //     id: 1,
  //     name: '张三',
  //     status: 0,
  //     direction: 'Web',
  //     enrollment_year: 2022,
  //     photo: Photo,
  //     company: '字节生活服务',
  //     message: '玩原神玩的。玩原神玩的。玩原神玩的。玩原',
  //   },
  //   {
  //     id: 2,
  //     name: '张三',
  //     status: 0,
  //     direction: 'Web',
  //     enrollment_year: 2020,
  //     photo: Img,
  //     company: '',
  //     message: '玩原神玩的。',
  //   },
  //   {
  //     id: 3,
  //     name: '张三',
  //     status: 0,
  //     direction: 'Web',
  //     enrollment_year: 2020,
  //     photo: Photo,
  //     company: '字节生活服务',
  //     message: '玩原神玩的。',
  //   },
  //   {
  //     id: 4,
  //     name: '张三',
  //     status: 0,
  //     direction: 'Android',
  //     enrollment_year: 2020,
  //     photo: Photo,
  //     company: '字节生活服务',
  //     message: '玩原神玩的。',
  //   },
  //   {
  //     id: 5,
  //     name: '张三',
  //     status: 0,
  //     direction: 'Android',
  //     enrollment_year: 2020,
  //     photo: Photo,
  //     company: '字节生活服务',
  //     message: '玩原神玩的。',
  //   },
  //   {
  //     id: 6,
  //     name: '张三',
  //     status: 0,
  //     direction: 'Server',
  //     enrollment_year: 2020,
  //     photo: Photo,
  //     company: '字节生活服务',
  //     message: '玩原神玩的。',
  //   },
  //   {
  //     id: 7,
  //     name: '李四',
  //     status: 1,
  //     direction: 'iOS',
  //     enrollment_year: 2021,
  //     photo: Photo,
  //     company: '某科技公司',
  //     message: '感谢母校的培养！',
  //   },
  // ];
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [selectedDirection, setSelectedDirection] = useState<string>('');
    // 获取方向简介
    useEffect(() => {
      const fetchDirection = async () => {
        try {
          const response = await getDirection();
          // console.log(response);
          const platforms = [...new Set(response.map(item => item.name))];
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
          console.log('获取qq号失败', error);
          setPlatforms(fakeData);
          setSelectedDirection(fakeData[0]);
        }
      };
      fetchDirection();
    }, []);

  // 根据选中的年份过滤成员
  // const filteredMembers = members.filter(
  //   (member) => member.direction === selectedDirection
  // );

  // 后端返回数据
  const [members, setMembers] = useState<Members[]>([]);
  useEffect(() => {
      // 模拟数据获取
      const fetchData = async () => {
          const response = await getMembers(false); // 替换为你的API地址
          console.log(response.data);
          setMembers(response.data);
          // setMembers(response);
      };

      fetchData();
  }, []);

    const filteredMembers = members.filter(
    (member) => member.team === selectedDirection
  );

  return (
    <div>
      {platforms.length > 0 && (
        <Tabs tabs={platforms} onTabChange={setSelectedDirection} />
      )}
      <People members={filteredMembers} />
    </div>
  );
};

export default Member;
