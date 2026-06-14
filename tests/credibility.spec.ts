import { test, expect } from "@playwright/test";
import { content, SOURCES } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// The signature gate: every stat in the content model must render on the page
// inside a link to its registered PRIMARY source, opening in a new tab.
for (const stat of content.stats) {
  test(`stat "${stat.id}" links to its primary source in a new tab`, async ({
    page,
  }) => {
    const src = SOURCES[stat.sourceId];
    expect(src.tier, `${stat.id} must cite a primary source`).toBe("primary");

    const link = page.locator(`a[data-stat-value="${stat.value}"]`).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", src.url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  });
}
