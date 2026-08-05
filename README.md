# CHIC 사이트

**CHIC (Cultural Heritage Intelligent Curation)** 과제 홍보 사이트.
문화체육관광부 문화기술 연구개발 지정과제 · 2020.07 — 2022.12

현행 Google Sites(`sites.google.com/view/intelligent-curation`)를 Astro 정적 사이트로 이관하는 작업이다.

## 개발

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 생성
npm run preview
```

## 구조

```
src/
  data/          # 반복 항목 — YAML (consortium · results · home · project · concept · contact)
  content/news/  # 본문이 있는 게시물 — Markdown (ko/ en/ 언어별 디렉터리)
  i18n/          # UI 라벨과 언어 유틸
  layouts/       # BaseLayout
  components/    # DiagramFigure(핵심) · Header · Footer · LangSwitch · KpiStat
  pages/[locale]/  # 언어는 라우트 파라미터다 — 페이지를 언어마다 복제하지 않는다
public/images/diagrams/   # 시스템 팔레트로 재제작한 SVG (국문 7 + 영문 7)
```

설계 원칙은 [DESIGN.md](DESIGN.md), 진행 상황과 결정 이력은 [docs/WORKLOG.md](docs/WORKLOG.md),
구현 계획은 [docs/PLAN.md](docs/PLAN.md)에 있다. 값의 단일 원천은 항상 이 문서들이다.

## 배포 — Cloudflare Workers (정적 자산)

Git 연동 방식이며, 저장소는 `ETRI-ULSOO/CHIC-Homepage`다. `main`에 push하면 자동 빌드·배포된다.

| 설정 | 값 |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node version | **22.12 이상**. 저장소의 `.nvmrc`(=22)를 빌드 환경이 자동으로 읽는다 (Astro 7 요구사항) |
| Production branch | `main` |

배포 구성의 단일 원천은 [wrangler.jsonc](wrangler.jsonc)다. 대시보드에서 따로 만질 것이 없다.

### ⚠️ 어댑터를 붙이면 안 된다

`wrangler.jsonc`가 없으면 `wrangler deploy`가 자동 구성을 돌려 `astro add cloudflare`로
어댑터를 설치한다. 그러면 정적 사이트가 서버 렌더링 모드로 재빌드되고, Workers 런타임에
없는 `node:fs`를 `content.config`가 부르면서 **빌드가 실패한다** (2026-08-05 실측).

이 사이트는 콘텐츠를 빌드 시점에 파일에서 읽는 **순수 정적 사이트**다. 실행할 서버 코드가
없으므로 `wrangler.jsonc`에 `main`을 두지 않고 `assets`만 선언한다.

### 도메인

Worker 이름이 그대로 서브도메인이 된다. `wrangler.jsonc`의 `name`이 `chic-homepage`이고
`astro.config.mjs`의 `site`가 `https://chic-homepage.pages.dev`이므로 둘을 함께 바꿔야 한다 —
`site` 값에서 canonical·hreflang·OG URL이 생성된다.
기관 도메인 정책이 열리면 커스텀 도메인 연결로 이관 가능하다.

응답 헤더는 [public/_headers](public/_headers)에서 관리한다 (빌드 로그에서 3개 규칙 파싱 확인).

## 알려진 미해결

`docs/WORKLOG.md`의 "남은 미해결" 절이 단일 원천이다. 특히 다음은 **내용 검수가 필요하다**:

- 원본에 설명 텍스트가 없어 재구성한 다이어그램 3점 (M-11)
- Results 1차년도 15건의 대분류 역매핑 (M-13)
- 영문 번역의 연구 용어 표현 (D-17)
