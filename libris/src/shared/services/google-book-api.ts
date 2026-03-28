import type { GoogleBooksApiItem, GoogleBooksApiResponse } from './types';

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

interface SearchBookRequest {
  query: string;
  maxResults: number;
  orderBy: 'relevance' | 'newest';
  printType?: 'books' | 'magazines';
  langRestrict?: 'pt' | 'en';
}

export const searchBooks = async ({
  query,
  maxResults,
  orderBy,
  printType = 'books',
  langRestrict = 'pt',
}: SearchBookRequest): Promise<GoogleBooksApiItem[]> => {
  try {
    const url = new URL(GOOGLE_BOOKS_API_BASE_URL);
    url.searchParams.set('q', query);
    url.searchParams.set('maxResults', String(maxResults));
    url.searchParams.set('orderBy', orderBy);
    url.searchParams.set('langRestrict', langRestrict);

    if (printType) url.searchParams.set('printType', printType);
    // if (API_KEY !== '') url.searchParams.set('key', API_KEY);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Google Books API error: ${response.status} ${response.statusText}`,
      );
    }
    const data: GoogleBooksApiResponse = await response.json();

    return data.items ?? [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
