import { create } from 'zustand';
import type { ShelfState } from '../types';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useShelfStore = create<ShelfState>()(
  persist(
    (set, get) => ({
      userShelves: {},
      currentUserId: null,
      books: [],

      setUserId: (userId) => {
        set({
          currentUserId: userId,
          books: userId ? get().userShelves[userId] || [] : [],
        });
      },
      addBook: (book) => {
        const { currentUserId, userShelves } = get();
        if (!currentUserId) return;

        const currentUserBooks = userShelves[currentUserId] || [];
        if (currentUserBooks.some((b) => b.id === book.id)) return;

        const updatedUserBooks = [...currentUserBooks, book];
        const updatedUserShelves = {
          ...userShelves,
          [currentUserId]: updatedUserBooks,
        };

        set({
          userShelves: updatedUserShelves,
          books: updatedUserBooks,
        });
      },
      removeBook: (bookId) => {
        const { currentUserId, userShelves } = get();
        if (!currentUserId) return;

        const currentUserBooks = userShelves[currentUserId] || [];
        const updatedUserBooks = currentUserBooks.filter(
          (book) => book.id !== bookId,
        );
        const updatedUserShelves = {
          ...userShelves,
          [currentUserId]: updatedUserBooks,
        };

        set({
          userShelves: updatedUserShelves,
          books: updatedUserBooks,
        });
      },

      updateStatus: (bookId, newStatus) => {
        const { currentUserId, userShelves } = get();
        if (!currentUserId) return;

        const currentUserBooks = userShelves[currentUserId] || [];
        const updatedUserBooks = currentUserBooks.map((book) =>
          book.id === bookId ? { ...book, status: newStatus } : book,
        );
        const updatedUserShelves = {
          ...userShelves,
          [currentUserId]: updatedUserBooks,
        };

        set({
          userShelves: updatedUserShelves,
          books: updatedUserBooks,
        });
      },

      isOnShelf: (bookId) => {
        const { currentUserId, userShelves } = get();
        if (!currentUserId) return false;
        const currentUserBooks = userShelves[currentUserId] ?? [];
        return currentUserBooks.some((book) => book.id === bookId);
      },
    }),
    {
      name: 'shelf-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userShelves: state.userShelves,
        currentUserId: state.currentUserId,
      }),
      onRehydrateStorage: (state) => {
        if (state?.currentUserId) {
          state.books = state.userShelves[state.currentUserId] ?? [];
        }
      },
    },
  ),
);
