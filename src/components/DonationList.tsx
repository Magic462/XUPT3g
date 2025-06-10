import { useEffect, useState } from 'react';
import './DonationList.scss';
import { useEnterToFocusNextInput } from '@/hooks/useEnterToNextInput';
import {
  getDonationInfo,
  postDonationInfo,
  deleteDonation,
} from '@/services/donation';
import { Donationinfo } from '@/types/donation';
import { message } from '@/utils/message';
import DeleteConfirmModal from './DeleteConfirmModal';

interface YeardonationProps {
  donations: Donationinfo[];
  onDelete: (id: number) => void;
}
// 最早捐款年份
const MIN_DONATION_YEAR = 2015;
const inputCount = 2;

const Yeardonation: React.FC<YeardonationProps> = ({ donations, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>捐款人姓名</th>
          <th>捐款金额</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {donations.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.money}</td>
              <td>
                <div className="delete-btn" onClick={() => onDelete(item.id)}>
                  <span>×</span>
                </div>
              </td>
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  // 调用enter自动聚焦下一个input
  const { getRef, handleKeyDown } = useEnterToFocusNextInput(inputCount);

  const [donations, setDonations] = useState<Donationinfo[]>([]);
  const [pendingDonations, setPendingDonations] = useState<Donationinfo[]>([]);
  const [time, setTime] = useState<number>(() => new Date().getFullYear());
  // 距今捐款时间数组
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear; i >= MIN_DONATION_YEAR; i--) {
    years.push(i);
  }

  const [formData, setFormData] = useState({
    name: '',
    money: '',
    team: 'other',
    remark: '爱心捐款',
    time: `${time}`,
  });

  // 添加这个useEffect来同步time和formData.time
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      time: `${time}`,
    }));
  }, [time]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 提交
  const handleSubmit = () => {
    if (pendingDonations.length < 1) {
      message.warning('未录入任何捐款信息');
      return;
    }
    fetchPostResponse();
  };

  // 继续录入
  const continueSubmit = () => {
    if (!formData.name || !formData.money) {
      // alert('');
      message.warning('请完整填写姓名和金额');
      return;
    }
    setPendingDonations([
      ...pendingDonations,
      { ...formData, money: Number(formData.money) },
    ]);

    message.success('录入成功，请继续录入');

    setFormData({
      name: '',
      money: '',
      team: 'other',
      remark: '爱心捐款',
      time: `${time}`,
    });
  };

  // 提交请求
  const fetchPostResponse = async () => {
    try {
      const response = await postDonationInfo(pendingDonations);
      console.log(response);
      message.success('提交成功');
      setShowModal(false);
      setPendingDonations([]);
      const res = await getDonationInfo(time);
      setDonations(res);
    } catch (err) {
      console.log('上传捐款失败：', err);
      message.error('提交失败，请稍后再试');
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonationInfo(time);
        setDonations(response);
      } catch (err) {
        console.log('获取捐款信息失败：', err);
        message.warning('获取捐款信息失败');
      }
    };

    fetchDonations();
  }, [time]);

  const handleDelete = async (id: number) => {
    try {
      await deleteDonation(id);
      message.success('删除成功');
      const res = await getDonationInfo(time);
      setDonations(res);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('删除失败：', err);
      message.error('删除失败，请稍后再试');
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="donation-controls-box">
        {years && (
          <select
            value={time || ''}
            onChange={(e) => {
              setTime(Number(e.target.value));
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

      {donations && (
        <Yeardonation donations={donations} onDelete={handleDeleteClick} />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          delId={deleteId}
          remindMessage={`确定要删除 ${donations.find((d) => d.id === deleteId)?.name} 的捐款记录吗？`}
          onHandlerDelete={setShowDeleteModal}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <div className="donation-modal">
          <div className="modal-content">
            <h3>录入捐款信息</h3>
            <div className="donation-input-header">
              <span className="donation-count">
                已录入{pendingDonations.length}人
              </span>
            </div>
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
              name="money"
              placeholder="金额"
              value={formData.money}
              onChange={handleChange}
              ref={getRef(1)}
              onKeyDown={handleKeyDown(1, continueSubmit)}
            />

            <div className="modal-actions">
              <button className="donation-continue" onClick={continueSubmit}>
                继续录入
              </button>
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
