import { renderHook, act, waitFor } from '@testing-library/react';
import { useGetDiscoverBooks } from '../use-get-discover-books';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import * as googleBookApi from '@/shared/services/google-book-api';
import { OrderBy, PrintType } from '@/shared';

jest.mock('@/shared/services/google-book-api', () => ({
  searchBooks: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  useDebounce: jest.fn((val) => val),
}));

const mockApiResponse = {
  totalItems: 100,
  items: [
    {
      id: '1',
      volumeInfo: {
        title: 'Book 1',
        previewLink: 'http://link1',
        imageLinks: { smallThumbnail: 'http://img1' },
        description: 'Description 1',
        authors: ['Author 1'],
        publishedDate: '2023-01-01',
      },
    },
    {
      id: '2',
      volumeInfo: {
        title: 'Book 2',
        previewLink: 'http://link2',
        imageLinks: { smallThumbnail: 'http://img2' },
        description: 'Description 2',
        authors: ['Author 2'],
        publishedDate: '2022-01-01',
      },
    },
  ],
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetDiscoverBooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
    (googleBookApi.searchBooks as jest.Mock).mockResolvedValue(mockApiResponse);
  });

  it('should initialize with default values', async () => {
    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    expect(result.current.query).toBe('');
    expect(result.current.printType).toBe(PrintType.ALL);
    expect(result.current.orderBy).toBe(OrderBy.RELEVANCE);
    expect(result.current.page).toBe(0);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(googleBookApi.searchBooks).toHaveBeenCalledWith({
      printType: PrintType.ALL,
      query: 'populares',
      orderBy: OrderBy.RELEVANCE,
      startIndex: 0,
      maxResults: 12,
    });
  });

  it('should update query and call searchBooks with debounced value', async () => {
    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    act(() => {
      result.current.setQuery('React');
    });

    expect(result.current.query).toBe('React');

    await waitFor(() => {
      expect(googleBookApi.searchBooks).toHaveBeenCalledWith(
        expect.objectContaining({
          query: 'React',
        }),
      );
    });

    expect(result.current.hasUserTyped).toBe(true);
  });

  it('should change page and call searchBooks with correct startIndex', async () => {
    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);

    await waitFor(() => {
      expect(googleBookApi.searchBooks).toHaveBeenCalledWith(
        expect.objectContaining({
          startIndex: 24, // 2 * PAGE_SIZE (12)
        }),
      );
    });
  });

  it('should reset page when query changes', async () => {
    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);

    act(() => {
      result.current.setQuery('New Search');
    });

    // useEffect inside hook should reset page to 0
    await waitFor(() => {
      expect(result.current.page).toBe(0);
    });
  });

  it('should update filters and call searchBooks', async () => {
    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    act(() => {
      result.current.setPrintType(PrintType.BOOKS);
      result.current.setOrderBy(OrderBy.NEWEST);
    });

    await waitFor(() => {
      expect(googleBookApi.searchBooks).toHaveBeenCalledWith(
        expect.objectContaining({
          printType: PrintType.BOOKS,
          orderBy: OrderBy.NEWEST,
        }),
      );
    });
  });

  it('should handle API errors', async () => {
    const error = new Error('API Error');
    (googleBookApi.searchBooks as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(error);
    });
  });

  it('should calculate totalPages correctly', async () => {
    // 100 totalItems, 12 per page => 100/12 = 8.33 => 9 pages
    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    await waitFor(() => {
      expect(result.current.totalPages).toBe(9);
    });
  });

  it('should limit totalPages to 1000 items (Google Books API limit)', async () => {
    (googleBookApi.searchBooks as jest.Mock).mockResolvedValueOnce({
      totalItems: 5000,
      items: [],
    });

    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    await waitFor(() => {
      // 1000 / 12 = 83.33 => 84
      expect(result.current.totalPages).toBe(84);
    });
  });

  it('should correctly map API items to Book objects', async () => {
    const { result } = renderHook(() => useGetDiscoverBooks(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0]).toMatchObject({
      id: '1',
      title: 'Book 1',
      authors: 'Author 1',
      cover: 'http://img1',
      year: '2023',
    });
    expect(result.current.data[0].status).toBeDefined();
  });
});
