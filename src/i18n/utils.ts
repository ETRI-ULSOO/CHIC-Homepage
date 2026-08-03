import { defaultLocale, locales, ui, type Locale, type UIKey } from './ui';

/** URL 경로의 첫 세그먼트에서 언어를 읽는다. 없으면 기본 언어. */
export function getLocale(url: URL): Locale {
  const seg = url.pathname.split('/')[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

/** UI 라벨 조회. 누락 키는 기본 언어로 폴백한다. */
export function useTranslations(locale: Locale) {
  return (key: UIKey): string => ui[locale][key] ?? ui[defaultLocale][key];
}

/** 같은 페이지의 반대 언어 경로. 대응 페이지가 없어도 링크는 살려 둔다 —
 *  영문판이 없는 페이지가 실제로 존재하기 때문 (content-inventory.md M-01). */
export function alternatePath(url: URL, to: Locale): string {
  const segments = url.pathname.split('/').filter(Boolean);
  segments[0] = to;
  return '/' + segments.join('/') + (segments.length === 1 ? '/' : '');
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'ko' ? 'en' : 'ko';
}
