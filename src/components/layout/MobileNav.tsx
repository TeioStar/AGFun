'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tv, Gamepad2, TrendingDown, Sparkles } from 'lucide-react';

const items = [
  { href: '/',        label: '总览', icon: Sparkles },
  { href: '/bangumi', label: '追番', icon: Tv },
  { href: '/games',   label: '新游', icon: Gamepad2 },
  { href: '/deals',   label: '史低', icon: TrendingDown },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-medium transition-all',
                active ? 'text-primary-400' : 'text-[var(--text-muted)]'
              )}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
