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
  role: string;
}

const MIN_DONATION_YEAR = 2015;
const inputCount = 2;

const Yeardonation: React.FC<YeardonationProps> = ({
  donations,
  onDelete,
  role,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>捐款人姓名</th>
          <th>捐款金额</th>
          {role === '0' && <th>操作</th>}
        </tr>
      </thead>
      <tbody>
        {donations.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.money}</td>
            {role === '0' && (
              <td>
                <div className="delete-btn" onClick={() => onDelete(item.id)}>
                  <span>×</span>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DonationList = () => {
  const role = localStorage.getItem('status');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  const { getRef, handleKeyDown } = useEnterToFocusNextInput(inputCount);

  const [donations, setDonations] = useState<Donationinfo[]>([]);
  const [totalCount, setTotalCount] = useState(null);
  const [time, setTime] = useState<number>(() => new Date().getFullYear());

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      time: `${time}`,
    }));
  }, [time]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await getDonationInfo(time);
        setDonations(res.donations);
        setTotalCount(res.totalCount);
      } catch {
        message.warning('获取捐款信息失败');
      }
    };
    fetchDonations();
  }, [time]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.money) {
      message.warning('请完整填写姓名和金额');
      return;
    }

    try {
      await postDonationInfo([{ ...formData, money: Number(formData.money) }]);

      message.success('录入成功');
      setFormData({
        name: '',
        money: '',
        team: 'other',
        remark: '爱心捐款',
        time: `${time}`,
      });

      const res = await getDonationInfo(time);
      setDonations(res.donations);
    } catch (err) {
      message.error('录入失败，请稍后再试');
      console.log('录入失败：', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDonation(id);
      message.success('删除成功');
      const res = await getDonationInfo(time);
      setDonations(res.donations);
      setShowDeleteModal(false);
    } catch {
      message.error('删除失败，请稍后再试');
    }
  };

  return (
    <>
      <div className="donation-controls-box">
        <select value={time} onChange={(e) => setTime(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
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

      <div className="donation-total">本年捐款总额：{totalCount}</div>
      <Yeardonation
        donations={donations}
        onDelete={(id) => {
          setDeleteId(id);
          setShowDeleteModal(true);
        }}
        role={role}
      />

      {showDeleteModal && (
        <DeleteConfirmModal
          delId={deleteId}
          remindMessage={`确定要删除 ${
            donations.find((d) => d.id === deleteId)?.name
          } 的捐款记录吗？`}
          onHandlerDelete={setShowDeleteModal}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <div className="donation-modal">
          <div className="modal-content">
            <h3>录入捐款信息</h3>

            <input
              name="name"
              placeholder="姓名"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              ref={getRef(0)}
              onKeyDown={handleKeyDown(0)}
            />

            <input
              name="money"
              placeholder="金额"
              value={formData.money}
              onChange={(e) =>
                setFormData({ ...formData, money: e.target.value })
              }
              ref={getRef(1)}
              onKeyDown={handleKeyDown(1, handleSubmit)}
            />

            <div className="modal-actions">
              <button className="donation-post" onClick={handleSubmit}>
                录入
              </button>
              <button
                className="donation-cancel"
                onClick={() => setShowModal(false)}
              >
                完成/取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationList;
