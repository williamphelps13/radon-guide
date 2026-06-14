import { z } from "zod";
import { SOURCES, type SourceId } from "./sources";

// Zod 4: no message arg (the v3 string/`{ message }` form changed to `{ error }`);
// a plain membership check is enough for a build-time guard.
const sourceId = z.custom<SourceId>(
  (v) => typeof v === "string" && v in SOURCES,
);

// Required display/prose strings must be non-empty (catches accidental blanks).
const nonEmpty = z.string().min(1);

const StatSchema = z.object({
  id: nonEmpty,
  value: nonEmpty, // display string, e.g. "≈50%"
  label: nonEmpty,
  sourceId,
});

const SectionSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  order: z.number().int(),
  body: nonEmpty, // Markdown / plain prose
});

const TestingRouteSchema = z.object({
  status: nonEmpty,
  action: nonEmpty,
  primary: z.boolean().optional(),
});

const MitigationRowSchema = z.object({
  system: nonEmpty,
  foundation: nonEmpty,
  cost: nonEmpty,
  reduction: nonEmpty,
  sourceId,
});

// pCi/L bands for the RiskScale (the only place the reserved --risk-* ramp is used).
const RiskLevelSchema = z.object({
  range: nonEmpty, // e.g. "4–8"
  label: nonEmpty, // e.g. "elevated · action level"
  level: z.enum(["low", "moderate", "elevated", "high"]), // → --risk-* token
});

const DerivationSchema = z.object({
  trigger: nonEmpty,
  body: nonEmpty,
});

// Form copy lives in the model so the presence test stays DRY; roles is the
// single source of truth the partnership Server Action derives its enum from.
const FormsSchema = z.object({
  newsletter: z.object({
    heading: nonEmpty,
    cta: nonEmpty,
    success: nonEmpty,
  }),
  partnership: z.object({
    heading: nonEmpty,
    cta: nonEmpty,
    success: nonEmpty,
    roles: z.array(z.object({ value: nonEmpty, label: nonEmpty })).min(1),
  }),
});

export const PageContentSchema = z.object({
  hero: z.object({
    eyebrow: nonEmpty,
    headline: nonEmpty,
    body: nonEmpty,
    caveat: nonEmpty,
    sourceIds: z.array(sourceId).min(1),
  }),
  stats: z.array(StatSchema),
  sections: z.array(SectionSchema),
  riskScale: z.array(RiskLevelSchema).min(1),
  derivation: DerivationSchema,
  testing: z.object({
    heading: nonEmpty,
    protocol: nonEmpty, // testing-protocol footnote
    startHere: nonEmpty, // "start here" badge on the primary route
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
