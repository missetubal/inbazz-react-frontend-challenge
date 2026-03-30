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

export interface GoogleBookDetailsItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{ type: string; identifier: string }>;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
    printType?: string;
  };
  saleInfo?: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: { amount: number; currencyCode: string };
    retailPrice?: { amount: number; currencyCode: string };
    buyLink?: string;
  };
  accessInfo?: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: { isAvailable: boolean; acsTokenLink?: string };
    pdf: { isAvailable: boolean; acsTokenLink?: string };
    webReaderLink?: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
  error?: {
    code: number;
    message: string;
    errors?: Array<{ message: string; domain: string; reason: string }>;
    status?: string;
  };
}
