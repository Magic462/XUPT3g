import DonationList from '@/components/DonationList';
import './Editdonation.scss';
import '@/assets/icons/font_rkifxavxcn/iconfont.css';
const Editdonation = () => {
  return (
    <div className="edit-donation-container">
      <div className="each-func-title">
        <h2 className="">捐款列表</h2>
      </div>
      {/* <Outlet></Outlet> */}
      <DonationList></DonationList>
    </div>
  );
};

export default Editdonation;
