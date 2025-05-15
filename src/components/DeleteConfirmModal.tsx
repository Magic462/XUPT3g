import './DeleteConfirmModal.scss';
import '@/assets/icons/font_ponx0ykgm9/iconfont.css';

interface DeleteConfirmProps {
  remindMessage: string;
  onHandlerDelete: (isDeleteModal: boolean) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmProps> = ({
  remindMessage,
  onHandlerDelete,
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
          慎重考虑是否删除
        </div>

        <div className="delete-remind-tips">
          {remindMessage || '删除信息：'}
        </div>

        <div className="action-buttons">
          <button
            className="cancel-button"
            onClick={() => onHandlerDelete(false)}
          >
            取消
          </button>
          <button
            className="confirm-button"
            onClick={() => onHandlerDelete(true)}
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
