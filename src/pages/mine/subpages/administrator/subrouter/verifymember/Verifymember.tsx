import { useEnterToFocusNextInput } from '@/hooks/useEnterToNextInput';
import './Verifymember.scss';
import { useEffect, useState } from 'react';
import { message } from '@/utils/message';
import { Direction } from '@/types/direction';
import { getAllDirection } from '@/services/directions';
import { addMember } from '@/services/members';
// import { getUserinfo } from '@/services/userinfo';
import { Userinfo } from '@/types/userinfo';

const years = [2024, 2023, 2022, 2021, 2020, 2019];

const inputCount = 2;

const Verifymember = () => {
  const { getRef, handleKeyDown } = useEnterToFocusNextInput(inputCount);
  const [teams, setTeams] = useState<Direction[]>([]);
  const [postMemberInfo, setPostMemberInfo] = useState<Userinfo>({
    name: '',
    username: '',
    team: teams[0]?.name, // 默认空字符串（可改成 teams[0]?.name 后补充）
    year: years[0],
  });

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
    console.log(postMemberInfo);
    const { name, username, team, year } = postMemberInfo;

    // 校验字段完整性
    if (!name || !username || !team || !year) {
      return message.warning('请完整填写成员信息');
    }

    try {
      const response = await addMember(name, username, team, year); // 传入表单信息
      setPostMemberInfo({
        name: '',
        username: '',
        team: teams[0]?.name || '',
        year: years[0],
      });
      console.log(response);
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
