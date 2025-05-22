import React, { useState, useEffect } from 'react';
import Tabs from '../../components/Tabs';
import People from '../../components/People';
import { getYears } from '@/services/years';
import { getMembers } from '@/services/members';
import { Members } from '@/types/members';

const Graduate = () => {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  // 获取years
  useEffect(() => {
    const fetchDirection = async () => {
      try {
        const response = await getYears();
        // console.log(response);
        if (Array.isArray(response) && response.length > 0) {
          setYears(response);
          setSelectedYear(response[0]);
        }
      } catch (error) {
        console.log('获取年份失败', error);
      }
    };
    fetchDirection();
  }, []);
  // Tabs懒加载
  const [membersMap, setMembersMap] = useState<Record<string, Members[]>>({});
  useEffect(() => {
    // 未选中的Tab或者已经缓存的就不请求
    if (!selectedYear || membersMap[selectedYear]) return;
    const fetchData = async () => {
      try {
        const response = await getMembers(true, undefined, selectedYear);
        // console.log(response);
        const data = response.data;
        // console.log(data);

        setMembersMap((prev) => ({ ...prev, [selectedYear]: data }));
      } catch (error) {
        console.error('获取成员失败', error);
      } finally {
        // setLoadingMap((prev) => ({ ...prev, [selectedYear]: false }));
      }
    };

    fetchData();
  }, [selectedYear, membersMap]);

  return (
    <div>
      {years.length > 0 && <Tabs tabs={years} onTabChange={setSelectedYear} />}
      {/* 传入props:graduateImg */}
      <People members={membersMap[selectedYear] || []} imgKey="graduateImg" />
    </div>
  );
};

export default Graduate;
