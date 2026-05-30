import type { SteamNewRelease, SteamApp } from '@/types';
import { normalizeImageUrl } from '@/lib/utils';

/**
 * Steam 新游数据获取
 * 使用 Steam Store API（公开接口，无需 API Key）
 */
const STEAM_API = 'https://store.steampowered.com/api';
const STEAM_CDN  = 'https://cdn.akamai.steamstatic.com/steam/apps';
const STEAM_HEADER_CDN = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

/** 获取单个游戏详情 */
export async function fetchSteamApp(appid: number): Promise<SteamApp | null> {
  try {
    const res = await fetch(
      `${STEAM_API}/appdetails?appids=${appid}&l=schinese`,
      { next: { revalidate: 300 } }
    );
    const json = await res.json();
    const data = json?.[String(appid)];
    if (!data?.success) return null;
    return data.data as SteamApp;
  } catch {
    return null;
  }
}

/** 获取热门新品（Top Sellers New） */
export async function fetchNewReleases(): Promise<SteamNewRelease[]> {
  try {
    // 通过 Steam API 获取热门新品列表
    const res = await fetch(
      `${STEAM_API}/featuredcategories?cc=cn&l=schinese`,
      { next: { revalidate: 600 } }
    );
    const json = await res.json();
    const releases: SteamNewRelease[] = [];

    const topSellers = json?.top_sellers?.items ?? [];
    for (const item of topSellers.slice(0, 12)) {
      const detail = await fetchSteamApp(item.id);
      if (detail && !detail.release_date?.coming_soon) {
        releases.push({
          appid: detail.appid,
          name: detail.name,
          header_image: normalizeImageUrl(detail.header_image),
          release_date: detail.release_date?.date ?? '',
          genres: (detail.genres ?? []).map(g => g.description),
          tags: [],
          price: detail.price_overview?.final_formatted,
          discount: detail.price_overview?.discount_percent,
        });
      }
    }

    return releases;
  } catch {
    return [];
  }
}

/** 获取特别优惠（折扣游戏） */
export async function fetchSpecials(): Promise<SteamNewRelease[]> {
  try {
    const res = await fetch(
      `${STEAM_API}/featuredcategories?cc=cn&l=schinese`,
      { next: { revalidate: 600 } }
    );
    const json = await res.json();
    const specials: SteamNewRelease[] = [];

    const items = json?.specials?.items ?? [];
    for (const item of items.slice(0, 12)) {
      const detail = await fetchSteamApp(item.id);
      if (detail && detail.price_overview?.discount_percent) {
        specials.push({
          appid: detail.appid,
          name: detail.name,
          header_image: detail.header_image,
          release_date: detail.release_date?.date ?? '',
          genres: (detail.genres ?? []).map(g => g.description),
          tags: [],
          price: detail.price_overview?.final_formatted,
          discount: detail.price_overview?.discount_percent,
        });
      }
    }

    return specials;
  } catch {
    return [];
  }
}

/** 搜索游戏 */
export async function searchSteamGames(query: string): Promise<SteamNewRelease[]> {
  try {
    const res = await fetch(
      `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&cc=cn&l=schinese`,
      { next: { revalidate: 300 } }
    );
    const json = await res.json();
    if (!json?.items) return [];
    return json.items.map((item: Record<string, unknown>) => ({
      appid: item.id as number,
      name: item.name as string,
      header_image: (item.tiny_image ?? item.large_capsule_image) as string,
      release_date: '',
      genres: [],
      tags: [],
    }));
  } catch {
    return [];
  }
}

/** 演示数据 */
export function getDemoNewReleases(): SteamNewRelease[] {
  return [
    { appid: 2358720, name: '黑神话：悟空', header_image: `${STEAM_HEADER_CDN}/2358720/header.jpg`, release_date: '2024年8月20日', genres: ['动作', 'RPG'], tags: ['神话', '国产'], price: '¥268.00', discount: 0 },
    { appid: 292030,  name: '巫师3：狂猎', header_image: `${STEAM_HEADER_CDN}/292030/header.jpg`, release_date: '2015年5月18日', genres: ['动作', 'RPG'], tags: ['开放世界', '剧情'], price: '¥79.00', discount: -80 },
    { appid: 1091500, name: '赛博朋克2077', header_image: `${STEAM_HEADER_CDN}/1091500/header.jpg`, release_date: '2020年12月10日', genres: ['动作', 'RPG'], tags: ['科幻', '开放世界'], price: '¥149.00', discount: -60 },
    { appid: 1174180, name: '荒野大镖客：救赎2', header_image: `${STEAM_HEADER_CDN}/1174180/header.jpg`, release_date: '2019年12月5日', genres: ['动作', '冒险'], tags: ['西部', '开放世界'], price: '¥139.50', discount: 0 },
    { appid: 1621690, name: '史莱姆牧场2', header_image: `${STEAM_HEADER_CDN}/1621690/header.jpg`, release_date: '2024年9月23日', genres: ['休闲', '模拟'], tags: ['可爱', '农场'], price: '¥98.00', discount: -30 },
    { appid: 1245620, name: '艾尔登法环', header_image: `${STEAM_HEADER_CDN}/1245620/header.jpg`, release_date: '2022年2月25日', genres: ['动作', 'RPG'], tags: ['魂', '开放世界'], price: '¥198.00', discount: -40 },
  ];
}
