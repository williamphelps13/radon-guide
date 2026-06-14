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

test("every risk-scale band renders its range and label", async ({ page }) => {
  for (const band of content.riskScale) {
    await expect(page.getByText(band.range, { exact: true }).first()).toBeVisible();
    await expect(page.getByText(band.label, { exact: true }).first()).toBeVisible();
  }
});

test("every content section renders its title and body", async ({ page }) => {
  for (const s of content.sections) {
    await expect(page.getByText(s.title, { exact: true }).first()).toBeVisible();
    await expect(page.getByText(s.body, { exact: true }).first()).toBeVisible();
  }
});

test("every testing route renders its status and action", async ({ page }) => {
  for (const r of content.testingRoutes) {
    await expect(page.getByText(r.status, { exact: true }).first()).toBeVisible();
    await expect(page.getByText(r.action, { exact: true }).first()).toBeVisible();
  }
});

test("every mitigation row renders all its fields", async ({ page }) => {
  for (const m of content.mitigationRows) {
    for (const field of [m.system, m.foundation, m.cost, m.reduction]) {
      await expect(page.getByText(field, { exact: true }).first()).toBeVisible();
    }
  }
});

test("the testing section heading and protocol render", async ({ page }) => {
  await expect(
    page.getByText(content.testing.heading, { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByText(content.testing.protocol, { exact: true }).first(),
  ).toBeVisible();
});

test("the derivation trigger renders", async ({ page }) => {
  await expect(
    page.getByText(content.derivation.trigger, { exact: true }).first(),
  ).toBeVisible();
});

test("both form headings and CTAs render", async ({ page }) => {
  const { newsletter, partnership } = content.forms;
  for (const text of [
    newsletter.heading,
    partnership.heading,
    newsletter.cta,
    partnership.cta,
  ]) {
    await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
  }
  // Role labels render as <option>s in the partnership select.
  for (const role of partnership.roles) {
    await expect(
      page.locator(`option[value="${role.value}"]`),
    ).toHaveText(role.label);
  }
});
