import { PROFILE, HISTORY, SKILLS, EXPERIENCE, CONTACT, SECTION_ORDER } from '../data/sections';
import type { SectionKey } from '../data/sections';

/** 런타임 패널과 빌드타임 SEO 문서가 공유하는 HTML 렌더러 */

export function getTitle(key: SectionKey): string {
  const meta = SECTION_ORDER.find(s => s.key === key);
  return meta?.panelTitle ?? meta?.title ?? key;
}

function renderDesc(text: string): string {
  let html = '';
  let inList = false;
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${t.slice(2)}</li>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h5>${t}</h5>`;
    }
  }
  if (inList) html += '</ul>';
  return `<div class="desc">${html}</div>`;
}

function profile(): string {
  return `<p class="greeting">${PROFILE.greeting}</p>
<ul>${PROFILE.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
}

function career(): string {
  return HISTORY.map(g => `<section>
<h4>${g.kind}</h4>
<ul class="history">${g.histories.map(h =>
    `<li><span class="name">${h.name}</span>${h.content ? `<span class="role">${h.content}</span>` : ''}<span class="period">${h.startDate} – ${h.endDate || '현재'}</span></li>`,
  ).join('')}</ul>
</section>`).join('');
}

function skill(): string {
  return SKILLS.map(g => `<section>
<h4>${g.kind}</h4>
<div class="chips">${g.skills.map(s => `<span class="chip">${s}</span>`).join('')}</div>
</section>`).join('');
}

function experience(): string {
  return EXPERIENCE.map(c => `<section>
<h4>${c.companyName}</h4>
${c.projects.map(p => `<article class="project">
<div class="project-head"><span class="name">${p.title}</span><span class="role">${p.role}</span><span class="period">${p.period}</span></div>
<div class="tech">${p.techStack}</div>
${renderDesc(p.description)}
</article>`).join('')}
</section>`).join('');
}

function contact(): string {
  return `<section>
<h4>이메일</h4>
<a class="chip" href="mailto:${CONTACT.email}">${CONTACT.email}</a>
</section>
<section>
<h4>링크</h4>
<div class="chips">${CONTACT.links.map(l =>
    `<a class="chip" href="${l.href}" target="_blank" rel="noreferrer">${l.name}</a>`,
  ).join('')}</div>
</section>`;
}

const BODIES: Record<SectionKey, () => string> = {
  profile, career, skill, experience, contact,
};

export function renderBody(key: SectionKey): string {
  return BODIES[key]();
}
