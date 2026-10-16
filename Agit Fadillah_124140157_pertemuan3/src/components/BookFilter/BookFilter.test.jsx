import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;

describe('BookFilter Component', () => {
  test('merender filter dan input pencarian', () => {
    const onFilterChange = mockFn();
    const onSearchChange = mockFn();

    render(
      <BookFilter
        filterStatus="all"
        onFilterChange={onFilterChange}
        searchQuery=""
        onSearchChange={onSearchChange}
      />
    );

    expect(screen.getByTestId('filter-select')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('memanggil onFilterChange saat filter diubah', () => {
    const onFilterChange = mockFn();
    const onSearchChange = mockFn();

    render(
      <BookFilter
        filterStatus="all"
        onFilterChange={onFilterChange}
        searchQuery=""
        onSearchChange={onSearchChange}
      />
    );

    fireEvent.change(screen.getByTestId('filter-select'), { target: { value: 'owned' } });
    expect(onFilterChange).toHaveBeenCalledWith('owned');
  });

  test('memanggil onSearchChange saat pencarian diubah', () => {
    const onFilterChange = mockFn();
    const onSearchChange = mockFn();

    render(
      <BookFilter
        filterStatus="all"
        onFilterChange={onFilterChange}
        searchQuery=""
        onSearchChange={onSearchChange}
      />
    );

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'React' } });
    expect(onSearchChange).toHaveBeenCalledWith('React');
  });
});