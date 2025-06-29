import React, { useEffect, useState } from 'react';
import './Trainplan.scss';
import Footertop from '@/components/Footertop';
import { getTrainPlan } from '@/services/trainplan';

const Trainingplan: React.FC = () => {
  const [Trainplan, setTrainPlan] = useState<string>('');

  useEffect(() => {
    const fetchTrainPlan = async () => {
      try {
        const response = await getTrainPlan();
        // console.log(response.content);
        setTrainPlan(response.content);
      } catch (error) {
        console.log('获取培养计划失败', error);
      }
    };
    fetchTrainPlan();
  }, []);

  return (
    <div className="plan-container">
      <div className="plan-page">
        <div className="plan-title">
          <p>西邮移动应用开发实验室培养计划</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: Trainplan }} />
      </div>
      <Footertop></Footertop>
    </div>
  );
};

export default Trainingplan;
