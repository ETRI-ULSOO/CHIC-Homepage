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

/** 다이어그램은 텍스트가 그림 안에 있으므로 언어별 파일로 존재한다: `foo.svg` / `foo-en.svg`.
 *  래스터였다면 불가능했을 일이고, SVG로 재제작한 실질적 이득이 여기서 나온다. */
export function diagramSrc(base: string, locale: Locale): string {
  return locale === 'ko' ? base : base.replace(/\.svg$/, `-${locale}.svg`);
}
