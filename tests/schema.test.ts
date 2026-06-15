import assert from "node:assert";
import {
  PageContentSchema,
  MitigatorsSchema,
  assertPrimaryTier,
  assertMitigators,
} from "../content/schema";
import { PAGE } from "../content/page";
import { MITIGATORS } from "../content/mitigators";

// Build-time guard: the page content must satisfy the schema, and every cited
// source must be primary-tier. Run via `npm run test:schema` (tsx).
const parsed = PageContentSchema.parse(PAGE);
assertPrimaryTier(parsed);
assert.ok(parsed.stats.length > 0, "expected at least one stat");

// Mitigator roster: validates against the schema, every source is primary, and
// cert IDs are unique (no duplicate rows from the source list).
const mitigators = MitigatorsSchema.parse(MITIGATORS);
assertMitigators(mitigators);
assert.ok(mitigators.mitigators.length > 0, "expected at least one mitigator");

console.log("schema guard: OK");
