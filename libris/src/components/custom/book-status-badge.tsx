import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { BOOK_STATUS, type BookStatusKey } from '@/shared';

interface BookStatusBadgeProps {
  status: BookStatusKey;
  className?: string;
}

export const BookStatusBadge = ({
  status,
  className,
}: BookStatusBadgeProps) => {
  const { t } = useTranslation('common');
  const statusDetails = BOOK_STATUS[status];

  if (!statusDetails) {
    return (
      <Badge variant='secondary' className={className}>
        {t('badges.unknownStatus')}
      </Badge>
    );
  }

  return (
    <Badge className={`${statusDetails.colorClass} ${className}`}>
      {t(statusDetails.label)}
    </Badge>
  );
};
