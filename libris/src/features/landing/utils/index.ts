import {
  BOOK_STATUS,
  type BookStatusKey,
  type GoogleBooksApiItem,
} from '@/shared';
import type { Book } from '../../../shared/types';

export const getRandomBookStatus = () => {
  const statusKeys: BookStatusKey[] = Object.keys(
    BOOK_STATUS,
  ) as BookStatusKey[];
  const randomIndex = Math.floor(Math.random() * statusKeys.length);
  const randomKey = statusKeys[randomIndex];

  return BOOK_STATUS[randomKey];
};

const mapApiItemToLandingBook = (item: GoogleBooksApiItem): Book | null => {
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
    color: randomStatus.colorClass,
    status: randomStatus.id,
  };
};

export const mapApiItemsToLandingBooks = (
  books: GoogleBooksApiItem[],
): Book[] => {
  return books.map(mapApiItemToLandingBook).filter((b) => b !== null);
};
