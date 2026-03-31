import type { OrderByOption, PrintTypeOption, Book } from '@/shared';
import type { Dispatch, SetStateAction } from 'react';

export interface SearchFilterProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  printType: PrintTypeOption;
  setPrintType: Dispatch<SetStateAction<PrintTypeOption>>;
  orderBy: OrderByOption;
  setOrderBy: Dispatch<SetStateAction<OrderByOption>>;
}

export interface UseGetDiscoverBooksResult extends SearchFilterProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: Book[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  totalPages: number;
  hasUserTyped: boolean;
  PAGE_SIZE: number;
}

export interface DiscoverResultsProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  totalPages: number;
  hasUserTyped: boolean;
  PAGE_SIZE: number;
  data: Book[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
