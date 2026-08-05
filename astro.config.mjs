// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 배포 실주소. Worker 이름(wrangler.jsonc의 name)과 계정 서브도메인으로 결정된다.
  // canonical·hreflang·OG URL이 이 값에서 생성되므로 실제 주소와 반드시 일치해야 한다.
  // 기관 도메인(chic.etri.re.kr 등) 연결 시 이 값을 함께 바꾼다.
  site: 'https://chic-homepage.hkkim79.workers.dev',

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
    '/': '/ko/',

    // 국문
    '/home': '/ko/',
    '/project': '/ko/#project',
    '/project/about': '/ko/#project',
    '/project/concept-and-approach': '/ko/concept/',
    '/project/ambition-and-objectives': '/ko/#project',
    '/consortium': '/ko/#consortium',
    '/results': '/ko/results/',
    '/news': '/ko/news/',
    '/contact-us': '/ko/#contact',

    // 영문 — 현행 사이트는 `-english` 접미사로 분기해 있었다
    '/home/home-english': '/en/',
    '/project/project-english': '/en/#project',
    '/project/concept-and-approach-english': '/en/concept/',
    '/project/ambition-and-objectives-english': '/en/#project',
    '/results/results-english': '/en/results/',
  },
});
