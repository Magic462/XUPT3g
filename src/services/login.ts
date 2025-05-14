import axiosInstance from '@/utils/request';

export const postLogin = ({
          username,
          password,
          captchaID,
          captchaData,
        }) => {
  return axiosInstance.post('/api/login',{
          username,
          password,
          captchaID,
          captchaData,
        });
};
// export const postLogin = (data) => {
//   return axiosInstance.post('/api/login',data);
// };
