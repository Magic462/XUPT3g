import { get, put } from '@/utils/request/http';
import { TrainPlanRes } from '@/types/trainplan';

export const getTrainPlan = async (): Promise<TrainPlanRes> => {
  const res = await get<TrainPlanRes>('/xupt-web/api/trainplan');
  // console.log(res);

  return res;
};

// 上传培养方案接口
export const postTrainPlan = async (content: string = '实验室培养方案') => {
  const res = await put(
    '/xupt-web/api/trainplan',
    { content },
    { customAuth: true }
  );

  // console.log('上传实验室培养方案接口：', res);
  return res;
};
