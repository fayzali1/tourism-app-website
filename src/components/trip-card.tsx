import Link from 'next/link';

import { TripArt } from '@/components/scene';
import { Icon } from '@/components/ui';
import { carPrice, formatPKR, unitLabel, type Package } from '@/content/site';

/** Homepage trip card. `lead` is the large one. */
export function TripCard({ p, lead = false }: { p: Package; lead?: boolean }) {
  const duration = p.transfer ? null : p.days;
  return (
    <Link href={`/packages/${p.slug}/`} className={`trip${lead ? ' trip--lead' : ''}`}>
      <TripArt slug={p.slug} />
      <div className="trip__top">
        <p className="trip__len">
          {duration ? <><b>{duration}</b><span>{duration === 1 ? 'day' : 'days'}</span></> : <><Icon name="landing" size={lead ? 40 : 30} /><span>Transfer</span></>}
        </p>
        <span className="trip__go"><Icon name="arrow" size={20} /></span>
      </div>
      <div className="trip__body">
        {p.summerOnly ? <span className="trip__note">June to September</span> : p.tag ? <span className="trip__note">{p.tag}</span> : null}
        <h3 className="trip__title">{p.title}</h3>
        {lead ? <p className="trip__summary">{p.summary}</p> : null}
        <p className="trip__price"><b>From {formatPKR(carPrice(p))}</b><span>Car, {unitLabel(p)}</span></p>
      </div>
    </Link>
  );
}
