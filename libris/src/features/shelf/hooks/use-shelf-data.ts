import { useMemo, useState } from 'react';
import { useShelfStore } from '../models';
import type { Book } from '@/shared';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const useGetShelfData = () => {
  const { books, removeBook, updateStatus } = useShelfStore();

  const [sortBy, setSortBy] = useState<keyof Book>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { t } = useTranslation('shelf');

  const sortedBooks = useMemo(() => {
    const arrBooks = [...books];

    switch (sortBy) {
      case 'title':
        arrBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'authors':
        arrBooks.sort((a, b) =>
          (a.authors || '').localeCompare(b.authors || ''),
        );
        break;
      case 'publishedDate':
        arrBooks.sort((a, b) =>
          (a.publishedDate || '').localeCompare(b.publishedDate || ''),
        );
        break;
      case 'status':
        arrBooks.sort((a, b) => a.status.localeCompare(b.status));
        break;

      default:
        arrBooks;
        break;
    }

    if (sortDirection === 'desc') {
      arrBooks.reverse();
    }

    return arrBooks;
  }, [books, sortBy, sortDirection]);

  const handleRemoveBook = (bookId: string) => {
    removeBook(bookId);
    toast.success(t('shelf.bookRemoved'));
  };

  const handleUpdateStatus = (bookId: string, newStatus: Book['status']) => {
    updateStatus(bookId, newStatus);
    toast.success(t('shelf.statusUpdated'));
  };

  return {
    t,
    sortedBooks,
    handleRemoveBook,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    handleUpdateStatus,
  };
};
