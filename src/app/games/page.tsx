'use client';

import { useState } from 'react';
import { Gamepad2, Search } from 'lucide-react';
import type { SteamNewRelease } from '@/types';
import { useNewReleases } from '@/hooks/useData';

export default function GamesPage() {
  const { data: games = [], isLoading } = useNewReleases();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'default' | 'discount' | 'name'>('default');

  let filtered = games.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === 'discount') {
    filtered = [...filtered].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  } else if (sort === 'name') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'zh'));
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-steam/15">
            <Gamepad2 size={20} className="text-steam" />
          </div>
          <div>
            <h1 className="text-xl font-bold">新游发布</h1>
            <p className="text-sm text-[var(--text-muted)]">Steam 最新热门游戏</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="搜索游戏..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-[var(--border)] bg-white/5 pl-8 pr-3 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-steam/50 sm:w-48"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as typeof sort)}
            className="h-9 rounded-lg border border-[var(--border)] bg-white/5 px-2 text-xs text-[var(--text)] outline-none"
          >
            <option value="default">默认</option>
            <option value="discount">折扣最高</option>
            <option value="name">名称</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-64 w-full rounded-2xl" />
            ))
          : filtered.map(game => (
              <div key={game.appid}
                   className="card-glow group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all"
                   data-type="steam">
                <div className="relative aspect-video overflow-hidden bg-steam/5">
                  {game.header_image ? (
                    <img src={game.header_image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Gamepad2 size={36} className="text-steam/20" />
                    </div>
                  )}
                  {game.discount ? (
                    <div className="absolute top-2 right-2 rounded-lg bg-deal px-2 py-1 text-[11px] font-bold text-white shadow-lg">
                      -{game.discount}%
                    </div>
                  ) : null}
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-semibold leading-tight">{game.name}</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {game.genres.slice(0, 3).map(g => (
                      <span key={g} className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">{game.release_date}</span>
                    {game.price && (
                      <span className={`text-sm font-bold ${game.discount ? 'text-deal' : 'text-[var(--text)]'}`}>
                        {game.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
          <Gamepad2 size={48} className="mx-auto text-steam/20" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">未找到匹配的游戏</p>
        </div>
      )}
    </div>
  );
}
