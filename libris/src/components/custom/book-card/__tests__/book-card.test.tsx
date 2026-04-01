import { render, screen } from '@testing-library/react';
import { BookCard } from '../book-card';
import { ReadingStatus } from '@/shared/enums/reading-status';
import type { Book } from '@/shared/types';

jest.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockBook: Book = {
  id: '1',
  title: 'Test Book Title',
  authors: 'John Doe, Jane Smith',
  cover: 'http://example.com/cover.jpg',
  year: '2023',
  status: ReadingStatus.WANT_TO_READ,
  description: 'Test Description',
  publishedDate: '2023-01-01',
};

describe('BookCard', () => {
  it('should render book title and authors', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText('Test Book Title')).toBeDefined();
    expect(screen.getByText('John Doe, Jane Smith')).toBeDefined();
  });

  it('should render book cover if provided', () => {
    render(<BookCard book={mockBook} />);

    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', 'http://example.com/cover.jpg');
    expect(img).toHaveProperty('alt', 'Test Book Title');
  });

  it('should render placeholder icon if cover is missing', () => {
    const bookWithoutCover = { ...mockBook, cover: undefined };
    render(<BookCard book={bookWithoutCover} />);

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should render book year if provided', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText('2023')).toBeDefined();
  });

  it('should link to the correct book detail page', () => {
    render(<BookCard book={mockBook} />);

    const link = screen.getByRole('link');
    expect(link).toHaveProperty('href', 'http://localhost/book/1');
  });
});
