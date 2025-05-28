import React, { useEffect, useState } from 'react';
import './Editdirection.scss';
import '@/assets/icons/font_38lh8lcfn7/iconfont.css';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { getAllDirection } from '@/services/directions';
import { Direction } from '@/types/direction';
import { message } from '@/utils/message';

interface RenderDirectionItemProps {
  item: Direction;
  toggleEdit: () => void;
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleDelTid: (delId: number) => void;
}

const RenderDirectionItem: React.FC<RenderDirectionItemProps> = ({
  item,
  toggleEdit,
  setIsDeleteModal,
  onHandleDelTid,
}) => {
  return (
    <div className="direction-item-box">
      <div className="direction-info-box">
        <div className="direction-info-top-box">
          <div className="direction-name">{item.name}</div>
          <div
            className={`direction-status ${
              item.isExist ? 'exist-yes' : 'exist-no'
            } `}
          >
            {item.isExist ? '现有' : '现无'}
          </div>
        </div>
        <div className="direction-brefinfo">简介: {item.brefInfo}</div>
      </div>
      <div className="direction-edit-btns">
        <button
          className="direction-edit-btn"
          onClick={() => {
            toggleEdit();
          }}
        >
          编辑
        </button>
        <button
          className="direction-move-btn"
          onClick={() => {
            setIsDeleteModal(true);
            onHandleDelTid(item.tid);
          }}
        >
          移除
        </button>
      </div>
    </div>
  );
};

const Editdirection = () => {
  const [edit, setEdit] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [delId, setDelId] = useState<number>();

  const fetchDirection = async () => {
    try {
      const res = await getAllDirection();
      console.log(res);
      setDirections(res);
    } catch (err) {
      console.log('获取方向信息失败：', err);
    }
  };

  useEffect(() => {
    fetchDirection();
  }, []);

  const delDirectionResponse = async (delId: number) => {
    try {
      const response = await delDirectionResponse(delId);
      console.log(response);
      message.success('移除成功');
      await fetchDirection();
      setIsDeleteModal(false);
    } catch (err) {
      message.error('移除失败');
      console.log('移除失败：', err);
    }
  };
  return (
    <div className="edit-direction-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-guanli`}></i>
          编辑实验室方向
        </h2>
      </div>
      {/* 添加方向按钮 */}
      <div className="edit-diretion-add-btn">
        <button
          onClick={() => {
            setEdit(!edit);
          }}
          className={`${edit ? 'direction-add-active' : ''}`}
        >
          添加方向
        </button>
      </div>
      {/* 填写增加方向信息 */}
      {edit && (
        <>
          <div className="edit-direction-add-box-cover"></div>
          <div className="edit-direction-add-box">
            <div className="add-direction-item-left-box">
              <div className="add-direction-item">
                <label htmlFor="">方向名称:</label>
                <input type="text" />
              </div>
              <div className="add-direction-item">
                <label htmlFor="">方向简介:</label>
                <textarea name="" id=""></textarea>
              </div>
              <div className="add-direction-post-box">
                <button className="add-direction-sure">确认提交</button>
              </div>
            </div>
            <div className="add-direction-item-right-box">
              <div className="add-direction-item add-direvtion-plan-box">
                <label htmlFor="">方向培养:</label>
                <div className="">ballalblalblalblalblallblalbal</div>
              </div>
            </div>

            <div
              className="edit-direction-delete-box"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <i className="iconfont icon-chahao"></i>
            </div>
          </div>
        </>
      )}
      {/* 各个方向list */}
      <div className="direction-item-container">
        {directions.map((item) => (
          // Renderdirectionitem(
          //   item,
          //   () => setEdit(!edit),
          //   setIsDeleteModal
          //   // onHandlerDelete(setIsDeleteModal)
          // )
          <RenderDirectionItem
            key={item.tid}
            item={item}
            toggleEdit={() => setEdit(!edit)}
            setIsDeleteModal={setIsDeleteModal}
            onHandleDelTid={setDelId}
          ></RenderDirectionItem>
        ))}
      </div>
      {/* 确认移除弹窗 */}
      {isDeleteModal && (
        <DeleteConfirmModal
          delId={delId}
          remindMessage="是否将其设置为已不存在"
          onHandlerDelete={setIsDeleteModal}
          onDelete={delDirectionResponse}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default Editdirection;
