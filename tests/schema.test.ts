import assert from "node:assert";
import { PageContentSchema, assertPrimaryTier } from "../content/schema";
import { PAGE } from "../content/page";

// Build-time guard: the page content must satisfy the schema, and every cited
// source must be primary-tier. Run via `npm run test:schema` (tsx).
const parsed = PageContentSchema.parse(PAGE);
assertPrimaryTier(parsed);
assert.ok(parsed.stats.length > 0, "expected at least one stat");
console.log("schema guard: OK");
