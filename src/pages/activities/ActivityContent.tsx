import { getActivityContent } from '@/services/activities';
import './ActivityContent.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ActivityContent: React.FC = () => {
  //content = '';
  const { aid } = useParams<{ aid: string }>();
  const aidNum = Number(aid);

  useEffect(() => {
    fetchAtivityContent(aidNum);
  }, [aidNum]);
  const fetchAtivityContent = async (aidNum: number) => {
    try {
      const response = await getActivityContent(aidNum);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="id-activity-box">
      <div className="">文章内容</div>
    </div>
  );
};

export default ActivityContent;
