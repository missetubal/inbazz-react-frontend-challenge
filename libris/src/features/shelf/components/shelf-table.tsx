import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Trash2 } from 'lucide-react';
import { useGetShelfData } from '../hooks/use-shelf-data';
import { ReadingStatusBadge } from '@/components/custom';
import { getReadingStatusOptions, type Book } from '@/shared';
import { RemoveBookFromShelfModal } from './remove-book-from-shelf-modal';
import { ShelfFilters } from './shelf-filters';

export const ShelfTable = () => {
  const {
    t,
    sortedBooks,
    handleRemoveBook,
    handleUpdateStatus,
    bookToRemoveId,
    closeRemoveConfirmModal,
    handleConfirmRemoveBook,
    isRemoveConfirmModalOpen,
    setSortBy,
    sortBy,
  } = useGetShelfData();

  return (
    <>
      <ShelfFilters sortBy={sortBy} setSortBy={setSortBy} t={t} />
      <div className='hidden md:block rounded-xl border border-border/50 overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='bg-secondary/30'>
              <TableHead className='w-16'>{t('shelf.table.cover')}</TableHead>
              <TableHead>{t('shelf.table.title')}</TableHead>
              <TableHead>{t('shelf.table.authors')}</TableHead>
              <TableHead>{t('shelf.table.publishedDate')}</TableHead>
              <TableHead>{t('shelf.table.status.label')}</TableHead>
              <TableHead className='text-right'>
                {t('shelf.table.actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {sortedBooks.map((book) => (
                <motion.tr
                  key={book.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className='border-b border-border/30 hover:bg-secondary/20 transition-colors'
                >
                  <TableCell>
                    <Link to={`/book/${book.id}`}>
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className='w-10 h-14 object-cover rounded shadow-sm'
                        />
                      ) : (
                        <div className='w-10 h-14 bg-secondary rounded flex items-center justify-center'>
                          <BookOpen className='w-4 h-4 text-muted-foreground/40' />
                        </div>
                      )}
                    </Link>
                  </TableCell>
                  <TableCell className='max-w-60 truncate'>
                    <Link
                      to={`/book/${book.id}`}
                      className='font-medium hover:text-primary transition-colors'
                    >
                      {book.title}
                    </Link>
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {book.authors || '—'}
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {book.publishedDate
                      ? new Date(book.publishedDate).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={t(`shelf.table.status.${book.status}`)}
                      onValueChange={(v) =>
                        handleUpdateStatus(book.id, v as Book['status'])
                      }
                    >
                      <SelectTrigger className='w-36 h-8 text-xs'>
                        <ReadingStatusBadge status={book.status} />
                      </SelectTrigger>
                      <SelectContent>
                        {getReadingStatusOptions().map((status) => (
                          <SelectItem value={status}>
                            {t(`shelf.table.status.${status}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleRemoveBook(book.id)}
                      className='text-destructive hover:text-destructive'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
        <RemoveBookFromShelfModal
          bookToRemoveTitle={
            sortedBooks.find((b) => b.id === bookToRemoveId)?.title || null
          }
          closeRemoveConfirmModal={closeRemoveConfirmModal}
          handleConfirmRemoveBook={handleConfirmRemoveBook}
          isRemoveConfirmModalOpen={isRemoveConfirmModalOpen}
          t={t}
        />
      </div>
    </>
  );
};
