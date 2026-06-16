import { getPageContent } from "@/lib/content";
import { Stat } from "./stat-link";

export function CredibilityStrip() {
  const { stats, credibility } = getPageContent();
  // First-screen proof only; us_deaths belongs to the "how bad" section.
  const strip = stats.filter((s) => s.id !== "us_deaths");
  return (
    <section
      aria-label={credibility.ariaLabel}
      className="mx-auto mt-8 max-w-2xl px-5"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {strip.map((s) => (
          <Stat
            key={s.id}
            value={s.value}
            label={s.label}
            sourceId={s.sourceId}
          />
        ))}
      </div>
    </section>
  );
}
