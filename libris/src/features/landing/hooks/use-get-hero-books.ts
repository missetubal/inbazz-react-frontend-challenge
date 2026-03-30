import { searchBooks } from '@/shared/services/google-book-api';
import type { GoogleBooksApiItem } from '@/shared/services/types';
import { useQuery } from '@tanstack/react-query';
import { mapApiItemsToBooks } from '../../../lib/book-utils';

export const useGetHeroBooks = () => {
  const { data, isLoading } = useQuery<GoogleBooksApiItem[], Error>({
    queryKey: ['heroLandingPage'],
    queryFn: () =>
      searchBooks({
        query: 'literatura portuguesa',
        maxResults: 5,
        orderBy: 'newest',
        printType: 'books',
      }),
  });

  const heroBooks = data ? mapApiItemsToBooks(data) : [];
  return {
    heroBooks,
    isLoading,
  };
};
