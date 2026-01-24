import { useEnterToFocusNextInput } from '@/hooks/useEnterToNextInput';
import './Verifymember.scss';
import { useEffect, useState } from 'react';
import { message } from '@/utils/message';
import { Direction } from '@/types/direction';
import { getAllDirection } from '@/services/directions';
import { addMember } from '@/services/members';
// import { getUserinfo } from '@/services/userinfo';
import { Userinfo } from '@/types/userinfo';

const inputCount = 2;
const MIN_MEMBER_YEAR = 2008;

const Verifymember = () => {
  const { getRef, handleKeyDown } = useEnterToFocusNextInput(inputCount);
  // const [years, setYears] = useState<number[]>([]);
  const [teams, setTeams] = useState<Direction[]>([]);
  // 距今成员时间数组
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear; i >= MIN_MEMBER_YEAR; i--) {
    years.push(i);
  }

  const [postMemberInfo, setPostMemberInfo] = useState<Userinfo>({
    name: '',
    username: '',
    team: teams[0]?.name, // 默认空字符串（可改成 teams[0]?.name 后补充）
    year: Number(years[0]),
  });

  // // 获取years
  // useEffect(() => {
  //   const fetchDirection = async () => {
  //     try {
  //       const response = await getYears();
  //       // console.log(response);
  //       if (Array.isArray(response) && response.length > 0) {
  //         // setYears(response.map((item) => Number(item)));
  //       }
  //     } catch (error) {
  //       console.log('获取年份失败', error);
  //       message.error('获取年份失败');
  //     }
  //   };
  //   fetchDirection();
  // }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllDirection();
        setTeams(response);

        setPostMemberInfo((prev) => ({
          ...prev,
          team: response[0]?.name || '',
        }));
      } catch (err) {
        message.error('请求组别失败');
        console.log('请求组别失败：', err);
      }
    };

    fetchTeams();
  }, []);

  const handleAddMember = async () => {
    const { name, username, team, year } = postMemberInfo;

    // 校验字段完整性
    if (!name || !username || !team || !year) {
      return message.warning('请完整填写成员信息');
    }

    try {
      await addMember(name, username, team, year); // 传入表单信息
      setPostMemberInfo({
        name: '',
        username: '',
        team: teams[0]?.name || '',
        year: Number(years[0]),
      });
      message.success('添加成员成功');
    } catch (err) {
      message.error('添加成员失败');
      console.log('添加成员失败：', err);
    }
  };

  return (
    <div className="verify-member-container">
      <div className="each-func-title">
        <h2 className="">
          <i className={`each-func-icons iconfont icon-chengyuan`}></i>
          添加成员
        </h2>
      </div>
      {/* <div className="verify-box">
        {registers.map((item) => Renderunverifirdmember(item))}
      </div> */}
      <div className="add-member-box">
        <h3 className="add-member-title">成员信息</h3>
        <ul className="add-member-info-box">
          <li className="add-member-info-item">
            <label htmlFor="">姓名：</label>
            <input
              type="text"
              ref={getRef(0)}
              onChange={(e) =>
                setPostMemberInfo({ ...postMemberInfo, name: e.target.value })
              }
              onKeyDown={handleKeyDown(0)}
            />
          </li>

          <li className="add-member-info-item">
            <label htmlFor="">用户名：</label>
            <input
              type="text"
              ref={getRef(1)}
              onChange={(e) =>
                setPostMemberInfo({
                  ...postMemberInfo,
                  username: e.target.value,
                })
              }
              onKeyDown={handleKeyDown(1)}
            />
          </li>

          <li className="add-member-info-item">
            <label htmlFor="">组别：</label>
            <select
              value={postMemberInfo?.team || ''}
              onChange={(e) =>
                setPostMemberInfo({ ...postMemberInfo, team: e.target.value })
              }
            >
              <option value="" disabled>
                请选择组别
              </option>
              {teams.map((item: Direction) => (
                <option value={item.name} key={item.tid}>
                  {item.name}
                </option>
              ))}
            </select>
          </li>

          <li className="add-member-info-item">
            <label htmlFor="">入学年：</label>
            <select
              onChange={(e) =>
                setPostMemberInfo({
                  ...postMemberInfo,
                  year: parseInt(e.target.value),
                })
              }
            >
              <option value="" disabled>
                请选择年份
              </option>
              {years.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </li>

          <li className="add-member-post-btn-box">
            <button
              className="add-member-post-btn"
              onClick={() => handleAddMember()}
            >
              确认添加
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Verifymember;
