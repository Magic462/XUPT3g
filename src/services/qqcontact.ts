import { get } from '@/utils/request/http';
import { QQcontact } from '@/types/qqcontact';

export const getQQcontact = async (): Promise<QQcontact> => {
  const response = await get<QQcontact>('api/contact');
  return response;
};
