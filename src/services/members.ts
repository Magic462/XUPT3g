import { get } from '@/utils/request/http';
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
