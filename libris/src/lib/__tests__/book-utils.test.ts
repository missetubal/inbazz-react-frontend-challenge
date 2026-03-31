import { ReadingStatus } from '@/shared/enums/reading-status';
import type { GoogleBooksApiItem } from '@/shared/services/types';
import { mapApiItemToBook, mapApiItemsToBooks } from '../book-utils';

jest.mock('@/shared', () => ({
  searchBooks: jest.fn(),
  getBookDetailsById: jest.fn(),
  GOOGLE_BOOKS_API_BASE_URL: 'https://www.googleapis.com/books/v1/volumes',
}));

describe('book-utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('mapApiItemToBook', () => {
    const mockGoogleApiItem: GoogleBooksApiItem = {
      id: 'test-id-123',
      volumeInfo: {
        title: 'The Great Book',
        authors: ['Author One', 'Author Two'],
        publishedDate: '2023-01-15',
        description: 'A fantastic book about testing.',
        previewLink: 'http://example.com/preview',
        imageLinks: {
          smallThumbnail: 'http://example.com/small.jpg',
          thumbnail: 'http://example.com/thumbnail.jpg',
        },
      },
    };

    it('should correctly map a GoogleBooksApiItem to a Book', () => {
      const result = mapApiItemToBook(mockGoogleApiItem);
      expect(result).toMatchObject({
        id: 'test-id-123',
        title: 'The Great Book',
        cover: 'http://example.com/small.jpg',
        description: 'A fantastic book about testing.',
        authors: 'Author One, Author Two',
        publishedDate: '2023-01-15',
        year: '2023',
      });
      expect(Object.values(ReadingStatus)).toContain(result?.status);
    });

    it('should return null if item.volumeInfo.title is missing', () => {
      const itemWithoutTitle = {
        ...mockGoogleApiItem,
        volumeInfo: {
          ...mockGoogleApiItem.volumeInfo,
          title: undefined as any,
        },
      };
      expect(mapApiItemToBook(itemWithoutTitle)).toBeNull();
    });

    it('should return null if item.volumeInfo.previewLink is missing', () => {
      const itemWithoutPreviewLink = {
        ...mockGoogleApiItem,
        volumeInfo: {
          ...mockGoogleApiItem.volumeInfo,
          previewLink: undefined as any,
        },
      };
      expect(mapApiItemToBook(itemWithoutPreviewLink)).toBeNull();
    });

    it('should handle missing authors', () => {
      const itemWithoutAuthors = {
        ...mockGoogleApiItem,
        volumeInfo: { ...mockGoogleApiItem.volumeInfo, authors: undefined },
      };
      const result = mapApiItemToBook(itemWithoutAuthors);
      expect(result?.authors).toBeUndefined();
    });

    it('should handle missing imageLinks', () => {
      const itemWithoutImageLinks = {
        ...mockGoogleApiItem,
        volumeInfo: { ...mockGoogleApiItem.volumeInfo, imageLinks: undefined },
      };
      const result = mapApiItemToBook(itemWithoutImageLinks);
      expect(result?.cover).toBeUndefined();
    });

    it('should extract year correctly from publishedDate', () => {
      const itemWithFullDate = {
        ...mockGoogleApiItem,
        volumeInfo: {
          ...mockGoogleApiItem.volumeInfo,
          publishedDate: '2020-03-01',
        },
      };
      expect(mapApiItemToBook(itemWithFullDate)?.year).toBe('2020');

      const itemWithYearOnly = {
        ...mockGoogleApiItem,
        volumeInfo: { ...mockGoogleApiItem.volumeInfo, publishedDate: '1999' },
      };
      expect(mapApiItemToBook(itemWithYearOnly)?.year).toBe('1999');
    });

    it('should return "-" for year if publishedDate is missing', () => {
      const itemWithoutPublishedDate = {
        ...mockGoogleApiItem,
        volumeInfo: {
          ...mockGoogleApiItem.volumeInfo,
          publishedDate: undefined,
        },
      };
      expect(mapApiItemToBook(itemWithoutPublishedDate)?.year).toBe('-');
    });
  });

  describe('mapApiItemsToBooks', () => {
    const mockGoogleApiItem1: GoogleBooksApiItem = {
      id: 'id1',
      volumeInfo: { title: 'Book 1', previewLink: 'link1' },
    };
    const mockGoogleApiItem2: GoogleBooksApiItem = {
      id: 'id2',
      volumeInfo: { title: 'Book 2', previewLink: 'link2' },
    };
    const mockGoogleApiItemInvalid: GoogleBooksApiItem = {
      id: 'invalid',
      volumeInfo: { title: undefined as any, previewLink: 'linkInvalid' },
    };

    it('should map valid API items to Book objects and filter out nulls', () => {
      const apiItems = [
        mockGoogleApiItem1,
        mockGoogleApiItem2,
        mockGoogleApiItemInvalid,
      ];
      const result = mapApiItemsToBooks(apiItems);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('id1');
      expect(result[1].id).toBe('id2');
    });

    it('should return an empty array if no valid books are provided', () => {
      const apiItems = [mockGoogleApiItemInvalid];
      const result = mapApiItemsToBooks(apiItems);

      expect(result).toEqual([]);
    });

    it('should return an empty array for an empty input array', () => {
      const result = mapApiItemsToBooks([]);
      expect(result).toEqual([]);
    });
  });
});
