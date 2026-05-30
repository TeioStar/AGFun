/** ========== Bilibili 追番 ========== */
export interface BangumiEpisode {
  ep_id: number;
  title: string;
  long_title: string;
  cover: string;
  pub_index: string;     // e.g. "第12话"
  pub_time: string;       // e.g. "每周六 10:00"
  delay: number;          // 0=正常, 1=延期
  delay_id: number;
  delay_reason: string;
  bvid: string;
  pub_ts: number;         // Unix timestamp
  badges?: BangumiBadge[];
}

export interface BangumiBadge {
  text: string;
  bg_color: string;
  bg_color_night: string;
}

export interface BangumiSeason {
  season_id: number;
  season_title: string;
  cover: string;
  total_count: number;    // 总集数
  new_ep: {
    id: number;
    index: string;
    cover: string;
    title: string;
    pub_time: string;
  };
  follow: number;         // 追番人数
  rating?: {
    score: number;
    count: number;
  };
  stat: {
    follow: number;
    view: number;
    danmaku: number;
  };
  is_new: boolean;
  is_finish: boolean;
  follows: number;
  sections?: BangumiSection[];
}

export interface BangumiSection {
  id: number;
  title: string;
  type: number;
  episodes: BangumiEpisode[];
}

/** 追番更新通知 */
export interface BangumiUpdate {
  season_id: number;
  season_title: string;
  cover: string;
  ep_title: string;
  ep_index: string;
  pub_time: string;
  is_new: boolean;
  bvid: string;
}

/** ========== Steam 新游/史低 ========== */
export interface SteamApp {
  appid: number;
  name: string;
  header_image: string;
  short_description: string;
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  price_overview?: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
  genres?: Array<{ id: string; description: string }>;
  categories?: Array<{ id: number; description: string }>;
  platforms?: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
}

export interface SteamNewRelease {
  appid: number;
  name: string;
  header_image: string;
  release_date: string;
  genres: string[];
  tags: string[];
  price?: string;
  discount?: number;
  coming_soon?: boolean;
}

/** ========== ITAD (IsThereAnyDeal) ========== */
export interface DealInfo {
  id: string;
  game: {
    id: number;
    title: string;
    slug: string;
    cover: string;
    drm: string[];
  };
  store: {
    id: number;
    name: string;
    banner: string;
    support: string[];
    limits: Record<string, unknown>;
    drm: string[];
  };
  price: {
    currency: string;
    amount: number;
    amountInt: number;
    base: number;
    baseInt: number;
    discount: number;
    voucher?: string;
  };
  regular: {
    currency: string;
    amount: number;
    amountInt: number;
  };
  cheapest: {
    currency: string;
    amount: number;
    amountInt: number;
    timestamp: string;
  };
  recorded: {
    timestamp: string;
  };
  url: string;
}

export interface GamePriceAlert {
  appid?: number;
  game_title: string;
  cover: string;
  store: string;
  current_price: string;
  historical_low: string;
  discount: number;
  is_at_low: boolean;
  url: string;
}

/** ========== 用户设置 ========== */
export interface UserSettings {
  bilibili_uid: string;
  steam_id: string;
  itad_key: string;
  itad_wishlist: string[];
  notifications: {
    bangumi_update: boolean;
    new_release: boolean;
    price_drop: boolean;
  };
}

/** ========== 通用 ========== */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: number;
}
