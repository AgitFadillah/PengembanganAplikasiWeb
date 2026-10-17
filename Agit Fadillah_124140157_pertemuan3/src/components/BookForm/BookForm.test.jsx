import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;

describe('BookForm Component', () => {
  test('merender form dengan benar', () => {
    const onAdd = mockFn();
    render(<BookForm onAdd={onAdd} />);
    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tambah buku/i })).toBeInTheDocument();
  });

  test('menampilkan error saat submit form kosong', () => {
    const onAdd = mockFn();
    render(<BookForm onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));
    expect(screen.getByText(/judul buku wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/nama penulis wajib diisi/i)).toBeInTheDocument();
  });

  test('memanggil onAdd dengan data yang valid saat form di-submit', () => {
    const onAdd = mockFn();
    render(<BookForm onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: 'Buku Test' } });
    fireEvent.change(screen.getByLabelText(/penulis/i), { target: { value: 'Penulis Test' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Buku Test', author: 'Penulis Test', status: 'owned' })
    );
  });
});