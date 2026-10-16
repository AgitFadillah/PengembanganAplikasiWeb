import { useMemo } from 'react';

function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const owned = books.filter(b => b.status === 'owned').length;
    const reading = books.filter(b => b.status === 'reading').length;
    const purchased = books.filter(b => b.status === 'purchased').length;

    return {
      total,
      owned,
      reading,
      purchased,
      completionRate: total > 0 ? (reading / total) * 100 : 0
    };
  }, [books]);
}

export default useBookStats;