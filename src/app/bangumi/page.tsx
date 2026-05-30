'use client';

import { useState } from 'react';
import { Tv, Bell, Clock, Play } from 'lucide-react';
import type { BangumiUpdate } from '@/types';
import { timeAgo } from '@/lib/utils';
import { useBangumiUpdates } from '@/hooks/useData';
import FilterBtn from '@/components/ui/FilterBtn';

export default function BangumiPage() {
  const { data: updates = [], isLoading } = useBangumiUpdates();
  const [filter, setFilter] = useState<'all' | 'new'>('all');

  const filtered = filter === 'new' ? updates.filter(u => u.is_new) : updates;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bilibili/15">
            <Tv size={20} className="text-bilibili" />
          </div>
          <div>
            <h1 className="text-xl font-bold">追番更新</h1>
            <p className="text-sm text-[var(--text-muted)]">你的 Bilibili 追番动态</p>
          </div>
        </div>
        <div className="flex gap-2">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')} color="bilibili">全部</FilterBtn>
          <FilterBtn active={filter === 'new'} onClick={() => setFilter('new')} color="bilibili">
            <Bell size={12} /> 有更新
          </FilterBtn>
        </div>
      </div>

      {/* 列表 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-48 w-full rounded-2xl" />
            ))
          : filtered.map(b => (
              <div key={b.season_id}
                   className="card-glow group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all"
                   data-type="bilibili">
                <div className="relative h-32 overflow-hidden bg-bilibili/5">
                  {b.cover ? (
                    <img src={b.cover} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Tv size={40} className="text-bilibili/20" />
                    </div>
                  )}
                  {b.is_new && (
                    <div className="badge-pulse absolute top-3 right-3 flex items-center gap-1 rounded-full bg-bilibili px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                      <Play size={10} fill="white" /> NEW
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
                </div>
                <div className="p-4 pt-0">
                  <h3 className="mt-1 truncate text-sm font-semibold">{b.season_title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {timeAgo(new Date(Date.now() - 2 * 3600 * 1000))}
                    </span>
                    <span>·</span>
                    <span className="text-bilibili">{b.ep_index}</span>
                  </div>
                  {b.is_new && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-bilibili">
                      <Bell size={10} className="badge-pulse" />
                      有新更新
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
          <Tv size={48} className="mx-auto text-bilibili/20" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            {filter === 'new' ? '暂时没有新更新' : '还没有追番数据，请先在设置中配置 Bilibili UID'}
          </p>
        </div>
      )}
    </div>
  );
}
