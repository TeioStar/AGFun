import type { BangumiSeason, BangumiUpdate, ApiResponse } from '@/types';
import { normalizeImageUrl } from '@/lib/utils';

/**
 * Bilibili 追番数据获取
 * 使用 Bilibili 公开 API（无需登录的基础数据）
 */
const BILIBILI_BASE = 'https://api.bilibili.com';

/** 获取用户追番列表（season_id 列表） */
export async function fetchFollowedSeasonIds(uid: string): Promise<number[]> {
  try {
    const res = await fetch(
      `${BILIBILI_BASE}/x/space/bangumi?vmid=${uid}&type=1`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    if (json.code !== 0 || !json.data?.list) return [];
    return json.data.list.map((item: { season_id: number }) => item.season_id);
  } catch {
    return [];
  }
}

/** 获取番剧详情 */
export async function fetchBangumiDetail(seasonId: number): Promise<BangumiSeason | null> {
  try {
    const res = await fetch(
      `${BILIBILI_BASE}/pgc/view/web/season?season_id=${seasonId}`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    if (json.code !== 0 || !json.result) return null;
    const r = json.result;
    return {
      season_id: r.season_id,
      season_title: r.title,
      cover: normalizeImageUrl(r.cover),
      total_count: r.total_count,
      new_ep: r.new_ep,
      follow: r.stat?.follow ?? 0,
      rating: r.rating,
      stat: r.stat ?? { follow: 0, view: 0, danmaku: 0 },
      is_new: r.is_new ?? false,
      is_finish: r.is_finish ?? false,
      follows: r.follows ?? 0,
      sections: (r.section ?? []).map((s: Record<string, unknown>) => ({
        id: s.id as number,
        title: s.title as string,
        type: s.type as number,
        episodes: ((s.episodes ?? []) as Record<string, unknown>[]).map((ep) => ({
          ep_id: ep.id as number,
          title: ep.title as string,
          long_title: ep.long_title as string,
          cover: ep.cover as string,
          pub_index: ep.index as string,
          pub_time: ep.public_time as string,
          delay: ep.delay as number,
          delay_id: ep.delay_id as number,
          delay_reason: ep.delay_reason as string,
          bvid: ep.bvid as string,
          pub_ts: ep.pub_ts as number,
        })),
      })),
    };
  } catch {
    return null;
  }
}

/** 获取追番更新列表（用户最近追番的更新情况） */
export async function fetchBangumiUpdates(uid: string): Promise<BangumiUpdate[]> {
  try {
    const seasonIds = await fetchFollowedSeasonIds(uid);
    const updates: BangumiUpdate[] = [];

    // 并发获取每个番剧的详情
    const details = await Promise.all(seasonIds.slice(0, 20).map(fetchBangumiDetail));

    for (const season of details.filter(Boolean) as BangumiSeason[]) {
      updates.push({
        season_id: season.season_id,
        season_title: season.season_title,
        cover: season.cover,
        ep_title: season.new_ep?.title ?? '',
        ep_index: season.new_ep?.index ?? '',
        pub_time: season.new_ep?.pub_time ?? '',
        is_new: season.is_new,
        bvid: '',
      });
    }

    return updates;
  } catch {
    return [];
  }
}

/** 演示数据 */
export function getDemoBangumiUpdates(): BangumiUpdate[] {
  return [
    { season_id: 1, season_title: '葬送的芙莉莲', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg', ep_title: '第28话', ep_index: '第28话', pub_time: '2小时前', is_new: true, bvid: '' },
    { season_id: 2, season_title: '迷宫饭', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153518-IVXPDY5ph3kO.jpg', ep_title: '第23话', ep_index: '第23话', pub_time: '5小时前', is_new: true, bvid: '' },
    { season_id: 3, season_title: '药屋少女的呢喃 第二季', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx161645-QLbzHXiYRgV2.jpg', ep_title: '第12话', ep_index: '第12话', pub_time: '昨天', is_new: false, bvid: '' },
    { season_id: 4, season_title: '怪兽8号', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-25FBfFJzEQ5O.jpg', ep_title: '第11话', ep_index: '第11话', pub_time: '2天前', is_new: false, bvid: '' },
    { season_id: 5, season_title: '孤独摇滚！', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130003-HTDmeL4RGeJ4.png', ep_title: '重播', ep_index: 'SP', pub_time: '3天前', is_new: false, bvid: '' },
  ];
}
