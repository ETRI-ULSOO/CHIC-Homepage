import type { Locale } from './ui';

/** 게시물 날짜 표기. 현행 사이트에 날짜가 없는 항목이 있으므로 undefined를 허용한다. */
export function formatDate(date: Date | undefined, locale: Locale): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-GB', {
    year: 'numeric',
    month: locale === 'ko' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
