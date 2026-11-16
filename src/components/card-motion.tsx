'use client';

import { useEffect } from 'react';

/**
 * Tilts any `.tilt` card toward the mouse and moves its light (sets --rx, --ry, --lx, --ly).
 * Bigger cards tilt less. Mouse only; touch screens and reduced motion keep cards still.
 */
export function CardMotion() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let current: HTMLElement | null = null;
    let frame = 0;
    const reset = (el: HTMLElement) => {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = (e.target as Element | null)?.closest?.('.tilt') as HTMLElement | null;
        if (current && current !== el) reset(current);
        current = el;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const max = 12 * Math.min(1, 420 / r.width);
        el.classList.add('is-tilting');
        el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(x * max * 1.2).toFixed(2)}deg`);
        el.style.setProperty('--lx', `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--ly', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const onLeave = () => { if (current) reset(current); current = null; };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
