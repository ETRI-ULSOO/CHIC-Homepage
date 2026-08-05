import { defaultLocale, locales, ui, type Locale, type UIKey } from './ui';
import { stripBase, withBase } from '../lib/url';

/** URL 경로의 첫 세그먼트에서 언어를 읽는다. 없으면 기본 언어.
 *  Astro.url.pathname은 base를 포함하므로 반드시 걷어내고 판별한다. */
export function getLocale(url: URL): Locale {
  const seg = stripBase(url.pathname).split('/')[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

/** UI 라벨 조회. 누락 키는 기본 언어로 폴백한다. */
export function useTranslations(locale: Locale) {
  return (key: UIKey): string => ui[locale][key] ?? ui[defaultLocale][key];
}

/** 같은 페이지의 반대 언어 경로. 대응 페이지가 없어도 링크는 살려 둔다 —
 *  영문판이 없는 페이지가 실제로 존재하기 때문 (content-inventory.md M-01). */
export function alternatePath(url: URL, to: Locale): string {
  const segments = stripBase(url.pathname).split('/').filter(Boolean);
  segments[0] = to;
  // 끝 슬래시를 항상 붙인다 — 붙이지 않으면 hreflang이 상대 페이지의 canonical과
  // 다른 URL이 되어 언어 쌍이 성립하지 않는다.
  return withBase('/' + segments.join('/') + '/');
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'ko' ? 'en' : 'ko';
}
