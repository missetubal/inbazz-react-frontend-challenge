import { FadeInSection } from '@/components/custom';
import { ShelfTable } from './shelf-table';
import { useTranslation } from 'react-i18next';

export const ShelfPreview = () => {
  const { t } = useTranslation('landing');
  return (
    <section className='py-24 px-5 bg-secondary/30'>
      <div className='max-w-6xl mx-auto'>
        <FadeInSection className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-serif font-bold tracking-tight'>
            {t('shelfPreview.title')}
          </h2>
          <p className='text-muted-foreground mt-3 max-w-md mx-auto'>
            {t('shelfPreview.subtitle')}
          </p>
        </FadeInSection>
        <ShelfTable />
      </div>
    </section>
  );
};
