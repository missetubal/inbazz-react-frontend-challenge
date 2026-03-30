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
import type { Book } from '@/shared';

export const ShelfTable = () => {
  const { t, sortedBooks, handleRemoveBook, handleUpdateStatus } =
    useGetShelfData();

  return (
    <div className='hidden md:block rounded-xl border border-border/50 overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow className='bg-secondary/30'>
            <TableHead className='w-16'>{t('shelf.cover')}</TableHead>
            <TableHead>{t('shelf.bookTitle')}</TableHead>
            <TableHead>{t('shelf.author')}</TableHead>
            <TableHead>{t('shelf.published')}</TableHead>
            <TableHead>{t('shelf.status')}</TableHead>
            <TableHead className='text-right'>{t('shelf.actions')}</TableHead>
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
                <TableCell>
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
                  {book.publishedDate || '—'}
                </TableCell>
                <TableCell>
                  <Select
                    value={book.status}
                    onValueChange={(v) =>
                      handleUpdateStatus(book.id, v as Book['status'])
                    }
                  >
                    <SelectTrigger className='w-36 h-8 text-xs'>
                      <ReadingStatusBadge status={book.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='want_to_read'>
                        {t('shelf.wantToRead')}
                      </SelectItem>
                      <SelectItem value='reading'>
                        {t('shelf.reading')}
                      </SelectItem>
                      <SelectItem value='completed'>
                        {t('shelf.completed')}
                      </SelectItem>
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
    </div>
  );
};
