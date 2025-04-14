import React, { useState } from 'react';
import Tabs from '../../components/Tabs';
import People from '../../components/People';
// import Photo from '../../assets/trainplan.png';
// import Img from '../../assets/layout.png';
import Photo from '../../assets/face.webp';
// import Photo from '//mobile.xupt.edu.cn/res/14957725307919851.jpg'
import Img from '../../assets/face.webp';
import Zp1 from '../../assets/wjc.webp'
import Zp2 from '../../assets/szq.webp'
import Zp3 from '../../assets/yke.webp'

const Graduate = () => {
  // 假数据
  const members = [
    {
      id: 1,
      name: '陈柏赫',
      status: 0,
      direction: 'web',
      enrollment_year: 2022,
      photo: Photo,
      company: '字节生活服务',
      message: '玩原神玩的。玩原神玩的。玩原神玩的。玩原',
    },
    {
      id: 2,
      name: '吴建琛',
      status: 0,
      direction: 'web',
      enrollment_year: 2020,
      photo: Img,
      company: '',
      message: '玩原神玩的。',
    },
    {
      id: 3,
      name: '吴建琛',
      status: 0,
      direction: 'web',
      enrollment_year: 2020,
      photo: Zp1,
      company: '字节生活服务',
      message: '玩原神玩的。',
    },
    {
      id: 4,
      name: '尚子琪',
      status: 0,
      direction: 'web',
      enrollment_year: 2020,
      photo: Zp2,
      company: '字节生活服务',
      message: '玩原神玩的。',
    },
    {
      id: 5,
      name: '杨可儿',
      status: 0,
      direction: 'web',
      enrollment_year: 2020,
      photo: Zp3,
      company: '字节生活服务',
      message: '玩原神玩的。',
    },
    {
      id: 6,
      name: '张三',
      status: 0,
      direction: 'web',
      enrollment_year: 2020,
      photo: Photo,
      company: '字节生活服务',
      message: '玩原神玩的。',
    },
    {
      id: 7,
      name: '李四',
      status: 1,
      direction: 'ios',
      enrollment_year: 2021,
      photo: Photo,
      company: '某科技公司',
      message: '感谢母校的培养！',
    },
  ];
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  const [selectedYear, setSelectedYear] = useState(years[0]);
  //   // 根据选中的年份过滤成员
  const filteredMembers = members.filter(
    (member) => member.enrollment_year.toString() === selectedYear
  );

  return (
    <div>
      <Tabs tabs={years} onTabChange={setSelectedYear} />
      <People members={filteredMembers} />
    </div>
  );
};

export default Graduate;
