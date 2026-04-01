import { Badge, Card } from '@/components/ui';
import type { Book } from '@/shared/types';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
  index?: number;
}

export const BookCard = ({ book, index = 0 }: BookCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link to={`/book/${book.id}`}>
        <Card className='group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer h-full'>
          <div className='aspect-2/3 bg-secondary/50 relative overflow-hidden'>
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <BookOpen className='w-12 h-12 text-muted-foreground/30' />
              </div>
            )}
            {book.year && (
              <Badge className='absolute top-2 right-2 bg-background/80 backdrop-blur text-foreground text-[10px] font-medium border-none'>
                {book.year}
              </Badge>
            )}
          </div>
          <div className='p-3'>
            <h3 className='font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors'>
              {book.title}
            </h3>
            <p className='text-xs text-muted-foreground mt-1 line-clamp-1'>
              {book.authors}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
