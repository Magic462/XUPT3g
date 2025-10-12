import { CategorizedVideo } from '@/types/video';
import { del, post, get } from '@/utils/request/http';

// 查询所有类别视频列表
export const getVideo = async (
  category?: string
): Promise<CategorizedVideo[]> => {
  const res = await get<CategorizedVideo[]>('/api/videos', {
    params: { category },
  });
  console.log('获取视频列表:', res);
  return res;
};

// 上传指定类别的视频（同类别会覆盖原视频）
export const postVideo = async (category: string, video: File) => {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('video', video);

  const res = await post('/api/videos', formData, {
    customAuth: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('上传视频结果:', res);
  return res;
};

// 删除视频接口 - 恢复传递url参数
export const deleteVideo = async (url: string) => {
  console.log(url);
  const res = await del('/api/videos', {
    params: {
      url,
    },
    customAuth: true,
  });
  console.log('删除视频结果:', res);
  return res;
};
