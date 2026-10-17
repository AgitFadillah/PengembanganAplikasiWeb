import React from 'react';
import PropTypes from 'prop-types';
import './BookItem.css';

const STATUS_LABELS = {
  owned: { text: 'Milik', className: 'status-owned' },
  reading: { text: 'Dibaca', className: 'status-reading' },
  purchased: { text: 'Beli', className: 'status-purchased' },
};

function BookItem({ book, onDelete, onEdit }) {
  const status = STATUS_LABELS[book.status] || STATUS_LABELS.owned;
  return (
    <div className="book-item" data-testid="book-item">
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">oleh {book.author}</p>
        <span className={`status-badge ${status.className}`}>{status.text}</span>
      </div>
      <div className="book-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(book)}
          aria-label={`Edit ${book.title}`}
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(book.id)}
          aria-label={`Hapus ${book.title}`}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['owned', 'reading', 'purchased']).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BookItem;