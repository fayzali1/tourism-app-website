'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui';
import type { Step } from '@/content/site';

/** A fanned deck of cards. Click it or press Next: the front card moves to the back. */
export function CardDeck({ items }: { items: Step[] }) {
  const [front, setFront] = useState(0);
  const next = () => setFront((f) => (f + 1) % items.length);
  const prev = () => setFront((f) => (f - 1 + items.length) % items.length);
  return (
    <div className="deck">
      <div className="deck__stack" onClick={next}>
        {items.map((it, i) => {
          const pos = (i - front + items.length) % items.length;
          return (
            <article key={it.title} className="glass deck__card" style={{ '--pos': pos, zIndex: items.length - pos } as React.CSSProperties} aria-hidden={pos !== 0}>
              <div className="deck__top">
                <span className="deck__icon"><Icon name={it.icon} size={26} /></span>
                <span className="deck__num">{i + 1}</span>
              </div>
              <h3 className="deck__title">{it.title}</h3>
              <p className="muted">{it.body}</p>
            </article>
          );
        })}
      </div>
      <div className="deck__ctl">
        <p className="muted" aria-live="polite">Check {front + 1} of {items.length}</p>
        <ol className="deck__list">
          {items.map((it, i) => (
            <li key={it.title}><button type="button" aria-current={i === front} onClick={() => setFront(i)}>{it.title}</button></li>
          ))}
        </ol>
        <div className="btn-row">
          <button type="button" className="btn btn--glass glass btn--small deck__prev" onClick={prev} aria-label="Previous check"><Icon name="arrow" size={18} /></button>
          <button type="button" className="btn btn--primary btn--small" onClick={next}>Next check <Icon name="arrow" size={18} /></button>
        </div>
      </div>
    </div>
  );
}
