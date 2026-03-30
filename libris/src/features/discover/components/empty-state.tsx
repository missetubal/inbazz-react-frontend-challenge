import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const EmptyState = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex flex-col items-center justify-center py-24 text-center'
    >
      <div className='w-20 h-20 rounded-full bg-secondary/80 flex items-center justify-center mb-4'>
        <BookOpen className='w-10 h-10 text-muted-foreground/40' />
      </div>
      <p className='text-muted-foreground'>{text}</p>
    </motion.div>
  );
};
