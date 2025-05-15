import { formatData } from '@/utils/time';
import { Article } from '@/types/article';
import { get } from '@/utils/request/http';

// 默认图片
const DEFAULT_IMAGE = 'https://mobile.xupt.edu.cn/res/static/wiki_default.jpg';
// 图片基础前缀
const BASE_IMG_URL = '//mobile.xupt.edu.cn/';
// 每页显示的活动数量
const ITEMS_PER_PAGE = 10;

export const getAllArticleInfo = async (
  pageSize,
  pageNum: number = ITEMS_PER_PAGE
): Promise<{
  activities: Article[];
  total: number;
  pageNum: number;
}> => {
  const res = await get<{ activities: Article[]; total: number }>(
    'api/activities/list',
    {
      params: {
        pageSize,
        pageNum,
      },
    }
  );

  const activities = res.activities
    .filter((item: Article) => item.status === 1)
    .map((item: Article) => ({
      ...item,
      time: formatData(item.time),
      img: item.img ? BASE_IMG_URL + item.img : DEFAULT_IMAGE,
    }));

  return {
    activities,
    total: res.total,
    pageNum: Math.ceil(res.total / ITEMS_PER_PAGE),
  };
};

export const getRecentActivities = async (
  pageSize: number = 1,
  pageNum: number = ITEMS_PER_PAGE
): Promise<{
  recentActivities: Article[];
}> => {
  const res = await get<{ activities: Article[]; total: number }>(
    'api/activities/list',
    {
      params: {
        pageSize,
        pageNum,
      },
    }
  );

  const recentActivities: Article[] = res.activities
    .filter((item: Article) => item.status === 1)
    .slice(0, 7)
    .map((item: Article) => ({
      ...item,
      img: item.img ? BASE_IMG_URL + item.img : DEFAULT_IMAGE,
    }));

  return { recentActivities };
};
