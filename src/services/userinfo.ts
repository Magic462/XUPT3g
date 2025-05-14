import { get } from '@/utils/request/http';

interface userinfo {
    portrait: string,
    gender: string,
    classGrade: string,
    year: number,
    phone: string,
    isGraduate: boolean,
    username: string,
    name: string,
    team: string,
    mienImg: string,
    signature: string,
    company: string
}

export const getUseinfo = async (): Promise<userinfo> => {
  const response = await get<userinfo>('api/userinfo',{ customAuth: true } );
  return response;
};