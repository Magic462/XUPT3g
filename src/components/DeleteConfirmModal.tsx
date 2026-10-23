import './DeleteConfirmModal.scss';
import '@/assets/icons/font_ponx0ykgm9/iconfont.css';

interface DeleteConfirmProps {
  delId: number;
  remindMessage: string;
  onHandlerDelete: (isDeleteModal: boolean) => void;
  onDelete: (delId: number) => void;
  busy?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmProps> = ({
  delId,
  remindMessage,
  onHandlerDelete,
  onDelete,
  busy = false,
}) => {
  return (
    <div className="delete-confirm-container">
      <div
        className="modal-overlay"
        onClick={() => !busy && onHandlerDelete(false)}
      ></div>

      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label="删除确认"
      >
        <div className="delete-title">
          <i className="iconfont icon-jinggao"></i>
          慎重考虑
        </div>

        <div className="delete-remind-tips">
          {remindMessage || '删除信息：'}
        </div>

        <div className="action-buttons">
          <button
            className="confirm-button"
            disabled={busy}
            onClick={() => onDelete(delId)}
          >
            {busy ? '正在删除…' : '确认'}
          </button>
          <button
            className="cancel-button"
            disabled={busy}
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
