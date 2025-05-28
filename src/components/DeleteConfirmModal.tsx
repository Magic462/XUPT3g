import './DeleteConfirmModal.scss';
import '@/assets/icons/font_ponx0ykgm9/iconfont.css';

interface DeleteConfirmProps {
  delId: number;
  remindMessage: string;
  onHandlerDelete: (isDeleteModal: boolean) => void;
  onDelete: (delId: number) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmProps> = ({
  delId,
  remindMessage,
  onHandlerDelete,
  onDelete,
}) => {
  return (
    <div className="delete-confirm-container">
      <div
        className="modal-overlay"
        onClick={() => onHandlerDelete(false)}
      ></div>

      <div className="modal-content">
        <div className="delete-title">
          <i className="iconfont icon-jinggao"></i>
          慎重考虑
        </div>

        <div className="delete-remind-tips">
          {remindMessage || '删除信息：'}
        </div>

        <div className="action-buttons">
          <button className="confirm-button" onClick={() => onDelete(delId)}>
            确认
          </button>
          <button
            className="cancel-button"
            onClick={() => onHandlerDelete(false)}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
