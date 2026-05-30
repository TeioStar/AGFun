import type { ReactNode } from 'react';

type BadgeColor = 'bilibili' | 'steam' | 'deal' | 'primary';

interface StatusBadgeProps {
  icon: ReactNode;
  label: string;
  color?: BadgeColor;
  pulse?: boolean;
}

export default function StatusBadge({ icon, label, color = 'primary', pulse }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${pulse ? 'badge-pulse' : ''}`}
      style={{
        backgroundColor: `color-mix(in srgb, var(--${color}) 15%, transparent)`,
        color: `var(--${color})`,
      }}
    >
      {icon}
      {label}
    </span>
  );
}
