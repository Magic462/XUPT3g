import { get, post } from '@/utils/request/http';
// import { Direction } from '@/types/direction';

// // 游客端看到的存在的方向的信息
// export const getDirection = async (isExist?: boolean): Promise<Direction[]> => {
//   const response = await get<Direction[]>('api/team', {
//     params: {
//       isExist,
//     },
//   });
//   return response;
// };

// 上传培养方案接口
export const postTrainPlan = async (content: string = '实验室培养方案') => {
  const res = await post(
    '/api/trainplan',
    {
      content,
    },
    {
      customAuth: true,
    }
  );

  console.log('上传实验室培养方案接口：', res);
  return res;
};
