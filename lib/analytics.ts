import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  | { name: "cta_test_click"; props: { location: "hero" | "inline" | "footer" } }
  | { name: "test_kit_outbound"; props: { vendor: "cdph" } }
  | { name: "derivation_open"; props?: undefined }
  | { name: "reached_testing"; props?: undefined }
  | { name: "reached_footer"; props?: undefined }
  | { name: "map_pin_open"; props: { state: "CA" | "NV" } }
  | { name: "mitigator_cta_click"; props?: undefined };

/** Typed wrapper around Vercel Web Analytics custom events (single source of event names). */
export function track(e: AnalyticsEvent): void {
  vercelTrack(
    e.name,
    "props" in e ? (e.props as Record<string, string>) : undefined,
  );
  // Test seam: record client events for Playwright. On in dev, and in any build
  // explicitly flagged for tests (so a CI `build && start` server still exposes it).
  // Off in real production (NEXT_PUBLIC_RG_TEST unset) → zero overhead.
  const testSeam =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_RG_TEST === "1";
  if (testSeam && typeof window !== "undefined") {
    const w = window as unknown as { __rgEvents?: AnalyticsEvent[] };
    (w.__rgEvents ??= []).push(e);
  }
}
