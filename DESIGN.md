# DESIGN.md — 먹빛 전시실 (Meokbit Gallery)

> Dark gallery room for a cultural-heritage AI archive

**상태:** 2026-08-03 채택 확정 — G3 프로토타입 4안 중 **C(다크 랩) 골격 + A(뮤지엄 커스토디얼) 타이포 규율**로 수렴.
**G3 산출물 원본:** `prototypes/g3-directions.html` (4방향 비교 프로토타입)
**형제 사이트:** ULSOO는 [[ulsoo-DESIGN|먹과 한지]](한지 캔버스·주간 전시실). CHIC는 그 반대편인 **야간 전시실**을 택한다 — 같은 연구집단의 두 사이트가 같은 원리(문화유산이 장식을 전담, 단일 악센트, 플랫)를 공유하되 명암이 반전된 관계.
**색 명암비:** 전 조합 실측 (2026-08-03, WCAG 2.1 상대휘도 공식 직접 계산).

CHIC는 종료된 국가 R&D 과제의 아카이브다. 이 사이트의 시각적 자산 대부분은 **연구 다이어그램**이며, 그것이 이 디자인의 출발점이다.

초안(2026-08-03 오전)에서는 다이어그램을 "흰 배경 도판을 어두운 벽에 건다"로 규정했다. 이는 현행 사이트의 다이어그램이 재색조 불가능한 흰 배경 PNG라는 전제에서 나온 것이다. **이 전제는 같은 날 폐기했다** — 다이어그램을 SVG로 재제작하면 시스템 팔레트로 칠할 수 있고, 그 편이 판독성·일관성·확대 품질 모두에서 우월하다. 재색조 불가라는 제약을 재색조 가능한 자산에까지 적용한 것이 오류였다.

따라서 다크 계열을 택한 이유는 다시 정리된다: 어두운 캔버스는 정보 밀도가 높은 도해가 **가장 오래 봐도 눈이 덜 피로한 배경**이고, 종료된 연구의 기록물이라는 성격에 조용한 전시실이 맞기 때문이다.

타이포그래피는 반대 방향에서 온다. 구조는 기술 사이트지만 조판은 도록(圖錄)의 규율을 따른다 — 한글 디스플레이는 명조, 넓은 행간, 억제된 자간. 기술감이 조판까지 지배하면 문화유산 사이트로서의 무게가 사라진다. **명조가 감정을, 그로테스크가 기능을 맡는다.**

## Tokens — Colors

### 다크 (지배 계열)

| Name | Value | Token | Role |
|------|------|-------|------|
| Canvas (전시실) | `#0b0e11` | `--c-canvas` | 페이지 기본 배경. 순흑이 아닌 청기(靑氣) 도는 먹빛 — 흰 다이어그램과의 대비에서 눈이 덜 피로하다 |
| Surface (좌대) | `#111820` | `--c-surface` | 카드·패널. 캔버스보다 한 단계 밝아 그림자 없이 레이어를 만든다 |
| Border (헤어라인) | `#223140` | `--c-border` | 보더 전용. UI 구분선처럼 강해지면 안 되며 전시실 벽의 몰딩처럼 읽혀야 한다 |
| Text | `#e6edf3` | `--c-text` | 다크 위 본문. 순백 금지 — 순백은 어두운 배경에서 번진다 |
| Muted | `#93a4b3` | `--c-muted` | 보조 텍스트·캡션·라벨 |
| Mint (청록) | `#35e0c4` | `--c-accent` | **시스템의 주 악센트.** 수치·섹션 마커·링크 hover. 다크 전용 |
| Blue (남청) | `#6aa8ff` | `--c-accent-2` | 보조 악센트 — 링크와 외부 참조 전용. 남용 금지 |

### 라이트 (제한 계열 — 장문 본문·표 전용)

| Name | Value | Token | Role |
|------|------|-------|------|
| Paper | `#f2f5f7` | `--c-paper` | 라이트 섹션 캔버스. Project 장문 본문과 Results 표에만 허용 |
| Ink | `#0b0e11` | `--c-ink` | 라이트 위 본문 (캔버스 색 재사용 — 팔레트를 늘리지 않는다) |
| Ink-muted | `#4d5a66` | `--c-ink-muted` | 라이트 위 보조 텍스트 |
| Mint-deep | `#0d7a68` | `--c-accent-deep` | **라이트 위 악센트는 반드시 이 값.** 민트 원색은 라이트에서 텍스트 불가 |

### 명암비 실측 (2026-08-03, WCAG 2.1)

| 조합 | 비율 | 판정 |
|------|------|------|
| Text on Canvas | 16.38:1 | AAA |
| Text on Surface | 15.12:1 | AAA |
| Muted on Canvas | 7.56:1 | AAA |
| Muted on Surface | 6.98:1 | AA |
| Mint on Canvas | 11.62:1 | AAA |
| Mint on Surface | 10.73:1 | AAA |
| Blue on Canvas | 7.98:1 | AAA |
| Ink on Paper | 17.67:1 | AAA |
| Ink-muted on Paper | 6.46:1 | AA |
| Mint-deep on Paper | 4.79:1 | AA |
| **Mint 원색 on Paper** | **1.52:1** | **텍스트 금지 — 장식만 허용** |

> Mint 원색의 라이트 배경 실패는 ULSOO의 Geum(1.72:1)과 동일한 구조적 문제다. 두 사이트 모두
> "고채도 악센트는 어두운 면에서만 산다"는 같은 규칙에 도달했다.

## Tokens — Typography

### 이중 규칙 — 명조(감정) / 그로테스크(기능)

**한글 디스플레이·헤딩 — Noto Serif KR**
- Weights: 400, 600
- 자간 **-0.01em 이하 금지**, 행간 **1.15 이상 필수** — 한글은 네거티브 트래킹과 압축 행간에서 뭉개진다
- 다크 배경 위 명조는 획이 가늘어 보이므로 **weight 600을 기본**으로 한다 (라이트 배경의 400 대응)

**라틴 디스플레이 — Playfair Display**
- 워드마크·영문 헤딩 전용. 자간 -0.02em, 행간 0.95 (라틴은 커질수록 조인다)

**본문·UI — Pretendard**
- Weights: 400, 500, 700(숫자 전용)
- 본문 행간 **1.75**, 캡션 1.7. 한글 시각 밀도가 라틴보다 높으므로 넉넉히 잡는다
- **12px 미만 금지** (2026-08-05 개정, 종전 11px). 한글은 음절이 정사각 안에서 자모로
  분할되므로 판별 단위가 라틴 글리프보다 작다 — 같은 px에서 더 작게 읽힌다
- 디스플레이 임무를 맡지 않는다 (상한 28px). KPI 수치 `--t-kpi`가 이 상한이다

### Type Scale

**2026-08-05 상향 개정.** 개정 전 값은 G3 프로토타입(4방향을 한 화면에 나란히 놓는 축소
목업)의 실측값을 반올림해 승격한 것이라, '읽기'가 아니라 '분위기 식별'을 위한 크기였다.
실측 결과 `--t-body`는 랜딩에서 5회만 쓰이고 실제 텍스트의 대부분(11px 52회 + 13px 61회)이
그 아래 두 칸에 몰려 있었다 — 값보다 **배정**이 무너져 있었다. 아래 배정 규칙이 값만큼 중요하다.

| Role | Size | Line Height | Tracking | Token |
|------|------|-------------|----------|-------|
| micro (라벨) | 12px | 1.4 | +0.08em (한글 +0.02em) | `--t-micro` |
| body-sm | 15px | 1.75 | 0 | `--t-body-sm` |
| body | 17px | 1.75 | 0 | `--t-body` |
| lead | 19px | 1.7 | 0 | `--t-lead` |
| heading-sm (serif) | 24px | 1.5 | -0.005em | `--t-heading-sm` |
| heading (serif) | 32px | 1.35 | -0.01em | `--t-heading` |
| kpi (Pretendard 700) | 28px | 1.2 | -0.02em | `--t-kpi` |
| display-ko (serif) | clamp(36px, 5vw, 60px) | 1.2 | -0.01em | `--t-display-ko` |
| display-en (Playfair) | clamp(44px, 7vw, 92px) | 0.95 | -0.02em | `--t-display-en` |

> `--t-display-en`은 현재 사용처가 0건이다 (2026-08-05 실측). 라틴 디스플레이 조판은
> 워드마크가 `--t-heading-sm`으로, 404 숫자가 자체 clamp로 각각 처리한다.

### 배정 규칙 — 값보다 이것이 먼저다

**연속해서 읽는 문장은 예외 없이 `--t-body`다.** 리스트 항목도 문장이면 본문이다.
내비게이션 라벨·카드 설명·메타데이터는 문장이 아니므로 `--t-body-sm`.
`.micro`는 라벨 전용이며 본문 텍스트에 쓰지 않는다.

토큰명이 중요도(sm = 덜 중요)로 읽히는 한 구현자는 계속 '중요도'로 고르고 계속 아래로
굴러떨어진다. 값만 올리고 이 규칙을 적지 않으면 `--t-body`는 다시 죽은 토큰이 된다.

### 대문자 변환과 자간은 라틴 전용

`text-transform: uppercase`는 한글에 아무 효과가 없고, 확대된 자간만 남아 **어절 결합을
깨뜨려 낱글자로 흩어져 읽힌다.** 언어는 `<html lang>`과 LangSwitch의 `lang` 속성이 이미
정확히 알려주므로 `:lang(ko)`로 가른다 — 클래스를 나누지 않는다.
(국문 페이지의 'English' 링크는 `lang="en"`을 달고 있어 라틴 처리를 유지한다.)

`word-break: keep-all; overflow-wrap: break-word;`를 전역 적용한다 — 한글 단어가 중간에서 끊기면 판독이 급격히 나빠진다.

> **구현 주의 (미해결):** Noto Serif KR 한글 전체 자족은 용량이 크다. Astro 빌드에서 **서브셋 + `font-display: swap`** 처리가 필요하며, 미처리 시 초기 로딩에서 명조가 늦게 뜬다. [[WORKLOG]] 미해결 항목으로 추적.

## Tokens — Spacing & Shapes

**Base unit:** 4px

| Name | Value | Token |
|------|------|-------|
| 4 / 8 / 12 / 16 | 4·8·12·16px | `--s-4` … `--s-16` |
| 24 / 32 / 48 | 24·32·48px | `--s-24` `--s-32` `--s-48` |
| 72 / 104 | 72·104px | `--s-72` `--s-104` |

| Element | Radius |
|---------|--------|
| cards · figures | 14px |
| pills · buttons | 999px |
| inline code · tags | 4px |

**Section gap:** 104px (데스크톱) / 72px (모바일)
**Card padding:** 24px
**Content max-width:** 1140px · 장문 본문 컬럼은 **68ch 상한**

## Components

### DiagramFigure — 이 시스템에서 가장 중요한 컴포넌트

**Role:** 연구 다이어그램의 표준 제시 방식

다이어그램은 원본 폭 1280px에 **10.5~11px 라벨**이 박혀 있다. 이것을 컨테이너 폭에 맞춰
축소하면 라벨이 같은 배율로 함께 줄어든다 — 2026-08-05 실측: 본문 폭 1092px(배율 0.85)에서
**8.96px**, 모바일 325px(배율 0.26)에서 **2.67px**.

> 2026-08-03 서술("본문 컬럼 폭 ~730px에서 6px급")은 **틀린 기록이었다.** DiagramFigure는
> `.measure`(689px) 안이 아니라 `.wrap`(1092px)에 놓인다. 실측으로 교정한다.

따라서 판독 불가의 원인은 "도해가 작다"가 아니라 **원본을 컨테이너에 우겨넣어 축소한다**는
데 있다. 그래서 **축소를 금지한다** (2026-08-05 개정).

- 폭이 모자라면 줄이는 대신 가로로 스크롤한다 (`min-width` = 원본 폭). 모바일 실측 10.50px
- 1200px 이상에서는 반대로 본문 컬럼 밖으로 빼 원본보다 크게 띄운다 (최대 1440px). 실측 11.27px
- 확대(라이트박스)는 **반드시 인라인보다 커야 한다.** 종전 규칙(`width:auto` + `max-width:96vw`)은
  모바일에서 1.11배(325→360px)에 그쳐 확대가 사실상 무동작이었다. 현재 `max(96vw, 1600px)`

- `<figure>` + `<figcaption>` 구조 고정. 캡션 접두는 언어별로 다르다 (`圖 N.` / `Fig. N.`)
- **다이어그램은 시스템 팔레트로 재제작한 SVG를 원칙으로 한다** (2026-08-03 개정). 배경 `var(--c-surface)`
- 현행 사이트의 파스텔 3색(청·주황·녹)은 단일 악센트 원칙에 어긋난다. **범주는 색이 아니라 위치와 라벨로 구분**하고, 악센트는 Mint 하나만 쓴다
- SVG 내부에도 토큰 값만 사용한다. 텍스트 4.5:1, 화살표 등 의미 있는 도형 3:1 기준을 지킨다 (임의 회색 사용 금지 — 실측 필수)
- 보더 1px `--c-border`, radius 14px, **그림자 없음**
- **클릭 시 전체화면 lightbox** — 원본 해상도로 표시, `Esc`·바깥 클릭·닫기 버튼 3경로로 닫힘
- 커서 `zoom-in`, 우하단에 확대 아이콘 표시 — 확대 가능함이 보이지 않으면 아무도 클릭하지 않는다
- 모바일에서는 lightbox 내 핀치 줌 허용
- `loading="lazy"` + 명시적 `width`/`height`로 레이아웃 이동 방지

### ResultCard / ResultTable — 연구 결과물 39건

Results는 **연차(1·2차년도) × 대분류(5종)** 2축 구조다. 기본은 카드 그리드, 밀도가 필요한 경우 표 전환.

- 카드: Surface 배경, radius 14px, 상단 이미지(16:10) + 연차 태그(Mint micro) + 제목(serif 22px) + 설명(body-sm Muted)
- **연차·대분류 필터 칩**을 상단에 고정 — 39건은 무한 스크롤로 훑기엔 많고 페이지네이션 하기엔 적다
- 이미지 없는 항목이 나올 수 있으므로 **이미지 부재 시 텍스트 전용 레이아웃**으로 자연 축약될 것

### KPI Stat

검증 수치(결과물 39건 · 아카이브 8,353장 · 데이터속성 92종/관계 14종 · 참여기관 7) 표시.
숫자는 Pretendard 700 + Mint, 라벨은 micro uppercase Muted. **보더·배경 없음.**

> **절대 규칙:** 수치의 표기·단위를 임의로 바꾸지 않는다. 원 사이트 문구가 근거다.

### Section Header

`섹션 라벨(micro uppercase Muted) + 헤딩(serif display-ko)` 짝. 좌측 정렬 고정.
헤딩 앞에 6px Mint 도트를 두되 발광(box-shadow)은 **도트에만** 허용한다.

### OrgCard — 참여 기관 7곳

Surface 카드에 국문명(Pretendard 600) + 영문명(micro Muted) + 외부 링크. 로고는 원본 배경이 흰색이므로 **흰 패드 위에 배치**하거나 단색 실루엣으로 통일한다 — 다크 위에 흰 배경 로고를 그대로 얹으면 조각보가 된다.

### PhotoPanel (2026-08-05 추가)

**Role:** 실증 현장 사진의 풀블리드 밴드

다이어그램이 **증거**를 맡는다면 사진은 **분위기**를 맡는다. 둘의 처리는 반대다 — 다이어그램은 액자(보더·radius·캡션·lightbox)에 넣고, 사진은 액자 없이 페이지 폭 전체를 가로지른다.

- 풀블리드, 보더·radius **없음**. `object-fit: cover`, 높이 `clamp(220px, 32vw, 380px)`
- 캡션은 `.wrap` 안에 두어 본문 그리드에 맞춘다 (사진만 밖으로 나간다)
- **페이지당 1개소.** 반복하면 분위기가 아니라 장식이 된다
- 연구 결과 스크린샷은 여기 오지 않는다 — `ResultCard` 내부의 기능 이미지가 그 자리다

### NewsItem

날짜(micro Mint) + 제목(serif 22px) + 본문(body) + 첨부 링크 목록. 첨부는 Google Drive 외부 링크이므로 **외부 링크 아이콘(↗) 필수**.

### Ghost Link / Pill Button

- Ghost Link: 텍스트만, 배경 없음, hover 시 Mint + underline. 내비·인라인 링크 전담
- Pill Button: Mint 배경 + Canvas 텍스트, radius 999px, **뷰포트당 하나**. 보조 액션은 Ghost Link로

### LangSwitch

`KO / EN` 텍스트 토글. 현재 언어는 Text, 반대 언어는 Muted. **대응 페이지가 없으면 해당 언어 홈으로 폴백**하고 링크를 비활성으로 표시하지 않는다 (영문판 부재 페이지 존재 — [[content-inventory]] M-01).

## Do's and Don'ts

### Do
- 다이어그램은 시스템 팔레트 SVG + 보더 + 캡션 + lightbox 4종 세트로 제시할 것
- 한글 헤딩은 명조 weight 600, 행간 ≥1.15, 자간 ≥-0.01em을 지킬 것
- Mint를 유일한 주 악센트로 유지할 것 — 라이트 섹션에서는 반드시 Mint-deep
- 라이트 섹션은 **장문 본문과 Results 표에만** 쓸 것 — 다크가 지배 계열이다
- 본문 컬럼은 68ch 상한을 지킬 것
- 검증 수치의 표기·단위를 원문 그대로 유지할 것

### Don't
- 그라디언트 남용 금지 — 히어로 헤딩의 텍스트 그라디언트 **1개소만** 허용
- 그림자 금지. 발광(glow)은 섹션 마커 도트에만 허용
- Mint 원색을 라이트 배경 텍스트로 사용 금지 (1.52:1 실측)
- Mint와 Blue를 같은 면에서 경쟁시키지 말 것 — Blue는 링크 전용
- 명조로 본문 조판 금지, 그로테스크로 디스플레이 조판 금지
- 12px 미만 텍스트 금지 (2026-08-05 개정)
- 한글에 `text-transform: uppercase`나 확대 자간을 걸지 말 것 — `:lang(ko)`로 가른다
- 그리드 최소 트랙에 맨 px를 쓰지 말 것 — `minmax(min(300px, 100%), 1fr)`. 320px에서 넘친다
- 다이어그램을 카드 배경·장식으로 쓰지 말 것 — 다이어그램은 증거이지 분위기가 아니다
- 사진을 액자(보더·radius·캡션)에 넣지 말 것 — 그 처리는 다이어그램의 것이다 (PhotoPanel 참조)
- 시스템 팔레트 SVG와 흰 배경 원본 이미지를 같은 페이지에 섞지 말 것 — 조각보가 된다. 한 페이지의 다이어그램은 전부 재제작하거나 전부 원본이어야 한다
- 순흑(`#000`)·순백(`#fff`) 텍스트 금지 (다이어그램 이미지 배경은 예외)

## Layout

풀블리드 다크 캔버스가 기본. 라이트 섹션은 하드컷으로 교차하되 **페이지당 최대 1개 구간**으로 제한한다 (ULSOO의 반복 교차와 구별되는 지점 — CHIC는 다크가 지배한다).

**하이브리드 IA** ([[WORKLOG]] D-11):
- **롱스크롤 랜딩** — Home(히어로·KPI·기대효과) → Project(개요·연구목표·연구내용·결과물) → Concept(다이어그램 4점) → Consortium → Contact
- **별도 페이지** — Results(39건, 필터), News(게시물 5건)

## Quick Start

```css
:root {
  /* Dark — 지배 계열 */
  --c-canvas: #0b0e11;
  --c-surface: #111820;
  --c-border: #223140;
  --c-text: #e6edf3;
  --c-muted: #93a4b3;
  --c-accent: #35e0c4;
  --c-accent-2: #6aa8ff;

  /* Light — 장문·표 전용 */
  --c-paper: #f2f5f7;
  --c-ink: #0b0e11;
  --c-ink-muted: #4d5a66;
  --c-accent-deep: #0d7a68;

  /* Type */
  --f-serif-ko: 'Noto Serif KR', serif;
  --f-serif-en: 'Playfair Display', Georgia, serif;
  --f-sans: Pretendard, -apple-system, 'Apple SD Gothic Neo', sans-serif;

  --t-micro: 12px;
  --t-body-sm: 15px;
  --t-body: 17px;
  --t-lead: 19px;
  --t-heading-sm: 24px;
  --t-heading: 32px;
  --t-kpi: 28px;
  --t-display-ko: clamp(36px, 5vw, 60px);
  --t-display-en: clamp(44px, 7vw, 92px);
  --lh-body: 1.75;
  --lh-display-ko: 1.2;
  --tracking-display-ko: -0.01em;
  --tracking-micro: 0.08em;

  /* Space & Shape */
  --s-4: 4px;   --s-8: 8px;   --s-12: 12px; --s-16: 16px;
  --s-24: 24px; --s-32: 32px; --s-48: 48px;
  --s-72: 72px; --s-104: 104px;
  --radius-card: 14px;
  --radius-pill: 999px;
  --measure: 68ch;
  --content-max: 1140px;
}

* { word-break: keep-all; overflow-wrap: break-word; }
```

## Agent Prompt Guide

### Quick Reference
- Background: `#0b0e11` (canvas) / `#111820` (surface) / `#f2f5f7` (light, 제한적)
- Text: `#e6edf3` on dark / `#0b0e11` on light
- Muted: `#93a4b3` on dark / `#4d5a66` on light
- Accent: `#35e0c4` (dark 전용) / `#0d7a68` (light 텍스트)
- Border: `#223140`
- Primary action: Mint 필 버튼 (Canvas 텍스트)

### Example Component Prompts

1. **Hero** — 풀블리드 `#0b0e11`. 배경에 44px 격자(`#141a20` 1px 선)를 radial mask로 중앙만 남김. 상단 pill(12px, Mint 텍스트, `#0e1a19` 배경, `#1d3a37` 보더)에 과제 정보. 헤딩은 Noto Serif KR weight 600 `clamp(36px,5vw,60px)` 행간 1.2, 강조 어절 1개만 Mint→Blue 그라디언트. 리드는 Pretendard 19px 행간 1.7 `#93a4b3`, 68ch 상한. 하단 KPI 4종(숫자 Pretendard 700 Mint 28px + 라벨 15px Muted).

2. **DiagramFigure** — `<figure>` radius 14px, 보더 1px `#223140`, 내부 배경 `#111820`(시스템 팔레트 SVG이므로 흰 액자를 쓰지 않는다), 우하단 확대 아이콘 오버레이. 폭이 원본(1280px)보다 좁으면 축소하지 않고 가로 스크롤한다. `<figcaption>`은 `#111820` 배경 위 15px `#93a4b3`, 상단 보더 1px. 클릭 시 `#0b0e11` 92% 오버레이 lightbox에 `max(96vw, 1600px)`로 — 항상 인라인보다 크게 — 표시.

3. **Results 그리드** — 상단에 연차·대분류 필터 칩(Ghost, 활성 시 Mint 보더+텍스트). 카드는 `#111820`, radius 14px, 보더 1px `#223140`. 상단 이미지 16:10, 본문 영역 padding 24px에 연차 태그(12px Mint) → 제목(Noto Serif KR 24px `#e6edf3`) → 설명(15px `#93a4b3` 행간 1.75).

4. **라이트 본문 섹션** — 풀블리드 `#f2f5f7`, 텍스트 `#0b0e11`, 컬럼 68ch 중앙. 헤딩은 명조 32px weight 600. 링크·강조는 `#0d7a68`. 이 섹션은 페이지당 1회만 등장한다.

---

## G3 기각 방향 (Deviations)

| 방향 | 기각 사유 |
|------|-----------|
| A 뮤지엄 커스토디얼 | 조판 규율은 채택했으나 밝은 캔버스가 흰 다이어그램을 묻히게 함. "트렌드" 요구에도 미달 |
| B 리서치 브루탈리스트 | Results 표 처리 아이디어는 `ResultTable`로 흡수. 전체 톤은 홍보 사이트로 과도하게 건조 |
| D 단청 컬러블록 | 대중 홍보력은 최강이나 종료 과제 아카이브의 무게감 부족. 고채도 다색이 다이어그램과 충돌 |

## 원전(먹과 한지) 대비 의도적 이탈

| # | ULSOO | CHIC | 이유 |
|---|-------|------|------|
| 1 | 한지 캔버스(밝음) 지배 | 먹빛 캔버스(어두움) 지배 | CHIC의 주 자산은 흰 배경 다이어그램 — 어두운 벽에서만 초점이 된다 |
| 2 | 한지↔먹 반복 하드컷 교차 | 다크 지배, 라이트는 페이지당 1구간 | 교차를 반복하면 다이어그램 섹션의 초점 효과가 희석된다 |
| 3 | 금(Geum) 악센트 | 민트(Mint) 악센트 | 두 사이트의 식별성 확보. 둘 다 "고채도는 어두운 면에서만" 규칙은 동일 |
| 4 | 붓글씨 워드마크 | 라틴 세리프(Playfair) 워드마크 | CHIC는 라틴 두문자어가 브랜드명 — 붓 서체는 한글 정체성의 도구다 |
| 5 | 한지 질감 오버레이 | 격자(grid) 배경, 히어로 한정 | 재질의 자리를 데이터 구조의 은유가 대신한다 |
