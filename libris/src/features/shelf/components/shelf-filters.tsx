import { Button } from '@/components/ui';
import type { Book } from '@/shared';
import type { TFunction } from 'i18next';
import { ArrowUpDown } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface ShelfFiltersProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<keyof Book>>;
  t: TFunction<string, undefined>;
}

export const ShelfFilters = ({ sortBy, setSortBy, t }: ShelfFiltersProps) => {
  return (
    <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
      <div className='flex gap-2'>
        <Button
          variant={sortBy === 'title' ? 'secondary' : 'outline'}
          size='sm'
          onClick={() => setSortBy('title')}
          className='gap-1'
        >
          <ArrowUpDown className='w-3 h-3' />
          {t('shelf.table.filters.byTitle')}
        </Button>
        <Button
          variant={sortBy === 'status' ? 'secondary' : 'outline'}
          size='sm'
          onClick={() => setSortBy('status')}
          className='gap-1'
        >
          <ArrowUpDown className='w-3 h-3' />
          {t('shelf.table.filters.byStatus')}
        </Button>
      </div>
    </div>
  );
};
