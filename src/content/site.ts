/**
 * Everything the website says, in one place. Wording follows the Hamrah app so the site and the app
 * promise the same things. `TBD(...)` marks a fact the owner has not decided yet: it renders as a
 * visible gold placeholder so it cannot go live unnoticed.
 */

export type Tbd = { tbd: string };
export const TBD = (label: string): Tbd => ({ tbd: label });
export const isTbd = (v: unknown): v is Tbd => typeof v === 'object' && v !== null && 'tbd' in v;

export const SITE = {
  name: 'Hamrah',
  url: 'https://hamrah.example', // [domain to be decided]
  description: 'Book a vetted local driver at Skardu Airport at a fixed price, before you land. Download the Hamrah app.',
  /** App store links: null until the apps are published (buttons show "Coming soon"). */
  stores: { ios: null as string | null, android: null as string | null },
  support: { whatsapp: TBD('Support number'), hours: TBD('Support hours') },
};

export const NAV = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/packages/', label: 'Packages' },
  { href: '/drivers/', label: 'Our drivers' },
  { href: '/help/', label: 'Help' },
];

export const FOOTER_LINKS = [
  { href: '/packages/', label: 'Packages' },
  { href: '/drivers/', label: 'Our drivers' },
  { href: '/help/', label: 'Help' },
  { href: '/terms/', label: 'Terms and refunds' },
  { href: '/drive/', label: 'Drive with Hamrah' },
  { href: '/privacy/', label: 'Privacy' },
];

export type Vehicle = { id: string; name: string; seats: number; perDay: number | Tbd; transfer: number | Tbd; icon: IconName };
export const VEHICLES: Vehicle[] = [
  { id: 'car', name: 'Car', seats: 3, perDay: 11000, transfer: 3500, icon: 'car' },
  { id: 'prado', name: 'Prado or jeep', seats: 5, perDay: TBD('Price to be set'), transfer: TBD('Price to be set'), icon: 'suv' },
  { id: 'van', name: 'Van', seats: 10, perDay: TBD('Price to be set'), transfer: TBD('Price to be set'), icon: 'van' },
];

export type Package = { slug: string; label: string; title: string; summary: string; days: number; transfer?: boolean; summerOnly?: boolean; tag?: string; stops?: string };
export const PACKAGES: Package[] = [
  { slug: 'airport-hotel', label: 'Transfer', title: 'Airport to hotel', days: 1, transfer: true, summary: 'Your driver meets you at arrivals and takes you to your hotel in Skardu.' },
  { slug: 'shigar', label: '1 day', title: 'Shigar day trip', days: 1, summary: 'Shigar Fort, the cold desert and Blind Lake, back in Skardu by evening.', stops: 'Shigar Fort, the cold desert and Blind Lake.' },
  { slug: 'skardu-khaplu', label: '3 days', title: 'Skardu and Khaplu tour', days: 3, summary: 'Skardu valley, Shigar and the Khaplu palace, with time to stop where you like.', stops: 'Skardu valley, Shigar and the Khaplu palace.' },
  { slug: 'full-skardu', label: '5 days', title: 'Full Skardu tour', days: 5, tag: 'Most complete', summary: 'Your own driver and vehicle for five days around Skardu. Plan the stops with your driver; the price stays fixed.', stops: 'Popular stops include Shigar Fort, the cold desert, Blind Lake and the Khaplu palace. Deosai opens in summer.' },
  { slug: 'deosai', label: '1 day', title: 'Deosai day trip', days: 1, summerOnly: true, summary: 'The Deosai plains and Sheosar Lake. Open in summer only, June to September.', stops: 'The Deosai plains and Sheosar Lake.' },
];

/** Price of a package by car (the only vehicle with a confirmed price). */
export const carPrice = (p: Package) => (p.transfer ? 3500 : 11000 * p.days);
export const priceFor = (p: Package, v: Vehicle): number | Tbd => {
  const unit = p.transfer ? v.transfer : v.perDay;
  return isTbd(unit) ? unit : p.transfer ? unit : unit * p.days;
};
export const unitLabel = (p: Package) => (p.transfer ? 'per transfer' : p.days === 1 ? 'for the day' : `for ${p.days} days`);
export const formatPKR = (n: number) => `PKR ${n.toLocaleString('en-US')}`;

export const INCLUDED = [
  'Verified driver, 8+ years, English and Urdu',
  'Clean, checked vehicle and a backup if needed',
  'Flexible stops along the way',
  'Driver pays for his own food and stay',
  'On-time pickup at arrivals with your name board',
];

export const STANDARDS = [
  'Has driven for 8 years or more',
  'Speaks English and Urdu',
  'Keeps a clean, checked vehicle',
  'Is polite and patient on every road',
  'Stops where you want to stop',
  'Pays for his own food and stay on trips',
  'Waits at arrivals with your name on a board',
];

export const HOW_IT_WORKS: Step[] = [
  { icon: 'map', title: 'Pick a trip and a vehicle', body: 'Airport transfers, day trips or a full tour of Baltistan. The price is fixed before you book.' },
  { icon: 'wallet', title: 'Pay a 10% deposit', body: 'Send it by JazzCash, Easypaisa or bank transfer. Our team checks it and confirms your dates.' },
  { icon: 'landing', title: 'Meet your driver at arrivals', body: 'Your verified driver waits at Skardu Airport with your name. You pay the rest in cash, with a receipt.' },
];

export const GUARANTEES: Feature[] = [
  { icon: 'shield', title: 'Every driver is checked', body: 'Licence, vehicle papers and a test drive with our team. Each driver signs an agreement and leaves a security deposit.' },
  { icon: 'car', title: 'A backup vehicle', body: 'If a vehicle breaks down, we send another one to you.' },
  { icon: 'refund', title: 'Refunds when flights are cancelled', body: 'Move your booking to the new date, or get your deposit back in full.' },
  { icon: 'chat', title: 'Monitored chat and WhatsApp support', body: 'Talk to your driver in the app. Our team can step in at any time.' },
];

export const MONEY: { icon: IconName; title: string; lines: string[] }[] = [
  { icon: 'wallet', title: 'A 10% deposit to book', lines: ['JazzCash, Easypaisa or bank transfer', 'Our team checks every deposit by hand', 'Your dates are held while we check'] },
  { icon: 'cash', title: 'The rest in cash to your driver', lines: ['Half at pickup, half on the last day', 'Day trips and transfers: all at pickup', 'You get a receipt in the app each time'] },
  { icon: 'refund', title: 'If plans change', lines: ['Flight cancelled: new date or a full refund', 'Cancel within 48 hours of pickup: the deposit is not refunded', 'Add extra days in the app, with the same driver'] },
];

export type QA = { q: string; a: string };
export const FAQ_GROUPS: { title: string; items: QA[] }[] = [
  { title: 'Booking', items: [
    { q: 'Do I need an account to book?', a: 'No. You can book as a guest with your name and WhatsApp number. An account keeps your trips on any phone.' },
    { q: 'How far ahead can I book?', a: 'From tomorrow up to 12 months ahead. Book before you fly, so your driver is confirmed when you land.' },
    { q: 'Can I book for a group?', a: 'Yes. A van seats up to 10 guests. For a bigger group, message us on WhatsApp.' },
  ] },
  { title: 'Payments', items: [
    { q: 'How do I pay the deposit?', a: 'Send 10% by JazzCash, Easypaisa or bank transfer, then share the transaction ID or a screenshot in the app. Our team checks it by hand.' },
    { q: 'How do I pay the rest?', a: 'In cash to your driver: half at pickup and half on the last day. Day trips and transfers are paid in full at pickup. You get a receipt in the app each time.' },
  ] },
  { title: 'At the airport', items: [
    { q: 'How do I find my driver?', a: 'Your driver waits in the Skardu Airport arrivals hall with your name on a board. Before you fly, the app shows their name, photo and number plate.' },
    { q: 'What if my flight is cancelled?', a: 'Your booking moves to your new date, or we refund your deposit in full.' },
  ] },
  { title: 'During your trip', items: [
    { q: 'Can I add extra days?', a: 'Yes. Add them in the app, with the same driver and vehicle. Book them in the app so our guarantees still cover you.' },
    { q: 'Is my chat with the driver private?', a: 'Chats are monitored by Hamrah to keep you safe. Phone numbers, links and emails are hidden.' },
    { q: 'What if the vehicle breaks down?', a: 'Your driver tells us and we send a backup vehicle to you.' },
  ] },
  { title: 'Cancelling', items: [
    { q: 'Can I cancel my booking?', a: 'Yes, in the app. If you cancel less than 48 hours before pickup, the deposit is not refunded.' },
  ] },
];
export const HOME_FAQ: QA[] = [
  FAQ_GROUPS[0].items[0], FAQ_GROUPS[2].items[0], FAQ_GROUPS[2].items[1], FAQ_GROUPS[3].items[0],
  { q: 'How do I contact support?', a: 'Message our team on WhatsApp. You talk to your driver in the app chat.' },
];

export type TermsSection = { id: string; title: string; paragraphs: (string | Tbd)[] };
export const TERMS: TermsSection[] = [
  { id: 'booking', title: 'Booking', paragraphs: ['You book in the Hamrah app. Pick your arrival date, flight, trip and vehicle, then enter your name, WhatsApp number and the number of guests.', 'After our team confirms your deposit, a driver accepts your trip and the app shows their name, photo and number plate.'] },
  { id: 'deposit', title: 'Deposit', paragraphs: ['10% confirms your booking. Pay by JazzCash, Easypaisa or bank transfer and share the proof in the app. We hold your dates for 12 hours while we check it.'] },
  { id: 'paying-the-rest', title: 'Paying the rest', paragraphs: ['Pay your driver in cash: half at pickup and half on the last day. Day trips and transfers are paid in full at pickup. Your driver confirms each payment in the app, and you get a receipt.'] },
  { id: 'cancelling', title: 'Cancelling', paragraphs: ['Less than 48 hours before pickup, the deposit is not refunded.', TBD('Refund for cancelling more than 48 hours before pickup: to be confirmed')] },
  { id: 'flight-cancelled', title: 'Flight cancelled', paragraphs: ['Your booking moves to your new date, or we refund your deposit in full.'] },
  { id: 'extra-days', title: 'Extra days', paragraphs: ['Add extra days in the app, with the same driver and vehicle. Days arranged outside the app are not covered by our guarantees.'] },
  { id: 'chat', title: 'Chat and contact', paragraphs: ['You talk to your driver in the app chat, which our team can read to keep you safe. Phone numbers, links and emails are hidden. Our support team is on WhatsApp.'] },
  { id: 'guarantees', title: 'Our guarantees', paragraphs: ['A backup vehicle if anything goes wrong, refunds as described here, and support from our team. They cover bookings made in the app only.'] },
];

export type IconName = 'shield' | 'cash' | 'car' | 'suv' | 'van' | 'landing' | 'map' | 'chat' | 'check' | 'refund' | 'wallet' | 'arrow' | 'chevron' | 'menu' | 'close' | 'bell' | 'person' | 'group' | 'calendarAdd';
export type Step = { icon: IconName; title: string; body: string };
export type Feature = Step;
