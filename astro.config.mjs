// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chic-homepage.pages.dev',

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
