import { BookMarked, Library, Search } from 'lucide-react';

export const FEATURES = [
  {
    icon: Search,
    title: 'features.items.search.title',
    description: 'features.items.search.description',
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: Library,
    title: 'features.items.library.title',
    description: 'features.items.library.description',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: BookMarked,
    title: 'features.items.bookMarked.title',
    description: 'features.items.bookMarked.description',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
];

export const STATS = [
  { value: '40M+', label: 'stats.items.availableBooks' },
  { value: '100%', label: 'stats.items.free' },
  { value: '3', label: 'stats.items.status' },
  { value: 'PT/EN', label: 'stats.items.language' },
];
