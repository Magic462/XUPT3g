import { get } from '@/utils/request/http';
import { Direction } from '@/types/direction';

export const getDirection = async (): Promise<Direction[]> => {
  const response = await get<Direction[]>('api/team');
  return response;
};
