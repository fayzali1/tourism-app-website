import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CheckList, CtaPanel, PriceTable, Ridges, SectionHead, Steps, StoreButtons } from '@/components/ui';
import { INCLUDED, PACKAGES, carPrice, formatPKR, unitLabel, type Step } from '@/content/site';

// one static page per package; no others exist
export const dynamicParams = false;
export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/packages/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = PACKAGES.find((x) => x.slug === slug);
  return p ? { title: p.title, description: `${p.summary} From ${formatPKR(carPrice(p))} by car. Book in the Hamrah app.` } : {};
}

export default async function PackagePage({ params }: PageProps<'/packages/[slug]'>) {
  const { slug } = await params;
  const p = PACKAGES.find((x) => x.slug === slug);
  if (!p) notFound();

  // what a booking by car costs and when it's paid: 10% deposit, then cash (half and half on multi-day trips)
  const total = carPrice(p);
  const deposit = Math.round(total * 0.1);
  const cash = total - deposit;
  const multiDay = p.days > 1;
  const half = Math.round(cash / 2);
  const steps: Step[] = multiDay
    ? [
        { icon: 'map', title: 'You plan the stops', body: p.stops ?? p.summary },
        { icon: 'car', title: 'Same driver every day', body: `Your driver collects you each morning and stays with you for all ${p.days} days.` },
        { icon: 'refund', title: 'Add days in the app', body: 'Want to stay longer? Add extra days in the app with the same driver and vehicle.' },
      ]
    : [
        { icon: 'landing', title: 'Met at arrivals', body: 'Your driver waits in the Skardu Airport arrivals hall with your name on a board.' },
        { icon: 'map', title: p.transfer ? 'Straight to your hotel' : 'Your day, your pace', body: p.transfer ? 'Your driver takes you and your luggage to your hotel in Skardu.' : (p.stops ?? p.summary) },
        { icon: 'cash', title: 'Paid at pickup', body: 'Pay the rest in cash to your driver at pickup, and get a receipt in the app.' },
      ];

  return (
    <>
      <header className="ridged">
        <Ridges />
        <div className="container split" style={{ paddingTop: 40, alignItems: 'center' }}>
          <div className="stack" style={{ gap: 22 }}>
            <nav aria-label="Breadcrumb" className="small muted" style={{ display: 'flex', gap: 8 }}>
              <Link href="/packages/">Packages</Link><span aria-hidden>/</span><span aria-current="page" style={{ color: 'var(--text)', fontWeight: 600 }}>{p.title}</span>
            </nav>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="label">{p.summerOnly ? `${p.label} · Summer only` : p.label}</span>
              {p.tag ? <span className="tag">{p.tag}</span> : null}
            </div>
            <h1 className="h1">{p.title}</h1>
            <p className="lead">{p.summary}</p>
            <p style={{ fontWeight: 700, fontSize: 22 }}>From {formatPKR(total)} <span className="muted" style={{ fontWeight: 500, fontSize: 16 }}>by car, {unitLabel(p)}</span></p>
            <StoreButtons />
          </div>
          <aside className="glass tilt beam pad-lg stack" style={{ gap: 18 }} aria-label="What you pay">
            <h2 className="h3">What you pay, by car</h2>
            <div className="money-lines">
              <div className="total"><span>{p.transfer ? 'Transfer' : `Trip total, ${p.days === 1 ? '1 day' : `${p.days} days × ${formatPKR(11000)}`}`}</span><span>{formatPKR(total)}</span></div>
              <div><span>10% deposit, to book in the app</span><span>{formatPKR(deposit)}</span></div>
              {multiDay ? (
                <>
                  <div><span>Cash to your driver at pickup</span><span>{formatPKR(half)}</span></div>
                  <div><span>Cash to your driver on the last day</span><span>{formatPKR(cash - half)}</span></div>
                </>
              ) : (
                <div><span>Cash to your driver at pickup</span><span>{formatPKR(cash)}</span></div>
              )}
            </div>
            <p className="small muted" style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16 }}>You get a receipt in the app for every payment.</p>
          </aside>
        </div>
      </header>

      <section className="container">
        <SectionHead title={multiDay ? `How the ${p.days} days work` : 'How it works'} lead={multiDay ? 'One driver, one vehicle, your plan.' : undefined} />
        <Steps steps={steps} />
      </section>
      <section className="container section--tight">
        <SectionHead title="Prices for this trip" lead="With the driver. Choose the vehicle in the app." />
        <PriceTable pkg={p} />
      </section>
      <section className="container section--tight split">
        <SectionHead title="Included in the price" />
        <div className="glass tilt pad-lg"><CheckList items={INCLUDED} /></div>
      </section>
      <CtaPanel title={`Book the ${p.title} in the app`} lead="Pick your dates and vehicle, pay the 10% deposit, and your driver is confirmed before you fly." />
    </>
  );
}
