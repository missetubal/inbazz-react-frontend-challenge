import { Skeleton } from '@/components/ui';
import { useGetHeroBooks } from '../hooks';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const BookStack = () => {
  const { isLoading, heroBooks } = useGetHeroBooks();

  const offsets = [-28, -14, 0, 14, 28];
  const heights = [160, 200, 240, 200, 160];
  const delays = [0.3, 0.2, 0.1, 0.2, 0.3];
  const rotations = [-6, -3, 0, 3, 6];

  if (isLoading) {
    return (
      <div className='relative flex items-end justify-center gap-3 h-80'>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              className='rounded-xl shrink-0'
              style={{ height: heights[i], width: heights[i] * 0.65 }}
            />
          ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      className='relative flex items-end justify-center gap-3 h-80'
    >
      {heroBooks.map((book, i) => {
        return (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: offsets[i] }}
            transition={{ duration: 0.7, delay: delays[i], ease: 'easeOut' }}
            style={{ height: heights[i], rotate: rotations[i] }}
            className='relative rounded-xl overflow-hidden shadow-2xl shrink-0 cursor-pointer group bg-secondary'
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
          >
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className='w-full h-full object-cover'
                style={{ width: heights[i] * 0.65 }}
              />
            ) : (
              <div
                className='flex items-center justify-center h-full'
                style={{ width: heights[i] * 0.65 }}
              >
                <BookOpen className='w-8 h-8 text-muted-foreground/30' />
              </div>
            )}
            <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80' />
            <div className='absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              <p className='text-white text-xs font-semibold line-clamp-1'>
                {book.title}
              </p>
              <p className='text-white/70 text-[10px] mt-0.5'>{book.authors}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
