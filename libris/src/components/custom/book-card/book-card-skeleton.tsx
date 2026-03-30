import { Skeleton, Card } from '@/components/ui';

export const BookCardSkeleton = () => {
  return (
    <Card className='overflow-hidden border-border/50'>
      <Skeleton className='aspect-2/3 w-full rounded-none' />
      <div className='p-3 space-y-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-3 w-1/2' />
      </div>
    </Card>
  );
};
