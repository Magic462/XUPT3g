import { post } from '@/utils/request/http';
import { LoginRequest, LoginResponse } from '@/types/login';

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await post<LoginResponse>('xupt-web/api/login', data);
  return response;
};
