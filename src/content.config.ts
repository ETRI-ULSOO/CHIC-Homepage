import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { parse as parseYaml } from 'yaml';

/**
 * D-06 — 콘텐츠/데이터 이원화.
 *   본문이 있는 News  → Markdown 컬렉션 (언어별 디렉터리, 파일명이 언어 간 연결 키)
 *   반복 항목 Consortium·Results → YAML 데이터 파일 (언어 필드 병기)
 */

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    /** 현행 게시물 5건 중 2건은 날짜 표기가 없다. 없는 날짜를 지어내지 않는다. */
    date: z.coerce.date().optional(),
    /** 현행 사이트의 게시 순서. 날짜가 없는 항목이 있어 날짜 정렬로는 순서가 무너진다. */
    order: z.number(),
    /** 일시·장소처럼 날짜로 환원되지 않는 부가 정보 */
    when: z.string().optional(),
    /** 게시물 대표 이미지 (선택). 없으면 텍스트만 렌더된다. */
    image: z.string().optional(),
    where: z.string().optional(),
    /** News 첨부는 전부 외부 링크다 (content-inventory.md M-06) */
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
  }),
});

const consortium = defineCollection({
  loader: file('./src/data/consortium.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    ko: z.string(),
    en: z.string(),
    abbr: z.string(),
    url: z.string().url(),
    /** 주관·참여·협력 구분 */
    role: z.enum(['lead', 'partner', 'collaborator']),
    /** getCollection은 id 알파벳순으로 반환하므로 표시 순서를 데이터가 직접 갖는다.
     *  기관 나열 순서는 과제 문서상의 서열이라 임의 정렬이 허용되지 않는다. */
    order: z.number(),
  }),
});

const home = defineCollection({
  loader: file('./src/data/home.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    lead: z.string(),
    kpis: z.array(z.object({ value: z.string(), key: z.string() })),
    impacts: z.array(z.object({ title: z.string(), detail: z.string() })),
  }),
});

const project = defineCollection({
  loader: file('./src/data/project.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    goalLead: z.string(),
    goals: z.array(z.string()),
    scopeLead: z.string(),
    scope: z.array(z.string()),
    outputs: z.array(z.string()),
  }),
});

const contact = defineCollection({
  loader: file('./src/data/contact.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    org: z.string(),
    unit: z.array(z.string()),
    people: z.array(
      z.object({
        name: z.string(),
        title: z.string(),
        emails: z.array(z.string().email()),
      }),
    ),
  }),
});

const concept = defineCollection({
  loader: file('./src/data/concept.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    items: z.array(
      z.object({
        /** 도해 컴포넌트를 고르는 열쇠 — diagrams/comparisons의 `concept-<key>`와 짝을 이룬다 */
        key: z.string(),
        title: z.string(),
        /** 현행 사이트에 설명 텍스트가 없는 항목이 있다 — 빈 문자열 허용 */
        body: z.string(),
      }),
    ),
  }),
});

export const resultCategories = ['acquisition', 'asset', 'analysis', 'platform', 'service'] as const;

const localised = z.object({ title: z.string(), desc: z.string() });

const results = defineCollection({
  loader: file('./src/data/results.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    year: z.union([z.literal(1), z.literal(2)]),
    category: z.enum(resultCategories),
    order: z.number(),
    ko: localised,
    en: localised,
    /** 결과물 이미지는 원본 화질·저작권 미확인 상태다 (PLAN P-04).
     *  없으면 텍스트 전용으로 렌더되므로 이미지 대기가 페이지를 막지 않는다. */
    image: z.string().optional(),
  }),
});

export const outcomeTypes = ['journal', 'conference', 'patent', 'software', 'award'] as const;

const outcomes = defineCollection({
  loader: file('./src/data/outcomes.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    type: z.enum(outcomeTypes),
    order: z.number(),
    date: z.coerce.date(),
    title: z.string(),
    /** 원제가 국문인 항목의 영문 제목. 없으면 원제를 그대로 쓴다 —
     *  학술 성과는 원제 표기가 원칙이므로 억지로 번역하지 않는다. */
    titleEn: z.string().optional(),
    authors: z.string().optional(),
    venue: z.string().optional(),
    venueEn: z.string().optional(),
    /** 특허 출원번호 · SW 등록번호 */
    number: z.string().optional(),
    country: z.enum(['KR', 'US']).optional(),
    org: z.string(),
    note: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

const applications = defineCollection({
  loader: file('./src/data/applications.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    year: z.number(),
    /** 수행한 참여기관. 계약 상대(사업화기관)는 대외비이므로 담지 않는다. */
    org: z.string(),
    ko: z.string(),
    en: z.string(),
  }),
});

/** 도해 한 줄. 문자열이면 본 항목, `{ sub }`이면 바로 위 줄의 부연이다. */
const diagramLine = z.union([z.string(), z.object({ sub: z.string() })]);

const diagramBox = z.object({
  /** 제목 위에 붙는 작은 라벨 (STEP 1, 원본 데이터 …) */
  eyebrow: z.string().optional(),
  title: z.string(),
  /** 흐름의 시작·끝을 표시하는 강조 박스 (제목이 Mint) */
  accent: z.boolean().optional(),
  lines: z.array(diagramLine).default([]),
});

const diagramContent = z.object({
  title: z.string(),
  /** 넓은 화면에서 단계를 가로로 흘릴지 세로로 쌓을지. 좁은 화면은 항상 세로다. */
  flow: z.enum(['row', 'column']).default('row'),
  /** 화살표로 이어지는 단계들 */
  stages: z.array(
    z.object({
      /** 단계 위에 붙는 작은 라벨 */
      label: z.string().optional(),
      /** 넓은 화면에서 이 단계의 박스를 몇 열로 놓을지 (기본 1) */
      cols: z.number().optional(),
      boxes: z.array(diagramBox),
    }),
  ),
  /** 화살표 없이 나열되는 하단 띠 */
  band: z.object({ title: z.string(), boxes: z.array(diagramBox) }).optional(),
  /** 도해 전체를 관통하는 한 줄 — 단계 아래에 폭 전체로 놓인다 */
  note: z.object({ eyebrow: z.string().optional(), text: z.string() }).optional(),
  footer: z.array(z.string()).default([]),
});

/** 좌우 대조형 도해 (기존 한계 ↔ 우리 접근). 흐름도와 구조가 달라 따로 둔다. */
const diagramCompare = z.object({
  title: z.string(),
  leftLabel: z.string(),
  rightLabel: z.string(),
  rows: z.array(
    z.object({
      left: z.object({ title: z.string(), desc: z.string() }),
      right: z.object({ title: z.string(), desc: z.string() }),
    }),
  ),
});

/** 랜딩 도해. 종전에는 국·영문 SVG 2벌에 문안이 박혀 있었다 —
 *  HTML로 옮기면서 문안을 한 벌로 통합했다 (2026-08-05). */
const diagrams = defineCollection({
  loader: file('./src/data/diagrams.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({
    ko: diagramContent,
    en: diagramContent,
  }),
});

/** 대조형 도해 (concept-strategy) */
const comparisons = defineCollection({
  loader: file('./src/data/comparisons.yaml', { parser: (text) => parseYaml(text) }),
  schema: z.object({ ko: diagramCompare, en: diagramCompare }),
});

export const collections = {
  news, consortium, home, project, contact, concept, results, outcomes, applications, diagrams, comparisons,
};
