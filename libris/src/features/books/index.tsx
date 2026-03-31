import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Check,
  ExternalLink,
  BookMarked,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BookPageSkeleton, MetaItem } from './components';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetBookDetail } from './hooks/use-get-book-details';
import { bookDetailRoute } from '@/app/router';

export const BookDetailsWrapper = () => {
  const navigate = useNavigate({ from: bookDetailRoute.id });
  const { bookId } = useParams({ from: bookDetailRoute.id });

  const { book, isLoading, isError, error, onShelf, handleToggleShelf, t } =
    useGetBookDetail({ bookId });

  if (isLoading) {
    return <BookPageSkeleton />;
  }

  if (isError || !book || book.error) {
    const errorMessage = isError ? error?.message : book?.error?.message;
    return (
      <div className='text-center py-24'>
        <p className='text-muted-foreground'>
          {t('shelf.shelf.bookDetails.notFound')}
          {errorMessage && ` (${errorMessage})`}
        </p>
        <Button
          variant='outline'
          onClick={() => navigate({ to: '/discover' })}
          className='mt-4 gap-2'
        >
          <ArrowLeft className='w-4 h-4' />
          {t('shelf.bookDetails.back')}
        </Button>
      </div>
    );
  }

  const info = book.volumeInfo || {};
  const thumb =
    info.imageLinks?.medium ||
    info.imageLinks?.thumbnail ||
    info.imageLinks?.smallThumbnail;
  const description = info.description || '';
  const previewLink = info.previewLink;
  const isbn =
    info.industryIdentifiers?.find((i) => i.type === 'ISBN_13')?.identifier ||
    info.industryIdentifiers?.find((i) => i.type === 'ISBN_10')?.identifier;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='space-y-8'
    >
      <Button
        variant='ghost'
        onClick={() => navigate({ to: '/shelf' })}
        className='gap-2 -ml-2 text-muted-foreground hover:text-foreground'
      >
        <ArrowLeft className='w-4 h-4' />
        {t('shelf.bookDetails.back')}
      </Button>

      <div className='flex flex-col md:flex-row gap-8 lg:gap-12'>
        <div className='shrink-0 mx-auto md:mx-0'>
          <div className='w-48 sm:w-56 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 bg-secondary/50'>
            {thumb ? (
              <img
                src={thumb}
                alt={info.title}
                className='w-full object-cover'
              />
            ) : (
              <div className='w-full aspect-2/3 flex items-center justify-center'>
                <BookOpen className='w-16 h-16 text-muted-foreground/30' />
              </div>
            )}
          </div>

          <div className='mt-6 space-y-3'>
            <Button
              onClick={handleToggleShelf}
              className={`w-full gap-2 ${onShelf ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              {onShelf ? (
                <>
                  <Check className='w-4 h-4' />
                  {t('shelf.bookDetails.removeFromShelf')}
                </>
              ) : (
                <>
                  <Plus className='w-4 h-4' />
                  {t('shelf.bookDetails.addToShelf')}
                </>
              )}
            </Button>

            {previewLink && (
              <Button variant='outline' className='w-full gap-2'>
                <a
                  href={previewLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex flex-row gap-2 max-w-fit'
                >
                  <ExternalLink className='w-4 h-4' />
                  {t('shelf.bookDetails.preview')}
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className='flex-1 min-w-0'>
          <h1 className='text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-tight'>
            {info.title}
          </h1>
          {info.subtitle && (
            <p className='text-lg text-muted-foreground mt-1'>
              {info.subtitle}
            </p>
          )}
          <p className='text-primary font-medium mt-3'>
            {info.authors?.join(', ') || '—'}
          </p>

          {/* Meta */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6'>
            {info.publisher && (
              <MetaItem
                label={t('shelf.bookDetails.publisher')}
                value={info.publisher}
              />
            )}
            {info.publishedDate && (
              <MetaItem
                label={t('shelf.bookDetails.publishedDate')}
                value={new Date(info.publishedDate).toLocaleDateString()}
              />
            )}
            {info.pageCount && (
              <MetaItem
                label={t('shelf.bookDetails.pageCount')}
                value={info.pageCount}
              />
            )}
            {isbn && (
              <MetaItem label={t('shelf.bookDetails.isbn')} value={isbn} />
            )}
            {info.language && (
              <MetaItem
                label={t('shelf.bookDetails.language')}
                value={info.language.toUpperCase()}
              />
            )}
          </div>

          {/* Categories */}
          {info.categories && info.categories?.length > 0 && (
            <div className='mt-6'>
              <p className='text-sm font-medium text-muted-foreground mb-2'>
                {t('shelf.bookDetails.categories')}
              </p>
              <div className='flex flex-wrap gap-2'>
                {info.categories.map((cat) => (
                  <Badge key={cat} variant='secondary' className='font-normal'>
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Synopsis */}
          <div className='mt-8'>
            <h2 className='text-lg font-serif font-semibold mb-3 flex items-center gap-2'>
              <BookMarked className='w-5 h-5 text-primary' />
              {t('shelf.bookDetails.synopsis')}
            </h2>
            {description ? (
              <Card className='border-border/50'>
                <CardContent className='p-5'>
                  <div
                    className='prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed'
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                  {description}
                </CardContent>
              </Card>
            ) : (
              <p className='text-muted-foreground italic'>
                {t('shelf.bookDetails.noSynopsis')}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
