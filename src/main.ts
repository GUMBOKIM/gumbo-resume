import './style.css';
import { createPlanetEngine } from './engine/planet';
import type { ControlName } from './engine/planet';
import { skyNow, skyLabel } from './engine/sky';
import { SECTION_ORDER } from './data/sections';
import type { SectionKey } from './data/sections';
import { renderBody, getTitle } from './ui/panels';

const root = document.getElementById('root')!;
root.innerHTML = `
<div class="app">
  <canvas id="world"></canvas>
  <div class="ui top-left"><nav class="menu" aria-label="섹션 메뉴"></nav></div>
  <div class="ui top-right"><div class="clock"></div></div>
  <div class="intro-hint">← → 로 행성을 걸어보세요</div>
  <div class="ctl left"><button data-c="left" aria-label="왼쪽으로 걷기">◀</button></div>
  <div class="ctl right"><button data-c="right" aria-label="오른쪽으로 걷기">▶</button></div>
</div>`;

const app = root.querySelector<HTMLDivElement>('.app')!;
const canvas = root.querySelector<HTMLCanvasElement>('#world')!;
const menuEl = root.querySelector<HTMLElement>('.menu')!;
const clockEl = root.querySelector<HTMLDivElement>('.clock')!;

/* ----- 상태 ----- */
let active: SectionKey | null = null;
let dismissed = false;

/* ----- 메뉴 ----- */
const menuBtns = new Map<SectionKey, HTMLButtonElement>();
for (const s of SECTION_ORDER) {
  const b = document.createElement('button');
  b.innerHTML = `<span class="arr">▸ </span>${s.title}`;
  b.addEventListener('click', () => engine.walkTo(s.key));
  menuEl.append(b);
  menuBtns.set(s.key, b);
}
function syncMenu() {
  for (const [key, b] of menuBtns) b.classList.toggle('on', key === active);
}

/* ----- 섹션 패널 ----- */
function renderPanel() {
  app.querySelector('.panel')?.remove();
  if (!active || dismissed) return;
  const key = active;
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', getTitle(key));
  panel.innerHTML = `
<div class="panel-head">
  <h3>▸ ${getTitle(key)}</h3>
  <button class="close" aria-label="닫기">×</button>
</div>
<div class="panel-body">${renderBody(key)}</div>`;
  panel.querySelector('.close')!.addEventListener('click', () => {
    dismissed = true;
    renderPanel();
  });
  app.append(panel);
}

/* ----- 엔진 ----- */
const engine = createPlanetEngine(canvas, key => {
  active = key;
  dismissed = false;
  syncMenu();
  renderPanel();
});

/* ----- 터치 컨트롤 ----- */
for (const b of root.querySelectorAll<HTMLButtonElement>('.ctl button')) {
  const name = b.dataset.c as ControlName;
  b.addEventListener('pointerdown', e => { e.preventDefault(); engine.setControl(name, true); });
  b.addEventListener('pointerup', () => engine.setControl(name, false));
  b.addEventListener('pointercancel', () => engine.setControl(name, false));
}

/* ----- 시계 ----- */
function updateClock() {
  const s = skyNow();
  const hh = String(Math.floor(s.h)).padStart(2, '0');
  const mm = String(Math.floor((s.h % 1) * 60)).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm} ${skyLabel(s.light)}`;
}
updateClock();
setInterval(updateClock, 10_000);

/* ----- 인트로 힌트 (7초 후 제거) ----- */
setTimeout(() => root.querySelector('.intro-hint')?.remove(), 7200);
