import { PROFILE, HISTORY, SKILLS, EXPERIENCE, CONTACT, SECTION_ORDER } from '../data/sections';
import type { SectionKey } from '../data/sections';

function Description({ text }: { text: string }) {
  return (
    <div className="desc">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return null;
        if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>;
        return <h5 key={i}>{line}</h5>;
      })}
    </div>
  );
}

function ProfilePanel() {
  return (
    <>
      <p className="greeting">{PROFILE.greeting}</p>
      <ul>
        {PROFILE.points.map(p => <li key={p}>{p}</li>)}
      </ul>
    </>
  );
}

function CareerPanel() {
  return (
    <>
      {HISTORY.map(group => (
        <section key={group.kind}>
          <h4>{group.kind}</h4>
          <ul className="history">
            {group.histories.map(h => (
              <li key={h.name}>
                <span className="name">{h.name}</span>
                {h.content && <span className="role">{h.content}</span>}
                <span className="period">{h.startDate} – {h.endDate || '현재'}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

function SkillPanel() {
  return (
    <>
      {SKILLS.map(group => (
        <section key={group.kind}>
          <h4>{group.kind}</h4>
          <div className="chips">
            {group.skills.map(s => <span className="chip" key={s}>{s}</span>)}
          </div>
        </section>
      ))}
    </>
  );
}

function ExperiencePanel() {
  return (
    <>
      {EXPERIENCE.map(company => (
        <section key={company.companyName}>
          <h4>{company.companyName}</h4>
          {company.projects.map(p => (
            <article key={p.title} className="project">
              <div className="project-head">
                <span className="name">{p.title}</span>
                <span className="role">{p.role}</span>
                <span className="period">{p.period}</span>
              </div>
              <div className="tech">{p.techStack}</div>
              <Description text={p.description} />
            </article>
          ))}
        </section>
      ))}
    </>
  );
}

function ContactPanel() {
  return (
    <>
      <section>
        <h4>이메일</h4>
        <a className="chip" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </section>
      <section>
        <h4>링크</h4>
        <div className="chips">
          {CONTACT.links.map(l => (
            <a className="chip" key={l.name} href={l.href} target="_blank" rel="noreferrer">{l.name}</a>
          ))}
        </div>
      </section>
    </>
  );
}

const PANELS: Record<SectionKey, () => React.ReactNode> = {
  profile: ProfilePanel,
  career: CareerPanel,
  skill: SkillPanel,
  experience: ExperiencePanel,
  contact: ContactPanel,
};

interface Props {
  section: SectionKey;
  onClose: () => void;
}

export default function SectionPanel({ section, onClose }: Props) {
  const meta = SECTION_ORDER.find(s => s.key === section);
  const title = meta?.panelTitle ?? meta?.title ?? section;
  const Body = PANELS[section];
  return (
    <div className="panel" role="dialog" aria-label={title}>
      <div className="panel-head">
        <h3>▸ {title}</h3>
        <button className="close" onClick={onClose} aria-label="닫기">×</button>
      </div>
      <div className="panel-body">
        <Body />
      </div>
    </div>
  );
}
