import './footerpagination.scss';
import { useState, useEffect } from 'react';
import React from 'react';

interface FooterpaginationProps {
  pageNum: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}
const Footerpagination: React.FC<FooterpaginationProps> = ({
  pageNum,
  onPageChange,
  currentPage,
}) => {
  // const [currentPage, onPageChange] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePagination = () => {
    const pages: (number | string)[] = [];

    if (pageNum <= 5) {
      for (let i = 1; i <= pageNum; i++) pages.push(i);
      return pages;
    }

    const showRange = isMobile ? 1 : 2;
    const start = Math.max(2, currentPage - showRange);
    const end = Math.min(pageNum - 1, currentPage + showRange);

    pages.push(1); // 首页

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < pageNum - 1) pages.push('...');

    pages.push(pageNum); // 尾页

    return pages;
  };

  return (
    <>
      <button
        className="page-button-left"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="iconfont icon-youshuangxianjiantou1"></i>
      </button>

      <div className="page-button-pages">
        {generatePagination().map((item, index) => (
          <button
            key={index}
            className={`page-button ${item === currentPage ? 'active' : ''} ${item === '...' ? 'ellipsis' : ''}`}
            onClick={() => typeof item === 'number' && handlePageChange(item)}
            disabled={item === '...'}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        className="page-button-right"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageNum}
      >
        <i className="iconfont icon-youshuangxianjiantou"></i>
      </button>
    </>
  );
};

export default React.memo(Footerpagination);
