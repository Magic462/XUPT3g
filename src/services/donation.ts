import { get, post } from '@/utils/request/http';
import { Donationinfo, Donationres } from '@/types/donation';
import Donation from '@/pages/mine/subpages/user/subrouter/donations/Donations';

// 获得某一年捐款信息
export const getDonationInfo = async (
  year: number = 2020
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
  year: number,
  donations: Donationinfo[]
): Promise<Donationres> => {
  const response = await post<Donationres>(
    `/api/donation/list/${year}`,
    donations,
    {
      // params: {}
      customAuth: true,
    }
  );
  return response;
};
