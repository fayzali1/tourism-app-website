import type { Metadata } from 'next';

import { CheckList, CtaPanel, Icon, PageHeader, SectionHead, Steps, StoreButtons } from '@/components/ui';
import type { Feature, Step } from '@/content/site';

export const metadata: Metadata = {
  title: 'Drive with Hamrah',
  description: 'Drive guests who booked before they land. Fixed, fair prices, cash paid to you, and a team behind every trip. Apply in the Hamrah app.',
};

const BENEFITS: Feature[] = [
  { icon: 'landing', title: 'Bookings before guests land', body: 'Job offers arrive in the app. You have 2 hours to accept each one.' },
  { icon: 'cash', title: 'Fixed, fair prices', body: 'Guests pay you in cash, half at pickup and half on the last day.' },
  { icon: 'shield', title: 'A season bonus', body: 'Finish the season with a clean record and good ratings to earn a bonus.' },
  { icon: 'chat', title: 'Our team behind you', body: 'Report a problem in the app and we step in, with a backup vehicle when needed.' },
];
const JOIN: Step[] = [
  { icon: 'map', title: 'Apply in the app', body: 'Send your details, vehicle and documents from the Hamrah app.' },
  { icon: 'car', title: 'Meet us and drive', body: 'We meet you at our Skardu office for a test drive.' },
  { icon: 'wallet', title: 'Sign and start', body: 'Sign the agreement, leave the security deposit and start taking jobs.' },
];

export default function DrivePage() {
  return (
    <>
      <PageHeader title="Drive with Hamrah" lead="Steady, fair work with guests who booked before they land. You keep driving your own vehicle; we bring the bookings and stand behind every trip.">
        <p className="hero__note" style={{ fontSize: 15 }}>Get the app, then tap “Drive with Hamrah” to apply.</p>
      </PageHeader>
      <section className="container split">
        <SectionHead title="Who we are looking for" lead="About 15 drivers for our first season." />
        <div className="glass tilt pad-lg">
          <CheckList items={['You live in Baltistan and know its roads', 'You have driven for 8 years or more', 'You speak English and Urdu', 'You own a clean, maintained car, Prado or jeep, or van', 'You have a valid licence, vehicle registration and CNIC']} />
        </div>
      </section>
      <section className="container section--tight">
        <SectionHead title="What you get" />
        <div className="grid grid--4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="glass tilt pad stack">
              <span className="tile"><Icon name={b.icon} color="var(--accent)" /></span>
              <h3 className="h3" style={{ fontSize: 19 }}>{b.title}</h3>
              <p className="muted small">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container section--tight">
        <SectionHead title="How to join" lead="Three steps, started from the app." />
        <Steps steps={JOIN} />
      </section>
      <CtaPanel title="Ready to drive with Hamrah?" lead="Get the app, tap “Drive with Hamrah” and send your application. We reply on WhatsApp at every step.">
        <StoreButtons center />
      </CtaPanel>
    </>
  );
}
