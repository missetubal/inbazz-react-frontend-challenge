import { useDebounce } from '@/lib/utils';
import {
  OrderBy,
  PrintType,
  searchBooks,
  type GoogleBooksApiItem,
  type OrderByOption,
  type PrintTypeOption,
} from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { UseGetDiscoverBooksResult } from '../types';
import { mapApiItemsToBooks } from '@/lib/book-utils';

export const useGetDiscoverBooks = (): UseGetDiscoverBooksResult => {
  const [query, setQuery] = useState('');
  const [printType, setPrintType] = useState<PrintTypeOption>(PrintType.ALL);
  const [orderBy, setOrderBy] = useState<OrderByOption>(OrderBy.RELEVANCE);
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 12;

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setPage(0);
  }, [debouncedQuery, printType, orderBy]);

  const searchedBooks = debouncedQuery ? debouncedQuery : 'populares';

  const { data, isLoading, isError, error } = useQuery<
    GoogleBooksApiItem[],
    Error
  >({
    queryKey: ['books', debouncedQuery, printType, orderBy, page],
    queryFn: () =>
      searchBooks({
        printType,
        query: searchedBooks,
        orderBy,
        startIndex: page * PAGE_SIZE,
        maxResults: PAGE_SIZE,
      }),
    enabled: true,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });

  const totalItemsEstimate =
    data && data.length < PAGE_SIZE && page > 0
      ? page * PAGE_SIZE + data.length
      : (page + 2) * PAGE_SIZE;

  const totalPages = Math.ceil(Math.min(totalItemsEstimate, 1000) / PAGE_SIZE);

  const hasUserTyped = !!debouncedQuery.trim();

  const apiToBooks = data ? mapApiItemsToBooks(data) : [];

  return {
    PAGE_SIZE,
    data: apiToBooks,
    isLoading,
    isError,
    error,
    query,
    orderBy,
    printType,
    totalPages,
    hasUserTyped,
    setQuery,
    setOrderBy,
    setPrintType,
    page,
    setPage,
  };
};
