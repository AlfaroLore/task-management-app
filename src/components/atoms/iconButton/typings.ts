import { HTMLAttributes, ReactNode } from 'react';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'outlined' | 'filled' | 'default';
  color?: 'primary' | 'secondary' | 'tertiary';
}
