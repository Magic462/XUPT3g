import { formatData } from '@/utils/time';
import { Article } from '@/types/article';
import { get } from '@/utils/request/http';

// 默认图片
const DEFAULT_IMAGE = 'https://mobile.xupt.edu.cn/res/static/wiki_default.jpg';
// 图片基础前缀
const BASE_IMG_URL = '//mobile.xupt.edu.cn/';
// 每页显示的活动数量
const BASE_ACTIVITY_NUM = 10;

export const getAllArticleInfo = async (
  pageSize: number = 1,
  pageNum: number = BASE_ACTIVITY_NUM
): Promise<Article[]> => {
  const rawData = await get<Article[]>('api/activities/list', {
    params: {
      pageSize: pageSize,
      pageNum: pageNum,
    },
  });

  console.log('rawData:', rawData);

  return rawData.map((item) => ({
    ...item,
    time: formatData(item.time),
    img: item.img ? BASE_IMG_URL + item.img : DEFAULT_IMAGE,
  }));
};
