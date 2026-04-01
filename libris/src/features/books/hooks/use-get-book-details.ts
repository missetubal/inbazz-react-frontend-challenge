import { useShelfStore } from '@/features/shelf/models';
import { mapApiItemToBook } from '@/lib/book-utils';
import { getBookDetailsById, type GoogleBookDetailsItem } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import type { TFunction } from 'node_modules/i18next/typescript/t';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export interface UseBookDetailResult {
  book: GoogleBookDetailsItem | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onShelf: boolean;
  handleToggleShelf: () => void;
  t: TFunction;
}

export const useGetBookDetail = ({
  bookId,
}: {
  bookId: string;
}): UseBookDetailResult => {
  const { t } = useTranslation('shelfAndDiscover');
  const { addBook, removeBook, isOnShelf } = useShelfStore();
  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery<GoogleBookDetailsItem, Error>({
    queryKey: ['bookDetail', bookId],
    queryFn: () => getBookDetailsById(bookId),
    enabled: !!bookId,
    staleTime: 1000 * 60 * 5,
  });

  const onShelf = book ? isOnShelf(book.id) : false;

  const handleToggleShelf = () => {
    if (!book) return;
    if (onShelf) {
      removeBook(book.id);
      toast.success(t('shelf.toast.removed'));
    } else {
      const newBook = mapApiItemToBook(book);

      if (newBook) {
        addBook(newBook);
      }
      toast.success(t('shelf.toast.added'));
    }
  };
  return {
    book,
    isLoading,
    isError,
    error,
    onShelf,
    handleToggleShelf,
    t,
  };
};
