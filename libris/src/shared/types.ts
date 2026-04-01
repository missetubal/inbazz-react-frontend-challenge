import type { ReadingStatus } from './enums';

export interface Book {
  id: string;
  title: string;
  description?: string;
  cover?: string;
  color?: string;
  status: ReadingStatus;
  authors?: string;
  publishedDate?: string;
  year?: string;
}
