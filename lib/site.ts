// Single source of truth for the canonical site origin. Set NEXT_PUBLIC_SITE_URL
// per environment (preview vs production); falls back to the prod host.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://radonguide.org";

export const SITE_NAME = "Radon Guide";
