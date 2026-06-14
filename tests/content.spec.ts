import { test, expect } from "@playwright/test";
import { content } from "./helpers";

// Presence invariant: every field in the content model renders on the page.
// DRY (reads from content/page.ts) and self-extending as sections are added.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("exactly one h1", async ({ page }) => {
  await expect(page.locator("h1")).toHaveCount(1);
});

test("hero renders all its content fields", async ({ page }) => {
  const { hero } = content;
  for (const text of [hero.eyebrow, hero.headline, hero.body, hero.caveat]) {
    await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
  }
});

test("every stat label renders", async ({ page }) => {
  for (const stat of content.stats) {
    await expect(
      page.getByText(stat.label, { exact: true }).first(),
    ).toBeVisible();
  }
});
