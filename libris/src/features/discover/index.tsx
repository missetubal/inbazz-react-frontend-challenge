import { useTranslation } from 'react-i18next';
import { DiscoverResults, SearchFilter } from './components';
import { useGetDiscoverBooks } from './hooks/use-get-discover-books';

export const DiscoverWrapper = () => {
  const { t } = useTranslation('discover');

  const {
    query,
    setQuery,
    printType,
    setPrintType,
    orderBy,
    setOrderBy,
    page,
    setPage,
    data,
    isLoading,
    isError,
    error,
    totalPages,
    hasUserTyped,
    PAGE_SIZE,
  } = useGetDiscoverBooks();

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl sm:text-4xl font-serif font-bold tracking-tight'>
          {t('title')}
        </h1>
        <p className='text-muted-foreground mt-1'>{t('subtitle')}</p>
      </div>
      <SearchFilter
        orderBy={orderBy}
        printType={printType}
        query={query}
        setOrderBy={setOrderBy}
        setPrintType={setPrintType}
        setQuery={setQuery}
      />
      <DiscoverResults
        isError={isError}
        error={error}
        isLoading={isLoading}
        PAGE_SIZE={PAGE_SIZE}
        data={data}
        hasUserTyped={hasUserTyped}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        
      />
    </div>
  );
};
