import React, { useState } from 'react';
import './Memlist.scss';
import { Members } from '@/types/members';
import Peohome from '@/components/Peohome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
// import { Userinfo } from '@/types/userinfo';

interface MemlistProps {
  member: Members;
  onHandlerDelete: (isDeletModal: boolean) => void;
  onHandleDelAid: (delId: number) => void;
  // onHandleShowPeohome: (isShowPeohome) => void;
}

const Memlist: React.FC<MemlistProps> = ({
  member,
  onHandlerDelete,
  onHandleDelAid,
  // onHandleShowPeohome,
}) => {
  const [peohomeShow, setPeohomeShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const { status } = useAuth();
  const isAdmin = status === '0';

  return (
    <div className="mem-item">
      <div className="mem-img-container">
        <img src={member.portrait} alt={member.username} className="mem-img" />
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

      <div className="mem-buttons">
        <button className="view-button" onClick={() => setPeohomeShow(true)}>
          查看
        </button>
        {isAdmin && (
          <button
            className="delete-button"
            onClick={() => {
              onHandlerDelete(true);
              onHandleDelAid(member.uid);
            }}
          >
            删除
          </button>
        )}
      </div>
      {peohomeShow && (
        <div className="mem-item-peohome-overlay">
          <div className="mem-item-peohome">
            <Peohome
              portrait={member.portrait}
              gender={member.gender}
              classGrade={member.classGrade}
              year={member.year}
              tel={member.tel}
              isGraduate={member.isGraduate === 1 ? true : false}
              username={member.username}
              name={member.name}
              team={member.team}
              mienImg={member.mienImg}
              signature={member.signature}
              company={member.company}
            ></Peohome>
            <div
              className="mem-item-peohome-close"
              onClick={() => setPeohomeShow(false)}
            >
              关闭
            </div>
            {isAdmin && (
              <div
                className="mem-item-peohome-to-edit"
                onClick={() =>
                  navigate(`/mine/user/changeinfo?username=${member.username}`)
                }
              >
                前往编辑
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Memlist;
