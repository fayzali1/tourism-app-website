import Link from 'next/link';
import type { ReactNode } from 'react';

import { ICON_PATHS } from '@/components/icon-paths';
import { Scene, TripArt } from '@/components/scene';
import {
  SITE, VEHICLES, carPrice, formatPKR, isTbd, priceFor, unitLabel,
  type Feature, type IconName, type Package, type Step, type Tbd,
} from '@/content/site';

/** Material Symbols icon. Decorative by default; pass `label` when it carries meaning on its own. */
export function Icon({ name, size = 24, color = 'currentColor', label }: { name: IconName; size?: number; color?: string; label?: string }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 960 960" fill={color} {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

/** The app's three Karakoram ridges, stretched along the bottom of a section. */
export function Ridges() {
  return (
    <svg className="ridges" viewBox="0 0 1440 340" preserveAspectRatio="none" aria-hidden>
      <path fill="var(--ridge-far)" d="M0 115 L148 92 L288 102 L443 55 L554 77 L724 6 L857 46 L967 34 L1108 71 L1248 52 L1440 83 V340 H0Z" />
      <path fill="var(--ridge-mid)" d="M0 162 L222 136 L384 148 L591 117 L775 145 L923 129 L1108 153 L1292 137 L1440 147 V340 H0Z" />
      <path fill="var(--ridge-front)" d="M0 205 L258 187 L480 197 L738 177 L997 195 L1218 186 L1440 195 V340 H0Z" />
    </svg>
  );
}

// eight-pointed star from Balti woodcarving (as in the app's logo)
const STAR = Array.from({ length: 16 }, (_, k) => {
  const a = (Math.PI / 8) * k - Math.PI / 2;
  const r = k % 2 ? 3.4 : 6.5;
  return `${(33 + r * Math.cos(a)).toFixed(2)},${(13 + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="hamrah-tile" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#1D2C5E" />
          <stop offset="0.65" stopColor="#7A4A7E" />
          <stop offset="1" stopColor="#FF9C66" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#hamrah-tile)" />
      <path d="M6 38 L17 22 L23 30 L28 24 L42 38" stroke="#F5F9FC" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polygon points={STAR} fill="#F6C453" />
    </svg>
  );
}

export function Lockup() {
  return (
    <Link href="/" className="lockup" aria-label="Hamrah, home">
      <LogoMark />
      <span>hamrah</span>
    </Link>
  );
}

/** A value the owner still has to decide renders as a gold placeholder; numbers as PKR. */
export function Value({ v }: { v: number | string | Tbd }) {
  if (isTbd(v)) return <span className="tbd">[{v.tbd}]</span>;
  return <>{typeof v === 'number' ? formatPKR(v) : v}</>;
}

/**
 * The site's one action: get the app. Until the apps are published the buttons say "Coming soon"
 * and aren't links, so nobody lands on a dead store page.
 */
export function StoreButtons({ center }: { center?: boolean }) {
  const btn = (href: string | null, label: string, primary: boolean) =>
    href ? (
      <a className={`btn ${primary ? 'btn--primary' : 'btn--glass glass'}`} href={href}>
        {label}
        <Icon name="arrow" size={18} />
      </a>
    ) : (
      <span className={`btn ${primary ? 'btn--primary' : 'btn--glass glass'}`} aria-disabled="true">
        {label}
        <span className="soon">Coming soon</span>
      </span>
    );
  return (
    <div className="btn-row" style={center ? { justifyContent: 'center' } : undefined}>
      {btn(SITE.stores.ios, 'Get it for iPhone', true)}
      {btn(SITE.stores.android, 'Get it for Android', false)}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <Icon name="arrow" size={16} />
    </Link>
  );
}

export function SectionHead({ title, lead, link }: { title: string; lead?: string; link?: { href: string; label: string } }) {
  if (link) {
    return (
      <div className="section-head section-head--row">
        <div>
          <h2 className="h2">{title}</h2>
          {lead ? <p className="lead">{lead}</p> : null}
        </div>
        <TextLink href={link.href}>{link.label}</TextLink>
      </div>
    );
  }
  return (
    <div className="section-head">
      <h2 className="h2">{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}

export function CheckList({ items, quiet }: { items: string[]; quiet?: boolean }) {
  return (
    <ul className={`check-list${quiet ? ' check-list--quiet' : ''}`}>
      {items.map((t) => (
        <li key={t}>
          <Icon name="check" size={20} color={quiet ? 'var(--text-2)' : 'var(--accent)'} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid grid--3">
      {steps.map((s, i) => (
        <li key={s.title} className="glass tilt pad step">
          <div className="step__top">
            <span className="tile"><Icon name={s.icon} color="var(--accent)" /></span>
            <span className="step__num" aria-hidden>{i + 1}</span>
          </div>
          <h3 className="h3">{s.title}</h3>
          <p className="muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Features({ items }: { items: Feature[] }) {
  return (
    <ul className="stack" style={{ gap: 28 }}>
      {items.map((f) => (
        <li key={f.title} className="feature">
          <span className="tile"><Icon name={f.icon} color="var(--accent)" /></span>
          <div className="stack" style={{ gap: 4 }}>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Small package card for the homepage row. */
export function PackageCard({ p }: { p: Package }) {
  return (
    <Link href={`/packages/${p.slug}/`} className="card pkg">
      <span className="label">{p.label}</span>
      <h3 style={{ fontSize: 20, lineHeight: 1.3 }}>{p.title}</h3>
      <p className="pkg__price">From {formatPKR(carPrice(p))}</p>
      <p className="muted small">Car, {unitLabel(p)}</p>
    </Link>
  );
}

/** Large package card for the Packages page. */
export function PackageCardLarge({ p }: { p: Package }) {
  return (
    <article className="card pkg-lg">
      <div className="pkg-lg__art"><TripArt slug={p.slug} fit="meet" /></div>
      <div className="pkg-lg__top">
        <span className="label">{p.summerOnly ? `${p.label} · Summer only` : p.label}</span>
        {p.tag ? <span className="tag">{p.tag}</span> : null}
      </div>
      <h3 style={{ fontSize: 28, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{p.title}</h3>
      <p className="muted">{p.summary}</p>
      <div className="pkg-lg__foot">
        <div>
          <p style={{ fontWeight: 700, fontSize: 20 }}>From {formatPKR(carPrice(p))}</p>
          <p className="muted small">Car, {unitLabel(p)}</p>
        </div>
        <TextLink href={`/packages/${p.slug}/`}>See details</TextLink>
      </div>
    </article>
  );
}

/** Prices by vehicle; with `pkg`, prices for that trip. */
export function PriceTable({ pkg }: { pkg?: Package }) {
  return (
    <div className="glass table-wrap">
      <table className={pkg ? 'table' : 'table table--wide'}>
        <thead>
          <tr>
            <th scope="col">Vehicle</th>
            <th scope="col">Seats</th>
            {pkg ? <th scope="col">{pkg.transfer ? 'Transfer' : pkg.days === 1 ? '1 day' : `${pkg.days} days`}</th> : (
              <>
                <th scope="col">Per day</th>
                <th scope="col">Airport transfer</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {VEHICLES.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>Up to {v.seats}</td>
              {pkg ? <td><Value v={priceFor(pkg, v)} /></td> : (
                <>
                  <td><Value v={v.perDay} /></td>
                  <td><Value v={v.transfer} /></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Big title over the Karakoram ridges: the inner pages' version of the hero. */
export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <header className="ridged">
      <Scene tone="dusk" />
      <div className="container">
        <div className="page-head">
          <h1 className="h1">{title}</h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {children}
        </div>
      </div>
    </header>
  );
}

export function CtaPanel({ title = 'Your Skardu trip starts in the app', lead = 'Pick your trip, pay the deposit and chat with your driver before you fly.', children }: { title?: string; lead?: string; children?: ReactNode }) {
  return (
    // id="get-the-app": every page's "Get the app" button scrolls here
    <section id="get-the-app" className="cta" aria-labelledby="cta-title">
      <Scene tone="gold" stars className="cta__scene" />
      <div className="container cta__inner">
        <LogoMark size={56} />
        <h2 id="cta-title" className="display cta__title">{title}</h2>
        <p className="lead">{lead}</p>
        {children ?? <StoreButtons center />}
      </div>
    </section>
  );
}
