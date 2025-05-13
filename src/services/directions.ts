import axiosInstance from '@/utils/request';

export const getDirectionInfo = () => {
  return axiosInstance.get('/api/team');
};
