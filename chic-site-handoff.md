# CHIC 홍보 사이트 리뉴얼 — 착수 인수인계 문서

> 작성일: 2026-08-03
> 목적: 채팅 세션에서 확정한 범위·구조 결정을 Claude Code 세션으로 이관
> 작업 등급: **L2** (신규 시스템 구축, 전 게이트 적용 대상)
> 작업 성격: **코딩 작업** (계획서·제안서 아님)

---

## 1. 배경 및 목표

- CHIC(Cultural Heritage Intelligent Curation) 과제 홍보 사이트가 현재 Google Sites로 운영 중
  - 현행 URL: `https://sites.google.com/view/intelligent-curation/home`
- 이를 자체 개발한 정적 사이트로 리뉴얼하여 이관
- **제약: 운영 리소스 없음 → 완전 무료·무관리 운영이 필수 조건**
- 대규모 시스템이 아닌 홍보 페이지 수준

---

## 2. 현행 사이트 인벤토리 (이관 대상)

| 페이지 | 경로 | 성격 |
|---|---|---|
| Home | `/home` | 과제 개요, 필요성 다이어그램 2점 |
| Project | `/project` | 허브 페이지 |
| ├ About | `/project/about` | 정적 텍스트 |
| ├ Concept and Approach | `/project/concept-and-approach` | 다이어그램 중심 |
| └ Ambition and Objectives | `/project/ambition-and-objectives` | 정적 텍스트 |
| Consortium | `/consortium` | 참여 기관 목록 (구조적 반복 데이터) |
| Results | `/results` | 논문·특허·데모 (구조적 반복 데이터) |
| News | `/news` | 본문 있는 게시물 목록 |
| Contact Us | `/contact-us` | 연락처 |

부가 요소:
- 한/영 병기 (현행은 `/home/home-english` 형태의 임시 분기)
- 패밀리 사이트 링크: MUCH (`sites.google.com/view/much0/results`) — **외부 링크로만 연결, 통합 대상 아님**
- 과제 정보: 문화체육관광부 문화기술 연구개발 지정과제, 2020.07 ~ 2022.12
  "실감형 문화유산 체험을 위한 애셋 기반 지능형 큐레이션 및 서비스 운영기술 개발"
- 협력 기관: 국립중앙박물관, 국립무형유산원

---

## 3. 확정 결정 사항 (DECISIONS.md 등재 대상)

| # | 결정 | 근거 | 파생 효과 |
|---|---|---|---|
| D-01 | Headless CMS 도입 안 함. **Git = 단일 원천** | 콘텐츠 갱신 주체가 단독(희권) | Decap/Sanity 검토 불필요, 인증·백엔드 계층 0 |
| D-02 | **한·영 완전 대응**, `/ko/` `/en/` 병렬 라우팅 | 국제 협력·성과 노출 | 콘텐츠 파일이 항상 언어 쌍으로 존재해야 함 |
| D-03 | 도메인은 **`*.pages.dev` 무료 서브도메인** | 비용·기관 승인 절차 회피 | 프로젝트명 = URL이므로 명명 신중 필요 |
| D-04 | 호스팅은 **Cloudflare Pages 무료 티어** | 대역폭 무제한, 서버리스 함수 여유, 서버 관리 0 | GitHub push → 자동 빌드·배포 |
| D-05 | 프레임워크는 **Astro** | 콘텐츠 컬렉션·i18n 내장, 산출물이 순수 정적 HTML | 유지보수 부담 최소 |
| D-06 | **News = 콘텐츠 컬렉션 / Consortium·Results = 데이터 파일** 분리 | 본문형 vs 구조적 반복 항목의 관리 방식 차이 | 스키마 이원화 |

### D-03 관련 주의
Cloudflare Pages 프로젝트명이 그대로 서브도메인이 되며 **생성 후 변경이 번거롭다.**
현행 URL(`intelligent-curation`)과의 연속성을 고려한 후보: `chic-site`, `chic-curation`, `chic-heritage`.
추후 기관(ETRI) 도메인 정책이 열리면 CNAME 연결만으로 이관 가능하므로 락인은 아님.

---

## 4. 확정 아키텍처

```
chic-site/
├─ astro.config.mjs          # i18n: defaultLocale 'ko', locales ['ko','en']
├─ CLAUDE.md                 # 프로토콜·프로젝트 규칙
├─ DECISIONS.md              # 본 문서 §3 이관
├─ DESIGN.md                 # G2 산출물 (미착수)
├─ FAILURES.md               # 상시 실패 로그
├─ src/
│  ├─ content/
│  │  ├─ news/
│  │  │  ├─ ko/2026-03-workshop.md
│  │  │  └─ en/2026-03-workshop.md    # 파일명 = 언어 간 연결 키
│  │  └─ config.ts                     # zod 스키마
│  ├─ data/
│  │  ├─ consortium.yaml               # 기관명·역할 (ko/en 필드 병기)
│  │  └─ results.yaml                  # 논문·특허·데모
│  ├─ i18n/
│  │  ├─ ko.json  en.json              # 네비게이션·버튼 등 UI 라벨
│  │  └─ utils.ts                      # t(), getLocaleFromUrl(), 대응 페이지 링크
│  ├─ layouts/BaseLayout.astro
│  ├─ components/                      # Header, LangSwitch, Hero, DiagramFigure, NewsCard, Footer
│  └─ pages/
│     ├─ index.astro                   # → /ko/ 리다이렉트
│     ├─ ko/ …
│     └─ en/ …
└─ public/images/diagrams/
```

### 설계상 핵심 판단 3가지

1. **콘텐츠/데이터 이원화** (D-06)
   본문이 있는 News는 Markdown 컬렉션, 반복 항목인 Consortium·Results는 YAML 데이터 파일.

2. **언어 쌍 무결성 검사를 빌드에 포함**
   한·영 완전 대응 방침의 실질적 실패 모드는 "한쪽만 업데이트하고 잊는 것".
   `ko/`와 `en/`의 slug 집합을 비교해 불일치 시 빌드 경고를 내는 스크립트를 **초기부터** 포함.

3. **다이어그램 이미지 처리가 품질을 좌우**
   현행 사이트는 텍스트가 박힌 다이어그램 PNG가 본문의 상당 비중.
   반응형 축소 시 판독 불가 문제가 발생하므로,
   클릭 확대(lightbox) + `<figure>` 캡션 구조를 `DiagramFigure` 컴포넌트로 표준화.

---

## 5. 잠정 가정 (다음 세션에서 확정 필요)

| # | 가정 | 확정 필요 사항 |
|---|---|---|
| A-01 | Contact는 폼 없이 담당자 이메일·기관 주소 표기 | 폼 수신이 필요하면 Formspree 무료 티어(월 50건) 또는 Cloudflare Pages Functions 추가 |
| A-02 | 다이어그램은 원본 파일(PPT/AI) 재사용 | 원본 부재 시 현행 Google Sites 이미지 다운로드로 대체 |
| A-03 | Results 항목 수는 수십 건 규모 | 실제 규모에 따라 필터·페이지네이션 필요 여부 결정 |
| A-04 | 과제 종료(2022.12) 후 News 갱신 빈도 낮음 | 아카이브 성격이면 News 섹션 축소 검토 가능 |

---

## 6. 작업 위치

| 구분 | 경로 |
|---|---|
| 저장소 루트 (연구소 PC) | `E:\Project\chic-site\` |
| 설명서 산출물 | `E:\Project\_explanations\chic-site\` |
| MacBook | 대응 경로, Git 동기화 |

연구소 PC는 outbound-only 방화벽이나, `git push` 기반 배포이므로 제약 없음.

---

## 7. 프로토콜 진행 현황

| 게이트 | 내용 | 상태 |
|---|---|---|
| G1 | 범위·구성요소 정의 | ✅ 완료 (§2, §4) |
| G2 | 디자인 레퍼런스 조사 → `DESIGN.md` | ⬜ 미착수 |
| G3 | 구조 결정 인터뷰 | ✅ 1차 완료 (D-01~D-03), 잔여 항목은 §5 |
| G4 | 본보기 코드 제시 | ⬜ 미착수 |
| G5 | 실패 로그 → `FAILURES.md` | 상시 |
| G6 | 이해도 퀴즈 | ⬜ 구현 후 |

---

## 8. 다음 세션 착수 순서 (권장)

1. `E:\Project\chic-site\` 생성 후 Git 초기화, GitHub 저장소 연결
2. **G2 진행** — 레퍼런스 조사 후 `DESIGN.md` 작성
   - 조사 대상: EU CORDIS 계열 프로젝트 사이트, 국내 국가 R&D 과제 사이트, 대학·연구소 랩 페이지
   - 정리 항목: 타이포그래피, 컬러 팔레트, 섹션 구성 패턴, 다이어그램 제시 방식
3. **G4 진행** — `BaseLayout.astro` + i18n 유틸 + News 컬렉션 한 세트를 본보기 코드로 제시, 코딩 스타일 합의
4. 본 문서 §3을 `DECISIONS.md`로, 프로토콜 규칙을 `CLAUDE.md`로 이관
5. 전체 페이지 구현 → 콘텐츠 이관 → Cloudflare Pages 연결

> **G2 → G4 순서 권장 근거:** CHIC처럼 다이어그램 비중이 큰 사이트는
> 디자인 톤이 컴포넌트 분해 방식에 직접 영향을 준다.

---

## 9. 다음 세션 시작 프롬프트 예시

```
이 문서를 기준으로 CHIC 사이트 리뉴얼을 진행한다.
작업 등급 L2, 현재 G1·G3 완료 상태.
§5의 잠정 가정 A-01~A-04를 먼저 확인한 뒤 G2(DESIGN.md 작성)부터 착수할 것.
```
