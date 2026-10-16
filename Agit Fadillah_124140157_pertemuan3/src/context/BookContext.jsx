import React, { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext();

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books_data', []);
  const stats = useBookStats(books);

  const addBook = useCallback((book) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      title: book.title.trim(),
      author: book.author.trim()
    };
    setBooks(prev => [newBook, ...prev]);
  }, []);

  const deleteBook = useCallback((id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  }, []);

  const updateBook = useCallback((id, updatedBook) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updatedBook } : b));
  }, []);

  const value = {
    books,
    addBook,
    deleteBook,
    updateBook,
    stats
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export default BookContext;