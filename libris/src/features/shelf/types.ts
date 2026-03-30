import type { Book, BookStatusKey } from '@/shared';

export interface ShelfState {
  userShelves: Record<string, Book[]>;
  currentUserId: string | null;
  books: Book[];
  setUserId: (userId: string | null) => void;
  removeBook: (bookId: string) => void;
  addBook: (book: Book) => void;
  updateStatus: (bookId: string, newStatus: BookStatusKey) => void;
  isOnShelf: (bookId: string) => boolean;
}
