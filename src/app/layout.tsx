import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import MobileNav from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'AGFun - 番游更新提醒',
  description: '追番更新、新游发布、Steam史低提醒 — 一站式游戏娱乐追踪',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <MobileNav />
          <main className="pt-16 pb-20 md:pb-8 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
