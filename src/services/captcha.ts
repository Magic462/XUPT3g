import { get } from '@/utils/request/http';

interface Captcha {
  captchaID: string;
  captchaImage: string;
}

export const getCaptcha = async (): Promise<Captcha> => {
  const response = await get<Captcha>('api/captcha');
  return response;
};
