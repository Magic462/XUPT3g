import { get, post, del } from '@/utils/request/http';
import { MembersResponse, Members } from '@/types/members';

export const getMembers = async (
  isGraduate?: boolean,
  direction?: string,
  year?: string,
  pageSize?: number,
  pageNum?: number,
  name?: string
): Promise<MembersResponse> => {
  const response = await get<MembersResponse>('api/members', {
    params: {
      isGraduate,
      team: direction,
      year,
      pageSize,
      pageNum,
      name,
    },
  });

  console.log(response);
  return response;
};

// 搜索成员
export const getMember = async (name: string): Promise<Members[]> => {
  const response = await get<Members[]>('api/member', {
    params: {
      name,
    },
    customAuth: true,
  });

  console.log(response);
  return response;
};

// 添加成员
export const addMember = async (
  name: string,
  username: string,
  team: string,
  year: number
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
export const delMember = async (uid: number) => {
  const res = await del('/api/members', {
    params: {
      uid,
    },
    customAuth: true,
  });
  console.log(res);
  return res;
};
