import axiosInstance from '@/utils/request/index';

// 获取全部文章信息
export const getAllArticleInfo = () => {
  return axiosInstance.get('api/activities/list');
};
