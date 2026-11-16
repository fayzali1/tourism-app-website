import type { CSSProperties } from 'react';

import { CardCarousel } from '@/components/card-carousel';
import { HowItWorks } from '@/components/how-it-works';
import { HomeScreen, PhoneFrame, SAMPLE } from '@/components/phone';
import { FrontRidge, Scene } from '@/components/scene';
import { TripCard } from '@/components/trip-card';
import { CheckList, CtaPanel, Icon, StoreButtons, TextLink, Value } from '@/components/ui';
import { GUARANTEES, HOME_FAQ, HOW_IT_WORKS, PACKAGES, SITE, STANDARDS, formatPKR } from '@/content/site';

const TRUST = [
  { icon: 'shield', text: 'Verified local drivers', sub: 'Licence, papers and a test drive with our team' },
  { icon: 'cash', text: 'Fixed price before you land', sub: 'No haggling at the airport' },
  { icon: 'car', text: 'A backup vehicle', sub: 'If a vehicle breaks down, we send another' },
  { icon: 'chat', text: 'Support on WhatsApp', sub: 'Our team can step in at any time' },
] as const;

// what each step involves, shown under it
const STEP_DETAILS = [
  ['Car, 3 guests', 'Prado or jeep, 5 guests', 'Van, 10 guests'],
  ['JazzCash', 'Easypaisa', 'Bank transfer'],
  ['Your name on a board', 'Cash to your driver', 'Receipt in the app'],
];

// the most complete trip leads the grid
const ORDERED = [...PACKAGES].sort((a, b) => (a.slug === 'full-skardu' ? -1 : b.slug === 'full-skardu' ? 1 : 0));

const HEADLINE = 'Your driver is waiting at Skardu arrivals.';
const i = (n: number) => ({ '--i': n }) as CSSProperties;

const PAY = [
  { when: 'When you book', what: '10% deposit', how: 'JazzCash, Easypaisa or bank transfer. Our team checks it by hand.', amount: SAMPLE.deposit },
  { when: 'At pickup', what: 'Half the rest, in cash', how: 'Day trips and transfers are paid in full at pickup.', amount: SAMPLE.half },
  { when: 'On the last day', what: 'The other half, in cash', how: 'Your driver confirms it and you get a receipt in the app.', amount: SAMPLE.half },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* ---------- hero: dawn over the Karakoram, the app rising from behind the ridge ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <Scene tone="dawn" stars front={false} className="hero__scene" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title" className="display hero__title">
              {HEADLINE.split(' ').map((w, n) => <span key={n} className="word" style={i(n)}>{w} </span>)}
            </h1>
            <p className="lead hero__in" style={i(8)}>Book a vetted local driver at a fixed price, before you land. A company stands behind every trip, with a backup vehicle and support if anything goes wrong.</p>
            <div className="hero__in" style={i(10)}><StoreButtons /></div>
          </div>
          <div className="hero__phone"><PhoneFrame><HomeScreen /></PhoneFrame></div>
        </div>
        <FrontRidge />
        <div className="container hero__trust">
          <ul className="glass" aria-label="Why Hamrah">
            {TRUST.map((t) => (
              <li key={t.text}>
                <span className="tile"><Icon name={t.icon} size={22} color="var(--accent)" /></span>
                <span><b>{t.text}</b><small>{t.sub}</small></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- how it works: the phone follows the steps ---------- */}
      <section id="how-it-works" className="container section" aria-labelledby="how-title">
        <div className="intro">
          <h2 id="how-title" className="h2">Booked before you land</h2>
          <p className="lead">Three steps in the app. No haggling at the airport, no strangers on trust.</p>
        </div>
        <HowItWorks steps={HOW_IT_WORKS} details={STEP_DETAILS} />
      </section>

      {/* ---------- packages ---------- */}
      <section className="container section" aria-labelledby="trips-title">
        <div className="intro intro--row">
          <div>
            <h2 id="trips-title" className="h2">Trips from Skardu Airport</h2>
            <p className="lead">Fixed prices for a car with a driver. The app shows every price before you pay.</p>
          </div>
          <TextLink href="/packages/">All packages</TextLink>
        </div>
        <ul className="trips">
          {ORDERED.map((p, n) => (
            <li key={p.slug} className={n === 0 ? 'trips__lead' : undefined}><TripCard p={p} lead={n === 0} /></li>
          ))}
        </ul>
      </section>

      {/* ---------- the company behind the driver ---------- */}
      <section className="container section split" aria-labelledby="trust-title">
        <div className="stack" style={{ gap: 32 }}>
          <div className="intro" style={{ marginBottom: 0 }}>
            <h2 id="trust-title" className="h2">A company stands behind every driver</h2>
            <p className="lead">At the airport you pick a stranger on trust. With Hamrah, we vet every driver and answer for every trip.</p>
          </div>
          <TextLink href="/drivers/">How we check our drivers</TextLink>
        </div>
        <div className="credential-wrap">
        <div className="credential glass tilt beam">
          <div className="credential__top">
            <span className="credential__seal"><Icon name="shield" size={22} /></span>
            <div>
              <h3 className="h3">Every Hamrah driver</h3>
              <p className="muted small">Checked by our team before the first trip</p>
            </div>
          </div>
          <CheckList items={STANDARDS} />
        </div>
        </div>
      </section>
      <div className="container">
        <CardCarousel items={GUARANTEES} label="Our guarantees" />
      </div>

      {/* ---------- money: when you pay what ---------- */}
      <section className="container section" aria-labelledby="money-title">
        <div className="intro">
          <h2 id="money-title" className="h2">Clear about money</h2>
          <p className="lead">You always know what you pay, to whom and when. Here is the {SAMPLE.tour.title.toLowerCase()} by car.</p>
        </div>
        <ol className="pay">
          {PAY.map((s) => (
            <li key={s.when} className="pay__step">
              <span className="pay__node" aria-hidden />
              <p className="pay__when">{s.when}</p>
              <p className="pay__amount">{formatPKR(s.amount)}</p>
              <p className="pay__what">{s.what}</p>
              <p className="pay__how">{s.how}</p>
            </li>
          ))}
        </ol>
        <div className="pay__foot">
          <p><span className="muted">Total, fixed before you book</span> <b>{formatPKR(SAMPLE.total)}</b></p>
          <p className="muted small">Flight cancelled: move to the new date or get your deposit back in full. Cancel within 48 hours of pickup and the deposit is not refunded.</p>
        </div>
      </section>

      {/* ---------- questions ---------- */}
      <section className="container section faq-split" aria-labelledby="faq-title">
        <div className="faq-split__head">
          <h2 id="faq-title" className="h2">Questions</h2>
          <p className="lead">The short answers. Everything else is in Help, or ask our team.</p>
          <TextLink href="/help/">All help topics</TextLink>
          <div className="support glass tilt">
            <span className="tile"><Icon name="chat" color="var(--accent)" /></span>
            <div>
              <p className="support__title">Talk to our team on WhatsApp</p>
              <p className="muted small"><Value v={SITE.support.whatsapp} /> · <Value v={SITE.support.hours} /></p>
            </div>
          </div>
        </div>
        <div className="faq">
          {HOME_FAQ.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary>{f.q}<Icon name="chevron" color="var(--text-2)" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaPanel />
    </div>
  );
}
