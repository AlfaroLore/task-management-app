import { HomeIcon, ListBulletIcon } from '@heroicons/react/16/solid';
import { NavigationItem } from 'src/typings';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', current: false, icon: HomeIcon },
  { name: 'My Task', href: '/my-tasks', current: false, icon: ListBulletIcon },
];
