import { test, expect } from "@playwright/test";
import { expectClientEvent } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("hero CTA anchors to the testing section", async ({ page }) => {
  const cta = page.getByTestId("cta-test").first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "#test");
});

test("hero CTA fires the cta_test_click analytics event", async ({ page }) => {
  await expectClientEvent(page, "cta_test_click", async () => {
    await page.getByTestId("cta-test").first().click();
  });
});
