import { get, post } from '@/utils/request/http';
import { Userinfo, Userchangeinfo, ChangeUserResponse } from '@/types/userinfo';

// 获取个人信息
export const getUserinfo = async (username: string): Promise<Userinfo> => {
  const response = await get<Userinfo>('xupt-web/api/userinfo', {
    params: {
      username,
    },
    customAuth: true,
  });
  return response;
};

// 上传修改信息
export const postChangeInfo = async (
  data: Userchangeinfo
): Promise<ChangeUserResponse> => {
  console.log('用户个人信息', data);
  const response = await post<ChangeUserResponse>(
    'xupt-web/api/changeinfo',
    data,
    {
      customAuth: true,
    }
  );
  return response;
};

// 管理员-重置用户密码
export const resetPassWord = async (username: string) => {
  const formData = new FormData();
  formData.append('username', username);

  const response = await post('/xupt-web/api/reset_password', formData, {
    customAuth: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
