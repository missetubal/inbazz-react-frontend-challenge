import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Library, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ShelfEmptyState = () => {
  const { t } = useTranslation('shelfAndDiscover');
  return (
    <div className='space-y-8'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col items-center justify-center py-24 text-center'
      >
        <div className='w-20 h-20 rounded-full bg-secondary/80 flex items-center justify-center mb-4'>
          <Library className='w-10 h-10 text-muted-foreground/40' />
        </div>
        <h2 className='font-semibold text-lg mb-1'>
          {t('shelf.emptyState.title')}
        </h2>
        <p className='text-muted-foreground mb-6'>
          {t('shelf.emptyState.description')}
        </p>
        <Link to='/discover'>
          <Button className='gap-2'>
            <Search className='w-4 h-4' />
            {t('shelf.emptyState.goDiscover')}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
