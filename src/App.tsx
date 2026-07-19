import { useEffect, useRef, useState } from 'react';
import { createPlanetEngine, type PlanetEngine, type ControlName } from './engine/planet';
import { skyNow, skyLabel } from './engine/sky';
import { SECTION_ORDER, type SectionKey } from './data/sections';
import SectionPanel from './components/SectionPanel';

function useClock(): string {
  const [text, setText] = useState('');
  useEffect(() => {
    const update = () => {
      const s = skyNow();
      const hh = String(Math.floor(s.h)).padStart(2, '0');
      const mm = String(Math.floor((s.h % 1) * 60)).padStart(2, '0');
      setText(`${hh}:${mm} ${skyLabel(s.light)}`);
    };
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);
  return text;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PlanetEngine | null>(null);
  const [active, setActive] = useState<SectionKey | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const clock = useClock();

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const engine = createPlanetEngine(cv, key => {
      setActive(key);
      setDismissed(false);
    });
    engineRef.current = engine;
    return () => engine.destroy();
  }, []);

  const hold = (name: ControlName) => ({
    onPointerDown: (e: React.PointerEvent) => { e.preventDefault(); engineRef.current?.setControl(name, true); },
    onPointerUp: () => engineRef.current?.setControl(name, false),
    onPointerCancel: () => engineRef.current?.setControl(name, false),
  });

  return (
    <div className="app">
      <canvas id="world" ref={canvasRef} />

      <div className="ui top-left">
        <nav className="menu" aria-label="섹션 메뉴">
          {SECTION_ORDER.map(s => (
            <button
              key={s.key}
              className={active === s.key ? 'on' : ''}
              onClick={() => engineRef.current?.walkTo(s.key)}
            >
              <span className="arr">▸ </span>{s.title}
            </button>
          ))}
        </nav>
      </div>

      <div className="ui top-right">
        <div className="clock">{clock}</div>
        <div className="hint">◀ ▶ / A D : 걷기<br />메뉴를 누르면 검보가 걸어갑니다</div>
      </div>

      {active && !dismissed && (
        <SectionPanel section={active} onClose={() => setDismissed(true)} />
      )}

      <div className="ctl left">
        <button {...hold('left')} aria-label="왼쪽으로 걷기">◀</button>
      </div>
      <div className="ctl right">
        <button {...hold('right')} aria-label="오른쪽으로 걷기">▶</button>
      </div>
    </div>
  );
}
