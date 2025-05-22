import React, { useState, useEffect } from 'react';
// import { lazy, Suspense,useRef } from 'react';
import Memlist from '@/pages/mine/subpages/administrator/subrouter/allmember/components/Memlist';
// const Memlist = lazy(() => import('@/components/Memlist'));
import './Allmember.scss';
import { useActiveItem } from '@/hooks/useActiveItem';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { getMembers } from '@/services/members';
import { Members } from '@/types/members';
import FooterPagination from '@/components/FooterPagination';
import { Direction } from '@/types/direction';
import { getAllDirection } from '@/services/directions';

// 每页显示的成员数量
const ITEMS_PER_PAGE = 10;

const Allmember: React.FC = () => {
  const { activeItem: activeGroup, handleItemClick: handleGroupClick } =
    useActiveItem<string>('');

  const { activeItem: activeGraduate, handleItemClick: handleGraduateClick } =
    useActiveItem<string>('graduated');

  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [filterMembers, setFilterMembers] = useState<Members[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTeams, setAllTeams] = useState<Direction[]>([]);
  const [team, setTeam] = useState<string>();
  const [isGraduate, setIsGraduate] = useState<boolean>();
  // const [other, setOther] = useState<Direction[]>([]);

  // 获取组别信息
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // const existRes = await getAllDirection(true);
        // setTeams(existRes);
        // const noExistRes = await getAllDirection(false);
        // setOther(noExistRes);
        const response = await getAllDirection();
        setAllTeams(response);
      } catch (err) {
        console.log('获取组别信息失败：', err);
      }
    };

    fetchTeams();
  }, []);

  // 分页获取成员信息
  useEffect(() => {
    const fetchMembers = async () => {
      console.log(currentPage);
      try {
        const response = await getMembers(
          isGraduate,
          team,
          undefined,
          ITEMS_PER_PAGE,
          currentPage
        );
        setFilterMembers(response.data);
        setPageNum(Math.ceil(response.total / ITEMS_PER_PAGE));
        console.log(Math.ceil(response.total / ITEMS_PER_PAGE));
      } catch (err) {
        console.log('获取成员信息失败：', err);
      }
    };

    fetchMembers();
  }, [currentPage, team, isGraduate]);

  useEffect(() => {
    console.log(pageNum);
  }, [pageNum]);

  return (
    <div className="allmember-container">
      <div className="each-func-title">
        <h2 className="allmember-title">
          <i className={`each-func-icons iconfont icon-chengyuan`}></i>
          成员列表
        </h2>
      </div>
      <div className="filter-buttons">
        <div className="filter-teams">
          {allTeams.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handleGroupClick(item.name);
                setTeam(item.name);
              }}
              className={`filter-button filter-btn-group ${activeGroup === item.name ? 'active' : ''}`}
            >
              {item.name}
            </button>
          ))}
          {/* 曾经存在的组
          <button
            onClick={() => {
              handleGroupClick('other');
            }}
            className={`filter-button filter-btn-group ${activeGroup === 'other' ? 'active' : ''}`}
          >
            other
          </button> */}
        </div>
        <div className="filter-ifgraduate">
          <button
            onClick={() => {
              handleGraduateClick('graduated');
              setIsGraduate(true);
            }}
            className={`filter-button ${activeGraduate === 'graduated' ? 'active' : ''}`}
          >
            已毕业
          </button>
          <button
            onClick={() => {
              handleGraduateClick('not-graduate');
              setIsGraduate(false);
            }}
            className={`filter-button ${activeGraduate === 'not-graduate' ? 'active' : ''}`}
          >
            未毕业
          </button>
        </div>
      </div>
      <div className="allmember-item-box">
        {filterMembers.map((item, index) => (
          <Memlist
            key={index}
            username={item.username}
            name={item.name}
            team={item.team}
            graduateImg={item.graduateImg}
            signature={item.signature}
            isGraduate={item.isGraduate}
            // 控制删除弹窗
            onHandlerDelete={setIsDeleteModal}
          />
        ))}
      </div>
      {/* 翻页 */}
      {pageNum > 1 && (
        <div className="admin-pagination">
          {pageNum > 0 && (
            <FooterPagination
              pageNum={pageNum}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
      {/* <FooterPagination
        pageNum={pageNum}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      /> */}

      {/* 确认删除弹窗 */}
      {isDeleteModal && (
        <DeleteConfirmModal
          remindMessage="确认删除该成员吗"
          onHandlerDelete={setIsDeleteModal}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default Allmember;
