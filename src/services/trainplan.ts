import { get, post } from '@/utils/request/http';
import { TrainPlanRes } from '@/types/trainplan';

export const getTrainPlan = async (): Promise<TrainPlanRes> => {
  const res = await get<TrainPlanRes>('/api/trainplan');
  return res;
};

// 上传培养方案接口
export const postTrainPlan = async (content: string = '实验室培养方案') => {
  const res = await post(
    '/api/trainplan',
    {
      content,
    },
    {
      customAuth: true,
    }
  );

  console.log('上传实验室培养方案接口：', res);
  return res;
};
