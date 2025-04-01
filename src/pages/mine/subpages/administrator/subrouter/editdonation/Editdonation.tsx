import './Editdonation.scss';
import '@/assets/icons/font_rkifxavxcn/iconfont.css';

const data = [
  {
    id: 1,
    name: '张三',
    group: 'web',
    money: 100,
  },
  {
    id: 2,
    name: '李四',
    group: 'server',
    money: 100,
  },
  {
    id: 3,
    name: '王五',
    group: 'ios',
    money: 100,
  },
  {
    id: 1,
    name: '张三',
    group: 'web',
    money: 100,
  },
  {
    id: 2,
    name: '李四',
    group: 'server',
    money: 100,
  },
  {
    id: 3,
    name: '王五',
    group: 'ios',
    money: 100,
  },
  {
    id: 1,
    name: '张三',
    group: 'web',
    money: 100,
  },
  {
    id: 2,
    name: '李四',
    group: 'server',
    money: 100,
  },
  {
    id: 3,
    name: '王五',
    group: 'ios',
    money: 100,
  },
  {
    id: 1,
    name: '张三',
    group: 'web',
    money: 100,
  },
  {
    id: 2,
    name: '李四',
    group: 'server',
    money: 100,
  },
  {
    id: 3,
    name: '王五',
    group: 'ios',
    money: 100,
  },
];

const Yeardonation = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>捐款人姓名</th>
          <th>捐款金额</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.money}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Editdonation = () => {
  return (
    <div className="edit-donation-container">
      <div className="each-func-title">
        <h2 className="">捐款列表</h2>
      </div>
      <select name="" id="">
        <option value="">2025</option>
        <option value="">2024</option>
        <option value="">2023</option>
      </select>
      <div className="edit-donation-post-box">
        {/* <i className="edit-danation-post-btn iconfont icon-jiahao"></i> */}+
      </div>
      <Yeardonation></Yeardonation>
    </div>
  );
};

export default Editdonation;
