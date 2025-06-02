import { get, post } from '@/utils/request/http';
import { Userinfo, Userchangeinfo, ChangeUserResponse } from '@/types/userinfo';

// 获取个人信息
export const getUserinfo = async (username:string = 'admin'): Promise<Userinfo> => {
  const response = await get<Userinfo>('api/userinfo', { 
    params:{
      username
    },
    customAuth: true });
  return response;
};

// 上传修改信息
export const postChangeInfo = async (
  data: Userchangeinfo
): Promise<ChangeUserResponse> => {
  const response = await post<ChangeUserResponse>('api/changeinfo', data, {
    customAuth: true,
  });
  return response;
};
