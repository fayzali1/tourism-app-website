import type { Metadata } from 'next';

import { CardDeck } from '@/components/card-deck';
import { CheckList, CtaPanel, Icon, PageHeader, SectionHead, TextLink } from '@/components/ui';
import { STANDARDS, type Step } from '@/content/site';

export const metadata: Metadata = {
  title: 'Our drivers',
  description: 'Every Hamrah driver is from Baltistan and checked by our team: documents, a meeting and test drive, and a signed agreement with a security deposit.',
};

const CHECKS: Step[] = [
  { icon: 'shield', title: 'Documents', body: 'Driving licence, vehicle registration and CNIC, checked by our team.' },
  { icon: 'car', title: 'Meeting and test drive', body: 'Every driver meets us at our Skardu office and drives with us first.' },
  { icon: 'wallet', title: 'Agreement and deposit', body: 'Each driver signs an agreement and leaves a security deposit with Hamrah.' },
];

export default function DriversPage() {
  return (
    <>
      <PageHeader title="Local drivers you can trust" lead="Every Hamrah driver is from Baltistan, knows these roads, and is checked by our team before their first trip." />
      <section className="container">
        <SectionHead title="How we check every driver" lead="Nobody drives for Hamrah on trust alone." />
        <CardDeck items={CHECKS} />
      </section>
      <section className="container section--tight grid grid--2">
        <div className="glass tilt pad-lg stack" style={{ gap: 20 }}>
          <h2 className="h3" style={{ fontSize: 26 }}>Every Hamrah driver</h2>
          <CheckList items={STANDARDS} />
        </div>
        <div className="glass tilt pad-lg stack" style={{ gap: 20 }}>
          <h2 className="h3" style={{ fontSize: 26 }}>Rules that protect you</h2>
          <p className="muted">Our guarantees only work when the booking stays in the app, so drivers agree to keep it there.</p>
          <CheckList items={['No direct deals outside the app', 'No phone numbers, links or social handles in chat', 'Extra days are booked in the app only', 'Tap “Cash received” for every payment, so you get a receipt']} />
          <p style={{ fontWeight: 600 }}>Breaking these rules costs a driver their security deposit and season bonus.</p>
        </div>
      </section>
      <section className="container section--tight split">
        <SectionHead title="Rated after every trip" lead="Guests rate their driver when the trip ends. Only guests who booked and finished a trip can leave a review, and we read every one." />
        <div className="glass tilt pad-lg stack">
          <span className="tile"><Icon name="car" color="var(--accent)" /></span>
          <h2 className="h3" style={{ fontSize: 24 }}>Do you drive in Baltistan?</h2>
          <p className="muted">Steady, fair work with guests who booked before they land.</p>
          <TextLink href="/drive/">Drive with Hamrah</TextLink>
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
