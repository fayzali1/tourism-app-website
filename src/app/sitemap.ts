import type { MetadataRoute } from 'next';

import { PACKAGES, SITE } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/packages/', '/drivers/', '/help/', '/terms/', '/drive/', ...PACKAGES.map((p) => `/packages/${p.slug}/`)];
  return pages.map((path) => ({ url: new URL(path, SITE.url).toString() }));
}
