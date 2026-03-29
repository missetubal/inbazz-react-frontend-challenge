import type { BookStatusKey } from './enums';

export interface Book {
  id: string;
  title: string;
  description?: string;
  cover?: string;
  color?: string;
  status: BookStatusKey;
  authors?: string;
  publishedDate?: string;
}
