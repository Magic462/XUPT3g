import { getActivityContent } from '@/services/activities';
import './activityContent.scss';
import React, { useEffect } from 'react';

interface ActivityContentProps {
  aid: number;
}

const ActivityContent: React.FC<ActivityContentProps> = ({ aid }) => {
  useEffect(() => {
    fetchAtivityContent(aid);
  }, [aid]);
  const fetchAtivityContent = async (aid: number) => {
    try {
      const response = await getActivityContent(aid);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="id-activity-box">
      <div className=""></div>
    </div>
  );
};

export default ActivityContent;
