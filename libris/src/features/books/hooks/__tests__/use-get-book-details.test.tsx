import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useGetBookDetail } from '../use-get-book-details';
import { getBookDetailsById } from '@/shared';
import { useShelfStore } from '@/features/shelf/models';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

jest.mock('@/shared', () => ({
  getBookDetailsById: jest.fn(),
}));

jest.mock('@/features/shelf/models', () => ({
  useShelfStore: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockBook = {
  id: 'test-id',
  volumeInfo: {
    title: 'Test Book',
    authors: ['Author'],
    previewLink: 'http://test.com',
    imageLinks: { smallThumbnail: 'http://test.com/img.jpg' },
  },
};

describe('useGetBookDetail', () => {
  const mockT = jest.fn((key) => key);
  const mockAddBook = jest.fn();
  const mockRemoveBook = jest.fn();
  const mockIsOnShelf = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
    (useTranslation as unknown as jest.Mock).mockReturnValue({ t: mockT });
    (useShelfStore as unknown as jest.Mock).mockReturnValue({
      addBook: mockAddBook,
      removeBook: mockRemoveBook,
      isOnShelf: mockIsOnShelf,
    });
  });

  it('should fetch book details successfully', async () => {
    (getBookDetailsById as jest.Mock).mockResolvedValueOnce(mockBook);
    mockIsOnShelf.mockReturnValue(false);

    const { result } = renderHook(
      () => useGetBookDetail({ bookId: 'test-id' }),
      { wrapper },
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.book).toEqual(mockBook);
    expect(getBookDetailsById).toHaveBeenCalledWith('test-id');
  });

  it('should handle adding book to shelf', async () => {
    (getBookDetailsById as jest.Mock).mockResolvedValueOnce(mockBook);
    mockIsOnShelf.mockReturnValue(false);

    const { result } = renderHook(
      () => useGetBookDetail({ bookId: 'test-id' }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.handleToggleShelf();
    });

    expect(mockAddBook).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('shelf.toast.added');
  });

  it('should handle removing book from shelf', async () => {
    (getBookDetailsById as jest.Mock).mockResolvedValueOnce(mockBook);
    mockIsOnShelf.mockReturnValue(true);

    const { result } = renderHook(
      () => useGetBookDetail({ bookId: 'test-id' }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.handleToggleShelf();
    });

    expect(mockRemoveBook).toHaveBeenCalledWith('test-id');
    expect(toast.success).toHaveBeenCalledWith('shelf.toast.removed');
  });

  it('should not call any action if book is not loaded', async () => {
    (getBookDetailsById as jest.Mock).mockReturnValue(new Promise(() => {})); // pending

    const { result } = renderHook(
      () => useGetBookDetail({ bookId: 'test-id' }),
      { wrapper },
    );

    act(() => {
      result.current.handleToggleShelf();
    });

    expect(mockAddBook).not.toHaveBeenCalled();
    expect(mockRemoveBook).not.toHaveBeenCalled();
  });

  it('should return isError true when fetch fails', async () => {
    (getBookDetailsById as jest.Mock).mockRejectedValueOnce(
      new Error('Fetch error'),
    );

    const { result } = renderHook(
      () => useGetBookDetail({ bookId: 'test-id' }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('should not fetch if bookId is empty', async () => {
    const { result } = renderHook(() => useGetBookDetail({ bookId: '' }), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(false);
    expect(getBookDetailsById).not.toHaveBeenCalled();
  });
});
