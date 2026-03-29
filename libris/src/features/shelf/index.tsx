import { ShelfEmptyState, ShelfTable } from './components';
import { useGetShelfData } from './hooks/use-shelf-data';

export const ShelfWrapper = () => {
  const { sortedBooks, t } = useGetShelfData();

  return (
    <div>
      <h1 className='text-3xl sm:text-4xl font-serif font-bold tracking-tight'>
        {t('title')}
      </h1>
      <p className='text-muted-foreground mt-1'>{t('subtitle')}</p>
      {sortedBooks.length === 0 ? <ShelfEmptyState /> : <ShelfTable />}
    </div>
  );
};
