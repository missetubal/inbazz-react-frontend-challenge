import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { RegisterForm } from './ui';

export const RegisterWrapper = () => {
  const { t } = useTranslation('auth');

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='w-full max-w-md'
      >
        <div className='text-center mb-10'>
          <div className='inline-flex items-center justify-center w-16 rounded-2xl bg-primary/10 mb-6'>
            <BookOpen className='w-8 h-8 text-primary' />
          </div>
          <h1 className='text-3xl font-serif font-bold text-foreground tracking-tight'>
            {t('registerPage.title')}
          </h1>
          <p className='text-muted-foreground mt-2'>
            {t('registerPage.subtitle')}
          </p>
        </div>
        <Card className='border-border/50 shadow-xl shadow-primary/5'>
          <CardContent className='pt-8 pb-8 px-8'>
            <RegisterForm />
          </CardContent>
        </Card>
        <p className='text-center text-xs text-muted-foreground mt-6'>
          Virtual Bookshelf — Powered by Google Books API
        </p>
      </motion.div>
    </div>
  );
};
