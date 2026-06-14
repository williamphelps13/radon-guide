"use client";

import { track } from "@/lib/analytics";

export function CtaTest({
  location,
}: {
  location: "hero" | "inline" | "footer";
}) {
  return (
    <a
      href="#test"
      data-testid="cta-test"
      onClick={() => track({ name: "cta_test_click", props: { location } })}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground"
    >
      Test your home →
    </a>
  );
}
