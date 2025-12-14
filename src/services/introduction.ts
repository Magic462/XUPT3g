import { get, put } from '@/utils/request/http';
import { IntroductionRes } from '@/types/introduction';

export const getIntroduction = async (): Promise<IntroductionRes> => {
  const res = await get<IntroductionRes>('/api/introduction');
  // console.log(res);

  return res;
};

// 上传实验室简介接口
export const postIntroduction = async (content: string = '实验室简介') => {
  const res = await put('/api/introduction', { content }, { customAuth: true });

  // console.log('上传实验室培养方案接口：', res);
  return res;
};
