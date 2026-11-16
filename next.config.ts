import type { NextConfig } from "next";

// A static marketing site: every page is built ahead of time into `out/` and can be hosted on any
// static host. No server features (no booking, accounts or forms): the site's one job is app downloads.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
