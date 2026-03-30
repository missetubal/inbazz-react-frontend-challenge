import {
  BOOK_STATUS,
  type BookStatusKey,
  type GoogleBooksApiItem,
} from '@/shared';

export interface Books {
  id: string;
  title: string;
  description?: string;
  cover?: string;
  color?: string;
  status: BookStatusKey;
  authors?: string;
  publishedDate?: string;
  year?: string;
}

export const getRandomBookStatus = () => {
  const statusKeys: BookStatusKey[] = Object.keys(
    BOOK_STATUS,
  ) as BookStatusKey[];
  const randomIndex = Math.floor(Math.random() * statusKeys.length);
  const randomKey = statusKeys[randomIndex];

  return BOOK_STATUS[randomKey];
};

export const mapApiItemToBook = (item: GoogleBooksApiItem): Books | null => {
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
    year: item.volumeInfo.publishedDate?.slice(0, 4),
    color: randomStatus.colorClass,
    status: randomStatus.id,
  };
};

export const mapApiItemsToBooks = (books: GoogleBooksApiItem[]): Books[] => {
  return books.map(mapApiItemToBook).filter((b) => b !== null);
};
