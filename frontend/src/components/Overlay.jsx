import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { journey, subscribe, jumpTo, N } from '../journey';
import { SECTIONS } from '../mock';

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="2.5" width="17" height="19" rx="5.5" stroke="#f4f2f0" strokeWidth="1.4" />
      <rect x="7.5" y="6.5" width="9" height="11" rx="4.5" stroke="#f4f2f0" strokeWidth="1.4" />
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .35s ease' }}
    >
      <path d="M2 7.5 L6 3.5 L10 7.5" stroke="#f4f2f0" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export default function Overlay() {
  const [section, setSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const fillRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => subscribe((j) => setSection(j.section)), []);

  useEffect(() => {
    let raf;
    const loop = () => {
      if (fillRef.current) fillRef.current.style.height = `${journey.offset * 100}%`;
      if (hintRef.current) {
        const hide = journey.offset > 0.008;
        hintRef.current.classList.toggle('hidden', hide);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="hud">
      <header className="topbar">
        <div className="brand">
          <Logo />
          <span>Daniel (Dunga) Dungyov</span>
        </div>
        <div className="status">portfolio — 2k26</div>
      </header>

      <div className="progress">
        <div className="fill" ref={fillRef} />
      </div>

      <div className="hint" ref={hintRef}>
        <span>scroll to fly</span>
        <div className="line" />
      </div>

      <div className="switcher">
        {menuOpen && (
          <ul className="menu">
            {SECTIONS.map((s, i) => (
              <li key={s}>
                <button
                  className={i === section ? 'active' : ''}
                  onClick={() => {
                    jumpTo(i);
                    setMenuOpen(false);
                  }}
                >
                  <em>{String(i + 1).padStart(2, '0')}</em> {s}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="current" onClick={() => setMenuOpen((o) => !o)}>
          <span className="lbl">section</span>
          <span className="name">{SECTIONS[section]}</span>
          <Chevron open={menuOpen} />
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Loader — DUNGA + percentage, gates the flight until ready
// ------------------------------------------------------------------
export function Loader() {
  const { progress } = useProgress();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const start = useRef(performance.now());
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    let raf;
    const loop = () => {
      const elapsed = performance.now() - start.current;
      const ramp = Math.min(100, (elapsed / 1500) * 100);
      const cap = progressRef.current >= 100 ? 100 : 86;
      const value = Math.min(ramp, cap);
      setPct((p) => Math.max(p, Math.round(value)));
      if (value >= 100) {
        setDone(true);
        journey.ready = true;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`loader ${done ? 'done' : ''}`}>
      <div className="word">DUNGA</div>
      <div className="pct">{pct}%</div>
    </div>
  );
}
