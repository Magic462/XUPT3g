import React from 'react';
import { useState,useEffect } from 'react';
import People from '../../components/People';
import Photo from '../../assets/trainplan.png';
import Img from '../../assets/layout.png'
import Tabs from '../../components/Tabs';
const Member = () => {
    // 假数据
    const members = [
      {
          id: 1,
          name: "张三",
          status: 0,
          direction: "web",
          enrollment_year: 2022,
          photo: Photo,
          company: "字节生活服务",
          message: "玩原神玩的。玩原神玩的。玩原神玩的。玩原"
      },
      {
          id: 2,
          name: "张三",
          status: 0,
          direction: "web",
          enrollment_year: 2020,
          photo: Img,
          company: "",
          message: "玩原神玩的。"
      },
      {
          id: 3,
          name: "张三",
          status: 0,
          direction: "web",
          enrollment_year: 2020,
          photo: Photo,
          company: "字节生活服务",
          message: "玩原神玩的。"
      },
      {
          id: 4,
          name: "张三",
          status: 0,
          direction: "web",
          enrollment_year: 2020,
          photo: Photo,
          company: "字节生活服务",
          message: "玩原神玩的。"
      },
      {
          id: 5,
          name: "张三",
          status: 0,
          direction: "web",
          enrollment_year: 2020,
          photo: Photo,
          company: "字节生活服务",
          message: "玩原神玩的。"
      },
      {
          id: 6,
          name: "张三",
          status: 0,
          direction: "web",
          enrollment_year: 2020,
          photo: Photo,
          company: "字节生活服务",
          message: "玩原神玩的。"
      },
      {
          id: 7,
          name: "李四",
          status: 1,
          direction: "ios",
          enrollment_year: 2021,
          photo: Photo,
          company: "某科技公司",
          message: "感谢母校的培养！"
      }
    ];
    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
    const [selectedYear, setSelectedYear] = useState(years[0]);
    // 根据选中的年份过滤成员
    const filteredMembers = members.filter(member => member.enrollment_year.toString() === selectedYear);

    // 后端返回数据
    // const [members, setMembers] = useState([]);

    // useEffect(() => {
    //     // 模拟数据获取
    //     const fetchData = async () => {
    //         const response = await fetch('https://api.example.com/members'); // 替换为你的API地址
    //         const data = await response.json();
    //         setMembers(data.members);
    //     };

    //     fetchData();
    // }, []);

    return (
      <div>
          <Tabs years={years} onYearChange={setSelectedYear}/>
          <People members={filteredMembers} />
      </div>
    );
};

export default Member;
