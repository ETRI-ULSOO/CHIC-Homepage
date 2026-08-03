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
    date: z.coerce.date(),
    /** 일시·장소처럼 날짜로 환원되지 않는 부가 정보 */
    when: z.string().optional(),
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
        key: z.string(),
        title: z.string(),
        /** 현행 사이트에 설명 텍스트가 없는 항목이 있다 — 빈 문자열 허용 */
        body: z.string(),
        image: z.string(),
        width: z.number(),
        height: z.number(),
      }),
    ),
  }),
});

export const collections = { news, consortium, home, project, contact, concept };
