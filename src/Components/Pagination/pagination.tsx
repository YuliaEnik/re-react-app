import React from 'react';
import styles from './style.module.scss';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  return (
    <div className={styles.pagination} data-testid="pagination">
      <button onClick={() => handlePrevPage()} disabled={page === 1} data-testid="prev-button">
        &laquo;
      </button>
      <span> Page {page} </span>
      <button onClick={() => handleNextPage()} disabled={page === totalPages} data-testid="next-button">
        &raquo;
      </button>
    </div>
  );
};
