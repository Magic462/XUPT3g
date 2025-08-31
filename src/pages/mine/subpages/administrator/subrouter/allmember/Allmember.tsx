import React, { useState, useEffect, useCallback } from 'react';
// import { lazy, Suspense,useRef } from 'react';
import Memlist from '@/components/Memlist';
import './Allmember.scss';
import { useActiveItem } from '@/hooks/useActiveItem';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import FooterPagination from '@/components/FooterPagination';
import Peohome from '@/components/Peohome';
import { Members } from '@/types/members';
import { Direction } from '@/types/direction';
import { delMember, getMembers, getMember } from '@/services/members';
import { getAllDirection } from '@/services/directions';
import { message } from '@/utils/message';
import '@/assets/icons/font_rkifxavxcn/iconfont.css';
import { useNavigate } from 'react-router-dom';

// 每页显示的成员数量
const ITEMS_PER_PAGE = 10;

// 防抖函数
const debounce = (func: (...args) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
const Allmember: React.FC = () => {
  const { activeItem: activeGroup, handleItemClick: handleGroupClick } =
    useActiveItem<string>('');

  const { activeItem: activeGraduate, handleItemClick: handleGraduateClick } =
    useActiveItem<string>('');

  const navigate = useNavigate();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [delId, setDelId] = useState<number>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Members[]>();
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Members | null>(null);

  const [filterMembers, setFilterMembers] = useState<Members[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTeams, setAllTeams] = useState<Direction[]>([]);
  const [team, setTeam] = useState<string>();
  const [isGraduate, setIsGraduate] = useState<boolean>();

  // 获取组别信息
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllDirection();
        setAllTeams(response);
      } catch (err) {
        console.log('获取组别信息失败：', err);
        message.warning('获取组别信息失败');
      }
    };

    fetchTeams();
  }, []);

  const fetchMembers = useCallback(async () => {
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
    } catch (err) {
      console.log('获取成员信息失败：', err);
      message.warning('获取成员信息失败');
    }
  }, [currentPage, team, isGraduate]);

  // 分页获取成员信息
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const delMemberResponse = async () => {
    try {
      const response = await delMember(delId);
      console.log(response);
      message.success('删除成功');
      await fetchMembers();
      setIsDeleteModal(false);
      return;
    } catch (err) {
      message.error('删除失败');
      console.log('删除成员失败', err);
    }
  };

  // 处理搜索
  const handleSearch = async (query: string) => {
    if (query.trim()) {
      try {
        const response = await getMember(query.trim());
        setSearchResults(response);
        setShowSearchResults(true);
      } catch (err) {
        console.log('搜索成员失败：', err);
        message.warning('搜索成员失败');
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  // 使用useCallback和防抖包装搜索函数
  const debouncedSearch = useCallback(
    debounce((query: string) => handleSearch(query), 300),
    []
  );

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 处理搜索结果点击
  const handleSearchResultClick = (member: Members) => {
    setSelectedMember(member);
    setShowMemberInfo(true);
  };

  return (
    <div className="allmember-container">
      <div className="each-func-title">
        <h2 className="allmember-title">
          <i className={`each-func-icons iconfont icon-chengyuan`}></i>
          成员列表
        </h2>
      </div>
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索成员..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <i className="iconfont icon-sousuo search-icon"></i>
        </div>
        {showSearchResults && (
          <div className="search-results">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((member) => (
                <div className="search-result-item-overlay">
                  <div
                    key={member.uid}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(member)}
                  >
                    <span className="searchResults-name">{member.name}</span>
                    <span className="searchResults-team">{member.team}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-result-empty">抱歉，未查询到该用户</div>
            )}
          </div>
        )}
        {showMemberInfo && selectedMember && (
          <div className="search-member-info-overlay">
            <div className="search-member-info-container">
              <Peohome
                portrait={selectedMember.portrait}
                gender={selectedMember.gender}
                classGrade={selectedMember.classGrade}
                year={selectedMember.year}
                tel={selectedMember.tel}
                isGraduate={selectedMember.isGraduate === 1 ? true : false}
                username={selectedMember.username}
                name={selectedMember.name}
                team={selectedMember.team}
                mienImg={selectedMember.mienImg}
                signature={selectedMember.signature}
                company={selectedMember.company}
                graduateImg={selectedMember.graduateImg}
              />
              <div
                className="search-member-detail-close"
                onClick={() => {
                  setShowMemberInfo(false);
                  setSelectedMember(null);
                }}
              >
                关闭
              </div>
              <div
                className="search-member-detail-edit"
                onClick={() =>
                  navigate(
                    `/mine/user/changeinfo?username=${selectedMember.username}`
                  )
                }
              >
                前往编辑
              </div>
            </div>
          </div>
        )}
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
        {filterMembers.map((item) => (
          <Memlist
            key={item.uid}
            member={item}
            // 控制删除弹窗
            onHandlerDelete={setIsDeleteModal}
            onHandleDelAid={setDelId}
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
      {/* 确认删除弹窗 */}
      {isDeleteModal && (
        <DeleteConfirmModal
          delId={delId}
          remindMessage="确认删除该成员吗"
          onHandlerDelete={setIsDeleteModal}
          onDelete={delMemberResponse}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default Allmember;
