import { BookStatusBadge } from '@/components/custom';
import { Badge, Button } from '@/components/ui';
import { BOOK_STATUS } from '@/shared';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BookStack } from './book-stack';

export const Hero = () => {
  const { t } = useTranslation('landing');

  return (
    <section className='relative pt-32 pb-24 px-5 overflow-hidden'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-primary/5 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute top-20 left-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center gap-16'>
          <div className='flex-1 text-center lg:text-left'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className='mb-6 bg-primary/10 text-primary border-primary/20 font-medium px-4 py-1.5'>
                <Sparkles className='w-3.5 h-3.5 mr-1.5' />
                {t('hero.badge')}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.15] tracking-tight'
            >
              {t('hero.title.0')}
              <br />
              <span className='text-primary'>{t('hero.title.1')}</span>
              {t('hero.title.2')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='text-lg text-muted-foreground mt-5 max-w-lg mx-auto lg:mx-0 leading-relaxed'
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='flex flex-wrap gap-3 mt-8 justify-center lg:justify-start'
            >
              <Link to='/login'>
                <Button
                  size='lg'
                  className='h-12 px-7 text-base font-semibold gap-2'
                >
                  {t('hero.buttons.createMyBookshelf')}
                  <ArrowRight className='w-4 h-4' />
                </Button>
              </Link>
              <Link to='/login'>
                <Button
                  size='lg'
                  variant='outline'
                  className='h-12 px-7 text-base'
                >
                  {t('hero.buttons.alreadyHaveAccount')}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='flex gap-2 mt-8 justify-center lg:justify-start flex-wrap'
            >
              {Object.values(BOOK_STATUS).map((badge) => (
                <BookStatusBadge
                  status={badge.id}
                  className={badge.colorClass}
                />
              ))}
            </motion.div>
          </div>

          <div className='flex-1 w-full max-w-lg lg:max-w-none'>
            <BookStack />
          </div>
        </div>
      </div>
    </section>
  );
};
