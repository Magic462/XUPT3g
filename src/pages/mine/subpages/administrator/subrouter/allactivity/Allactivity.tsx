import './Allactivity.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { message } from '@/utils/message';
import Footerpagination from '@/components/FooterPagination';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { deleteActivity, getAllArticleInfo } from '@/services/activities';
import { Article } from '@/types/article';

interface RenderActivityItemProps {
  item: Article;
  onOpenDeleteModal: () => void;
  onHandleDelAid: (delId: number) => void;
}

const RenderActivityItem: React.FC<RenderActivityItemProps> = ({
  item,
  onOpenDeleteModal,
  onHandleDelAid,
}) => {
  const navigate = useNavigate();

  return (
    <div className="activity-item-box" key={item.aid}>
      <div className="activity-item-info-box">
        <div className="activity-item-time">发布于{item.time}</div>
        <p className="activity-item-title">{item.title}</p>
        <div className="activity-item-summary">{item.summary}</div>
      </div>
      <div className="activity-img-box">
        <div className="activity-img-box-cover">
          <img src={item.img} alt="" />
        </div>
      </div>
      <div className="activity-toedit-btns">
        <button
          className="activity-edit-btn"
          onClick={() => navigate(`/mine/admin/postactivity?aid=${item.aid}`)}
        >
          编辑
        </button>
        <button
          className="activity-delete-btn"
          onClick={() => {
            onOpenDeleteModal();
            onHandleDelAid(item.aid);
          }}
        >
          删除
        </button>
      </div>
    </div>
  );
};

const Allactivity = () => {
  const [activitiesData, setActivitiesData] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [delId, setDelId] = useState<number>();

  const delActivityResponse = async (delId: number) => {
    try {
      const response = await deleteActivity(delId);
      console.log(response);
      await adminGetActivities();
      setIsDeleteModal(false);
      message.success('删除成功');
    } catch (err) {
      console.log(err);
    }
  };

  const adminGetActivities = useCallback(async () => {
    try {
      const res = await getAllArticleInfo(currentPage);
      setActivitiesData(res.activities);
      setPageNum(res.pageNum);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [currentPage]);

  useEffect(() => {
    adminGetActivities();
  }, [adminGetActivities]);

  return (
    <div className="all-activity-container">
      <div className="each-func-title">
        <h2 className="">
          <i className={`each-func-icons iconfont icon-dongtai`}></i>
          活动列表
        </h2>
      </div>
      <div className="activity-item-container">
        {activitiesData &&
          activitiesData.map((item) => (
            <RenderActivityItem
              key={item.aid}
              item={item}
              onOpenDeleteModal={() => setIsDeleteModal(true)}
              onHandleDelAid={setDelId}
            />
          ))}
      </div>

      <div className="admin-pagination">
        <Footerpagination
          pageNum={pageNum}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        ></Footerpagination>
      </div>
      {isDeleteModal && (
        <DeleteConfirmModal
          delId={delId}
          remindMessage="该文章是否删除"
          onHandlerDelete={setIsDeleteModal}
          onDelete={delActivityResponse}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default Allactivity;
