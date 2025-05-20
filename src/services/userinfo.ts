import { get, post } from '@/utils/request/http';
import { Userinfo, Userchangeinfo, Response } from '@/types/userinfo';

// 获取个人信息
export const getUseinfo = async (): Promise<Userinfo> => {
  const response = await get<Userinfo>('api/userinfo', { customAuth: true });
  return response;
};

// 上传修改信息
export const postChangeInfo = async (
  data: Userchangeinfo
): Promise<Response> => {
  const response = await post<Response>('api/changeinfo', data, {
    customAuth: true,
  });
  return response;
};
