import { SECTION_ORDER, CONTACT } from '../data/sections';
import { renderBody, getTitle } from './panels';

/** 빌드 타임에 index.html에 주입되는 시맨틱 문서 (크롤러/스크린리더용) */
export function renderSeoDocument(): string {
  const sections = SECTION_ORDER.map(s =>
    `<section id="seo-${s.key}"><h2>${getTitle(s.key)}</h2>${renderBody(s.key)}</section>`,
  ).join('\n');
  return `<div class="sr-doc">
<h1>김대희 — 소프트웨어 엔지니어 (검보, Gumbo)</h1>
<p>작은 행성 위를 걸으며 둘러보는 개발자 포트폴리오. 아래는 전체 이력 내용입니다.</p>
${sections}
</div>`;
}

export function renderJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '김대희',
    alternateName: 'Gumbo (검보)',
    jobTitle: 'Software Engineer',
    email: `mailto:${CONTACT.email}`,
    url: 'https://introduce.daeheekim.dev',
    sameAs: CONTACT.links
      .filter(l => l.href.startsWith('http'))
      .map(l => l.href),
    knowsAbout: ['TypeScript', 'JavaScript', 'Java', 'React', 'Spring Boot', 'NestJS', 'Kubernetes'],
  });
}
