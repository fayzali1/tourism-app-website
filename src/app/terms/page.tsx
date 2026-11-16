import type { Metadata } from 'next';

import { CtaPanel, PageHeader, Value } from '@/components/ui';
import { TBD, TERMS, isTbd } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms and refunds',
  description: 'How Hamrah bookings, deposits, cash payments, cancellations and refunds work, in plain words.',
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms and refunds" lead="How bookings, payments and refunds work, in plain words.">
        <p><Value v={TBD('Full legal terms to be added before launch')} /></p>
      </PageHeader>
      <div className="container terms">
        <nav className="terms__toc" aria-label="On this page">
          <span className="label" style={{ color: 'var(--text-2)' }}>On this page</span>
          {TERMS.map((t) => <a key={t.id} href={`#${t.id}`}>{t.title}</a>)}
        </nav>
        <div className="stack">
          {TERMS.map((t) => (
            <section key={t.id} id={t.id} className="glass terms__section" aria-labelledby={`${t.id}-title`}>
              <h2 id={`${t.id}-title`} className="h3">{t.title}</h2>
              {t.paragraphs.map((p, i) => (
                <p key={i} className={isTbd(p) ? undefined : 'muted'}><Value v={p} /></p>
              ))}
            </section>
          ))}
        </div>
      </div>
      <CtaPanel />
    </>
  );
}
