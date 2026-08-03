// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chic-site.pages.dev',

  // D-02: 한·영 완전 대응. 기본 언어에도 접두사를 붙여 /ko/ · /en/ 을 대칭으로 둔다.
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: true },
  },

  // 접두사 방식이므로 루트는 기본 언어로 보낸다.
  redirects: { '/': '/ko/' },
});
