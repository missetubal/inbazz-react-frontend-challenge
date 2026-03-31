import React from 'react';

interface MetaItemProps {
  label: string;
  value: string | number;
}

export const MetaItem: React.FC<MetaItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className='text-xs text-muted-foreground'>{label}</p>
      <p className='font-medium text-sm mt-0.5'>{value}</p>
    </div>
  );
};
