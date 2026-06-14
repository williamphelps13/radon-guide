import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("accessibility", () => {
  test("no serious or critical axe violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(serious, JSON.stringify(serious.map((v) => v.id))).toEqual([]);
  });
});

test.describe("mobile", () => {
  test("no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBeFalsy();
  });

  test("the test CTA is visible", async ({ page }) => {
    await expect(page.getByTestId("cta-test").first()).toBeVisible();
  });
});

test.describe("seo", () => {
  test("title and meta description are present", async ({ page }) => {
    await expect(page).toHaveTitle(/Radon Guide/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
  });
});
