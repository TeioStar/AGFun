'use client';

import { useState, useEffect } from 'react';
import { TrendingDown, Star, Filter, ExternalLink, AlertTriangle, ArrowDown, Store } from 'lucide-react';
import { getDemoPriceAlerts } from '@/lib/itad';
import type { GamePriceAlert } from '@/types';

export default function DealsPage() {
  const [deals, setDeals] = useState<GamePriceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'atLow' | 'bigDiscount'>('all');

  useEffect(() => {
    setTimeout(() => {
      setDeals(getDemoPriceAlerts());
      setLoading(false);
    }, 500);
  }, []);

  const filtered = deals.filter(d => {
    if (filter === 'atLow') return d.is_at_low;
    if (filter === 'bigDiscount') return d.discount >= 50;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-deal/15">
            <TrendingDown size={20} className="text-deal" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Steam 史低</h1>
            <p className="text-sm text-[var(--text-muted)]">IsThereAnyDeal 价格追踪</p>
          </div>
        </div>
        <div className="flex gap-2">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>全部</FilterBtn>
          <FilterBtn active={filter === 'atLow'} onClick={() => setFilter('atLow')}>
            <Star size={11} /> 史低
          </FilterBtn>
          <FilterBtn active={filter === 'bigDiscount'} onClick={() => setFilter('bigDiscount')}>
            <ArrowDown size={11} /> 五折以下
          </FilterBtn>
        </div>
      </div>

      {/* Alert Banner */}
      {deals.some(d => d.is_at_low) && (
        <div className="flex items-center gap-3 rounded-xl border border-deal/20 bg-deal/5 p-3">
          <AlertTriangle size={16} className="flex-shrink-0 text-deal" />
          <p className="text-sm text-deal">
            有 {deals.filter(d => d.is_at_low).length} 个游戏正处于历史最低价！
          </p>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-white/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">游戏</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">商店</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">现价</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">史低</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">折扣</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">状态</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-[var(--border)]">
                      <td colSpan={6} className="px-4 py-3"><div className="skeleton h-8 w-full" /></td>
                    </tr>
                  ))
                : filtered.map((d, i) => (
                    <tr key={`${d.game_title}-${i}`}
                        className="border-b border-[var(--border)] transition-colors hover:bg-white/[0.03] last:border-b-0"
                        data-type={d.is_at_low ? 'deal' : undefined}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-deal/5">
                            {d.cover ? (
                              <img src={d.cover} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[var(--text-muted)]">
                                <TrendingDown size={14} />
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{d.game_title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-[var(--text-muted)]">
                          <Store size={12} />
                          {d.store}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold">{d.current_price}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{d.historical_low}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-lg bg-deal/15 px-2 py-1 text-xs font-bold text-deal">
                          -{d.discount}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {d.is_at_low ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-deal">
                            <Star size={12} fill="currentColor" /> 史低!
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)]">-</span>
                        )}
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
          <TrendingDown size={48} className="mx-auto text-deal/20" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">暂无符合条件的降价信息</p>
        </div>
      )}
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
        active ? 'bg-deal/15 text-deal' : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}
