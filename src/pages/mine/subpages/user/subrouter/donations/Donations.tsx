import DonationList from '@/components/DonationList';
import './Donations.scss';

const Donation = () => {
  return (
    <div className="donation-container">
      <div className="each-func-title">
        <h2>捐款列表</h2>
      </div>
      <DonationList></DonationList>
    </div>
  );
};

export default Donation;
