import React, { useEffect } from 'react';
import { CASES } from '../mock';

function useEsc(onClose) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
}

export function CaseModal({ index, onClose, onOpenVideo }) {
  const c = CASES[index];
  useEsc(onClose);
  if (!c) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="case-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="case-head">
          <span className="meta">{c.meta}</span>
          {c.badge && <span className="badge">{c.badge}</span>}
        </div>
        <h2>{c.title}</h2>
        <p className="body">{c.body}</p>

        <div className="facts">
          {c.facts.map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </div>

        {c.process && (
          <div className="process">
            <h4>Process</h4>
            <div className="chips">
              {c.process.map((p, i) => (
                <span key={i}>{p}</span>
              ))}
            </div>
          </div>
        )}

        {c.metrics && (
          <div className="metrics">
            <h4>{c.metrics.title}</h4>
            <div className="grid">
              {c.metrics.items.map((m, i) => (
                <div key={i} className="metric">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                  {m.note && <em>{m.note}</em>}
                </div>
              ))}
            </div>
          </div>
        )}

        {c.slides ? (
          <div className="slides">
            <h4>Selected screens</h4>
            <div className="strip">
              {Array.from({ length: c.slides }, (_, i) => (
                <div key={i} className="slide">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <em>MOCK SLIDE</em>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {c.note && <p className="note">{c.note}</p>}

        <div className="actions">
          {c.video && (
            <button className="act" onClick={() => onOpenVideo({ id: c.video.id, start: c.video.start })}>
              watch the talk ↗
            </button>
          )}
          {c.figma && (
            <a className="act" href={c.figma} onClick={(e) => e.preventDefault()}>
              open in figma ↗
            </a>
          )}
          {(c.links || []).map((l, i) => (
            <a key={i} className="act" href={l.href} onClick={(e) => e.preventDefault()}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VideoModal({ video, onClose }) {
  useEsc(onClose);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="frame">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?start=${video.start || 0}&autoplay=1&rel=0`}
            title="Talk video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
