import { get } from '@/utils/request/http';
import { Captcha } from '@/types/captcha';

export const getCaptcha = async (): Promise<Captcha> => {
  const response = await get<Captcha>('api/captcha');
  return response;
};
