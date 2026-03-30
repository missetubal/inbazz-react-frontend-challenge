import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { ReadingStatus } from '@/shared';

export const ReadingStatusBadge = ({ status }: { status: ReadingStatus }) => {
  const { t } = useTranslation('common');

  const classNameByStatus =
    status === ReadingStatus.FINISHED
      ? 'bg-emerald-500/10 text-emerald-600'
      : status === ReadingStatus.READING
        ? 'bg-primary/10 text-primary'
        : 'bg-accent text-accent-foreground';

  if (!status) {
    return (
      <Badge variant='secondary' className='bg-muted text-muted-foreground'>
        {t('badges.unknownStatus')}
      </Badge>
    );
  }

  return <Badge className={classNameByStatus}>{t(`badges.${status}`)}</Badge>;
};
