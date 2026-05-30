import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 格式化相对时间，如 "3小时前" "昨天" */
export function timeAgo(date: string | Date): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;

  const minute = 60 * 1000;
  const hour   = 60 * minute;
  const day    = 24 * hour;
  const month  = 30 * day;

  if (diff < minute)   return '刚刚';
  if (diff < hour)     return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day)      return `${Math.floor(diff / hour)}小时前`;
  if (diff < month)    return `${Math.floor(diff / day)}天前`;
  return `${Math.floor(diff / month)}个月前`;
}

/** 格式化价格 */
export function formatPrice(price: number, currency = '¥'): string {
  return `${currency}${price.toFixed(2)}`;
}

/** 格式化折扣百分比 */
export function formatDiscount(discount: number): string {
  return `-${discount}%`;
}

/** 标准化图片 URL：补全协议相对 URL，强制 https */
export function normalizeImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('http://')) return url.replace('http://', 'https://');
  return url;
}
