'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tv, Gamepad2, TrendingDown, Settings, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

const navItems = [
  { href: '/',           label: '总览', icon: Sparkles },
  { href: '/bangumi',    label: '追番', icon: Tv },
  { href: '/games',      label: '新游', icon: Gamepad2 },
  { href: '/deals',      label: '史低', icon: TrendingDown },
  { href: '/settings',   label: '设置', icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-bilibili via-primary-500 to-steam">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">AGFun</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-primary-500/15 text-primary-400'
                    : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Theme toggle - desktop */}
          <button
            onClick={toggle}
            className="ml-2 hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-white/10 hover:text-[var(--text)]"
            title={theme === 'dark' ? '切换亮色主题' : '切换暗色主题'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile bottom nav is rendered separately */}
        </div>
      </nav>
    );
}
