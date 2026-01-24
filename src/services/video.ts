import { CategorizedVideo } from '@/types/video';
import { del, post, get } from '@/utils/request/http';

// 查询所有类别视频列表
export const getVideo = async (
  category?: string
): Promise<CategorizedVideo[]> => {
  const res = await get<CategorizedVideo[]>('/xupt-web/api/videos', {
    params: { category },
  });
  return res;
};

// 上传指定类别的视频（同类别会覆盖原视频）
export const postVideo = async (category: string, video: File) => {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('video', video);

  const res = await post('/xupt-web/api/videos', formData, {
    customAuth: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

// 删除视频接口
export const deleteVideo = async (url: string) => {
  const res = await del('/xupt-web/api/videos', {
    params: {
      url,
    },
    customAuth: true,
  });
  return res;
};
