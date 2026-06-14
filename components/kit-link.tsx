"use client";

import { track } from "@/lib/analytics";
import { getSource } from "@/lib/content";

export function KitLink({ children }: { children: React.ReactNode }) {
  const s = getSource("cdph_radon");
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="cdph-kit"
      onClick={() => track({ name: "test_kit_outbound", props: { vendor: "cdph" } })}
      className="font-medium text-brand-700 underline"
    >
      {children}
    </a>
  );
}
