import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { ReadingStatus, ReadingStatusDetails } from '@/shared';

export const ReadingStatusBadge = ({ status }: { status: ReadingStatus }) => {
  const { t } = useTranslation('common');

  const statusDetails =
    status && ReadingStatusDetails[status]
      ? ReadingStatusDetails[status]
      : ReadingStatusDetails[ReadingStatus.UNKNOWN];

  return (
    <Badge className={statusDetails.colorClass}>{t(statusDetails.label)}</Badge>
  );
};
