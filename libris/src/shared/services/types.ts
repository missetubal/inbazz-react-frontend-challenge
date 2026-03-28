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
