import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SITE_URL } from "@/lib/site";
import { faqSections } from "@/components/json-ld";

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

  test("canonical URL and Open Graph tags are present", async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(SITE_URL.replace(/[.]/g, "\\.")),
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /South Lake Tahoe/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /opengraph-image/,
    );
  });

  test("robots.txt and sitemap.xml respond and reference the site URL", async ({
    request,
  }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain(`${SITE_URL}/sitemap.xml`);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain(SITE_URL);
  });

  test("security headers are set on responses", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("SAMEORIGIN");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("JSON-LD structured data includes Organization and a FAQPage", async ({
    page,
  }) => {
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    const data = JSON.parse(raw ?? "{}");
    const nodes: { "@type": string; mainEntity?: unknown[] }[] =
      data["@graph"] ?? [];
    const types = nodes.map((n) => n["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("FAQPage");
    const faq = nodes.find((n) => n["@type"] === "FAQPage");
    expect(faq?.mainEntity).toHaveLength(faqSections().length);
    expect(faqSections().length).toBeGreaterThan(0);
  });
});

test.describe("mitigators page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mitigators");
  });

  test("one h1 and the templated title", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/ \| Radon Guide$/);
  });

  test("no serious or critical axe violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(serious, JSON.stringify(serious.map((v) => v.id))).toEqual([]);
  });

  test("no horizontal overflow at mobile width", async ({ page }) => {
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBeFalsy();
  });
});

test.describe("legal pages", () => {
  for (const path of ["/privacy", "/disclosure"]) {
    test(`${path} resolves with one h1 and the templated title`, async ({
      page,
    }) => {
      const res = await page.goto(path);
      expect(res?.ok(), `${path} should not 404`).toBeTruthy();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/ \| Radon Guide$/);
    });
  }
});
