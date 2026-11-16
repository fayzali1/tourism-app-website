'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/** Runs before the page paints (inlined in layout.tsx): stored choice, otherwise the system setting. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/** Sun and moon switch. Follows the system until the visitor picks, then remembers the pick. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(read());
    const mq = matchMedia('(prefers-color-scheme: light)');
    const onSystem = () => {
      let stored: string | null = null;
      try { stored = localStorage.getItem('theme'); } catch { /* storage blocked: keep following the system */ }
      if (stored) return;
      const next: Theme = mq.matches ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mq.addEventListener('change', onSystem);
    return () => mq.removeEventListener('change', onSystem);
  }, []);

  const toggle = () => {
    const next: Theme = read() === 'light' ? 'dark' : 'light';
    const apply = () => { document.documentElement.dataset.theme = next; };
    // a short crossfade between themes where supported; instant otherwise or with reduced motion
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) doc.startViewTransition(apply);
    else apply();
    try { localStorage.setItem('theme', next); } catch { /* storage blocked: the switch still works for this visit */ }
    setTheme(next);
  };

  const light = theme === 'light';
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'} title={light ? 'Dark mode' : 'Light mode'}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        {light ? (
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" strokeLinejoin="round" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
          </>
        )}
      </svg>
    </button>
  );
}
