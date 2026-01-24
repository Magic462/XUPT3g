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
  const response = await get<MembersResponse>('xupt-web/api/members', {
    params: {
      isGraduate,
      team: direction,
      year,
      pageSize,
      pageNum,
      name,
    },
  });

  return response;
};

// 搜索成员
export const getMember = async (name: string): Promise<Members[]> => {
  const response = await get<Members[]>('xupt-web/api/member', {
    params: {
      name,
    },
    customAuth: true,
  });

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
    '/xupt-web/api/members',
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

  return res;
};

// 删除成员接口
export const delMember = async (uid: number) => {
  const res = await del('/xupt-web/api/members', {
    params: {
      uid,
    },
    customAuth: true,
  });
  return res;
};
