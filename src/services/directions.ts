import { get, post, put } from '@/utils/request/http';
import { Direction, Directionres } from '@/types/direction';

// 游客端看到的存在的方向的信息
export const getDirection = async (isExist?: boolean): Promise<Direction[]> => {
  const response = await get<Direction[]>('api/team', {
    params: {
      isExist,
    },
  });
  return response;
};

// 用户端获取方向信息
export const getAllDirection = async (
  // tid?:number,
  name?: string,
  isExist?: boolean
): Promise<Direction[]> => {
  // const params = isExist !== undefined ? { isExist } : {};

  const response = await get<Direction[]>('api/team/allinfo', {
    params: {
      name,
      isExist,
    },
    customAuth: true,
  });
  return response;
};

// 管理上传方向信息
export const postDirection = async (
  name: string,
  brefInfo: string,
  trainPlan: string,
  isExist: boolean = true
): Promise<Directionres> => {
  const response = await post<Directionres>(
    'api/team',
    {
      name,
      brefInfo,
      trainPlan,
      isExist,
    },
    {
      customAuth: true,
    }
  );
  return response;
};

// 修改方向信息
export const putDirection = async (params: {
  tid?: number;
  name?: string;
  brefInfo?: string;
  trainPlan?: string;
  isExist?: boolean;
}) => {
  console.log('修改方向信息', params);
  const response = await put(`/api/team`, params, {
    customAuth: true,
  });
  return response;
};
