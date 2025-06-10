import { del, get, post } from '@/utils/request/http';
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
  console.log(response);
  return response;
};

// 上传某一年捐款信息
export const postDonationInfo = async (
  donations: Donationinfo[]
): Promise<Donationres> => {
  const response = await post<Donationres>(
    `/api/donation/list`,
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
export const deleteDonation = async (id: number): Promise<Donationres> => {
  console.log(id);
  const response = await del<Donationres>(`/api/donation`, {
    params: { id },
    customAuth: true,
  });
  return response;
};
