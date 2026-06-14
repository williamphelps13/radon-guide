import { z } from "zod";
import { SOURCES, type SourceId } from "./sources";

// Zod 4: no message arg (the v3 string/`{ message }` form changed to `{ error }`);
// a plain membership check is enough for a build-time guard.
const sourceId = z.custom<SourceId>(
  (v) => typeof v === "string" && v in SOURCES,
);

const StatSchema = z.object({
  id: z.string().nonempty(),
  value: z.string().nonempty(), // display string, e.g. "≈50%"
  label: z.string().nonempty(),
  sourceId,
});

const SectionSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  order: z.number().int(),
  body: z.string().nonempty(), // Markdown / plain prose
});

const TestingRouteSchema = z.object({
  status: z.string().nonempty(),
  action: z.string().nonempty(),
  primary: z.boolean().optional(),
});

const MitigationRowSchema = z.object({
  system: z.string().nonempty(),
  foundation: z.string().nonempty(),
  cost: z.string().nonempty(),
  reduction: z.string().nonempty(),
  sourceId,
});

// pCi/L bands for the RiskScale (the only place the reserved --risk-* ramp is used).
const RiskLevelSchema = z.object({
  range: z.string().nonempty(), // e.g. "4–8"
  label: z.string().nonempty(), // e.g. "elevated · action level"
  level: z.enum(["low", "moderate", "elevated", "high"]), // → --risk-* token
});

const DerivationSchema = z.object({
  trigger: z.string().nonempty(),
  body: z.string().nonempty(),
});

// Form copy lives in the model so the presence test stays DRY; roles is the
// single source of truth the partnership Server Action derives its enum from.
const FormsSchema = z.object({
  newsletter: z.object({
    heading: z.string().nonempty(),
    cta: z.string().nonempty(),
    success: z.string().nonempty(),
  }),
  partnership: z.object({
    heading: z.string().nonempty(),
    cta: z.string().nonempty(),
    success: z.string().nonempty(),
    roles: z.array(z.object({ value: z.string().nonempty(), label: z.string().nonempty() })).min(1),
  }),
});

export const PageContentSchema = z.object({
  // SEO/social metadata. Lengths guarded to the search-result display windows.
  meta: z.object({
    title: z.string().nonempty().max(60), // ~60 incl. the "| Radon Guide" suffix
    description: z.string().nonempty().max(160), // Google truncates ~155–160
    organization: z.string().nonempty(), // Organization JSON-LD description
  }),
  hero: z.object({
    eyebrow: z.string().nonempty(),
    headline: z.string().nonempty(),
    body: z.string().nonempty(),
    caveat: z.string().nonempty(),
    sourceIds: z.array(sourceId).min(1),
  }),
  stats: z.array(StatSchema),
  sections: z.array(SectionSchema),
  riskScale: z.array(RiskLevelSchema).min(1),
  derivation: DerivationSchema,
  testing: z.object({
    heading: z.string().nonempty(),
    protocol: z.string().nonempty(), // testing-protocol footnote
    startHere: z.string().nonempty(), // "start here" badge on the primary route
  }),
  testingRoutes: z.array(TestingRouteSchema),
  mitigationRows: z.array(MitigationRowSchema),
  forms: FormsSchema,
});

export type PageContent = z.infer<typeof PageContentSchema>;

/**
 * Invariant: every source cited on-page (hero, stats, mitigation rows) must be
 * primary-tier. Throws with the offenders listed.
 */
export function assertPrimaryTier(content: PageContent): void {
  const offenders: string[] = [];
  for (const id of content.hero.sourceIds) {
    if (SOURCES[id].tier !== "primary") offenders.push(`hero:${id}`);
  }
  for (const s of content.stats) {
    if (SOURCES[s.sourceId].tier !== "primary") offenders.push(`stat:${s.id}`);
  }
  for (const m of content.mitigationRows) {
    if (SOURCES[m.sourceId].tier !== "primary")
      offenders.push(`mitigation:${m.system}`);
  }
  if (offenders.length) {
    throw new Error(`Non-primary sources used on-page: ${offenders.join(", ")}`);
  }
}
