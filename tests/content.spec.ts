import { test, expect } from "@playwright/test";
import { content, mitigators } from "./helpers";

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

test("the test CTA and risk-scale caption render", async ({ page }) => {
  await expect(
    page.getByText(content.ui.testCta, { exact: false }).first(),
  ).toBeVisible();
  await expect(
    page.getByText(content.riskScaleCopy.caption, { exact: true }).first(),
  ).toBeVisible();
});

test("the mitigation table headers render", async ({ page }) => {
  const { headers } = content.mitigation;
  for (const h of [
    headers.system,
    headers.foundation,
    headers.cost,
    headers.reduction,
  ]) {
    await expect(page.getByText(h, { exact: true }).first()).toBeVisible();
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

test("form field labels render from the model", async ({ page }) => {
  const { fields } = content.forms;
  for (const label of [fields.name, fields.email, fields.role, fields.message]) {
    await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
  }
});

test("the mitigation section links to the mitigator directory", async ({
  page,
}) => {
  // The CTA now appears in the fix-it section and the footer; assert the first.
  await expect(
    page
      .getByRole("link", { name: content.mitigation.findMitigatorCta })
      .first(),
  ).toBeVisible();
});

// Presence invariant for the mitigator directory (DRY, from getMitigators()).
test.describe("mitigators page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mitigators");
  });

  test("exactly one h1", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("renders the page copy from the model", async ({ page }) => {
    for (const text of [
      mitigators.copy.heading,
      mitigators.copy.intro,
      mitigators.copy.mapNote,
    ]) {
      await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
    }
  });

  test("renders the list copy (caption, headers, caveat) from the model", async ({
    page,
  }) => {
    const { list } = mitigators.copy;
    await expect(
      page.getByText(list.caption, { exact: false }).first(),
    ).toBeVisible();
    for (const h of [list.headers.name, list.headers.location, list.headers.phone]) {
      await expect(page.getByText(h, { exact: true }).first()).toBeVisible();
    }
    // The out-of-state caveat shows on the NV-based row.
    await expect(
      page.getByText(list.servesCaveat, { exact: true }).first(),
    ).toBeVisible();
  });

  test("every mitigator renders its name, location, and phone in the list", async ({
    page,
  }) => {
    // Scope to the list so a city/name is asserted in its row, not anywhere on
    // the page (the intro prose and map popups also contain these strings).
    const list = page.locator(
      `section[aria-label="${mitigators.copy.list.ariaLabel}"]`,
    );
    for (const m of mitigators.mitigators) {
      await expect(list.getByText(m.name, { exact: true }).first()).toBeVisible();
      await expect(list.getByText(m.city, { exact: false }).first()).toBeVisible();
      if (m.phone) {
        await expect(
          list.getByRole("link", { name: m.phone }).first(),
        ).toBeVisible();
      }
    }
  });
});

// Presence invariant for the legal pages (DRY, from content.legal).
test.describe("legal pages", () => {
  test("privacy renders its copy from the model", async ({ page }) => {
    await page.goto("/privacy");
    const { privacy } = content.legal;
    await expect(
      page.getByRole("heading", { level: 1, name: privacy.title }),
    ).toBeVisible();
    // `access` is one model string; the <p> wraps its link phrase inline, so the
    // full sentence is still assertable as a whole.
    for (const text of [
      privacy.updated,
      privacy.intro,
      privacy.newsletter,
      privacy.access,
    ]) {
      await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
    }
    await expect(
      page.getByRole("link", { name: privacy.accessLink }),
    ).toBeVisible();
  });

  test("disclosure renders its copy from the model", async ({ page }) => {
    await page.goto("/disclosure");
    const { disclosure } = content.legal;
    await expect(
      page.getByRole("heading", { level: 1, name: disclosure.title }),
    ).toBeVisible();
    for (const text of [
      disclosure.updated,
      disclosure.body,
      disclosure.notMedicalHeading,
      disclosure.notMedicalBody,
    ]) {
      await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
    }
  });
});

// The back-link label is shared chrome (ui.backToGuide) rendered on every page
// that isn't the guide itself; assert it from the model on each.
test("every sub-page links back to the guide", async ({ page }) => {
  for (const path of ["/privacy", "/disclosure", "/mitigators"]) {
    await page.goto(path);
    await expect(
      page.getByRole("link", { name: content.ui.backToGuide }),
    ).toBeVisible();
  }
});
