// UI 라벨 단일 원천. 본문 콘텐츠는 여기 두지 않는다 —
// 본문은 content/ (Markdown) 또는 data/ (YAML)에 언어별로 존재한다 (D-06).

export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const ui = {
  ko: {
    'site.title': 'CHIC — 지능형 문화유산 큐레이션',
    'site.desc':
      '실감형 문화유산 체험을 위한 애셋 기반 지능형 큐레이션 및 서비스 운영기술 개발. 문화체육관광부 문화기술 연구개발 지정과제.',
    'nav.project': '과제 소개',
    'nav.results': '연구 성과',
    'nav.consortium': '참여 기관',
    'nav.news': '소식',
    'nav.contact': '연락처',
    'hero.period': '2020.07 — 2022.12 · 문화체육관광부 문화기술 연구개발 지정과제',
    'kpi.results': '연구 결과물',
    'kpi.archive': '아카이브 디지털화',
    'kpi.attributes': '데이터 속성 / 관계 정의',
    'kpi.orgs': '참여 기관',
    'section.impact': '기대효과',
    'section.rationale': '연구개발의 필요성',
    'section.project': '과제 소개',
    'section.goals': '연구목표',
    'section.scope': '연구내용',
    'section.outputs': '결과물',
    'section.consortium': '참여 기관',
    'section.contact': '연락처',
    'concept.link': '개념과 접근 방법 자세히 보기',
    'figure.prefix': '圖',
    'figure.zoom': '클릭하여 확대',
    'figure.close': '닫기',
    'lang.switch': 'English',
  },
  en: {
    'site.title': 'CHIC — Cultural Heritage Intelligent Curation',
    'site.desc':
      'Development of asset-based intelligent curation and service operation technology for immersive cultural heritage experiences. Designated R&D project of the Ministry of Culture, Sports and Tourism.',
    'nav.project': 'Project',
    'nav.results': 'Results',
    'nav.consortium': 'Consortium',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'hero.period': '2020.07 — 2022.12 · MCST Culture Technology R&D',
    'kpi.results': 'Research outputs',
    'kpi.archive': 'Archive digitised',
    'kpi.attributes': 'Attributes / relations',
    'kpi.orgs': 'Partner organisations',
    'section.impact': 'Expected Impact',
    'section.rationale': 'Rationale',
    'section.project': 'The Project',
    'section.goals': 'Research Goals',
    'section.scope': 'Research Scope',
    'section.outputs': 'Deliverables',
    'section.consortium': 'Consortium',
    'section.contact': 'Contact',
    'concept.link': 'See concept and approach in detail',
    'figure.prefix': 'Fig.',
    'figure.zoom': 'Click to enlarge',
    'figure.close': 'Close',
    'lang.switch': '한국어',
  },
} as const;

export type UIKey = keyof (typeof ui)['ko'];
