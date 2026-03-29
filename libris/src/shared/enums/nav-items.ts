import { Library, Search, type LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  path: string;
  icon: LucideIcon;
  label: string;
}

export const NAV_ITEMS = {
  DISCOVER: {
    id: 'DISCOVER',
    path: '/discover',
    icon: Search,
    label: 'nav.discover',
  },
  SHELF: {
    id: 'SHELF',
    path: '/shelf',
    icon: Library,
    label: 'nav.shelf',
  },
} as const;

export type NavItemKey = keyof typeof NAV_ITEMS;
export type NavItemValue = (typeof NAV_ITEMS)[NavItemKey];

export const getNavItems = (): NavItem[] => {
  return Object.values(NAV_ITEMS);
};
