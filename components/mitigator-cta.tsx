"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { getPageContent } from "@/lib/content";

// Prominent, tracked entry to the mitigator directory (a key differentiator and a
// future referral-revenue path, so clicks are measured). Outline styling keeps it
// subordinate to the solid "Test your home" primary CTA. Mirrors cta-test.tsx.
export function MitigatorCta() {
  const { mitigation } = getPageContent();
  return (
    <Link
      href="/mitigators"
      data-testid="cta-mitigator"
      onClick={() => track({ name: "mitigator_cta_click" })}
      className="inline-flex items-center gap-2 rounded-lg border border-brand-600 px-4 py-2.5 font-medium text-brand-700 hover:bg-brand-50"
    >
      {mitigation.findMitigatorCta} →
    </Link>
  );
}
