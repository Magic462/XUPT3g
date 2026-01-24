import { get, post } from '@/utils/request/http';
import { IntroductionRes } from '@/types/introduction';

export const getIntroduction = async (): Promise<IntroductionRes> => {
  const res = await get<IntroductionRes>('/xupt-web/api/introduction');
  // console.log(res);

  return res;
};

// 上传实验室简介接口
export const postIntroduction = async (introduction: string = '实验室简介') => {
  const res = await post('/xupt-web/api/introduction', { introduction }, { customAuth: true });

  // console.log('上传实验室培养方案接口：', res);
  return res;
};