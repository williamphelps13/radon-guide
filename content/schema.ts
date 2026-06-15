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

// A certified radon mitigator. Its own model (not part of the funnel page): the
// roster is a directory, sourced from a state's certified list (CDPH for CA),
// with office location enriched from CSLB and baked lat/lng for the map.
const MitigatorSchema = z.object({
  name: z.string().nonempty(), // "First Last"
  business: z.string().optional(), // company; omitted for sole individuals
  certId: z.string().nonempty(), // CDPH mitigation cert # — the de-dupe key
  city: z.string().nonempty(), // office city (CSLB)
  state: z.enum(["CA", "NV"]), // office state (a CA-certified pro can be NV-based)
  zip: z.string().optional(),
  phone: z.string().optional(), // CSLB business line, display form
  caLicense: z.string().optional(), // CA contractor license #
  // Baked geocode, bounded to the CA + NV box so a transposed digit (which would
  // otherwise drop a pin in the ocean) fails the schema guard instead of shipping.
  lat: z.number().min(32).max(42.5),
  lng: z.number().min(-125).max(-114),
  precise: z.boolean(), // true = street-level geocode; false = city centroid
  sourceId, // the certified-list source backing the listing
});

export const MitigatorsSchema = z.object({
  updatedAt: z.string().nonempty(), // these certified lists are periodic snapshots
  // Page copy lives in the model (not inline JSX) so the presence + voice gates cover it.
  copy: z.object({
    title: z.string().nonempty(), // <title> (templated with the site name)
    description: z.string().nonempty().max(160), // meta description; Google truncates ~155–160
    heading: z.string().nonempty(), // the h1
    intro: z.string().nonempty(),
    mapNote: z.string().nonempty(), // office-vs-service-area caveat under the map
  }),
  mitigators: z.array(MitigatorSchema).min(1),
});

export type Mitigators = z.infer<typeof MitigatorsSchema>;
export type Mitigator = z.infer<typeof MitigatorSchema>;

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

/**
 * Invariant: every mitigator cites a primary-tier source, and cert IDs are
 * unique (catches the duplicate rows the CDPH list can contain).
 */
export function assertMitigators(data: Mitigators): void {
  const offenders: string[] = [];
  const seen = new Set<string>();
  for (const m of data.mitigators) {
    if (SOURCES[m.sourceId].tier !== "primary")
      offenders.push(`source:${m.certId}`);
    if (seen.has(m.certId)) offenders.push(`duplicate cert:${m.certId}`);
    seen.add(m.certId);
  }
  if (offenders.length) {
    throw new Error(`Mitigator data invalid: ${offenders.join(", ")}`);
  }
}
