import { z } from "zod";
import { SOURCES, type SourceId } from "./sources";

// Zod 4: no message arg (the v3 string/`{ message }` form changed to `{ error }`);
// a plain membership check is enough for a build-time guard.
const sourceId = z.custom<SourceId>(
  (v) => typeof v === "string" && v in SOURCES,
);

export const StatSchema = z.object({
  id: z.string(),
  value: z.string(), // display string, e.g. "≈50%"
  label: z.string(),
  sourceId,
});

export const SectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number().int(),
  body: z.string(), // Markdown / plain prose
});

export const TestingRouteSchema = z.object({
  status: z.string(),
  action: z.string(),
  primary: z.boolean().optional(),
});

export const MitigationRowSchema = z.object({
  system: z.string(),
  foundation: z.string(),
  cost: z.string(),
  reduction: z.string(),
  sourceId,
});

export const PageContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    body: z.string(),
    caveat: z.string(),
    sourceIds: z.array(sourceId).min(1),
  }),
  stats: z.array(StatSchema),
  sections: z.array(SectionSchema),
  testingRoutes: z.array(TestingRouteSchema),
  mitigationRows: z.array(MitigationRowSchema),
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
