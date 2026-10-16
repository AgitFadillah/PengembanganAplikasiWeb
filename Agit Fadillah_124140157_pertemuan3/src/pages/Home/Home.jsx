import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import { useBooks } from '../../context/BookContext';
import './Home.css';

function Home() {
  const { addBook, stats } = useBooks();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleAddBook = (book) => {
    try {
      addBook(book);
      setError('');
    } catch (err) {
      setError('Gagal menambahkan buku.');
    }
  };

  return (
    <div className="home">
      <Header
        title="Manajemen Buku Pribadi"
        description="Catat buku yang Anda miliki, sedang baca, atau ingin beli"
      />
      <main className="container">
        <div className="stats-bar">
          <p>Total Buku: <strong>{stats.total}</strong></p>
          <p>Milik: <strong>{stats.owned}</strong> | Dibaca: <strong>{stats.reading}</strong> | Beli: <strong>{stats.purchased}</strong></p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <BookForm onAdd={handleAddBook} />
        <BookFilter
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <BookList filterStatus={filterStatus} searchQuery={searchQuery} />
      </main>
    </div>
  );
}

export default Home;