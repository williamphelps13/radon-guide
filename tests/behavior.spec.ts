import { test, expect } from "@playwright/test";
import { content, mitigators, expectClientEvent } from "./helpers";

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

test.describe("newsletter form", () => {
  test("invalid email shows an error, never a success", async ({ page }) => {
    const form = page.getByTestId("newsletter-form");
    await form.getByLabel("Email").fill("not-an-email");
    await form.evaluate((f: HTMLFormElement) => (f.noValidate = true));
    await form.getByRole("button").click();
    await expect(page.getByTestId("newsletter-error")).toBeVisible();
    await expect(page.getByTestId("newsletter-ok")).toHaveCount(0);
  });

  test("a valid email shows the success message", async ({ page }) => {
    const form = page.getByTestId("newsletter-form");
    await form.getByLabel("Email").fill("valid@example.com");
    await form.getByRole("button").click();
    await expect(page.getByTestId("newsletter-ok")).toBeVisible();
  });
});

test("partnership form: empty submit shows an error", async ({ page }) => {
  const form = page.getByTestId("partnership-form");
  // Bypass native required so the Server Action's validation is exercised.
  await form.evaluate((f: HTMLFormElement) => (f.noValidate = true));
  await form.getByRole("button").click();
  await expect(page.getByTestId("partnership-error")).toBeVisible();
});

test("opening the derivation reveals the math and fires derivation_open", async ({
  page,
}) => {
  await expectClientEvent(page, "derivation_open", async () => {
    await page.getByTestId("derivation-trigger").click();
  });
  await expect(
    page.getByText(content.derivation.body, { exact: true }),
  ).toBeVisible();
});

test.describe("mitigator map", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mitigators");
  });

  test("mounts and renders a pin for every mitigator", async ({ page }) => {
    await expect(page.getByTestId("mitigator-map")).toBeVisible();
    await expect(page.getByTestId("map-pin")).toHaveCount(
      mitigators.mitigators.length,
    );
  });

  test("clicking a pin opens a popup with name + tel link and fires map_pin_open", async ({
    page,
  }) => {
    await expect(page.getByTestId("mitigator-map")).toBeVisible();
    const first = mitigators.mitigators[0];
    const pin = page.getByRole("button", { name: first.name });
    // Invoke the marker's own click handler directly. A real click would be
    // hit-tested against any map control overlapping the marker at this
    // viewport; we are exercising the marker behavior, not control z-order.
    await expectClientEvent(page, "map_pin_open", async () => {
      await pin.evaluate((el: HTMLElement) => el.click());
    });
    const popup = page.locator(".maplibregl-popup");
    await expect(popup).toContainText(first.name);
    if (first.phone) {
      await expect(popup.locator('a[href^="tel:"]')).toBeVisible();
    }
  });
});
