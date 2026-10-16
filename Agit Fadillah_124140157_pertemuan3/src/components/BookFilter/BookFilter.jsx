import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

const FILTER_OPTIONS = [
  { value: 'all', label: 'Semua Buku' },
  { value: 'owned', label: 'Milik' },
  { value: 'reading', label: 'Sedang Dibaca' },
  { value: 'purchased', label: 'Ingin Dibeli' },
];

function BookFilter({ filterStatus, onFilterChange, searchQuery, onSearchChange }) {
  return (
    <div className="book-filter" aria-label="Filter dan pencarian">
      <div className="filter-group">
        <label htmlFor="filter-status">Filter Status:</label>
        <select
          id="filter-status"
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
          data-testid="filter-select"
        >
          {FILTER_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group search-group">
        <label htmlFor="search-query">Cari:</label>
        <input
          type="text"
          id="search-query"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari judul atau penulis..."
          className="search-input"
          data-testid="search-input"
        />
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  filterStatus: PropTypes.oneOf(['all', 'owned', 'reading', 'purchased']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;