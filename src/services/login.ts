import { post } from '@/utils/request/http';

interface LoginRequest {
  username: string;
  password: string;
  captchaID: string;
  captchaData: string;
}

interface LoginResponse {
  status: string;
  token: string;
  username: string;
}

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await post<LoginResponse>('api/login', data);
  return response;
};
