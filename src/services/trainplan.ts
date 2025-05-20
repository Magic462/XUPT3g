import { get } from '@/utils/request/http';
import { Direction } from '@/types/direction';

// 游客端看到的存在的方向的信息
export const getDirection = async (isExist?: boolean): Promise<Direction[]> => {
  const response = await get<Direction[]>('api/team',{
    params:{
      isExist
    },
  });
  return response;
};