import { searchBooks } from '@/shared/services/google-book-api';
import type { GoogleBooksApiItem } from '@/shared/services/types';
import { useQuery } from '@tanstack/react-query';
import { mapApiItemsToLandingBooks } from '../utils';

export const useGetShelfPreviewTable = () => {
  const { data, isLoading } = useQuery<GoogleBooksApiItem[], Error>({
    queryKey: ['featuredLandingPageBooks'],
    queryFn: () =>
      searchBooks({
        query: 'mais lidos',
        maxResults: 5,
        orderBy: 'relevance',
        printType: 'books',
      }),
  });

  const topFiveBooks = data ? mapApiItemsToLandingBooks(data) : [];
  return {
    topFiveBooks,
    isLoading,
  };
};
