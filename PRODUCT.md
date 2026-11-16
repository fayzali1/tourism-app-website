# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Guests:** tourists flying into Skardu Airport (Gilgit-Baltistan, Pakistan), domestic Pakistani and foreign tourists in equal measure, planning from another city or country before they fly. On the website they are deciding whether to trust Hamrah enough to install the app.
- **Drivers:** local drivers from Baltistan considering joining (the "Drive with Hamrah" page). Many read English as a second language.

## Product Purpose
Hamrah replaces picking a driver at the airport on blind trust: a vetted local driver and vehicle at a fixed price, booked before landing, with a company accountable when something goes wrong. **The website's only job is to get visitors to download the app.** No booking, accounts or driver features on the web, so attention stays on the app.

## Positioning
A company stands behind every driver: vetting, a fixed price, a backup vehicle, refunds and support that apply only to bookings made in the app. The business owns no vehicles and earns a service fee per booking.

## Operating Context
- Booking happens in the app: arrival date, flight, package, vehicle, name, WhatsApp number, guests; a 10% deposit by JazzCash, Easypaisa or bank transfer, checked by hand; the rest in cash to the driver (half at pickup, half on the last day; short trips in full at pickup), with a receipt in the app.
- The driver meets the guest in the Skardu Airport arrivals hall with a name board. Chat is in the app and monitored; support is on WhatsApp only.
- Packages: Airport to hotel, Shigar day trip, Skardu and Khaplu tour (3 days), Full Skardu tour (5 days), Deosai day trip (June to September). Vehicles: Car (3 guests), Prado or jeep (5), Van (10). Currency PKR.
- Peak season April to October. Launch planned late December 2026 or mid-January 2027.

## Capabilities and Constraints
- Next.js 16 static export in `website/`; no server features. Content lives in `src/content/site.ts`.
- App store links are not live yet: store buttons say "Coming soon" until the apps are published.
- **Undecided (shown as gold placeholders, never invented):** support WhatsApp number and hours; Prado and van prices; the deposit refund for cancelling more than 48 hours ahead; full legal terms; privacy policy; domain; final brand name ("Hamrah" is a working name).

## Brand Commitments
- Keep the Hamrah logo (gradient tile, mountain line, eight-pointed Balti star).
- Keep the **essence** of the app's colours (night navy and gold) without copying the app's palette exactly: the website has its own identity within that family (owner, 2026-11-15).
- Plain, short wording for second-language readers.
- Marketing promises: 8+ years of driving experience, English and Urdu, clean and maintained vehicles, good behaviour, backup vehicle, flexible stops, driver pays for his own food and stay, on-time pickup with a name board.

## Evidence on Hand
- No real photos, testimonials, ratings or trip counts yet. Imagery: licensed stock photos of Skardu and Baltistan for now, labelled so the owner can replace them with their own. Never invent testimonials, ratings, trip counts, customers or prices.
- Car prices are the brief's worked example (PKR 11,000 per day, PKR 3,500 transfer).

## Product Principles
1. Trust is the product: the guarantee, the fixed price and the accountable company are visible everywhere.
2. One action: every page leads to downloading the app.
3. Plain language over cleverness.
4. Money is unambiguous: what is paid, to whom, and when.
5. Honest by default: undecided facts are marked, never filled in.

## Accessibility & Inclusion
- WCAG AA contrast, keyboard access, reduced-motion support.
- Second-language readers: short sentences, no idioms. Works on slow mobile connections.
