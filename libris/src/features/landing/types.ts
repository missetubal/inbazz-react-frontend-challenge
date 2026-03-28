import type { BookStatusKey } from '@/shared';

export interface LandingPageBooks {
  title: string;
  description?: string;
  cover?: string;
  color?: string;
  status: BookStatusKey;
  authors?: string;
  publishedDate?: string;
}
