import React from 'react';
import './Memlist.scss';

interface MemlistProps {
  username: string;
  name: string;
  team: string;
  graduateImg: string;
  signature: string;
  isGraduate: number;
  onHandlerDelete: (isDeletModal: boolean) => void;
}

const Memlist: React.FC<MemlistProps> = ({
  username,
  name,
  team,
  graduateImg,
  signature,
  isGraduate,
  onHandlerDelete,
}) => {
  return (
    <div className="mem-item">
      <div className="mem-img-container">
        <img src={graduateImg} alt={username} className="mem-img" />
      </div>
      <div className="mem-info">
        <div className="mem-name-status">
          <span className="mem-name">{name}</span>

          {isGraduate === 1 && <span className="mem-status-label">已毕业</span>}
        </div>
        <div className="mem-signature">{signature}</div>
        <div className="mem-team">{team}</div>
      </div>
      {/* {status === 0 ? (
        <div className="mem-buttons">
          <button className="view-button">查看</button>
          <button
            className="delete-button"
            onClick={() => onHandlerDelete(true)}
          >
            删除
          </button>
        </div>
      ) : (
        <button className="blog-button">个人博客</button>
      )} */}
      <div className="mem-buttons">
        <button className="view-button">查看</button>
        <button className="delete-button" onClick={() => onHandlerDelete(true)}>
          删除
        </button>
      </div>
    </div>
  );
};

export default Memlist;
