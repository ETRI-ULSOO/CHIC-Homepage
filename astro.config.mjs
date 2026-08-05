// @ts-check
import { defineConfig } from 'astro/config';

// 저장소명이 곧 경로가 된다. redirects는 출발 경로에만 base가 붙고 **대상에는 붙지 않으므로**
// (실측: 대상이 `/ko/`로 나가 404) 대상은 여기서 직접 합친다.
const BASE = '/CHIC-Homepage';

export default defineConfig({
  // GitHub Pages project site: https://etri-ulsoo.github.io/CHIC-Homepage/
  // canonical·hreflang·OG URL이 site+base에서 생성되므로 실제 주소와 일치해야 한다.
  site: 'https://etri-ulsoo.github.io',

  // 저장소명이 곧 경로가 된다. 하드코딩 절대경로에는 Astro가 base를 붙이지 않으므로
  // 내부 링크·자산은 src/lib/url.ts의 withBase()를 통과시킨다.
  // 커스텀 도메인(chic.etri.re.kr) 연결 시 base를 '/'로 되돌리고 site를 그 도메인으로 바꾼다.
  base: BASE,

  // D-02: 한·영 완전 대응. 기본 언어에도 접두사를 붙여 /ko/ · /en/ 을 대칭으로 둔다.
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: true },
  },

  // 접두사 방식이므로 루트는 기본 언어로 보낸다.
  // 나머지는 현행 Google Sites의 경로 구조다. 새 도메인에서 같은 경로를 입력하거나
  // 옛 링크를 옮겨 적었을 때 404가 나지 않도록 대응 위치로 보낸다.
  redirects: {
    '/': `${BASE}/ko/`,

    // 국문
    '/home': `${BASE}/ko/`,
    '/project': `${BASE}/ko/#project`,
    '/project/about': `${BASE}/ko/#project`,
    '/project/concept-and-approach': `${BASE}/ko/concept/`,
    '/project/ambition-and-objectives': `${BASE}/ko/#project`,
    '/consortium': `${BASE}/ko/#consortium`,
    '/results': `${BASE}/ko/results/`,
    '/news': `${BASE}/ko/news/`,
    '/contact-us': `${BASE}/ko/#contact`,

    // 영문 — 현행 사이트는 `-english` 접미사로 분기해 있었다
    '/home/home-english': `${BASE}/en/`,
    '/project/project-english': `${BASE}/en/#project`,
    '/project/concept-and-approach-english': `${BASE}/en/concept/`,
    '/project/ambition-and-objectives-english': `${BASE}/en/#project`,
    '/results/results-english': `${BASE}/en/results/`,
  },
});
