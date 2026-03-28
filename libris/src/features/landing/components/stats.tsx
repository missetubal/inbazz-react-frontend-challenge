import { FadeInSection } from '@/components/custom';
import { useTranslation } from 'react-i18next';
import { STATS } from '../contants';

export const Stats = () => {
  const { t } = useTranslation('landing');
  return (
    <section className='py-24 px-5'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {STATS.map((s, i) => (
            <FadeInSection key={s.label} delay={i * 0.1}>
              <p className='text-4xl sm:text-5xl font-serif font-bold text-primary'>
                {s.value}
              </p>
              <p className='text-sm text-muted-foreground mt-2'>{t(s.label)}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
