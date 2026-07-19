import {
  drawGrid, hash, type Grid, type Palette,
  GUMBO_PAL, GUMBO_IDLE, GUMBO_WALK_A, GUMBO_BLINK,
  TREE, TREE_PAL, HOUSE, HOUSE_PAL, OFFICE, OFFICE_PAL,
  LAB, LAB_PAL, FACTORY, FACTORY_PAL, MAILBOX, MAIL_PAL,
  LAMP, LAMP_PAL, FLOWER, FLOWER_PAL, CHUTE, CHUTE_PAL, CLOUD, CLOUD_PAL,
} from './sprites';
import { skyNow, hexLerp } from './sky';
import type { SectionKey } from '../data/sections';

const TAU = Math.PI * 2;
const wrapA = (a: number) => {
  a = (a + Math.PI) % TAU;
  if (a < 0) a += TAU;
  return a - Math.PI;
};

interface Prop {
  a: number;
  grid: Grid;
  pal: Palette;
  s: number;
  key?: SectionKey;
  label?: string;
}

/** 건물 5개 = 섹션 5개, 사이사이 나무/가로등/꽃 */
const STEP = TAU / 5;
const PROPS: Prop[] = [
  { a: 0 * STEP, grid: HOUSE, pal: HOUSE_PAL, s: 2.3, key: 'profile', label: '프로필' },
  { a: 1 * STEP, grid: OFFICE, pal: OFFICE_PAL, s: 2.7, key: 'career', label: '경력' },
  { a: 2 * STEP, grid: LAB, pal: LAB_PAL, s: 2.4, key: 'skill', label: '기술' },
  { a: 3 * STEP, grid: FACTORY, pal: FACTORY_PAL, s: 2.5, key: 'experience', label: '업무경험' },
  { a: 4 * STEP, grid: MAILBOX, pal: MAIL_PAL, s: 1.5, key: 'contact', label: '연락' },
  { a: 0.5 * STEP, grid: TREE, pal: TREE_PAL, s: 2.2 },
  { a: 1.5 * STEP, grid: LAMP, pal: LAMP_PAL, s: 1.7 },
  { a: 2.5 * STEP, grid: TREE, pal: TREE_PAL, s: 1.8 },
  { a: 3.5 * STEP, grid: LAMP, pal: LAMP_PAL, s: 1.7 },
  { a: 4.5 * STEP, grid: TREE, pal: TREE_PAL, s: 2.4 },
];
for (let i = 0; i < 12; i++) {
  PROPS.push({ a: hash(i, 31) * TAU, grid: FLOWER, pal: FLOWER_PAL, s: 1.1 + hash(i, 37) * 0.6 });
}
const BUILDING_ANGLE: Record<SectionKey, number> = {
  profile: 0 * STEP, career: 1 * STEP, skill: 2 * STEP, experience: 3 * STEP, contact: 4 * STEP,
};

export type ControlName = 'left' | 'right';

export interface PlanetEngine {
  destroy(): void;
  walkTo(key: SectionKey): void;
  setControl(name: ControlName, on: boolean): void;
}

const ROT_SPEED = 1.9;
const NEAR = 0.12;

export function createPlanetEngine(
  cv: HTMLCanvasElement,
  onSection: (key: SectionKey | null) => void,
): PlanetEngine {
  const ctx = cv.getContext('2d')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let R = 800, CX = 0, CY = 0;
  function layout() {
    const r = cv.getBoundingClientRect();
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = Math.round(r.width * dpr);
    cv.height = Math.round(r.height * dpr);
    R = Math.max(cv.width * 0.4, cv.height * 0.55);
    CX = cv.width / 2;
    CY = cv.height + R * 0.42;
    ctx.imageSmoothingEnabled = false;
  }
  layout();

  const STARS = Array.from({ length: 80 }, (_, i) => [hash(i, 1), hash(i, 2), hash(i, 5)]);
  const PATCHES = Array.from({ length: 140 }, (_, i) => ({
    a: hash(i, 41) * TAU, d: 0.86 + hash(i, 43) * 0.13, s: 0.008 + hash(i, 47) * 0.014, l: hash(i, 53),
  }));

  /* ----- 입력 ----- */
  const held = new Set<ControlName>();
  let autoTarget: number | null = null;
  const KEYMAP: Record<string, ControlName> = {
    arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right',
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const c = KEYMAP[e.key.toLowerCase()];
    if (c) { held.add(c); e.preventDefault(); }
  };
  const onKeyUp = (e: KeyboardEvent) => {
    const c = KEYMAP[e.key.toLowerCase()];
    if (c) held.delete(c);
  };
  const onBlur = () => held.clear();
  addEventListener('keydown', onKeyDown);
  addEventListener('keyup', onKeyUp);
  addEventListener('blur', onBlur);
  addEventListener('resize', layout);

  /* ----- 상태 ----- */
  let rot = 0.95;
  let face = 1, moving = false, walkT = 0;
  let currentKey: SectionKey | null = null;
  let raf = 0;
  let last = performance.now();

  /* 인트로: 낙하산 착륙 (검은보급) */
  let intro = !reduced;
  let introY = -1; // 표면 위 높이(px). -1 = 첫 프레임에 초기화
  interface Particle { x: number; y: number; vx: number; vy: number; life: number; }
  const dust: Particle[] = [];
  function puff(cx: number, cy: number, n: number, spread: number, s: number) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI;
      dust.push({
        x: cx + (Math.random() - 0.5) * spread,
        y: cy,
        vx: Math.cos(a) * (3 + Math.random() * 6) * s,
        vy: -Math.abs(Math.sin(a)) * (4 + Math.random() * 5) * s,
        life: 0.45 + Math.random() * 0.3,
      });
    }
  }
  let prevStep = false;

  function frame(t: number) {
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;

    let dir = 0;
    if (!intro) {
      if (held.has('left')) dir -= 1;
      if (held.has('right')) dir += 1;
      if (dir) autoTarget = null;
      let speed = ROT_SPEED;
      if (autoTarget !== null) {
        const diff = wrapA(autoTarget - rot);
        if (Math.abs(diff) < 0.02) { rot = autoTarget; autoTarget = null; }
        else {
          dir = diff > 0 ? -1 : 1;
          speed = ROT_SPEED * (1 + Math.abs(diff) * 1.3); // 멀수록 가속, 접근하며 감속
        }
      }
      if (dir) { rot -= dir * speed * dt; face = dir; walkT += dt; }
    }
    moving = !!dir;

    // 섹션 감지 (엣지 트리거)
    let near: SectionKey | null = null;
    if (!intro) {
      for (const p of PROPS) {
        if (p.key && Math.abs(wrapA(p.a + rot)) < NEAR) near = p.key;
      }
    }
    if (near !== currentKey) { currentKey = near; onSection(near); }

    /* ----- 하늘 ----- */
    const sky = skyNow();
    const g = ctx.createLinearGradient(0, 0, 0, cv.height);
    g.addColorStop(0, sky.top);
    g.addColorStop(1, sky.bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cv.width, cv.height);

    if (sky.light < 0.6) {
      const sa = 1 - sky.light / 0.6;
      for (const [sx, sy, ph] of STARS) {
        const tw = reduced ? 0.7 : 0.35 + 0.55 * Math.abs(Math.sin(t / 1100 + ph * 7));
        ctx.globalAlpha = tw * sa;
        ctx.fillStyle = '#dfe6ff';
        const p = Math.max(1.5, cv.width * 0.0014) * (ph > 0.8 ? 1.8 : 1);
        ctx.fillRect(sx * cv.width, sy * cv.height * 0.75, p, p);
      }
      ctx.globalAlpha = 1;
    }
    // 해 / 달
    const bodyX = cv.width * 0.8, bodyY = cv.height * 0.2;
    const br = Math.min(cv.width, cv.height) * 0.045;
    if (sky.light > 0.15) {
      ctx.globalAlpha = Math.min(1, (sky.light - 0.15) / 0.5);
      const sg = ctx.createRadialGradient(bodyX, bodyY, br * 0.4, bodyX, bodyY, br * 3.2);
      sg.addColorStop(0, 'rgba(255,224,138,0.65)');
      sg.addColorStop(1, 'rgba(255,224,138,0)');
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(bodyX, bodyY, br * 3.2, 0, TAU); ctx.fill();
      ctx.fillStyle = '#ffe08a';
      ctx.beginPath(); ctx.arc(bodyX, bodyY, br, 0, TAU); ctx.fill();
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = '#c9d0e8';
      ctx.beginPath(); ctx.arc(bodyX, bodyY, br, 0, TAU); ctx.fill();
      ctx.fillStyle = '#aeb6d4';
      ctx.beginPath(); ctx.arc(bodyX - br * 0.3, bodyY - br * 0.2, br * 0.24, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(bodyX + br * 0.25, bodyY + br * 0.3, br * 0.16, 0, TAU); ctx.fill();
    }
    // 구름 (낮)
    if (sky.light > 0.25) {
      const ca = Math.min(1, (sky.light - 0.25) / 0.5);
      const cpx = Math.max(2, Math.round(R / 150));
      const drift = reduced ? 0 : t * 0.006;
      ctx.globalAlpha = 0.85 * ca;
      const lanes: [number, number, number][] = [[0.15, 0.13, 1.0], [0.62, 0.24, 0.72]];
      for (const [fx, fy, sc] of lanes) {
        const w = CLOUD[0].length * cpx * sc;
        const x = ((cv.width * fx - drift * cpx * sc) % (cv.width + w) + cv.width + w) % (cv.width + w) - w;
        drawGrid(ctx, CLOUD, CLOUD_PAL, cpx * sc, x, cv.height * fy);
      }
      ctx.globalAlpha = 1;
    }

    // 유성 (밤)
    if (!reduced && sky.light < 0.2) {
      const cyc = (t / 5200) % 1;
      if (cyc < 0.09) {
        const p = cyc / 0.09;
        const sx0 = cv.width * (0.15 + p * 0.24), sy0 = cv.height * (0.08 + p * 0.14);
        ctx.strokeStyle = `rgba(255,255,255,${0.7 * (1 - p)})`;
        ctx.lineWidth = Math.max(1.5, cv.width * 0.0012);
        ctx.beginPath();
        ctx.moveTo(sx0, sy0);
        ctx.lineTo(sx0 - cv.width * 0.05, sy0 - cv.height * 0.028);
        ctx.stroke();
      }
    }

    /* ----- 행성 ----- */
    const glow = ctx.createRadialGradient(CX, CY, R * 0.9, CX, CY, R * 1.18);
    glow.addColorStop(0, 'rgba(110,190,140,0.14)');
    glow.addColorStop(1, 'rgba(110,190,140,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(CX, CY, R * 1.18, 0, TAU); ctx.fill();

    const dayF = 0.75 + sky.light * 0.25;
    const pg = ctx.createRadialGradient(CX, CY - R * 0.8, R * 0.15, CX, CY, R);
    pg.addColorStop(0, hexLerp('#2c5429', '#5cae50', dayF));
    pg.addColorStop(0.5, hexLerp('#25471f', '#468541', dayF));
    pg.addColorStop(1, hexLerp('#1a3317', '#2e5c2b', dayF));
    ctx.fillStyle = pg;
    ctx.beginPath(); ctx.arc(CX, CY, R, 0, TAU); ctx.fill();

    ctx.save();
    ctx.beginPath(); ctx.arc(CX, CY, R - 1, 0, TAU); ctx.clip();
    for (const p of PATCHES) {
      const a = p.a + rot;
      if (Math.cos(a) < 0.2) continue;
      const px2 = CX + Math.sin(a) * R * p.d, py2 = CY - Math.cos(a) * R * p.d;
      const sz = R * p.s;
      ctx.fillStyle = p.l > 0.7 ? hexLerp('#2f5f28', '#54a049', dayF) : hexLerp('#22451c', '#3f7a38', dayF);
      ctx.fillRect(px2 - sz / 2, py2 - sz / 2, sz, sz * 0.7);
    }
    // 행성을 감는 도로
    const roadW = R * 0.055;
    ctx.strokeStyle = hexLerp('#4f3117', '#8a5a2e', dayF);
    ctx.lineWidth = roadW;
    ctx.beginPath(); ctx.arc(CX, CY, R - roadW / 2, 0, TAU); ctx.stroke();
    ctx.strokeStyle = hexLerp('#5e3d1e', '#a5713a', dayF);
    ctx.lineWidth = Math.max(1.5, roadW * 0.14);
    ctx.setLineDash([R * 0.05, R * 0.04]);
    ctx.lineDashOffset = -rot * (R - roadW / 2);
    ctx.beginPath(); ctx.arc(CX, CY, R - roadW / 2, 0, TAU); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    ctx.strokeStyle = 'rgba(20,40,18,0.8)';
    ctx.lineWidth = Math.max(2, R * 0.008);
    ctx.beginPath(); ctx.arc(CX, CY, R, 0, TAU); ctx.stroke();
    // 윗면 림라이트 (은은한 지평선 하이라이트)
    ctx.strokeStyle = `rgba(255,255,220,${0.05 + sky.light * 0.06})`;
    ctx.lineWidth = Math.max(2, R * 0.012);
    ctx.beginPath(); ctx.arc(CX, CY, R - R * 0.004, -Math.PI / 2 - 0.9, -Math.PI / 2 + 0.9); ctx.stroke();

    /* ----- 소품 ----- */
    const px = Math.max(2, Math.round(R / 120));
    const sorted = PROPS
      .filter(p => Math.cos(wrapA(p.a + rot)) > 0.1)
      .sort((a, b) => Math.cos(wrapA(a.a + rot)) - Math.cos(wrapA(b.a + rot)));
    const labels: [string, number, number, boolean][] = [];
    for (const p of sorted) {
      const a = p.a + rot;
      const s2 = px * p.s;
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(a);
      ctx.translate(0, -R + px);
      drawGrid(ctx, p.grid, p.pal, s2, (-p.grid[0].length / 2) * s2, -p.grid.length * s2);
      ctx.restore();
      if (p.label) {
        const lift = R + p.grid.length * s2 + 20;
        const lx = CX + Math.sin(a) * lift;
        const ly = CY - Math.cos(a) * lift;
        labels.push([p.label, lx, ly, Math.abs(wrapA(a)) < 0.35]);
      }
      if (p.pal === LAMP_PAL && sky.light < 0.4) {
        const gx = CX + Math.sin(a) * (R + p.grid.length * s2 * 0.8);
        const gy = CY - Math.cos(a) * (R + p.grid.length * s2 * 0.8);
        const lg = ctx.createRadialGradient(gx, gy, 0, gx, gy, px * 26);
        lg.addColorStop(0, 'rgba(247,179,43,0.25)');
        lg.addColorStop(1, 'rgba(247,179,43,0)');
        ctx.fillStyle = lg;
        ctx.beginPath(); ctx.arc(gx, gy, px * 26, 0, TAU); ctx.fill();
      }
      // 밤 창문 온기
      if (p.key && p.key !== 'contact' && sky.light < 0.35) {
        const mid = R + p.grid.length * s2 * 0.5;
        const gx = CX + Math.sin(a) * mid;
        const gy = CY - Math.cos(a) * mid;
        const wg = ctx.createRadialGradient(gx, gy, 0, gx, gy, s2 * p.grid[0].length * 0.9);
        wg.addColorStop(0, 'rgba(255,217,122,0.10)');
        wg.addColorStop(1, 'rgba(255,217,122,0)');
        ctx.fillStyle = wg;
        ctx.beginPath(); ctx.arc(gx, gy, s2 * p.grid[0].length * 0.9, 0, TAU); ctx.fill();
      }
    }
    ctx.textAlign = 'center';
    for (const [txt, lx, ly, hot] of labels) {
      ctx.font = `${Math.max(12, px * 6)}px DungGeunMo, monospace`;
      ctx.fillStyle = hot ? '#f7b32b' : sky.light > 0.6 ? 'rgba(28,26,32,0.75)' : 'rgba(239,230,200,0.7)';
      ctx.fillText(txt, lx, ly);
    }

    /* ----- 검보 ----- */
    const chPx = Math.max(2, Math.round(R / 104));
    const step = moving && Math.floor(walkT * 12) % 2 === 0;
    const blink = !moving && !intro && Math.floor(t / 180) % 20 < 2; // 3.6초마다 깜빡
    const rows = step ? GUMBO_WALK_A : blink ? GUMBO_BLINK : GUMBO_IDLE;
    let gy = CY - R;
    let ox = 0;

    // 인트로: 낙하산 하강
    if (intro) {
      if (introY < 0) introY = CY - R + rows.length * chPx + CHUTE.length * chPx; // 화면 위 바깥에서 시작
      introY -= cv.height * 0.22 * dt;
      ox = Math.sin(t / 380) * chPx * 1.6;
      if (introY <= 0) {
        intro = false;
        introY = 0;
        puff(CX, CY - R + chPx, 12, chPx * 10, chPx);
      }
      gy -= Math.max(0, introY);
    }

    // 걸음 먼지
    if (!intro && step && !prevStep) {
      puff(CX - face * chPx * 5, CY - R + chPx, 2, chPx * 3, chPx * 0.8);
    }
    prevStep = step;

    // 그림자 (공중에 있으면 축소)
    const shClose = Math.max(0, 1 - introY / (cv.height * 0.4));
    if (shClose > 0) {
      ctx.fillStyle = `rgba(0,0,0,${0.35 * shClose})`;
      ctx.beginPath();
      ctx.ellipse(CX, CY - R + chPx * 1.2, chPx * 7 * shClose, chPx * 2.2 * shClose, 0, 0, TAU);
      ctx.fill();
    }
    const chX = CX - (rows[0].length / 2) * chPx + ox;
    drawGrid(ctx, rows, GUMBO_PAL, chPx, chX, gy - rows.length * chPx + (step ? chPx : 0), face < 0);
    if (intro) {
      drawGrid(ctx, CHUTE, CHUTE_PAL, chPx, chX, gy - (rows.length + CHUTE.length) * chPx);
    }

    // 먼지 파티클
    for (let i = dust.length - 1; i >= 0; i--) {
      const p = dust[i];
      p.life -= dt;
      if (p.life <= 0) { dust.splice(i, 1); continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += chPx * 14 * dt;
      ctx.globalAlpha = Math.min(1, p.life * 2.2);
      ctx.fillStyle = '#cabfa6';
      const ps = Math.max(2, chPx * 0.6);
      ctx.fillRect(p.x, p.y, ps, ps);
    }
    ctx.globalAlpha = 1;

    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      removeEventListener('keydown', onKeyDown);
      removeEventListener('keyup', onKeyUp);
      removeEventListener('blur', onBlur);
      removeEventListener('resize', layout);
    },
    walkTo(key) {
      if (intro) return;
      autoTarget = wrapA(-BUILDING_ANGLE[key]);
    },
    setControl(name, on) {
      if (on) held.add(name);
      else held.delete(name);
    },
  };
}
