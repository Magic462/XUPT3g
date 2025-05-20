import { get, post } from '@/utils/request/http';
import { Direction, Directionres } from '@/types/direction';

// 游客端看到的存在的方向的信息
export const getDirection = async (): Promise<Direction[]> => {
  const response = await get<Direction[]>('api/team');
  return response;
};

// 用户端获取方向信息
export const getAllDirection = async (
  isExist?: boolean
): Promise<Direction[]> => {
  const params = isExist !== undefined ? { isExist } : {};

  const response = await get<Direction[]>('api/team/allinfo', {
    params,
    customAuth: true,
  });
  return response;
};

// 管理上传方向信息
export const postDirectionInfo = async (
  direction: Direction
): Promise<Directionres> => {
  const response = await post<Directionres>('api/team', direction, {
    customAuth: true,
  });
  return response;
};
