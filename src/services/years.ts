import { get } from '@/utils/request/http';
import { YearsResponse } from '@/types/years';

export const getYears = async (): Promise<YearsResponse> => {
  const response = await get<YearsResponse>('api/years');
  return response;
};
