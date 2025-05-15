import { get } from '@/utils/request/http';
import { Userinfo } from '@/types/userinfo';

export const getUseinfo = async (): Promise<Userinfo> => {
  const response = await get<Userinfo>('api/userinfo', { customAuth: true });
  return response;
};
