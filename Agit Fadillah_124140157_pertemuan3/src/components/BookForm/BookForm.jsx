import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const STATUS_OPTIONS = [
  { value: 'owned', label: 'Milik' },
  { value: 'reading', label: 'Sedang Dibaca' },
  { value: 'purchased', label: 'Ingin Dibeli' },
];

function BookForm({ onAdd, editingBook = null }) {
  const [title, setTitle] = useState(editingBook?.title || '');
  const [author, setAuthor] = useState(editingBook?.author || '');
  const [status, setStatus] = useState(editingBook?.status || 'owned');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Judul buku wajib diisi';
    if (!author.trim()) newErrors.author = 'Nama penulis wajib diisi';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onAdd({ title: title.trim(), author: author.trim(), status });
    if (!editingBook) {
      setTitle('');
      setAuthor('');
      setStatus('owned');
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} aria-label="Form buku">
      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul buku..."
          className={errors.title ? 'error' : ''}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && <span id="title-error" className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Masukkan nama penulis..."
          className={errors.author ? 'error' : ''}
          aria-describedby={errors.author ? "author-error" : undefined}
        />
        {errors.author && <span id="author-error" className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="status-select"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn">
        {editingBook ? 'Perbarui Buku' : 'Tambah Buku'}
      </button>
    </form>
  );
}

BookForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['owned', 'reading', 'purchased']),
  }),
};

export default BookForm;