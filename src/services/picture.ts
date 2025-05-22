import { post } from '@/utils/request/http';
import { Response } from '@/types/response';

// 上传图片获取转换后url接口
export const getPictureUrl = async (image: File): Promise<Response> => {
  const response = await post<Response>('/api/uploadImgWithWaterMark', image, {
    customAuth: true,
    headers: {
      'Content-Type': undefined,
    },
  });
  console.log(response);
  return response;
};
