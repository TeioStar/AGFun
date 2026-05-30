'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type FilterColor = 'bilibili' | 'steam' | 'deal' | 'primary';

interface FilterBtnProps {
  active: boolean;
  onClick: () => void;
  color?: FilterColor;
  children: ReactNode;
}

const colorMap: Record<FilterColor, string> = {
  bilibili: 'bg-bilibili/15 text-bilibili',
  steam:    'bg-steam/15 text-steam',
  deal:     'bg-deal/15 text-deal',
  primary:  'bg-primary-500/15 text-primary-400',
};

export default function FilterBtn({ active, onClick, color = 'primary', children }: FilterBtnProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
        active
          ? colorMap[color]
          : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10'
      )}
    >
      {children}
    </button>
  );
}
