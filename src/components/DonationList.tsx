import { useEffect, useState } from 'react';
import './DonationList.scss';
import { useEnterToFocusNextInput } from '@/hooks/useEnterToNextInput';
import { getDonationInfo, PostdonationInfo } from '@/services/donation';
import { Donationinfo } from '@/types/donation';

interface YeardonationProps {
  donations: Donationinfo[];
}
// 最早捐款年份
const MIN_DONATION_YEAR = 2015;

const Yeardonation: React.FC<YeardonationProps> = ({ donations }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>捐款人姓名</th>
          <th>捐款金额</th>
        </tr>
      </thead>
      <tbody>
        {donations.map((item, index) => {
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
    money: 0,
    team: '',
    remark: '爱心捐款',
    time: '',
  });
  // 调用enter自动聚焦下一个input
  const inputCount = 3;
  const { getRef, handleKeyDown } = useEnterToFocusNextInput(inputCount);

  const [donations, setDonations] = useState<Donationinfo[]>([]);
  const [year, setYear] = useState<number>(() => new Date().getFullYear());
  // 距今捐款时间数组
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear; i >= MIN_DONATION_YEAR; i--) {
    years.push(i);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 提交
  const handleSubmit = () => {
    console.log('提交捐款信息：', formData);
    fetchPostInfo();
  };

  const fetchPostInfo = async () => {
    try {
      const response = await PostdonationInfo();
      console.log(response);
    } catch (err) {
      console.log('上传捐款失败：', err);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonationInfo(year);
        setDonations(response);
      } catch (err) {
        console.log('获取捐款信息失败：', err);
      }
    };

    fetchDonations();
  }, [year]);

  return (
    <>
      <div className="donation-controls-box">
        {years && (
          <select
            value={year || ''}
            onChange={(e) => {
              setYear(Number(e.target.value));
            }}
          >
            {years.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        )}
        {role === '0' && (
          <div
            className="edit-donation-post-box"
            onClick={() => setShowModal(true)}
          >
            +
          </div>
        )}
      </div>

      {donations && <Yeardonation donations={donations}></Yeardonation>}

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
