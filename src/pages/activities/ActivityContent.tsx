import { getActivityContent } from '@/services/activities';
import './ActivityContent.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '@/types/article';
import Footertop from '@/components/Footertop';

const ActivityContent: React.FC = () => {
  const [activity, setActivity] = useState<Article>();
  const { aid } = useParams<{ aid: string }>();
  const aidNum = Number(aid);

  const fetchAtivityContent = async (aidNum: number) => {
    try {
      const response = await getActivityContent(aidNum);
      setActivity(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAtivityContent(aidNum);
  }, [aidNum]);

  return (
    <div className="id-activity-container">
      <div className="id-activity-page">
        {activity && (
          <>
            <div
              className="id-activity-title"
              style={{
                // backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(//mobile.xupt.edu.cn/${activity.img})`,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${activity.img})`,
              }}
            >
              <p>{activity.title}</p>
            </div>
            <div
              className="id-activity-content"
              dangerouslySetInnerHTML={{ __html: activity.content }}
            ></div>
          </>
        )}
      </div>
      <Footertop></Footertop>
    </div>
  );
};

export default ActivityContent;
