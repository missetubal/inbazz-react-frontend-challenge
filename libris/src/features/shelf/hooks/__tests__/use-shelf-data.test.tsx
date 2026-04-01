import { renderHook, act } from '@testing-library/react';
import { useGetShelfData } from '../use-shelf-data';
import { useShelfStore } from '../../models';
import { toast } from 'sonner';
import { ReadingStatus } from '@/shared/enums/reading-status';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockBooks = [
  {
    id: '1',
    title: 'Z Book',
    authors: 'Author B',
    publishedDate: '2023-01-01',
    status: ReadingStatus.FINISHED,
    cover: 'cover1',
    description: 'desc1',
    year: '2023',
  },
  {
    id: '2',
    title: 'A Book',
    authors: 'Author A',
    publishedDate: '2022-01-01',
    status: ReadingStatus.WANT_TO_READ,
    cover: 'cover2',
    description: 'desc2',
    year: '2022',
  },
  {
    id: '3',
    title: 'M Book',
    authors: 'Author C',
    publishedDate: '2024-01-01',
    status: ReadingStatus.READING,
    cover: 'cover3',
    description: 'desc3',
    year: '2024',
  },
];

describe('useGetShelfData', () => {
  const mockRemoveBook = jest.fn();
  const mockUpdateStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useShelfStore.setState({
      books: mockBooks,
      removeBook: mockRemoveBook,
      updateStatus: mockUpdateStatus,
    });
  });

  it('should initialize with default values and sorted by title asc', () => {
    const { result } = renderHook(() => useGetShelfData());

    expect(result.current.sortBy).toBe('title');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedBooks[0].title).toBe('A Book');
    expect(result.current.sortedBooks[1].title).toBe('M Book');
    expect(result.current.sortedBooks[2].title).toBe('Z Book');
  });

  it('should sort by authors', () => {
    const { result } = renderHook(() => useGetShelfData());

    act(() => {
      result.current.setSortBy('authors');
    });

    expect(result.current.sortedBooks[0].authors).toBe('Author A');
    expect(result.current.sortedBooks[1].authors).toBe('Author B');
    expect(result.current.sortedBooks[2].authors).toBe('Author C');
  });

  it('should sort by publishedDate', () => {
    const { result } = renderHook(() => useGetShelfData());

    act(() => {
      result.current.setSortBy('publishedDate');
    });

    expect(result.current.sortedBooks[0].publishedDate).toBe('2022-01-01');
    expect(result.current.sortedBooks[1].publishedDate).toBe('2023-01-01');
    expect(result.current.sortedBooks[2].publishedDate).toBe('2024-01-01');
  });

  it('should sort by status', () => {
    const { result } = renderHook(() => useGetShelfData());

    act(() => {
      result.current.setSortBy('status');
    });

    expect(result.current.sortedBooks[0].status).toBe(
      ReadingStatus.WANT_TO_READ,
    );
    expect(result.current.sortedBooks[1].status).toBe(ReadingStatus.READING);
    expect(result.current.sortedBooks[2].status).toBe(ReadingStatus.FINISHED);
  });

  it('should reverse order when sortDirection is desc', () => {
    const { result } = renderHook(() => useGetShelfData());

    act(() => {
      result.current.setSortDirection('desc');
    });

    expect(result.current.sortedBooks[0].title).toBe('Z Book');
    expect(result.current.sortedBooks[1].title).toBe('M Book');
    expect(result.current.sortedBooks[2].title).toBe('A Book');
  });

  it('should open confirm modal when handleRemoveBook is called', () => {
    const { result } = renderHook(() => useGetShelfData());

    act(() => {
      result.current.handleRemoveBook('1');
    });

    expect(result.current.isRemoveConfirmModalOpen).toBe(true);
    expect(result.current.bookToRemoveId).toBe('1');
  });

  it('should call removeBook and show toast when handleConfirmRemoveBook is called', () => {
    const { result } = renderHook(() => useGetShelfData());

    act(() => {
      result.current.handleRemoveBook('1');
    });

    act(() => {
      result.current.handleConfirmRemoveBook();
    });

    expect(mockRemoveBook).toHaveBeenCalledWith('1');
    expect(toast.success).toHaveBeenCalledWith('shelf.toast.removed');
  });

  it('should call updateStatus and show toast when handleUpdateStatus is called', () => {
    const { result } = renderHook(() => useGetShelfData());

    act(() => {
      result.current.handleUpdateStatus('1', ReadingStatus.READING);
    });

    expect(mockUpdateStatus).toHaveBeenCalledWith('1', ReadingStatus.READING);
    expect(toast.success).toHaveBeenCalledWith('shelf.toast.statusUpdated');
  });
});
