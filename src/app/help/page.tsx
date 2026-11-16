import type { Metadata } from 'next';

import { CtaPanel, Icon, PageHeader, Value } from '@/components/ui';
import { FAQ_GROUPS, SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'Help',
  description: 'Answers about booking, payments, meeting your driver at Skardu Airport, changes and cancelling. Support on WhatsApp.',
};

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Help" lead="Answers to the questions guests ask most. Still stuck? Message our team on WhatsApp." />
      <section className="container" aria-label="Support">
        <div className="glass pad" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span className="tile"><Icon name="chat" color="var(--accent)" /></span>
          <div className="stack" style={{ gap: 6, flex: '1 1 320px' }}>
            <h2 className="h3" style={{ fontSize: 24 }}>Support on WhatsApp</h2>
            <p style={{ fontWeight: 600 }}><Value v={SITE.support.whatsapp} /> · <Value v={SITE.support.hours} /></p>
            <p className="muted small">WhatsApp is only for our support team. You talk to your driver in the app chat.</p>
          </div>
          <span className="btn btn--primary" aria-disabled="true">Message us <span className="soon">Number coming soon</span></span>
        </div>
      </section>
      {FAQ_GROUPS.map((g) => (
        <section key={g.title} className="container section--tight" aria-labelledby={`help-${g.title}`}>
          <h2 id={`help-${g.title}`} className="h2" style={{ fontSize: 30, marginBottom: 20 }}>{g.title}</h2>
          <div className="stack" style={{ gap: 12 }}>
            {g.items.map((i) => (
              <div key={i.q} className="glass qa">
                <h3>{i.q}</h3>
                <p>{i.a}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
      <CtaPanel />
    </>
  );
}
