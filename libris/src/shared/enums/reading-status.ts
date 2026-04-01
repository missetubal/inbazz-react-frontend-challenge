export const ReadingStatus = {
  WANT_TO_READ: 'wantToRead',
  READING: 'reading',
  FINISHED: 'finished',
} as const;

export type ReadingStatus = (typeof ReadingStatus)[keyof typeof ReadingStatus];

export const ReadingStatusDetails = {
  [ReadingStatus.WANT_TO_READ]: {
    label: 'badges.wantToRead',
    colorClass: 'bg-accent text-accent-foreground',
  },
  [ReadingStatus.READING]: {
    label: 'badges.reading',
    colorClass: 'bg-primary/10 text-primary',
  },
  [ReadingStatus.FINISHED]: {
    label: 'badges.finished',
    colorClass: 'bg-emerald-500/10 text-emerald-600',
  },
} as const;

export const getReadingStatusOptions = (): ReadingStatus[] => {
  return Object.values(ReadingStatus);
}

