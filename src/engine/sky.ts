function hexLerp(h1: string, h2: string, f: number): string {
  const a = parseInt(h1.slice(1), 16);
  const b = parseInt(h2.slice(1), 16);
  const r = Math.round(((a >> 16) & 255) + (((b >> 16) & 255) - ((a >> 16) & 255)) * f);
  const g = Math.round(((a >> 8) & 255) + (((b >> 8) & 255) - ((a >> 8) & 255)) * f);
  const c = Math.round((a & 255) + ((b & 255) - (a & 255)) * f);
  return `rgb(${r},${g},${c})`;
}

export { hexLerp };

export interface SkyState {
  top: string;
  bottom: string;
  /** 0(밤) ~ 1(한낮) */
  light: number;
  /** 현재 시각 (시 단위 소수) */
  h: number;
}

/** 시각 → [skyTop, skyBottom, light] 키프레임 */
const SKY_K: [number, string, string, number][] = [
  [0, '#0b0e1c', '#131a2e', 0],
  [5, '#0b0e1c', '#131a2e', 0],
  [6.5, '#2a3560', '#c8707e', 0.35],
  [8, '#4a86d8', '#a8d4f0', 1],
  [16.5, '#4a86d8', '#a8d4f0', 1],
  [18, '#5a4a8a', '#f0946a', 0.45],
  [19.5, '#0b0e1c', '#131a2e', 0],
  [24, '#0b0e1c', '#131a2e', 0],
];

/** 실제 현재 시각 기준 하늘 상태 */
export function skyNow(): SkyState {
  const d = new Date();
  const h = d.getHours() + d.getMinutes() / 60;
  let i = 0;
  while (i < SKY_K.length - 2 && SKY_K[i + 1][0] <= h) i++;
  const [h0, t0, b0, l0] = SKY_K[i];
  const [h1, t1, b1, l1] = SKY_K[i + 1];
  const f = h1 === h0 ? 0 : Math.min(1, Math.max(0, (h - h0) / (h1 - h0)));
  return { top: hexLerp(t0, t1, f), bottom: hexLerp(b0, b1, f), light: l0 + (l1 - l0) * f, h };
}

export function skyLabel(light: number): string {
  return light > 0.7 ? '☼ 낮' : light > 0.15 ? '~ 노을' : '☾ 밤';
}
