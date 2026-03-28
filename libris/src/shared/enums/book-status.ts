export const BOOK_STATUS = {
  WANT_TO_READ: {
    id: 'WANT_TO_READ',
    label: 'badges.wantToRead',
    colorClass: 'bg-accent text-accent-foreground',
  },
  READING: {
    id: 'READING',
    label: 'badges.reading',
    colorClass: 'bg-primary/10 text-primary',
  },
  FINISHED: {
    id: 'FINISHED',
    label: 'badges.finished',
    colorClass: 'bg-emerald-500/10 text-emerald-600',
  },
} as const;

export type BookStatusKey = keyof typeof BOOK_STATUS;
export type BookStatusValue = (typeof BOOK_STATUS)[BookStatusKey];

export const getBookStatus = (): BookStatusValue[] => {
  return Object.values(BOOK_STATUS);
};
