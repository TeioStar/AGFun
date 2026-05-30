'use client';

import useSWR from 'swr';
import type { BangumiUpdate, SteamNewRelease, GamePriceAlert } from '@/types';
import { getDemoBangumiUpdates } from '@/lib/bilibili';
import { getDemoNewReleases } from '@/lib/steam';
import { getDemoPriceAlerts } from '@/lib/itad';

/** 模拟异步数据获取（后续替换为真实 API） */
async function fetchBangumi(): Promise<BangumiUpdate[]> {
  await new Promise(r => setTimeout(r, 400));
  return getDemoBangumiUpdates();
}

async function fetchNewReleases(): Promise<SteamNewRelease[]> {
  await new Promise(r => setTimeout(r, 400));
  return getDemoNewReleases();
}

async function fetchPriceAlerts(): Promise<GamePriceAlert[]> {
  await new Promise(r => setTimeout(r, 400));
  return getDemoPriceAlerts();
}

/** 追番更新 */
export function useBangumiUpdates() {
  return useSWR('bangumi-updates', fetchBangumi, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
}

/** Steam 新游 */
export function useNewReleases() {
  return useSWR('new-releases', fetchNewReleases, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
}

/** Steam 史低 */
export function usePriceAlerts() {
  return useSWR('price-alerts', fetchPriceAlerts, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
}
