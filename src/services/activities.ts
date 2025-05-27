import { formatData } from '@/utils/time';
import { Article } from '@/types/article';
import { get, post } from '@/utils/request/http';

// 默认图片
const DEFAULT_IMAGE = 'https://mobile.xupt.edu.cn/res/static/wiki_default.jpg';
// 图片基础前缀
const BASE_IMG_URL = '//mobile.xupt.edu.cn/';
// 每页显示的活动数量
const ITEMS_PER_PAGE = 10;

// 分页获取文章
export const getAllArticleInfo = async (
  pageNum: number,
  pageSize: number = ITEMS_PER_PAGE
): Promise<{
  activities: Article[];
  total: number;
  pageNum: number;
}> => {
  const res = await get<{ activities: Article[]; total: number }>(
    'api/activities/list',
    {
      params: {
        pageNum,
        pageSize,
      },
    }
  );

  console.log(res);

  const activities = res.activities
    // .filter((item: Article) => item.status === 1)
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

// 获取最近发布的七篇文章
export const getRecentActivities = async (
  pageNum: number = 1,
  pageSize: number = ITEMS_PER_PAGE
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

// 查询文章
export const getActivityContent = async (aid: number) => {
  const res = await get('/api/activty', {
    params: {
      aid,
    },
  });
  console.log(res);
  return res;
};

export const postArticle = async (
  title: string,
  content: string,
  img: string
  // summary: string
) => {
  const res = await post(
    '/api/activity',
    {
      title,
      content,
      img,
      // summary,
    },
    {
      customAuth: true,
    }
  );
  console.log(res);
  return res;
};
