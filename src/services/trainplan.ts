import { get, post } from '@/utils/request/http';

export const getTrainPlan = async (): Promise<string> => {
  const res = await get<string>('/api/trainpla');
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
