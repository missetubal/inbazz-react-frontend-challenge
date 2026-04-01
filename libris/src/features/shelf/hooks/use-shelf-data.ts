import { useMemo, useState } from 'react';
import { useShelfStore } from '../models';
import type { Book } from '@/shared';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const useGetShelfData = () => {
  const { books, removeBook, updateStatus } = useShelfStore();

  const [sortBy, setSortBy] = useState<keyof Book>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { t } = useTranslation('shelfAndDiscover');

  const [isRemoveConfirmModalOpen, setIsRemoveConfirmModalOpen] =
    useState(false);
  const [bookToRemoveId, setBookToRemoveId] = useState<string | null>(null);

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
        arrBooks.sort((a, b) => a.status.localeCompare(b.status)).reverse();
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
    setIsRemoveConfirmModalOpen(true);
    setBookToRemoveId(bookId);
  };

  const handleUpdateStatus = (bookId: string, newStatus: Book['status']) => {
    updateStatus(bookId, newStatus);
    toast.success(t('shelf.toast.statusUpdated'));
  };

  const closeRemoveConfirmModal = () => {
    setIsRemoveConfirmModalOpen(false);
    setBookToRemoveId(null);
  };

  const handleConfirmRemoveBook = () => {
    if (bookToRemoveId) {
      removeBook(bookToRemoveId);
      closeRemoveConfirmModal();
      toast.success(t('shelf.toast.removed'));
    }
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
    handleConfirmRemoveBook,
    closeRemoveConfirmModal,
    isRemoveConfirmModalOpen,
    bookToRemoveId,
  };
};
