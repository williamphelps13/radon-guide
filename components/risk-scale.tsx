import { getPageContent } from "@/lib/content";

// The ONLY place the reserved --risk-* ramp is used. Static class map so Tailwind
// keeps the utilities (no dynamic `bg-risk-${level}` — that would get purged).
const BAND: Record<string, string> = {
  low: "bg-risk-low",
  moderate: "bg-risk-moderate",
  elevated: "bg-risk-elevated",
  high: "bg-risk-high",
};

export function RiskScale() {
  const { riskScale, riskScaleCopy } = getPageContent();
  return (
    <section
      aria-label={riskScaleCopy.ariaLabel}
      className="mx-auto mt-10 max-w-2xl px-5"
    >
      <p className="mb-2 text-xs font-medium text-ink-500">
        {riskScaleCopy.caption}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {riskScale.map((band) => (
          <div key={band.range}>
            <div className={`h-7 rounded-md ${BAND[band.level]}`} />
            <p className="mt-1.5 text-sm font-medium text-ink-900">
              {band.range}
            </p>
            <p className="text-xs text-ink-500">{band.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
