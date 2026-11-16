'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Icon, Lockup } from '@/components/ui';
import { NAV } from '@/content/site';

/** Sticky frosted navigation; on phones the links fold into a menu. */
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const current = (href: string) => !href.includes('#') && path.startsWith(href);
  return (
    <nav className="nav" aria-label="Main">
      <div className="container nav__inner">
        <Lockup />
        <div className="nav__links">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="nav__link" aria-current={current(l.href) ? 'page' : undefined}>{l.label}</Link>
          ))}
        </div>
        <div className="nav__end">
          <ThemeToggle />
          <a className="btn btn--primary btn--small nav__cta" href="#get-the-app">Get the app</a>
        </div>
        <button type="button" className="nav__menu-btn" aria-expanded={open} aria-controls="nav-sheet" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
      <div id="nav-sheet" className="nav__sheet" data-open={open}>
        {NAV.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={current(l.href) ? 'page' : undefined}>{l.label}</Link>
        ))}
        <a className="btn btn--primary" href="#get-the-app" onClick={() => setOpen(false)}>Get the app</a>
      </div>
    </nav>
  );
}
