import { get, post } from '@/utils/request/http';
import { MembersResponse } from '@/types/members';

export const getMembers = async (
  isGraduate?: boolean,
  direction?: string,
  year?: string,
  pageSize?: number,
  pageNum?: number
): Promise<MembersResponse> => {
  const response = await get<MembersResponse>('api/members', {
    params: {
      isGraduate,
      team: direction,
      year,
      pageSize,
      pageNum,
    },
  });
  console.log(response);
  return response;
};

// 添加成员
export const addMember = async (
  name: string = '张三测试',
  username: string = 'zhangsan222',
  team: string = 'Web',
  year: number = 2023
) => {
  const res = await post(
    '/api/members',
    {
      name,
      username,
      team,
      year,
    },
    {
      customAuth: true,
    }
  );

  console.log('添加成员接口：', res);
  return res;
};

// 删除成员接口
