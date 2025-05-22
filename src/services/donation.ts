import { get, post } from '@/utils/request/http';
import { Donationinfo, Donationres } from '@/types/donation';

// 获得某一年捐款信息
export const getDonationInfo = async (
  year: number
): Promise<Donationinfo[]> => {
  const response = await get<Donationinfo[]>('/api/donation/list', {
    params: {
      year,
    },
    customAuth: true,
  });
  return response;
};

// 上传某一年捐款信息
export const PostdonationInfo = async (
  year: number = 2025,
  donations: Donationinfo[] = [
    {
      name: '测试',
      money: 100,
      time: '2025',
      team: 'Web',
    },
  ]
): Promise<Donationres> => {
  const response = await post<Donationres>(
    `/api/donation/list/${year}`,
    { donations },
    {
      customAuth: true,
    }
  );
  return response;
};
