# CHIC 사이트 리뉴얼 — 진행 로그

## 2026-08-03 — 착수 세션 (G2 재개 → G3 프로토타입)

### 목표
채팅 세션의 인수인계 문서([[chic-site-handoff]])를 기준으로 CHIC 홍보 사이트 리뉴얼에 착수.
잠정 가정 A-01~A-04 확정 후 디자인 방향 결정까지 진행.

### 결정사항

| # | 결정 | 비고 |
|---|---|---|
| D-07 | 사이트 성격 = **정보 구조·콘텐츠 보존 + 디자인·형태는 트렌드 리뉴얼** | 초기 "1:1 이관" 해석을 사용자가 정정. 구조만 보존, 표현은 신규 |
| D-08 | 저장소 소유 = **ETRI-ULSOO** (업무 계정) | `gh auth status` 확인 결과 이미 활성 계정 |
| D-09 | Contact = **이메일 표기만**, 폼 없음 (A-01 확정) | 백엔드 계층 0 유지 |
| D-10 | 다이어그램 원본 = **일부만 보유, 확인 필요** (A-02 부분 확정) | 미보유분은 Google Sites 추출본 사용 |
| D-11 | 사이트 형태 = **하이브리드** | Home·Project·Consortium·Contact = 롱스크롤 랜딩 / Results·News = 별도 페이지 |
| D-12 | 디자인 = **CHIC 독자 디자인** (ULSOO 먹과한지는 참고만) | G3 정식 수행 근거 |
| D-13 | 스택·배포 = **Astro + Cloudflare Pages 유지** (D-04·D-05 유지) | ULSOO의 무빌드 vanilla 스택은 채택하지 않음. Astro 7.1.6 확인 (2026-08-03 실측) |
| D-14 | 디자인 = **먹빛 전시실 (Meokbit Gallery)** — 다크 캔버스 + 명조 디스플레이 | G3 4안 중 C 골격 + A 타이포. 근거: 주 자산이 흰 배경 다이어그램이라 어두운 캔버스에서만 초점이 됨 |
| D-15 | 주 악센트 = **Mint `#35e0c4`**, 라이트용 딥 변형 `#0d7a68` | Mint 원색은 라이트 배경 1.52:1로 텍스트 불가 (2026-08-03 실측) |

### 산출물

- [[content-inventory]] — 현행 사이트 14페이지 전수 실측 인벤토리 (`_migration/`)
- `prototypes/g3-directions.html` — G3 디자인 방향 4안 프로토타입 (실제 콘텐츠 적용)
- `_migration/ulsoo-DESIGN.md`, `ulsoo-index.html`, `ulsoo-data.js`, `ulsoo-deploy.yml` — ULSOO 레퍼런스 사본

### 실측으로 밝혀진 사실 (인수인계 문서 정정)

1. **영문판은 9개 중 5개만 존재.** Consortium·News 영문판 부재 → D-02(한·영 완전 대응)와 충돌
2. **`/project`와 `/project/about`는 콘텐츠 완전 동일** (중복 페이지)
3. **Ambition and Objectives는 다이어그램 1장이 전부**, 텍스트 0 (문서는 "정적 텍스트"로 분류)
4. **Results는 논문·특허 목록이 아니라 연차별 연구 결과물 카드 38건** (이미지+제목+설명) → 스키마 변경
5. **ULSOO 사이트는 무빌드 vanilla 스택** (Tailwind/Alpine CDN, 단일 index.html, GitHub Pages) — 인수인계 문서의 D-04·D-05 전제와 다름
6. 다이어그램 판독성 문제 실측 확인 — 원본 1280px 기준 11px 라벨이 본문 칼럼 폭에서 6px급으로 축소됨. **lightbox 확대는 필수 요건**

### 현재 진행도

| 게이트 | 상태 |
|---|---|
| G1 Blind Spot | ✅ 완료 |
| G2 Interview | ✅ 완료 (D-07~D-13) |
| G3 Prototypes | ✅ 완료 — C(다크 랩) 골격 + A(뮤지엄) 타이포 규율로 수렴, [[DESIGN]] 확정 |
| G4 References | ✅ 본보기 코드 제시 — Astro 스캐폴딩 + 수직 관통 1세트, `npm run build` 통과 (2026-08-03 실측) |
| G4.5 Plan | ⬜ 미착수 |
| G5 Implementation | ⬜ 미착수 |

### G4 산출물 — 본보기 코드 (2026-08-03)

Astro 7.1.6 스캐폴딩 + 수직 관통 1세트. `npm run build` 통과, `/ko/` `/en/` 실제 렌더링 확인.

| 파일 | 역할 |
|---|---|
| `astro.config.mjs` | i18n `prefixDefaultLocale: true`, 루트 → `/ko/` 리다이렉트 |
| `src/styles/tokens.css` | [[DESIGN]] 토큰 구현. 값의 단일 원천은 DESIGN.md |
| `src/i18n/ui.ts` · `utils.ts` | UI 라벨 + `getLocale`/`useTranslations`/`alternatePath` |
| `src/layouts/BaseLayout.astro` | head·hreflang·폰트·Header/Footer |
| `src/components/DiagramFigure.astro` | **핵심 컴포넌트** — `<dialog>` 기반 lightbox (Esc·백드롭·이미지 클릭 3경로 닫기 실측 확인) |
| `src/content.config.ts` | D-06 이원화 구현 — news(glob/Markdown) + consortium·home(file/YAML) |
| `src/pages/[locale]/index.astro` | **언어를 라우트 파라미터로 두는 패턴** — 14페이지를 언어마다 복제하지 않는다 |

**구현 중 발견한 사실 (실측)**

1. `getCollection`은 **id 알파벳순**으로 반환한다. YAML 정의 순서가 보존되지 않아 디캐릭이 ETRI(주관기관)보다 앞에 나왔다. → 데이터에 `order` 필드를 두고 명시 정렬. **Results 38건에도 동일하게 적용해야 한다.**
2. dev 서버는 스키마 변경 시 콘텐츠 스토어를 자동 갱신하지 않는다 ("collection does not exist or is empty"). 스키마를 고치면 dev 재시작이 필요하다 — 빌드는 정상이었으므로 오진하기 쉽다.
3. 캡션 접두는 언어별로 달라야 한다 (`圖` / `Fig.`). 하드코딩 시 영문 페이지에 한자가 남는다.

### 다이어그램 규칙 개정 (2026-08-03, 사용자 지적)

**초안 오류:** [[DESIGN]] 초안은 다이어그램을 "흰 배경 도판을 어두운 벽에 건다"로 규정했다. 근거는 *현행 다이어그램이 재색조 불가능한 흰 배경 PNG*라는 전제였는데, **재색조가 가능한 자산(직접 그린 SVG)에까지 그 제약을 적용한 것이 잘못**이다. 결과적으로 '연구개발의 필요성' 다이어그램만 페이지에서 색이 겉돌았다.

**개정:** 다이어그램은 시스템 팔레트 SVG로 재제작하는 것을 원칙으로 한다. 범주는 색이 아니라 위치·라벨로 구분하고 악센트는 Mint 하나만 쓴다. 흰 배경 원본과 재제작 SVG를 **같은 페이지에 섞지 않는다**(조각보 방지).

**실측:** 재제작 시 임의 회색(`#4d5a66`)을 각주·화살표에 썼다가 2.74:1로 기준 미달 확인. 각주는 토큰 `#93a4b3`(7.56:1), 화살표는 `#6b7b8a`(4.45:1, 비텍스트 3:1 충족)로 교정. **SVG 내부에도 토큰 강제 + 명암비 실측이 필요하다.**

### G4.5 산출물

[[PLAN]] 작성 — 바뀔 결정 5건(P-01~P-05) 선두 배치, 구현 7단계, 제외 범위 명시.

### G5 착수 — 랜딩 골격 (2026-08-03)

**확정 (P-01~P-03 응답)**

| # | 결정 |
|---|---|
| D-16 | 다이어그램 **단계적 재제작** — 랜딩 6점 우선, Concept 4점·Results 1점은 원본 대기 |
| D-17 | 영문 콘텐츠 **신규 번역** (P-02). 초안 작성 완료, 연구 용어 최종 표현은 검수 대상 |
| D-18 | Project 관련 3페이지를 랜딩 `#project` 섹션으로 **통합** (P-03) |
| D-19 | **Concept and Approach만 별도 페이지로 분리** — D-16·D-18의 충돌 해소책 (아래) |

**D-19 도출 근거 (파생 결정):** D-18을 그대로 적용하면 Concept의 다이어그램 4점도 랜딩에 올라오는데, D-16에서 그 4점은 원본 이미지로 남는다. 그러면 한 페이지에 재제작 SVG와 흰 배경 원본이 섞여 [[DESIGN]]의 "조각보 금지" 규칙을 위반한다. Concept을 별도 페이지로 두면 랜딩은 재제작 SVG만, Concept은 원본만 갖게 되어 충돌이 사라진다. Concept은 다이어그램이 본문 전체인 가장 무거운 페이지라 독립 페이지가 원래 적절하기도 하다.

**구현 상태**

| 항목 | 상태 |
|---|---|
| 랜딩 5섹션 (과제소개·기대효과·필요성·참여기관·연락처) | ✅ 한/영 렌더 확인 |
| `/{locale}/concept/` 페이지 | ✅ 생성 — 다이어그램 슬롯은 대기 표시 |
| 데이터 파일 | `home` `project` `concept` `consortium` `contact` `news` 6종 |
| 다이어그램 재제작 | **2 / 6** — `necessity.svg` `project-overview.svg` 완료 |
| 빌드 | ✅ 4페이지 (`npm run build`, 2026-08-03 실측) |

**남은 재제작 4점:** Home 본문 · 기대효과 · Ambition and Objectives · 연구개발 추진체계

### 다이어그램 재제작 완료 (2026-08-03)

**D-20 개정:** Concept 4점도 재제작 대상에 포함 (사용자 지시). D-16의 '단계적 재제작'은 사실상 전량 재제작으로 확대되었고, 원본 이미지 대기 항목은 Results 1점만 남는다.

**재제작 결과 — 7점**

| 파일 | 배치 | 내용 근거 |
|---|---|---|
| `project-overview.svg` | 랜딩 #project | /project 연구내용·결과물 원문 |
| `necessity.svg` | 랜딩 필요성 | 현행 필요성 다이어그램 구조 |
| `consortium-structure.svg` | 랜딩 #consortium | 기관명 원문. **기관별 담당 과업은 미명시이므로 표시하지 않음** |
| `concept-process.svg` | Concept 01 | Results 2차년도 5개 대분류 |
| `concept-platform.svg` | Concept 02 | 현행 플랫폼 정의 문장의 5개 항목 원문 |
| `concept-asset.svg` | Concept 03 | Results 애셋 기술 4항목 + 1차년도 애셋 기술 |
| `concept-strategy.svg` | Concept 04 | ⚠️ **재해석 — 검수 필요도 높음** |

**폐기 2점 (제작 후 취소):** `impact.svg` · `objectives.svg`. P-03 랜딩 통합의 결과로 이 두 다이어그램의 내용이 같은 페이지의 기대효과 카드·연구목표 목록과 **완전히 중복**됨을 배치 단계에서 확인. 한 페이지에 같은 문구를 두 번 싣지 않기 위해 삭제. → **랜딩 재제작은 6점이 아니라 3점이 맞다.**

**검수 요청 사항 (사용자 확인 필요)**

1. `concept-strategy.svg` — 현행 사이트에 설명 텍스트가 전무하여, 문서화된 과제 특징 4가지를 '기존 한계 → CHIC의 접근' 대비 구조로 **재구성**했다. 원본의 논지와 다를 수 있다.
2. `concept-process.svg` — 5단계 구분은 Results 대분류에서 도출한 것으로 원본 단계 구분과 다를 수 있다.
3. `concept-asset.svg` — 애셋 정의의 3단 구조(원본→애셋화→활용)는 도출된 것이다.

**구현 상태**

| 항목 | 상태 |
|---|---|
| 다이어그램 재제작 | ✅ 7 / 7 (Results 1점만 원본 대기) |
| Concept 페이지 | ✅ 다이어그램 4점 연결, 대기 슬롯 제거 |
| 랜딩 | ✅ 5섹션 + 다이어그램 3점 |
| 빌드 | ✅ 4페이지, SVG 7점 200 응답·XML 오류 0 (2026-08-03 실측) |

### 남은 미해결

| # | 항목 |
|---|---|
| M-01 | Consortium·News 영문 콘텐츠 신규 번역 필요 여부 |
| M-02 | 다이어그램 원본 보유분 확인 및 전달 (A-02) |
| M-03 | `/project` ↔ `/project/about` 중복 통합 여부 |
| M-04 | Ambition 페이지(이미지 1장) 독립 유지 여부 |
| M-06 | News 첨부 14건(Google Drive 링크) 저장소 이관 여부 |
| M-07 | Results 실제 항목 수 38건 확정 — 필터·연차 구분 UI 필요 여부 (A-03 대체) |
| ~~M-08~~ | ~~업무 계정 커밋 이메일~~ → **해소 (2026-08-03).** `hkkim79@etri.re.kr` 저장소 로컬 설정, 초기 2커밋 후 `ETRI-ULSOO/chic-site`(**public**)로 푸시 완료 |
| M-12 | **저장소가 공개 상태다.** M-11(재구성 다이어그램 3점 검수)이 미해결인 채로 공개되었으므로 검수 우선순위가 올라간다 |
| M-09 | Noto Serif KR 서브셋 자체호스팅 (현재 Google Fonts CDN 의존) |
| M-10 | **영문판 다이어그램** — 재제작 SVG 7점의 텍스트가 전부 국문. `/en/`에서 국문 다이어그램이 그대로 노출된다. SVG라 텍스트 교체가 가능하므로 `-en.svg` 변형 제작이 현실적 |
| M-11 | `concept-strategy.svg` 등 재해석 다이어그램 3점의 내용 검수 |

### 다음 단계

1. G3 방향 확정 → `DESIGN.md` 작성 (토큰·컴포넌트 규칙 고정)
2. G4 — `BaseLayout.astro` + i18n 유틸 + 컬렉션 한 세트 본보기 코드 합의
3. 인수인계 문서 §3 + D-07~D-13을 `DECISIONS.md`로 이관
4. 전체 구현 → 콘텐츠 이관 → Cloudflare Pages 연결
