import { expect, type Page } from "@playwright/test";
import { getPageContent, getMitigators } from "@/lib/content";
import { SOURCES, type SourceId } from "@/content/sources";

export const content = getPageContent();
export const mitigators = getMitigators();

/** Assert a locator resolves to a primary-source link that opens in a new tab. */
export async function expectPrimarySourceLink(
  page: Page,
  opts: { sourceId: SourceId; selector?: string },
) {
  const src = SOURCES[opts.sourceId];
  expect(src.tier, `${opts.sourceId} must cite a primary source`).toBe(
    "primary",
  );
  const link = page.locator(opts.selector ?? `a[href="${src.url}"]`).first();
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", src.url);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
}

/**
 * Run `action`, then assert a client analytics event named `name` was recorded.
 * Relies on the dev-only `window.__rgEvents` seam in `lib/analytics.ts`.
 */
export async function expectClientEvent(
  page: Page,
  name: string,
  action: () => Promise<void>,
) {
  await page.evaluate(() => {
    (window as unknown as { __rgEvents?: unknown[] }).__rgEvents = [];
  });
  await action();
  const names = await page.evaluate(() =>
    (
      (window as unknown as { __rgEvents?: { name: string }[] }).__rgEvents ?? []
    ).map((e) => e.name),
  );
  expect(names, `expected client analytics event "${name}"`).toContain(name);
}
