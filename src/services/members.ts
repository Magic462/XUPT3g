import { get } from '@/utils/request/http';
import { MembersResponse } from '@/types/members';

export const getMembers = async (isGraduate?: boolean): Promise<MembersResponse> => {
  const response = await get<MembersResponse>('api/members',{ params:{ isGraduate } });
  return response;
};
