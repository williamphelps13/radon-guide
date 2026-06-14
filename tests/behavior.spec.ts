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

test("the #test section exists for the hero CTA anchor", async ({ page }) => {
  await expect(page.locator("#test")).toBeVisible();
});

test('the single "start here" testing route is the CDPH kit', async ({
  page,
}) => {
  const primary = page.locator('li[data-primary="true"]');
  await expect(primary).toHaveCount(1);
  await expect(primary).toContainText("CDPH");
  await expect(primary.getByTestId("cdph-kit")).toHaveAttribute(
    "target",
    "_blank",
  );
});

test("clicking the CDPH kit link fires test_kit_outbound", async ({ page }) => {
  await expectClientEvent(page, "test_kit_outbound", async () => {
    await page.getByTestId("cdph-kit").click();
  });
});
