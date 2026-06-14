"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

// Fires `reached_footer` once the footer scrolls into view — stands in for the
// "scroll depth" funnel checkpoint Web Analytics doesn't track natively.
export function FooterBeacon() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        track({ name: "reached_footer" });
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} aria-hidden="true" />;
}
