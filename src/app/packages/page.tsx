import type { Metadata } from 'next';

import { CheckList, CtaPanel, Icon, PackageCardLarge, PageHeader, PriceTable, SectionHead } from '@/components/ui';
import { INCLUDED, PACKAGES } from '@/content/site';

export const metadata: Metadata = {
  title: 'Packages and prices',
  description: 'Airport transfers, day trips and tours from Skardu Airport with a vetted local driver, at fixed prices. Book in the Hamrah app.',
};

export default function PackagesPage() {
  return (
    <>
      <PageHeader title="Trips from Skardu Airport" lead="Every trip starts at arrivals with your driver and a name board. Prices are fixed and include the driver; the app shows the final price before you pay." />
      <section className="container" aria-label="Packages">
        <div className="grid grid--2">
          {PACKAGES.map((p) => <PackageCardLarge key={p.slug} p={p} />)}
          <article className="glass tilt pkg-lg">
            <span className="tile"><Icon name="chat" color="var(--accent)" /></span>
            <h3 style={{ fontSize: 24 }}>Want something else?</h3>
            <p className="muted">Tell us your plan on WhatsApp. If it fits a driver and a vehicle, we set it up in the app for you.</p>
          </article>
        </div>
      </section>
      <section className="container section--tight">
        <SectionHead title="Prices by vehicle" lead="Choose the vehicle in the app after you pick your trip. Every price includes the driver." />
        <PriceTable />
      </section>
      <section className="container section--tight split">
        <SectionHead title="Always included" lead="Whatever you book, these come with it." />
        <div className="glass tilt pad-lg"><CheckList items={INCLUDED} /></div>
      </section>
      <CtaPanel />
    </>
  );
}
