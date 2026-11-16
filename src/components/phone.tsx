import type { ReactNode } from 'react';

import { Icon, LogoMark, Ridges } from '@/components/ui';
import { PACKAGES, carPrice, formatPKR } from '@/content/site';

/*
 * App screens drawn in HTML so they stay crisp at any size. They show the product, so they are
 * decorative to screen readers; the page text says the same things. Names are sample data.
 */

export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`} aria-hidden>
      <div className="phone__screen">{children}</div>
    </div>
  );
}

/** The Home screen (returning guest). */
export function HomeScreen() {
  return (
    <div className="screen">
      <Ridges />
      <div className="phone__row">
        <span className="screen__brand"><LogoMark size={26} /> hamrah</span>
        <span className="phone__bell glass"><Icon name="bell" size={18} /></span>
      </div>
      <div className="rel">
        <p className="muted" style={{ fontSize: 11, fontWeight: 500 }}>Welcome</p>
        <p className="screen__name">Ayesha Khan</p>
      </div>
      <div className="phone__card glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="phone__title">Full Skardu tour</p>
            <p className="muted" style={{ fontSize: 12 }}>Sat 16 Jan · with Ali Hassan</p>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>2 new messages from Ali</p>
          </div>
          <span style={{ transform: 'rotate(-90deg)', color: 'var(--text-2)' }}><Icon name="chevron" size={18} /></span>
        </div>
      </div>
      <div className="phone__card glass" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600 }}>Plan another trip</p>
          <p className="muted" style={{ fontSize: 10.5 }}>Fixed price, met at Skardu arrivals</p>
        </div>
        <span className="screen__pill">Book</span>
      </div>
      <div className="rel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
        <p className="screen__h">Explore packages</p>
        <p style={{ fontSize: 11, fontWeight: 600 }}>See all</p>
      </div>
      <div className="rel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[['Transfer', 'Airport to hotel', 'PKR 3,500'], ['1 day', 'Shigar day trip', 'PKR 11,000']].map(([l, t, p]) => (
          <div key={t} className="card" style={{ padding: 12, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 6, minHeight: 112 }}>
            <span className="label" style={{ fontSize: 9 }}>{l}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, lineHeight: 1.25 }}>{t}</p>
            <p className="muted" style={{ fontSize: 10.5, fontWeight: 600, marginTop: 'auto' }}>From {p}</p>
          </div>
        ))}
      </div>
      <Dock active={0} />
    </div>
  );
}

function Dock({ active }: { active: number }) {
  const icons = ['calendarAdd', 'group', 'map', 'person'] as const;
  return (
    <div className="phone__dock glass">
      {icons.map((n, i) => (i === active ? <span key={n} className="phone__lens"><Icon name={n} size={20} /></span> : <Icon key={n} name={n} size={20} color="var(--text-2)" />))}
    </div>
  );
}

const TOUR = PACKAGES.find((p) => p.slug === 'full-skardu')!;
const TOTAL = carPrice(TOUR);
const DEPOSIT = TOTAL * 0.1;
const HALF = (TOTAL - DEPOSIT) / 2;

function Top({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <div className="screen__top">
      {back ? <span className="screen__back glass"><Icon name="chevron" size={18} /></span> : null}
      <p className="screen__h">{title}</p>
    </div>
  );
}

/** Step 1: choose a trip and a vehicle. */
export function TripScreen() {
  return (
    <div className="screen">
      <Top title="Book a trip" />
      <div className="screen__field glass"><span className="muted">Arriving</span><b>Sat 16 Jan · PK 451</b></div>
      <p className="screen__sub">Trip</p>
      <div className="screen__list">
        {PACKAGES.slice(1, 4).map((p) => (
          <div key={p.slug} className={`screen__opt${p.slug === 'full-skardu' ? ' is-on' : ''}`}>
            <span className="screen__radio" />
            <span style={{ flex: 1 }}>{p.title}</span>
            <span className="muted">{p.label}</span>
          </div>
        ))}
      </div>
      <p className="screen__sub">Vehicle</p>
      <div className="screen__chips">
        <span className="is-on">Car · 3</span><span>Prado · 5</span><span>Van · 10</span>
      </div>
      <div className="screen__total">
        <div><p className="muted" style={{ fontSize: 11 }}>Fixed price</p><p className="screen__price">{formatPKR(TOTAL)}</p></div>
        <span className="screen__pill">Continue</span>
      </div>
    </div>
  );
}

/** Step 2: pay the 10% deposit. */
export function DepositScreen() {
  return (
    <div className="screen">
      <Top title="Pay the deposit" />
      <div className="screen__hero glass">
        <p className="muted" style={{ fontSize: 11 }}>10% to confirm your dates</p>
        <p className="screen__amount">{formatPKR(DEPOSIT)}</p>
        <p className="muted" style={{ fontSize: 11 }}>The rest is paid in cash to your driver</p>
      </div>
      <p className="screen__sub">Pay with</p>
      <div className="screen__list">
        {['JazzCash', 'Easypaisa', 'Bank transfer'].map((m, i) => (
          <div key={m} className={`screen__opt${i === 0 ? ' is-on' : ''}`}><span className="screen__radio" /><span>{m}</span></div>
        ))}
      </div>
      <div className="screen__field glass"><Icon name="check" size={16} color="var(--accent)" /><b>Screenshot shared</b></div>
      <div className="screen__status"><span className="screen__dot" />Our team is checking your deposit</div>
    </div>
  );
}

/** Step 3: the driver is waiting at arrivals. */
export function ArrivalScreen() {
  return (
    <div className="screen">
      <Top title="Your driver is here" back={false} />
      <div className="screen__board"><span>AYESHA KHAN</span><small>Hamrah</small></div>
      <div className="phone__card glass" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <span className="screen__avatar">AH</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600 }}>Ali Hassan</p>
          <p className="muted" style={{ fontSize: 11 }}>Verified · English and Urdu</p>
        </div>
        <span className="screen__icon glass"><Icon name="chat" size={16} /></span>
      </div>
      <div className="screen__field glass"><span className="muted">Arrivals hall</span><b>Skardu Airport</b></div>
      <div className="screen__total">
        <div><p className="muted" style={{ fontSize: 11 }}>Cash at pickup</p><p className="screen__price">{formatPKR(HALF)}</p></div>
        <span className="screen__pill screen__pill--quiet">Receipt in app</span>
      </div>
    </div>
  );
}

export const STEP_SCREENS = [TripScreen, DepositScreen, ArrivalScreen];
export const SAMPLE = { tour: TOUR, total: TOTAL, deposit: DEPOSIT, half: HALF };
