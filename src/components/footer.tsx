import Link from 'next/link';

import { FOOTER_LINKS } from '@/content/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <small>© 2026 Hamrah · Skardu, Gilgit-Baltistan</small>
        <nav aria-label="Footer" className="footer__links">
          {FOOTER_LINKS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
