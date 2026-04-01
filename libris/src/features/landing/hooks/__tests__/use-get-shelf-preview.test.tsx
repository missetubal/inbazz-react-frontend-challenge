import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useGetShelfPreviewTable } from '../use-get-shelf-preview-table';
import * as googleBookApi from '@/shared/services/google-book-api';
import * as bookUtils from '@/lib/book-utils';

jest.mock('@/shared/services/google-book-api', () => ({
  searchBooks: jest.fn(),
  getBookDetailsById: jest.fn(),
  GOOGLE_BOOKS_API_BASE_URL: 'https://www.googleapis.com/books/v1/volumes',
}));
jest.mock('@/lib/book-utils', () => ({
  mapApiItemsToBooks: jest.fn(),
}));

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0, // Ensure no cache between tests
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>{children}</QueryClientProvider>
);

export const mockApiItems = [
  { id: '1', volumeInfo: { title: 'Book 1' } },
  { id: '2', volumeInfo: { title: 'Book 2' } },
];
export const mockApiResponse = {
  items: mockApiItems,
  totalItems: 2
};
export const mockMappedBooks = [
  { id: '1', title: 'Book 1' },
  { id: '2', title: 'Book 2' },
];

describe('useGetShelfPreviewTable', () => {
  const mockSearchBooks = googleBookApi.searchBooks as jest.Mock;
  const mockMapApiItemsToBooks = bookUtils.mapApiItemsToBooks as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call searchBooks with correct parameters and map results', async () => {
    mockSearchBooks.mockResolvedValueOnce(mockApiResponse);
    mockMapApiItemsToBooks.mockReturnValueOnce(mockMappedBooks);

    const { result } = renderHook(() => useGetShelfPreviewTable(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockSearchBooks).toHaveBeenCalledWith({
      query: 'mais lidos',
      maxResults: 5,
      orderBy: 'relevance',
      printType: 'books',
    });

    expect(mockMapApiItemsToBooks).toHaveBeenCalledWith(mockApiItems);
    expect(result.current.topFiveBooks).toEqual(mockMappedBooks);
  });

  it('should return empty array and isLoading false on searchBooks error', async () => {
    mockSearchBooks.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useGetShelfPreviewTable(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.topFiveBooks).toEqual([]);
  });

  it('should return object with empty items if searchBooks returns no data', async () => {
    mockSearchBooks.mockResolvedValueOnce({ items: [], totalItems: 0 });
    mockMapApiItemsToBooks.mockReturnValueOnce([]);

    const { result } = renderHook(() => useGetShelfPreviewTable(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.topFiveBooks).toEqual([]);
    expect(mockSearchBooks).toHaveBeenCalledTimes(1);
    expect(mockMapApiItemsToBooks).toHaveBeenCalledWith([]);
  });
});
