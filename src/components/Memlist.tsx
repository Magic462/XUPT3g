import React, { useState } from 'react';
import './Memlist.scss';
import { Members } from '@/types/members';
import Peohome from '@/components/Peohome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { postChangeInfo, resetPassWord } from '@/services/userinfo';
import { IsGraduate } from '@/contans/userInfo';
import { message } from '@/utils/message';
// import { Userinfo } from '@/types/userinfo';

interface MemlistProps {
  member: Members;
  onHandlerDelete: (isDeletModal: boolean) => void;
  onHandleDelAid: (delId: number) => void;
  // onHandleShowPeohome: (isShowPeohome) => void;
}

interface MoreOperationProps {
  member: Members;
  onHandlerDelete: (isDeletModal: boolean) => void;
  onHandleDelAid: (delId: number) => void;
  onClose: () => void;
}

const MoreOperation: React.FC<MoreOperationProps> = ({
  member,
  onHandlerDelete,
  onHandleDelAid,
  onClose,
}) => {
  const handleDelete = () => {
    onHandlerDelete(true);
    onHandleDelAid(member.uid);
    onClose();
  };
  console.log(member);

  const onHandleSetGraduate = async () => {
    if (member.isGraduate === IsGraduate.NotGraduated) {
      try {
        await postChangeInfo({
          ...member,
          isGraduate: IsGraduate.Graduated,
        });
        message.success(`${member.name}设置为已毕业成功，请刷新页面`);
        onClose();
      } catch (err) {
        console.log('设置为已毕业失败：', err);
        message.error('设置为已毕业失败');
      }
    } else if (member.isGraduate === IsGraduate.Graduated) {
      try {
        await postChangeInfo({
          ...member,
          isGraduate: IsGraduate.NotGraduated,
        });
      } catch (err) {
        console.log('恢复为未毕业失败：', err);
        message.error('恢复为未毕业失败');
      }
    }
  };

  const onHandleReset = async (username) => {
    try {
      await resetPassWord(username);
      message.success(`${member.name}重置密码成功`);
      onClose();
    } catch (err) {
      console.log('重置密码：', err);
      message.error('重置密码');
    }
  };

  return (
    <>
      <div className="mem-item-operation-overlay" onClick={onClose}></div>
      <div className="mem-item-operation-box">
        <div className="mem-item-operation-close" onClick={onClose}>
          ×
        </div>
        <div className="mem-item-operation-title">
          更多操作-用户：{member.name}
        </div>
        <div className="mem-item-operation-item" onClick={handleDelete}>
          删除该用户
        </div>
        <div className="mem-item-operation-item" onClick={onHandleSetGraduate}>
          设置为
          {member.isGraduate === IsGraduate.NotGraduated ? '已毕业' : '未毕业'}
        </div>
        <div
          className="mem-item-operation-item"
          onClick={() => {
            onHandleReset(member.username);
          }}
        >
          恢复默认密码
        </div>
      </div>
    </>
  );
};

const Memlist: React.FC<MemlistProps> = ({
  member,
  onHandlerDelete,
  onHandleDelAid,
  // onHandleShowPeohome,
}) => {
  const [peohomeShow, setPeohomeShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const { status } = useAuth();
  const [openOperation, setOpenOperation] = useState<boolean>(false);
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
          <>
            <button
              className="delete-button"
              onClick={() => {
                setOpenOperation(true);
              }}
            >
              更多
            </button>
          </>
        )}
      </div>
      {openOperation && (
        <MoreOperation
          member={member}
          onHandlerDelete={onHandlerDelete}
          onHandleDelAid={onHandleDelAid}
          onClose={() => setOpenOperation(false)}
        />
      )}
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
              graduateImg={member.graduateImg}
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
