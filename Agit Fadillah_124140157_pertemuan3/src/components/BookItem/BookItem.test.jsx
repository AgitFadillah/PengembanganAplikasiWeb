import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from './BookItem';

const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;

describe('BookItem Component', () => {
  const dummyBook = {
    id: '1',
    title: 'Buku React Dasar',
    author: 'Agit Fadillah',
    status: 'owned',
  };

  test('merender judul dan penulis buku', () => {
    const onDelete = mockFn();
    const onEdit = mockFn();
    render(<BookItem book={dummyBook} onDelete={onDelete} onEdit={onEdit} />);
    expect(screen.getByText('Buku React Dasar')).toBeInTheDocument();
    expect(screen.getByText(/oleh Agit Fadillah/i)).toBeInTheDocument();
  });

  test('memanggil onDelete dengan id yang benar saat tombol hapus diklik', () => {
    const onDelete = mockFn();
    const onEdit = mockFn();
    render(<BookItem book={dummyBook} onDelete={onDelete} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: /hapus buku react dasar/i }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  test('memanggil onEdit dengan objek buku saat tombol edit diklik', () => {
    const onDelete = mockFn();
    const onEdit = mockFn();
    render(<BookItem book={dummyBook} onDelete={onDelete} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: /edit buku react dasar/i }));
    expect(onEdit).toHaveBeenCalledWith(dummyBook);
  });
});