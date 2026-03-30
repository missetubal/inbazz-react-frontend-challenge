import {
  PrintType,
  type GoogleBookDetailsItem,
  type GoogleBooksApiItem,
  type GoogleBooksApiResponse,
  type SearchBookRequest,
} from './types';

export const GOOGLE_BOOKS_API_BASE_URL =
  'https://www.googleapis.com/books/v1/volumes';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async ({
  query,
  maxResults,
  orderBy,
  printType = PrintType.ALL,
  langRestrict = 'pt',
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
    url.searchParams.set('langRestrict', langRestrict);

    if (API_KEY !== '') url.searchParams.set('key', API_KEY);
    if (printType) url.searchParams.set('printType', printType);

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

export const getBookDetailsById = async (
  id: string,
): Promise<GoogleBookDetailsItem> => {
  if (!id) {
    throw new Error('Book ID is required');
  }

  try {
    const url = new URL(`${GOOGLE_BOOKS_API_BASE_URL}/${id}`);
    if (API_KEY !== '') {
      url.searchParams.set('key', API_KEY);
    }

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message ||
        `HTTP error! status: ${response.status} ${response.statusText}`;
      throw new Error(`Google Books API error: ${errorMessage}`);
    }

    const data: GoogleBookDetailsItem = await response.json();
    if (data.error) {
      throw new Error(`Google Books API error: ${data.error.message}`);
    }

    return data;
  } catch (err) {
    console.error('Error in getBookDetailsById:', err);
    throw err;
  }
};
