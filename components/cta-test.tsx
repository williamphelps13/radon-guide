"use client";

import { track } from "@/lib/analytics";
import { getPageContent } from "@/lib/content";

export function CtaTest({
  location,
}: {
  location: "hero" | "inline" | "footer";
}) {
  const { ui } = getPageContent();
  return (
    <a
      href="#test"
      data-testid="cta-test"
      onClick={() => track({ name: "cta_test_click", props: { location } })}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground"
    >
      {ui.testCta} →
    </a>
  );
}
