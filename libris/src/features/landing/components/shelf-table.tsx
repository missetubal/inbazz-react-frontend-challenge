import { FadeInSection } from '@/components/custom';
import {
  Card,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { useGetShelfPreviewTable } from '../hooks';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { ReadingStatusBadge } from '@/components/custom';

export const ShelfTable = () => {
  const { t } = useTranslation('landing');
  const { isLoading, topFiveBooks } = useGetShelfPreviewTable();

  const renderSkeleton = () => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className='grid grid-cols-12 gap-4 border-b border-border/20 items-center hover:bg-secondary/20 transition-colors'
        >
          <TableRow className='flex items-center transition-colors space-y-4'>
            <TableCell>
              <Skeleton className='h-6 w-16 rounded-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-60 rounded-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-60 hidden sm:table-cell rounded-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-40 rounded-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-40 rounded-full' />
            </TableCell>
            <TableCell className='text-right'>
              <Skeleton className='h-6 w-20 rounded-full' />
            </TableCell>
          </TableRow>
        </div>
      ));
  };

  return (
    <FadeInSection delay={0.15}>
      <Card className='p-4'>
        <div className='flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-secondary/20'>
          <div className='w-3 h-3 rounded-full bg-destructive/40' />
          <div className='w-3 h-3 rounded-full bg-amber-400/40' />
          <div className='w-3 h-3 rounded-full bg-emerald-400/40' />
          {/* <div className='ml-3 flex-1 h-5 rounded-md bg-secondary/60 max-w-xs' /> */}
        </div>
        <Table>
          <TableHeader className='sticky top-0'>
            <TableRow className='bg-secondary/30 text-xs font-medium text-muted-foreground border-b border-border/30 hover:bg-secondary/30 items-center'>
              <TableHead className='w-20'>
                {t('shelfPreview.table.cover')}
              </TableHead>
              <TableHead className='w-50'>
                {t('shelfPreview.table.title')}
              </TableHead>
              <TableHead className='w-50 hidden sm:table-cell'>
                {t('shelfPreview.table.author')}
              </TableHead>
              <TableHead className='hidden sm:table-cell'>
                {t('shelfPreview.table.published')}
              </TableHead>
              <TableHead className='text-right'>
                {t('shelfPreview.table.status')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !topFiveBooks.length
              ? renderSkeleton()
              : topFiveBooks.map((book, i) => (
                  <motion.div
                    key={book.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    viewport={{ once: true }}
                    className='contents'
                  >
                    <TableRow className='border-b border-border/20 items-center hover:bg-secondary/20 transition-colors'>
                      <TableCell className='font-medium'>
                        {book.cover ? (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className='w-8 h-11 object-cover rounded shadow-sm'
                          />
                        ) : (
                          <div className='w-10 h-11 rounded bg-secondary flex items-center justify-center'>
                            <BookOpen className='w-3.5 h-3.5 text-muted-foreground/30' />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className='font-medium text-sm  max-w-120 truncate'>
                        {book.title}
                      </TableCell>
                      <TableCell className='hidden sm:table-cell text-sm text-muted-foreground max-w-100 truncate'>
                        {book.authors ?? '-'}
                      </TableCell>
                      <TableCell className='hidden sm:table-cell text-sm text-muted-foreground'>
                        {book.year}
                      </TableCell>
                      <TableCell className='text-right'>
                        {book.status && (
                          <ReadingStatusBadge status={book.status} />
                        )}
                      </TableCell>
                    </TableRow>
                  </motion.div>
                ))}
          </TableBody>
        </Table>
      </Card>
    </FadeInSection>
  );
};
