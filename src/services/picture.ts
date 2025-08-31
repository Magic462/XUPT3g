import { post } from '@/utils/request/http';
import { PictureResponse } from '@/types/picture';

// 上传图片获取转换后url接口
export const getPictureUrl = async (image: File): Promise<PictureResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await post<PictureResponse>(
    '/api/uploadImgWithWaterMark',
    formData,
    {
      customAuth: true,
      headers: {
        'Content-Type': undefined,
      },
    }
  );

  console.log(response);
  return response;
};
