import { searchBooks } from '@/shared/services/google-book-api';
import type { GoogleBooksApiResponse } from '@/shared/services/types';
import { useQuery } from '@tanstack/react-query';
import { mapApiItemsToBooks } from '../../../lib/book-utils';

export const useGetShelfPreviewTable = () => {
  const { data, isLoading } = useQuery<GoogleBooksApiResponse, Error>({
    queryKey: ['featuredLandingPageBooks'],
    queryFn: () =>
      searchBooks({
        query: 'mais lidos',
        maxResults: 5,
        orderBy: 'relevance',
        printType: 'books',
      }),
  });

  const topFiveBooks = data?.items ? mapApiItemsToBooks(data.items) : [];
  return {
    topFiveBooks,
    isLoading,
  };
};
