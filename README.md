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

## 배포 — Cloudflare Pages

Git 연동 방식이며, 저장소는 `ETRI-ULSOO/CHIC-Homepage`다. `main`에 push하면 자동 빌드·배포된다.

| 설정 | 값 |
|---|---|
| Project name | **`etri-chic`** ← 그대로 서브도메인이 된다 |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | **22.12 이상**. 저장소의 `.nvmrc`(=22)를 빌드 환경이 읽는다 (Astro 7 요구사항) |

배포 주소는 `https://etri-chic.pages.dev`이며 `astro.config.mjs`의 `site` 값과 일치해야 한다 —
canonical·hreflang·OG URL이 이 값에서 생성된다. **프로젝트명을 다르게 만들면 `site`도 함께 바꾼다.**

### 왜 Workers가 아니라 Pages인가

두 가지 이유다 (2026-08-05 조사, `docs/WORKLOG.md` 참조).

1. **기관 도메인 연결.** Cloudflare 공식 문서: *"Unlike Pages, Workers does not support any
   domain whose nameservers are not managed by Cloudflare."* `etri.re.kr` 네임서버는 ETRI에
   있으므로 Workers로는 `chic.etri.re.kr`을 붙일 수 없다. **Pages는 서브도메인에 한해
   외부 DNS CNAME을 공식 지원한다.**
2. **주소에 계정명이 없다.** Workers는 `<worker>.<계정서브도메인>.workers.dev`라 개인 계정명이
   노출되지만, Pages는 `<프로젝트명>.pages.dev`다.

정적 사이트이므로 Astro 어댑터를 붙이지 않는다. 어댑터를 붙이면 서버 렌더링 모드가 되어
`content.config.ts`가 부르는 `node:fs`를 Workers 런타임이 찾지 못해 빌드가 실패한다.

### 커스텀 도메인 (chic.etri.re.kr)

**순서를 반드시 지킨다** — 역순은 서브도메인 탈취 위험이 있고 522 오류가 난다.

1. Pages 프로젝트 → Custom domains → *Set up a domain* 에서 `chic.etri.re.kr` 먼저 등록
2. 그 다음 ETRI 정보화 부서에 요청: `chic.etri.re.kr` **CNAME** → `etri-chic.pages.dev`
3. 연결 후 `astro.config.mjs`의 `site`를 최종 도메인으로 변경

apex 도메인(`etri.re.kr` 자체)은 외부 DNS로 불가능하며 서브도메인만 가능하다.

응답 헤더는 [public/_headers](public/_headers)에서 관리한다. 없는 경로는 `dist/404.html`이 응답한다.

## 알려진 미해결

`docs/WORKLOG.md`의 "남은 미해결" 절이 단일 원천이다. 특히 다음은 **내용 검수가 필요하다**:

- 원본에 설명 텍스트가 없어 재구성한 다이어그램 3점 (M-11)
- Results 1차년도 15건의 대분류 역매핑 (M-13)
- 영문 번역의 연구 용어 표현 (D-17)
