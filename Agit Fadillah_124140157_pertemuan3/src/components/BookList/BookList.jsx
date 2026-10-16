import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookItem from '../BookItem/BookItem';
import BookForm from '../BookForm/BookForm';
import { useBooks } from '../../context/BookContext';
import './BookList.css';

function BookList({ filterStatus, searchQuery }) {
  const { books, deleteBook, updateBook } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState('');

  const handleDelete = (id) => {
    setError('');
    try {
      deleteBook(id);
    } catch (err) {
      setError('Gagal menghapus buku.');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdate = (updatedBook) => {
    try {
      updateBook(editingBook.id, updatedBook);
      setEditingBook(null);
    } catch (err) {
      setError('Gagal memperbarui buku.');
    }
  };

  const filteredBooks = books
    .filter(book => {
      if (filterStatus === 'all') return true;
      return book.status === filterStatus;
    })
    .filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (editingBook) {
    return (
      <div className="book-list-container">
        {error && <p className="error">{error}</p>}
        <BookForm onAdd={handleUpdate} editingBook={editingBook} />
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="book-list-container">
        <p className="empty-state">Tidak ada buku ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      {error && <p className="error">{error}</p>}
      <div className="book-list">
        {filteredBooks.map(book => (
          <BookItem
            key={book.id}
            book={book}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

BookList.propTypes = {
  filterStatus: PropTypes.oneOf(['all', 'owned', 'reading', 'purchased']).isRequired,
  searchQuery: PropTypes.string,
};

BookList.defaultProps = {
  searchQuery: '',
};

export default BookList;