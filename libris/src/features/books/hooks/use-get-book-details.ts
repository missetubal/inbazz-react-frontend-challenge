import { mapApiItemToBook, type Books } from '@/lib/book-utils';
import { getBookDetailsById, type GoogleBookDetailsItem } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import type { TFunction } from 'node_modules/i18next/typescript/t';
import { useTranslation } from 'react-i18next';

interface UseBookDetailProps {
  bookId: string;
  isOnShelf: (id: string) => boolean;
  addBook: (book: Books) => void;
  removeBook: (id: string) => void;
}

export interface UseBookDetailResult {
  book: GoogleBookDetailsItem | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onShelf: boolean;
  handleToggleShelf: () => void;
  t: TFunction; // Para a função de tradução
}

export const useGetBookDetail = ({
  bookId,
  isOnShelf,
  addBook,
  removeBook,
}: UseBookDetailProps): UseBookDetailResult => {
  const { t } = useTranslation('common');

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
      //   toast({ title: t('detail.removed') });
    } else {
      const newBook = mapApiItemToBook(book);

      if (newBook) {
        addBook(newBook);
      }
      //   toast({ title: t('detail.added') });
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
