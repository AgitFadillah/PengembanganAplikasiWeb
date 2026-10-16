import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('mengembalikan nilai awal ketika tidak ada data di localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('membaca nilai yang ada di localStorage', () => {
    localStorage.setItem('test_key', JSON.stringify('stored_value'));
    const { result } = renderHook(() => useLocalStorage('test_key', 'default'));
    expect(result.current[0]).toBe('stored_value');
  });

  test('menyimpan nilai baru ke localStorage dan memperbarui state', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', 'initial'));

    act(() => {
      result.current[1]('new_value');
    });

    expect(result.current[0]).toBe('new_value');
    expect(localStorage.getItem('test_key')).toBe(JSON.stringify('new_value'));
  });

  test('menggabungkan objek ke localStorage dengan benar', () => {
    const { result } = renderHook(() => useLocalStorage('book_key', []));

    act(() => {
      result.current[1]([{ title: 'React Book' }]);
    });

    expect(result.current[0]).toHaveLength(1);
    const stored = JSON.parse(localStorage.getItem('book_key'));
    expect(stored[0].title).toBe('React Book');
  });
});