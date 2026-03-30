import { ReadingStatus, type GoogleBooksApiItem, type Book } from '@/shared';

export const getRandomBookStatus = (): ReadingStatus => {
  const statusValues: ReadingStatus[] = Object.values(ReadingStatus);
  const randomIndex = Math.floor(Math.random() * statusValues.length);

  return statusValues[randomIndex];
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
    status: randomStatus,
    year: item.volumeInfo.publishedDate?.slice(0, 4) || '-',
  };
};

export const mapApiItemsToLandingBooks = (
  books: GoogleBooksApiItem[],
): Book[] => {
  return books.map(mapApiItemToLandingBook).filter((b) => b !== null);
};
