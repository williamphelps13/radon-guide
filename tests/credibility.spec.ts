import { test } from "@playwright/test";
import { content, mitigators, expectPrimarySourceLink } from "./helpers";

// Source invariant: every stat and every cited hero source renders inside a
// link to its registered PRIMARY source, opening in a new tab.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

for (const stat of content.stats) {
  test(`stat "${stat.id}" links to its primary source`, async ({ page }) => {
    await expectPrimarySourceLink(page, {
      sourceId: stat.sourceId,
      selector: `a[data-stat-value="${stat.value}"]`,
    });
  });
}

for (const sourceId of content.hero.sourceIds) {
  test(`hero source chip "${sourceId}" links to its primary source`, async ({
    page,
  }) => {
    await expectPrimarySourceLink(page, { sourceId });
  });
}

test("the mitigation table cites its source as a primary new-tab link", async ({
  page,
}) => {
  await expectPrimarySourceLink(page, {
    sourceId: "epa_citizens_guide",
    selector:
      'section[aria-label="Radon mitigation options"] a[data-source-tier="primary"]',
  });
});

// The mitigator directory traces each listing to its primary state sources.
test.describe("mitigators page sources", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mitigators");
  });

  // DRY: every distinct source a mitigator cites must render as a primary link
  // (auto-covers a future row that introduces a new/non-primary source).
  const rosterSources = [
    ...new Set(mitigators.mitigators.map((m) => m.sourceId)),
  ];
  for (const sourceId of rosterSources) {
    test(`mitigator source "${sourceId}" is a primary new-tab link`, async ({
      page,
    }) => {
      await expectPrimarySourceLink(page, { sourceId });
    });
  }

  // CSLB is the page-level location-provenance citation (not a per-row field).
  test('the "cslb" location source is a primary new-tab link', async ({
    page,
  }) => {
    await expectPrimarySourceLink(page, { sourceId: "cslb" });
  });
});
