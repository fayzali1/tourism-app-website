import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';

import { Footer } from '@/components/footer';
import { CardMotion } from '@/components/card-motion';
import { Nav } from '@/components/nav';
import { THEME_SCRIPT } from '@/components/theme-toggle';
import { SITE } from '@/content/site';

import './globals.css';

// The app's typefaces: Sora for headings, Plus Jakarta Sans for everything else.
const display = Sora({ subsets: ['latin'], weight: ['600'], variable: '--font-display', display: 'swap' });
const body = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Hamrah · Your driver at Skardu arrivals', template: '%s · Hamrah' },
  description: SITE.description,
  openGraph: { siteName: 'Hamrah', type: 'website', title: 'Hamrah · Your driver at Skardu arrivals', description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6FB' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1630' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set before paint by the inline script, so React must not complain that it differs
    <html lang="en" className={`${display.variable} ${body.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <CardMotion />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
