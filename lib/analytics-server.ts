import { track as vercelTrack } from "@vercel/analytics/server";

// Server-side analytics events (spec §7.2), kept separate from lib/analytics.ts
// so `@vercel/analytics/server` never enters the client bundle. Fired (awaited)
// only on real success inside a Server Action.
export type ServerAnalyticsEvent =
  | { name: "newsletter_submit"; props?: undefined }
  | { name: "partnership_submit"; props: { role: string } };

export async function trackServer(e: ServerAnalyticsEvent): Promise<void> {
  // Best-effort telemetry: never let an analytics failure break a real submission.
  try {
    await vercelTrack(
      e.name,
      "props" in e ? (e.props as Record<string, string>) : undefined,
    );
  } catch {
    // swallow
  }
}
