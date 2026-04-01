import { Skeleton } from '@/components/ui';

export const BookPageSkeleton = () => {
  return (
    <div className='space-y-6'>
      <Skeleton className='h-8 w-32' />
      <div className='flex flex-col md:flex-row gap-8'>
        <Skeleton className='w-48 h-72 rounded-xl shrink-0' />
        <div className='flex-1 space-y-4'>
          <Skeleton className='h-10 w-3/4' />
          <Skeleton className='h-5 w-1/2' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      </div>
    </div>
  );
};
