import type { LucideIcon } from 'lucide-react';
import { createLazyIconWrapper } from '@/lib/lucide-icons';

type StatColor = 'primary' | 'secondary' | 'accent';

export interface Stat {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  color?: StatColor;
}

export const stats: Stat[] = [
  {
    icon: createLazyIconWrapper('Calendar') as LucideIcon,
    value: 20,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Established since 2002',
    color: 'primary',
  },
  {
    icon: createLazyIconWrapper('Users') as LucideIcon,
    value: 1200,
    suffix: '+',
    label: 'Skilled Employees',
    description: 'Dedicated professionals',
    color: 'accent',
  },
  {
    icon: createLazyIconWrapper('Settings') as LucideIcon,
    value: 680,
    suffix: '+',
    label: 'Advanced Machines',
    description: 'State-of-the-art equipment',
    color: 'secondary',
  },
  {
    icon: createLazyIconWrapper('Package') as LucideIcon,
    value: 360,
    suffix: 'K+',
    label: 'Annual Production',
    description: 'Dozen capacity',
    color: 'primary',
  },
];
