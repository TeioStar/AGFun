'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Tv, Gamepad2, TrendingDown, ArrowRight, Bell, Clock, Flame, Star
} from 'lucide-react';
import {
  getDemoBangumiUpdates
} from '@/lib/bilibili';
import { getDemoNewReleases } from '@/lib/steam';
import { getDemoPriceAlerts } from '@/lib/itad';
import type { BangumiUpdate, SteamNewRelease, GamePriceAlert } from '@/types';
import { timeAgo, formatPrice } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import SectionCard from '@/components/ui/SectionCard';

export default function DashboardPage() {
  const [bangumi, setBangumi] = useState<BangumiUpdate[]>([]);
  const [games, setGames]       = useState<SteamNewRelease[]>([]);
  const [deals, setDeals]       = useState<GamePriceAlert[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    // 初始化加载演示数据
    setTimeout(() => {
      setBangumi(getDemoBangumiUpdates());
      setGames(getDemoNewReleases());
      setDeals(getDemoPriceAlerts());
      setLoading(false);
    }, 600);
  }, []);

  const newCount = bangumi.filter(b => b.is_new).length;
  const dealCount = deals.filter(d => d.is_at_low).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 头部欢迎区 */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-primary-900/40 via-[var(--bg-card)] to-bilibili/10 p-6 sm:p-8">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-bilibili via-primary-400 to-steam bg-clip-text text-transparent">
              AGFun
            </span>{' '}
            番游更新提醒
          </h1>
          <p className="mt-2 text-[var(--text-muted)] max-w-xl">
            追踪你的追番进度、关注新游发布、监控 Steam 史低价格，一站掌握所有娱乐动态。
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <StatusBadge icon={<Tv size={14} />} label={`${bangumi.length} 部追番`} color="bilibili" />
            <StatusBadge icon={<Gamepad2 size={14} />} label={`${games.length} 个新游`} color="steam" />
            <StatusBadge icon={<TrendingDown size={14} />} label={`${dealCount} 个史低`} color="deal" />
            {newCount > 0 && (
              <StatusBadge icon={<Bell size={14} />} label={`${newCount} 个更新`} color="bilibili" pulse />
            )}
          </div>
        </div>
        {/* 装饰性光斑 */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bilibili/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-steam/10 blur-3xl" />
      </section>

      {/* 三栏概览 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 追番更新 */}
        <SectionCard
          href="/bangumi"
          title="追番更新"
          icon={<Tv size={18} className="text-bilibili" />}
          color="bilibili"
          loading={loading}
          count={bangumi.length}
        >
          {bangumi.slice(0, 4).map(b => (
            <div key={b.season_id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
              <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-bilibili/10">
                {b.cover && <img src={b.cover} alt="" className="h-full w-full object-cover" />}
                {b.is_new && (
                  <span className="badge-pulse absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-bilibili text-[8px] font-bold text-white">
                    NEW
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{b.season_title}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {b.ep_index} · {timeAgo(new Date(Date.now() - 2 * 3600 * 1000))}
                </p>
              </div>
            </div>
          ))}
        </SectionCard>

        {/* 新游发布 */}
        <SectionCard
          href="/games"
          title="新游发布"
          icon={<Gamepad2 size={18} className="text-steam" />}
          color="steam"
          loading={loading}
          count={games.length}
        >
          {games.slice(0, 4).map(g => (
            <div key={g.appid} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
              <div className="h-14 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-steam/10">
                {g.header_image && <img src={g.header_image} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{g.name}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span>{g.release_date}</span>
                  {g.discount ? (
                    <span className="rounded bg-deal/20 px-1.5 py-0.5 text-[10px] font-bold text-deal">
                      -{g.discount}%
                    </span>
                  ) : null}
                  {g.price && <span>{g.price}</span>}
                </div>
              </div>
            </div>
          ))}
        </SectionCard>

        {/* Steam 史低 */}
        <SectionCard
          href="/deals"
          title="Steam 史低"
          icon={<TrendingDown size={18} className="text-deal" />}
          color="deal"
          loading={loading}
          count={deals.length}
        >
          {deals.slice(0, 4).map((d, i) => (
            <div key={`${d.game_title}-${i}`} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
              <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-deal/10">
                {d.cover && <img src={d.cover} alt="" className="h-full w-full object-cover" />}
                {d.is_at_low && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-deal text-[8px] font-bold text-white">
                    <Star size={8} fill="white" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{d.game_title}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-deal">-{d.discount}%</span>
                  <span className="text-[var(--text-muted)]">{d.current_price}</span>
                  {d.is_at_low && (
                    <span className="text-[10px] font-medium text-deal/70">史低!</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}

