import { getAllArticleInfo } from '@/services/activities';
import './Allactivity.scss';
import { useEffect, useState } from 'react';
import { Article } from '@/types/article';
import Footerpagination from '@/components/FooterPagination';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

const Renderactivityitem = (
  item: Article,
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
        <button className="activity-edit-btn">编辑</button>
        <button
          className="activity-delete-btn"
          onClick={() => setIsDeleteModal(true)}
        >
          删除
        </button>
      </div>
    </div>
  );
};

const Allactivity = () => {
  const [activitiesData, setActivitiesData] = useState<Article[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  useEffect(() => {
    const adminGetActivities = async () => {
      try {
        const res = await getAllArticleInfo(currentPage);
        setActivitiesData(res.activities);
        setPageNum(res.pageNum);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    adminGetActivities();
  }, [currentPage]);

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
          activitiesData.map((item) =>
            Renderactivityitem(item, setIsDeleteModal)
          )}
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
          remindMessage="该文章是否删除"
          onHandlerDelete={setIsDeleteModal}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default Allactivity;
