import React from 'react';
import './Memlist.scss';
import { Members } from '@/types/members';

interface MemlistProps {
  member: Members;
  onHandlerDelete: (isDeletModal: boolean) => void;
  onHandleDelAid: (delId: number) => void;
}

const Memlist: React.FC<MemlistProps> = ({
  member,
  onHandlerDelete,
  onHandleDelAid,
}) => {
  return (
    <div className="mem-item">
      <div className="mem-img-container">
        <img
          src={member.graduateImg}
          alt={member.username}
          className="mem-img"
        />
      </div>
      <div className="mem-info">
        <div className="mem-name-status">
          <span className="mem-name">{member.name}</span>

          {member.isGraduate === 1 && (
            <span className="mem-status-label">已毕业</span>
          )}
        </div>
        <div className="mem-signature">{member.signature}</div>
        <div className="mem-team">{member.team}</div>
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
        <button
          className="delete-button"
          onClick={() => {
            onHandlerDelete(true);
            onHandleDelAid(member.uid);
          }}
        >
          删除
        </button>
      </div>
    </div>
  );
};

export default Memlist;
