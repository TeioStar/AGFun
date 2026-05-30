import type { DealInfo, GamePriceAlert } from '@/types';
import { normalizeImageUrl } from '@/lib/utils';

/**
 * IsThereAnyDeal API 客户端
 * 用于查询 Steam 游戏史低价格
 * API 文档: https://itad.docs.apiary.io/
 */
const ITAD_BASE = 'https://api.isthereanydeal.com';
const ITAD_KEY = process.env.ITAD_API_KEY ?? '';

/** 查询游戏在各商店的当前价格 */
export async function fetchGameDeals(gameTitle: string): Promise<DealInfo[]> {
  if (!ITAD_KEY) {
    console.warn('ITAD_API_KEY not set, using demo data');
    return [];
  }
  try {
    // 先搜索游戏
    const searchRes = await fetch(
      `${ITAD_BASE}/games/search?key=${ITAD_KEY}&title=${encodeURIComponent(gameTitle)}&limit=1&results=1`
    );
    const searchData = await searchRes.json();
    if (!searchData?.[0]) return [];
    const game = searchData[0];

    // 获取历史最低价
    const dealsRes = await fetch(
      `${ITAD_BASE}/games/prices?key=${ITAD_KEY}&plains=${game.plains[0]}&country=CN`
    );
    const deals = await dealsRes.json();
    return deals[game.plains[0]] ?? [];
  } catch {
    return [];
  }
}

/** 查询愿望单中的史低降价 */
export async function fetchWishlistDeals(plains: string[]): Promise<DealInfo[]> {
  if (!ITAD_KEY || plains.length === 0) return [];
  try {
    const res = await fetch(
      `${ITAD_BASE}/games/prices?key=${ITAD_KEY}&plains=${plains.join(',')}&country=CN`
    );
    const json = await res.json();
    const all: DealInfo[] = [];
    for (const plain of plains) {
      if (json[plain]) all.push(...json[plain]);
    }
    return all;
  } catch {
    return [];
  }
}

/** 将 deals 转换为价格提醒格式 */
export function toPriceAlerts(deals: DealInfo[]): GamePriceAlert[] {
  return deals
    .filter(d => d.price.discount > 0)
    .sort((a, b) => b.price.discount - a.price.discount)
    .map(deal => ({
      game_title: deal.game.title,
      cover: normalizeImageUrl(deal.game.cover),
      store: deal.store.name,
      current_price: `${deal.price.currency}${deal.price.amount}`,
      historical_low: `${deal.cheapest.currency}${deal.cheapest.amount}`,
      discount: deal.price.discount,
      is_at_low: deal.price.amount <= deal.cheapest.amount,
      url: deal.url,
    }));
}

/** Steam CDN 用于 ITAD 演示封面 */
const STEAM_HEADER_CDN = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

/** 演示数据 */
export function getDemoPriceAlerts(): GamePriceAlert[] {
  return [
    { appid: 1091500, game_title: '赛博朋克2077', cover: `${STEAM_HEADER_CDN}/1091500/header.jpg`, store: 'Steam',    current_price: '¥59.60', historical_low: '¥49.80', discount: 60, is_at_low: false, url: '' },
    { appid: 1245620, game_title: '艾尔登法环', cover: `${STEAM_HEADER_CDN}/1245620/header.jpg`, store: 'Steam',       current_price: '¥118.80', historical_low: '¥99.00', discount: 40, is_at_low: false, url: '' },
    { appid: 292030,  game_title: '巫师3：狂猎', cover: `${STEAM_HEADER_CDN}/292030/header.jpg`, store: 'Steam',      current_price: '¥15.80', historical_low: '¥11.90', discount: 80, is_at_low: false, url: '' },
    { appid: 1086940, game_title: '博德之门3', cover: `${STEAM_HEADER_CDN}/1086940/header.jpg`, store: 'Steam',        current_price: '¥238.80', historical_low: '¥198.80', discount: 20, is_at_low: false, url: '' },
    { appid: 1174180, game_title: '荒野大镖客：救赎2', cover: `${STEAM_HEADER_CDN}/1174180/header.jpg`, store: 'Steam', current_price: '¥69.67', historical_low: '¥53.73', discount: 67, is_at_low: true, url: '' },
    { appid: 1145360, game_title: 'Hades', cover: `${STEAM_HEADER_CDN}/1145360/header.jpg`, store: 'Steam',              current_price: '¥25.00', historical_low: '¥25.00', discount: 75, is_at_low: true, url: '' },
    { appid: 289070,  game_title: '文明6', cover: `${STEAM_HEADER_CDN}/289070/header.jpg`, store: 'Steam',            current_price: '¥29.80', historical_low: '¥14.90', discount: 90, is_at_low: false, url: '' },
    { appid: 367520,  game_title: '空洞骑士', cover: `${STEAM_HEADER_CDN}/367520/header.jpg`, store: 'Steam',         current_price: '¥24.00', historical_low: '¥12.00', discount: 50, is_at_low: false, url: '' },
  ];
}
