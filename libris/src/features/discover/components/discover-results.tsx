import { Button } from '@/components/ui';
import type { DiscoverResultsProps } from '../types';
import { EmptyState } from './empty-state';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DiscoverResults = ({
  isError,
  error,
  isLoading,
  PAGE_SIZE,
  data,
  hasUserTyped,
  page,
  totalPages,
  setPage,
}: DiscoverResultsProps) => {
  const { t } = useTranslation('discover');

  if (isError) {
    <EmptyState text={`${t('discover.error')}: ${error?.message}`} />;
  }

  //   if(isLoading){
  //     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
  //       {Array(PAGE_SIZE)
  //         .fill(0)
  //         .map((_, i) => (
  //           <BookCardSkeleton key={i} />
  //         ))}
  //     </div>;
  //   }

  if (hasUserTyped && data && data.length === 0) {
    <EmptyState text={t('discover.noResults')} />;
  }

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {data.map((book, i) => (
          <p>{book.id}</p>
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-4 pt-4'>
          <Button
            variant='outline'
            size='sm'
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className='gap-1'
          >
            <ChevronLeft className='w-4 h-4' />
            {t('results.pages.prev')}
          </Button>

          <span className='text-sm text-muted-foreground'>
            {t('results.pages.page', {
              current: page + 1,
              totalPages,
            })}
          </span>

          <Button
            variant='outline'
            size='sm'
            disabled={
              page >= totalPages - 1 || (data.length < PAGE_SIZE && page > 0)
            }
            onClick={() => setPage((p) => p + 1)}
            className='gap-1'
          >
            {t('results.pages.next')}
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      )}
    </>
  );
};
