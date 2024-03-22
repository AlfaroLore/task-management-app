import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export interface NavigationItem {
  name: string;
  href: string;
  current: false;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export interface CardItem {
  name: string;
  tags: string[];
  dueDate: string;
  estimatedTime: string;
}
