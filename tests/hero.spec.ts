import { test, expect } from "@playwright/test";
import { content, SOURCES } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("hero h1 renders the headline hook", async ({ page }) => {
  await expect(page.locator("h1")).toHaveText(content.hero.headline);
});

test("hero CTA is visible and anchors to the testing section", async ({
  page,
}) => {
  const cta = page.getByTestId("cta-test").first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "#test");
});

test("hero source chips link to their primary sources in a new tab", async ({
  page,
}) => {
  for (const id of content.hero.sourceIds) {
    const src = SOURCES[id];
    expect(src.tier, `hero source ${id} must be primary`).toBe("primary");
    const chip = page
      .locator(`a[href="${src.url}"][data-source-tier="primary"]`)
      .first();
    await expect(chip).toBeVisible();
    await expect(chip).toHaveAttribute("target", "_blank");
  }
});
