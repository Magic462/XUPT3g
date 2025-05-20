import { useState } from 'react';
import './DonationList.scss';
import { useEnterToFocusNextInput } from '@/hooks/useEnterToNextInput';

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
  const role = localStorage.getItem('status');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    money: '',
    team: '',
    remark: '',
    time: '',
  });
  const inputCount = 3;
  const { getRef, handleKeyDown } = useEnterToFocusNextInput(inputCount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('提交捐款信息：', formData);
    // TODO: 调接口上传数据
    //   setFormData({
    //     ...formData,
    //     name: '',
    //     money: '',
    //     team: '',
    //     remark: '',
    //     time: '',
    //   });
  };

  return (
    <>
      <div className="donation-controls-box">
        <select>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        {role === '0' && (
          <div
            className="edit-donation-post-box"
            onClick={() => setShowModal(true)}
          >
            +
          </div>
        )}
      </div>

      <Yeardonation />

      {showModal && (
        <div className="donation-modal">
          <div className="modal-content">
            <h3>录入捐款信息</h3>
            <input
              type="text"
              name="name"
              placeholder="姓名"
              value={formData.name}
              onChange={handleChange}
              ref={getRef(0)}
              onKeyDown={handleKeyDown(0)}
            />
            <input
              type="text"
              name="team"
              placeholder="组别"
              value={formData.team}
              onChange={handleChange}
              ref={getRef(1)}
              onKeyDown={handleKeyDown(1)}
            />
            <input
              type="text"
              name="money"
              placeholder="金额"
              value={formData.money}
              onChange={handleChange}
              ref={getRef(2)}
              onKeyDown={handleKeyDown(2, handleSubmit)}
            />

            <div className="modal-actions">
              <button className="donation-post" onClick={handleSubmit}>
                提交
              </button>
              <button
                className="donation-cancel"
                onClick={() => setShowModal(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationList;
