import DonationList from '@/components/DonationList';
import './Donations.scss';

const Donation = () => {
  return (
    <div className="donation-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-aixinjuankuan`}></i>
          捐款列表
        </h2>
      </div>
      <DonationList></DonationList>
    </div>
  );
};

export default Donation;
