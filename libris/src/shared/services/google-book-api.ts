import {
  PrintType,
  type GoogleBooksApiItem,
  type GoogleBooksApiResponse,
  type SearchBookRequest,
} from './types';

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async ({
  query,
  maxResults,
  orderBy,
  printType = PrintType.ALL,
  langRestrict,
  startIndex = 0,
}: SearchBookRequest): Promise<GoogleBooksApiItem[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const url = new URL(GOOGLE_BOOKS_API_BASE_URL);
    url.searchParams.set('q', query);
    url.searchParams.set('maxResults', String(maxResults));
    url.searchParams.set('orderBy', orderBy);
    url.searchParams.set('startIndex', String(startIndex));

    if (API_KEY !== '') url.searchParams.set('key', API_KEY);
    if (printType) url.searchParams.set('printType', printType);
    if (langRestrict) url.searchParams.set('langRestrict', langRestrict);

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message ||
        `HTTP error! status: ${response.status} ${response.statusText}`;
      throw new Error(`Google Books API error: ${errorMessage}`);
    }

    const data: GoogleBooksApiResponse = await response.json();

    return data.items ?? [];
  } catch (err) {
    console.error('Error in searchBooks:', err);
    throw err;
  }
};
