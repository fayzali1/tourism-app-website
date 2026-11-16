'use client';

import { useRef } from 'react';

import { Icon } from '@/components/ui';
import type { Feature } from '@/content/site';

/** Cards on a curved track: they turn in 3D as they pass the centre. Swipe, scroll or use the arrows. */
export function CardCarousel({ items, label }: { items: Feature[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: number) => {
    const el = track.current; if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 340) + 24), behavior: 'smooth' });
  };
  return (
    <div className="flow">
      <ul ref={track} className="flow__track" aria-label={label}>
        {items.map((it, i) => (
          <li key={it.title} className="glass flow__card">
            <div className="deck__top">
              <span className="deck__icon"><Icon name={it.icon} size={26} /></span>
              <span className="deck__num">{i + 1}</span>
            </div>
            <h3 className="deck__title">{it.title}</h3>
            <p className="muted">{it.body}</p>
          </li>
        ))}
      </ul>
      <div className="flow__ctl">
        <button type="button" className="btn btn--glass glass btn--small deck__prev" onClick={() => step(-1)} aria-label="Previous"><Icon name="arrow" size={18} /></button>
        <button type="button" className="btn btn--glass glass btn--small" onClick={() => step(1)} aria-label="Next"><Icon name="arrow" size={18} /></button>
      </div>
    </div>
  );
}
