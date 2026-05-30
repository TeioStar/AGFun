import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type CardType = 'bilibili' | 'steam' | 'deal';

interface SectionCardProps {
  href: string;
  title: string;
  icon: ReactNode;
  color: CardType;
  loading: boolean;
  count: number;
  children: ReactNode;
}

export default function SectionCard({ href, title, icon, color, loading, count, children }: SectionCardProps) {
  return (
    <div
      className="card-glow rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all"
      data-type={color}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-semibold">{title}</h2>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-[var(--text-muted)]">
            {loading ? '...' : count}
          </span>
        </div>
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
        >
          查看全部 <ArrowRight size={12} />
        </Link>
      </div>
      <div className="space-y-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-[60px] w-full" />
            ))
          : children}
      </div>
    </div>
  );
}
