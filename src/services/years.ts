import { get } from '@/utils/request/http';
import { YearsResponse } from '@/types/years';

export const getYears = async (): Promise<YearsResponse> => {
  const response = await get<YearsResponse>('xupt-web/api/years');
  console.log(response);
  return response;
};
