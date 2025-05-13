import { formatData } from '@/utils/time';
import { get } from '@/utils/request/http';

interface Article {
  aid: number;
  title: string;
  img: string;
  status: number;
  summary: string;
  time: string;
  view: number;
  content: string;
}

// 默认图片
const DEFAULT_IMAGE = 'https://mobile.xupt.edu.cn/res/static/wiki_default.jpg';
// 图片基础前缀
const BASE_IMG_URL = '//mobile.xupt.edu.cn/';

export const getAllArticleInfo = async (): Promise<Article[]> => {
  const rawData = await get<Article[]>('api/activities/list');

  return rawData.map((item) => ({
    ...item,
    time: formatData(item.time),
    img: item.img ? BASE_IMG_URL + item.img : DEFAULT_IMAGE,
  }));
};
