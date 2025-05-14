import axiosInstance from '@/utils/request';

export const getCaptcha = () => {
  return axiosInstance.get('/api/captcha');
};
