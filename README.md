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

## 배포 — GitHub Pages

저장소는 `ETRI-ULSOO/CHIC-Homepage`, 배포 주소는 **`https://etri-ulsoo.github.io/CHIC-Homepage/`**다.
`main`에 push하면 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)이 빌드·배포한다.
외부 서비스 토큰이 없다 — GitHub이 발급하는 OIDC 토큰으로 인증한다.

**최초 1회만 저장소 설정이 필요하다**: Settings → Pages → *Source* 를 **GitHub Actions**로 지정.
(*Deploy from a branch*가 아니다. 그쪽을 고르면 Jekyll이 소스를 빌드하려 든다.)

### project site라서 생기는 제약 — `base`

주소가 도메인 루트가 아니라 `/CHIC-Homepage/` 하위다. 그래서 [astro.config.mjs](astro.config.mjs)에
`base`를 두는데, **Astro는 번들 자산에만 base를 자동으로 붙이고 소스에 하드코딩한 절대경로
(`/ko/`, `/images/…`)에는 붙이지 않는다.** 두 가지가 여기서 따라온다.

- 내부 링크·이미지는 반드시 [src/lib/url.ts](src/lib/url.ts)의 `withBase()`를 통과시킨다.
- 경로를 **해석**하는 쪽(언어 판별 등)은 `Astro.url.pathname`에 base가 섞여 있으므로
  `stripBase()`로 걷어낸 뒤 읽는다.
- `redirects`도 출발 경로에만 base가 붙고 대상에는 붙지 않아, 대상은 config에서 직접 합친다.

`public/.nojekyll`은 지우지 말 것. 없으면 GitHub Pages의 Jekyll 처리가 `_`로 시작하는 경로를
무시해 Astro가 만든 **`_astro/` 전체가 404**가 되고 CSS·폰트가 통째로 깨진다.

### 커스텀 도메인 (chic.etri.re.kr)

**순서를 반드시 지킨다** — 역순은 서브도메인 탈취 위험이 있다.

1. Settings → Pages → *Custom domain* 에 `chic.etri.re.kr` 먼저 등록
2. 그 다음 ETRI 정보화 부서에 요청: `chic.etri.re.kr` **CNAME** → `etri-ulsoo.github.io`
   (저장소명은 붙이지 않는다 — 계정 도메인만 가리킨다)
3. 검증되면 *Enforce HTTPS* 체크 (Let's Encrypt 인증서가 자동 발급된다)
4. 도메인 연결 후에는 사이트가 **도메인 루트**에서 서비스되므로 `astro.config.mjs`의
   `BASE`를 `''`로, `site`를 `https://chic.etri.re.kr`로 바꾼다. `withBase()`는 무해해진다.

apex 도메인(`etri.re.kr` 자체)은 불가능하며 서브도메인만 가능하다.

### 응답 헤더가 없다는 점

GitHub Pages는 응답 헤더를 설정할 수 없어 Cloudflare 시절의 `public/_headers`를 폐기했다.
`Referrer-Policy`만 meta로 대체했고, `X-Frame-Options`·`X-Content-Type-Options`는 meta 등가물이
없다 (CSP의 `frame-ancestors`는 명세상 meta에서 무시된다). 공개 정적 홍보 사이트라 실질 위험은
낮으나 기록해 둔다 (M-23).

## 알려진 미해결

`docs/WORKLOG.md`의 "남은 미해결" 절이 단일 원천이다. 특히 다음은 **내용 검수가 필요하다**:

- 원본에 설명 텍스트가 없어 재구성한 다이어그램 3점 (M-11)
- Results 1차년도 15건의 대분류 역매핑 (M-13)
- 영문 번역의 연구 용어 표현 (D-17)
