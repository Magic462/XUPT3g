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

// 用户端看到的具体的各方向信息
export const getAllDirection = async (
  isExist: boolean = false
): Promise<Direction[]> => {
  const response = await get<Direction[]>('api/team/allinfo', {
    params: {
      isExist,
    },
    customAuth: true,
  });
  return response;
};

// 上传小头像接口
// export const post
