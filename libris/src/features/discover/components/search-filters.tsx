import { Input } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SearchFilterProps } from '../types';
import {
  getOrderByOptions,
  getPrintTypeOptions,
  type OrderByOption,
  type PrintTypeOption,
} from '@/shared';

export const SearchFilter = ({
  orderBy,
  printType,
  query,
  setOrderBy,
  setPrintType,
  setQuery,
}: SearchFilterProps) => {
  const { t } = useTranslation('discover');
  return (
    <div className='flex flex-col sm:flex-row gap-3'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('filter.searchPlaceholder')}
          className='pl-11 h-12 bg-secondary/50 text-base'
        />
      </div>
      <Select
        value={t(`filter.type.${printType}`)}
        onValueChange={(value) => setPrintType(value as PrintTypeOption)}
      >
        <SelectTrigger className='w-full sm:w-36 h-12 bg-secondary/50'>
          <SelectValue placeholder={t('filter.type.all')} />
        </SelectTrigger>
        <SelectContent>
          {getPrintTypeOptions().map((option) => (
            <SelectItem key={option} value={option}>
              {t(`filter.type.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={t(`filter.order.${orderBy}`)}
        onValueChange={(value) => setOrderBy(value as OrderByOption)}
      >
        <SelectTrigger className='w-full sm:w-40 h-12 bg-secondary/50'>
          <SelectValue placeholder={t('filter.order.relevance')} />
        </SelectTrigger>
        <SelectContent>
          {getOrderByOptions().map((option) => (
            <SelectItem key={option} value={option}>
              {t(`filter.order.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
