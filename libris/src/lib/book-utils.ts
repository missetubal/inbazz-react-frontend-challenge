import { ReadingStatus } from '@/shared/enums/reading-status';
import type { GoogleBooksApiItem } from '@/shared/services/types';
import type { Book } from '@/shared/types';

export const getRandomBookStatus = (): ReadingStatus => {
  const statusValues: ReadingStatus[] = Object.values(ReadingStatus);
  const randomIndex = Math.floor(Math.random() * statusValues.length);

  return statusValues[randomIndex];
};

export const mapApiItemToBook = (
  item: GoogleBooksApiItem,
): Book | null => {
  if (!item.volumeInfo.title) return null;
  if (!item.volumeInfo.previewLink) return null;

  const randomStatus = getRandomBookStatus();

  return {
    id: item.id,
    title: item.volumeInfo.title,
    cover: item.volumeInfo.imageLinks?.smallThumbnail,
    description: item.volumeInfo.description,
    authors: item.volumeInfo.authors?.join(', '),
    publishedDate: item.volumeInfo.publishedDate,
    status: randomStatus,
    year: item.volumeInfo.publishedDate?.slice(0, 4) || '-',
  };
};

export const mapApiItemsToBooks = (
  books: GoogleBooksApiItem[],
): Book[] => {
  return books.map(mapApiItemToBook).filter((b) => b !== null);
};
