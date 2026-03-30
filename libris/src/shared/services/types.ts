export interface GoogleBooksApiItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    printType?: string;
    description?: string;
    publisher?: string;
    publishedDate?: string;
    previewLink?: string;
  };
}

export interface GoogleBooksApiResponse {
  items?: GoogleBooksApiItem[];
  totalItems: number;
}

export interface SearchBookRequest {
  query: string;
  maxResults: number;
  orderBy: OrderByOption;
  printType?: PrintTypeOption;
  langRestrict?: string;
  startIndex?: number;
}

export const OrderBy = {
  RELEVANCE: 'relevance',
  NEWEST: 'newest',
} as const;

export type OrderByOption = (typeof OrderBy)[keyof typeof OrderBy];

export const PrintType = {
  ALL: 'all',
  BOOKS: 'books',
  MAGAZINES: 'magazines',
} as const;

export type PrintTypeOption = (typeof PrintType)[keyof typeof PrintType];

export const getOrderByOptions = (): OrderByOption[] => {
  return Object.values(OrderBy);
};

export const getPrintTypeOptions = (): PrintTypeOption[] => {
  return Object.values(PrintType);
};
