import './Verifymember.scss';

const registers = [
  {
    name: '张三',
    stuId: '23044011',
    group: 'web',
    // passworld
    gender: '男',
    classGrade: '软件1302',
    year: 2013,
  },
  {
    name: '张三',
    stuId: '23044011',
    group: 'web',
    // passworld
    gender: '男',
    classGrade: '软件1302',
    year: 2013,
  },
  {
    name: '张三',
    stuId: '23044011',
    group: 'web',
    // passworld
    gender: '男',
    classGrade: '软件1302',
    year: 2013,
  },
  {
    name: '张三',
    stuId: '23044011',
    group: 'web',
    // passworld
    gender: '男',
    classGrade: '软件1302',
    year: 2013,
  },
  {
    name: '张三',
    stuId: '23044011',
    group: 'web',
    // passworld
    gender: '男',
    classGrade: '软件1302',
    year: 2013,
  },
  {
    name: '张三',
    stuId: '23044011',
    group: 'web',
    // passworld
    gender: '男',
    classGrade: '软件1302',
    year: 2013,
  },
];

const years = [2024, 2023, 2022, 2021, 2020, 2019];

const Renderunverifirdmember = (item: {
  name: string;
  gender: string;
  year: number;
  group: string;
  stuId: string;
  classGrade: string;
}) => {
  return (
    <div className="unverified-member-box">
      {/* {registers.map((item) => ( */}
      <ul key={item.stuId} className="unverified-member">
        <li>姓名：{item.name}</li>
        <li>性别：{item.gender}</li>
        <li>入学年：{item.year}</li>
        <li>方向：{item.group}</li>
        <li>专业班级：{item.classGrade}</li>
        <li>学号：{item.stuId}</li>
        <div className="unverified-member-btns">
          <button>通过</button>
          <button>不通过</button>
        </div>
      </ul>
      {/* ))} */}
    </div>
  );
};

const Verifymember = () => {
  return (
    <div className="verify-member-container">
      <div className="each-func-title">
        <h2 className="">添加成员</h2>
      </div>
      {/* <div className="verify-box">
        {registers.map((item) => Renderunverifirdmember(item))}
      </div> */}
      <div className="add-member-box">
        <h3 className="add-member-title">成员信息</h3>
        <ul className="add-member-info-box">
          <li className="add-member-info-item">
            <label htmlFor="">姓名：</label>
            <input type="text" />
          </li>
          <li className="add-member-info-item">
            <label htmlFor="">用户名：</label>
            <input type="text" name="" id="" />
          </li>
          <li className="add-member-info-item">
            <label htmlFor="">入学年：</label>
            <select name="" id="">
              {years.map((item) => (
                <option value="">{item}</option>
              ))}
            </select>
          </li>
          <li>
            <button className="add-member-post-btn">确认添加</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Verifymember;
