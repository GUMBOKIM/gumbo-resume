export type Palette = Record<string, string>;
export type Grid = string[];

/** 행 길이가 다른 그리드를 '.'로 패딩해 직사각형으로 만든다 */
export function norm(rows: string[]): Grid {
  const w = Math.max(...rows.map(r => r.length));
  return rows.map(r => r.padEnd(w, '.'));
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  rows: Grid,
  pal: Palette,
  px: number,
  ox: number,
  oy: number,
  flip = false,
) {
  const W = rows[0].length;
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < W; x++) {
      const c = pal[rows[y][x]];
      if (!c) continue;
      const dx = flip ? W - 1 - x : x;
      ctx.fillStyle = c;
      ctx.fillRect(ox + dx * px, oy + y * px, px, px);
    }
  }
}

export function hash(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967296;
}

/* ---------- 검보 (후드) ---------- */
export const GUMBO_PAL: Palette = {
  D: '#1c1a20', H: '#2b2731', F: '#f6d7ae', E: '#26202a', C: '#efad84',
  W: '#f7f3ea', O: '#f08c1e', o: '#c96f12', N: '#3b4a63', T: '#2c2933',
};
export const GUMBO_IDLE = norm([
  '....DDDDDDDD....',
  '...DOOOOOOOOD...',
  '..DOOOOOOOOOOD..',
  '.DOOOOOOOOOOOOD.',
  '.DOOoooooooooOD.',
  '.DOoHHFFFFHHoOD.',
  '.DOoFFFFFFFFoOD.',
  '.DOoFFFFFFFFoOD.',
  '.DOoFEEFFEEFoOD.',
  '.DOoFEEFFEEFoOD.',
  '.DOoFCFFFFCFoOD.',
  '.DOoFFFDDFFFoOD.',
  '.DOOoFFFFFFoOOD.',
  '..DOOooooooOOD..',
  '..DOOOOOOOOOOD..',
  '.DOOOOOWWOOOOOD.',
  '.DOOOOOWWOOOOOD.',
  '.DOOODOOOODOOOD.',
  '..DFOOOOOOOOFD..',
  '..DNNNNDDNNNND..',
  '..DNNND..DNNND..',
  '..DNNND..DNNND..',
  '..DTTTD..DTTTD..',
]);
export const GUMBO_WALK_A = GUMBO_IDLE.map((r, i) =>
  i === 20 || i === 21 ? '....DNNDDNND....' : i === 22 ? '....DTTDDTTD....' : r,
);

/* ---------- 소품 ---------- */
export const TREE_PAL: Palette = { D: '#1e3117', G: '#4c9e46', L: '#6dbf5e', B: '#7a5230', b: '#5c3c21' };
export const TREE = norm([
  '....DDDD....',
  '..DDGGGGDD..',
  '.DGLLGGGGGD.',
  '.DGLGGGGGGD.',
  'DGLLGGGGGGGD',
  'DGLGGGGGGGGD',
  'DGGGGGGGGGGD',
  '.DGGGGGGGGD.',
  '..DDGGGGDD..',
  '....DbBD....',
  '....DbBD....',
  '...DDbBDD...',
]);

export const HOUSE_PAL: Palette = {
  D: '#241a14', R: '#c84a3f', r: '#e06a55', W: '#f0e0bd', w: '#d9c69a',
  B: '#7a5230', b: '#a5713a', G: '#ffd97a', g: '#b98a2e',
};
export const HOUSE = norm([
  '........DDDDDD........',
  '......DDrrrrrrDD......',
  '.....DrrrrrrrrrrD.....',
  '....DrrRRRRRRRRrrD....',
  '...DrrRRRRRRRRRRrrD...',
  '..DrrRRRRRRRRRRRRrrD..',
  '.DrrRRRRRRRRRRRRRRrrD.',
  '.DDDDDDDDDDDDDDDDDDDD.',
  '..DWWWWWWWWWWWWWWWWD..',
  '..DWGGGWWWWWWWWGGGWD..',
  '..DWGgGWWWWWWWWGgGWD..',
  '..DWGGGWWWDDWWWGGGWD..',
  '..DWWWWWWDBBDWWWWWWD..',
  '..DWWWWWWDBBDWWWWWWD..',
  '..DWWWWWWDBbDWWWWWWD..',
  '..DwwwwwwDBBDwwwwwwD..',
  '..DDDDDDDDDDDDDDDDDD..',
]);

export const OFFICE_PAL: Palette = {
  D: '#161c26', S: '#5b7fa6', s: '#48678c', Y: '#ffd97a', y: '#2c3c52', R: '#3c5470',
};
export const OFFICE = norm([
  '.DDDDDDDDDDDDDDDDDD.',
  '.DRRRRRRRRRRRRRRRRD.',
  '.DSSSSSSSSSSSSSSSSD.',
  '.DSYYSsyySsYYSsyYSD.',
  '.DSYYSsyySsYYSsyYSD.',
  '.DSSSSSSSSSSSSSSSSD.',
  '.DSyySsYYSsyySsYYSD.',
  '.DSyySsYYSsyySsYYSD.',
  '.DSSSSSSSSSSSSSSSSD.',
  '.DSYYSsYYSsyySsyySD.',
  '.DSYYSsYYSsyySsyySD.',
  '.DSSSSSSSDDDDSSSSSD.',
  '.DSSSSSSSDYYDSSSSSD.',
  '.DSSSSSSSDYYDSSSSSD.',
  '.DDDDDDDDDDDDDDDDDD.',
]);

export const LAB_PAL: Palette = {
  D: '#1a1c20', K: '#6a7280', k: '#8a93a2', O: '#f08c1e', o: '#c96f12', A: '#3a3f4a', P: '#ff5a5f',
};
export const LAB = norm([
  '.........DPD..........',
  '.........DAD..........',
  '.........DAD..........',
  '..DDDDDDDDDDDDDDDDDD..',
  '.DkkkkkkkkkkkkkkkkkkD.',
  '.DkKKKKKKKKKKKKKKKKkD.',
  '.DkKKKKKKKKKKKKKKKKkD.',
  '.DkKKDOOOOOOOOOODKKkD.',
  '.DkKKDOoOOOOOOoODKKkD.',
  '.DkKKDOOOOOOOOOODKKkD.',
  '.DkKKDOoOOOOOOoODKKkD.',
  '.DkKKDOOOOOOOOOODKKkD.',
  '.DDDDDDDDDDDDDDDDDDDD.',
]);

export const FACTORY_PAL: Palette = {
  D: '#241c14', K: '#8a7d74', k: '#a5988e', Y: '#ffd97a', O: '#f08c1e', o: '#c96f12',
};
export const FACTORY = norm([
  '....DKKD..............',
  '....DKKD..............',
  '..DDDDDDDDDDDDDDDDDD..',
  '.DkkkkkkkkkkkkkkkkkkD.',
  '.DKKKKKKKKKKKKKKKKKKD.',
  '.DKYYKKYYKKYYKKYYKKKD.',
  '.DKYYKKYYKKYYKKYYKKKD.',
  '.DKKKKKKKKKKKKKKKKKKD.',
  '.DKKKDOOOOOOOODKKKKKD.',
  '.DKKKDOoOOOOoODKKKKKD.',
  '.DKKKDOOOOOOOODKKKKKD.',
  '.DDDDDDDDDDDDDDDDDDDD.',
]);

export const MAIL_PAL: Palette = {
  D: '#241014', R: '#c84a3f', r: '#e06a55', W: '#f7f3ea', P: '#5c3c21', F: '#ffd97a',
};
export const MAILBOX = norm([
  '...DDDDDDDD...',
  '..DrrrrrrrrD..',
  '.DrRRRRRRRRrDF',
  '.DRRRRRRRRRRDF',
  '.DRRWWWWWWRRDD',
  '.DRRRRRRRRRRD.',
  '.DDDDDDDDDDDD.',
  '.....DPPD.....',
  '.....DPPD.....',
  '.....DPPD.....',
  '....DDPPDD....',
]);

export const LAMP_PAL: Palette = { D: '#1a1c20', P: '#3a3f4a', Y: '#ffd97a', y: '#f7b32b' };
export const LAMP = norm([
  '..DDD..',
  '.DYyYD.',
  '.DyYyD.',
  '.DYyYD.',
  '..DDD..',
  '...D...',
  '...D...',
  '...D...',
  '...D...',
  '..DDD..',
]);

export const FLOWER_PAL: Palette = { P: '#f78fa0', W: '#f7f3ea', Y: '#ffd97a', G: '#4c9e46' };
export const FLOWER = norm([
  '.P.',
  'PYP',
  '.P.',
  '.G.',
]);
