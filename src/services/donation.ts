import { del, get, post } from '@/utils/request/http';
import {
  Donationinfo,
  DonationinGetRes,
  DonationOperationRes,
} from '@/types/donation';

// 获得某一年捐款信息
export const getDonationInfo = async (
  year: number
): Promise<DonationinGetRes> => {
  const response = await get<DonationinGetRes>('/xupt-web/api/donation/list', {
    params: {
      year,
    },
    customAuth: true,
  });
  return response;
};

// 上传某一年捐款信息
export const postDonationInfo = async (
  donations: Donationinfo[]
): Promise<DonationOperationRes> => {
  const response = await post<DonationOperationRes>(
    `/xupt-web/api/donation/list`,
    {
      donations,
    },
    {
      customAuth: true,
    }
  );
  return response;
};

// 删除某一条捐款信息
export const deleteDonation = async (
  id: number
): Promise<DonationOperationRes> => {
  const response = await del<DonationOperationRes>(`/xupt-web/api/donation`, {
    params: { id },
    customAuth: true,
  });
  return response;
};
