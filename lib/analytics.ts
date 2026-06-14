import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  | { name: "cta_test_click"; props: { location: "hero" | "inline" | "footer" } }
  | { name: "test_kit_outbound"; props: { vendor: "cdph" } }
  | { name: "derivation_open"; props?: undefined }
  | { name: "reached_testing"; props?: undefined }
  | { name: "reached_footer"; props?: undefined };

/** Typed wrapper around Vercel Web Analytics custom events (single source of event names). */
export function track(e: AnalyticsEvent): void {
  vercelTrack(
    e.name,
    "props" in e ? (e.props as Record<string, string>) : undefined,
  );
  // Dev-only test seam: record client events for Playwright (zero prod overhead).
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    const w = window as unknown as { __rgEvents?: AnalyticsEvent[] };
    (w.__rgEvents ??= []).push(e);
  }
}
