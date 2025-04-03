import { useState } from 'react';
import './DonationList.scss';

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

const DonationList = () => {
  const [role, useRole] = useState('admin');
  return (
    <>
      <select name="" id="">
        <option value="">2025</option>
        <option value="">2024</option>
        <option value="">2023</option>
      </select>
      {role === 'admin' && <div className="edit-donation-post-box">+</div>}
      <Yeardonation></Yeardonation>
    </>
  );
};

export default DonationList;
