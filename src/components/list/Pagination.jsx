import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.css';

export const Pagination = (props) => {
  const { totalPages, page, handlePaginationClick } = props;

  return (
    <div>
      <button
        className="Pagination-button"
        onClick={() => handlePaginationClick('prev')}
        disabled={page <= 1}
      >
        &larr;
      </button>
      <span className="Pagination-info">
        page <b>{page}</b> of <b>{totalPages}</b>
      </span>
      <button
        className="Pagination-button"
        onClick={() => handlePaginationClick('next')}
        disabled={page >= totalPages}
      >
        &rarr;
      </button>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;
