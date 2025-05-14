import './footerpagination.scss';
import { useState } from 'react';

const totalPages = 20;

const Footerpagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <>
      <button
        className="page-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        上一页
      </button>

      {getPageNumbers().map((number) => (
        <button
          key={number}
          className={`page-button ${currentPage === number ? 'active' : ''}`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="page-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一页
      </button>
    </>
  );
};

export default Footerpagination;
