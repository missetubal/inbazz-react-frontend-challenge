export const ReadingStatus = {
  WANT_TO_READ: 'wantToRead',
  READING: 'reading',
  FINISHED: 'finished',
} as const;

export type ReadingStatus = (typeof ReadingStatus)[keyof typeof ReadingStatus];
