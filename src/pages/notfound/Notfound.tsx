import './Notfound.scss';

const Notfound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-title-box">
        {/* <p className="notfound-main-title">
          <h1>4</h1>
          <h1>4</h1>
        </p>
        <p className="notfound-tip">抱歉，这里没有任何东西</p> */}
        <div className="back-to-laboratory-box">
          <button className="back-to-laboratory">Laboratory</button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
