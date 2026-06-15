import {
  PageContentSchema,
  MitigatorsSchema,
  assertPrimaryTier,
  assertMitigators,
  type PageContent,
  type Mitigators,
} from "@/content/schema";
import { PAGE } from "@/content/page";
import { MITIGATORS } from "@/content/mitigators";
import { SOURCES, type SourceId } from "@/content/sources";

let cached: PageContent | null = null;
let cachedMitigators: Mitigators | null = null;

/** The single seam: components and tests import page content only from here. */
export function getPageContent(): PageContent {
  if (!cached) {
    cached = PageContentSchema.parse(PAGE);
    assertPrimaryTier(cached);
  }
  return cached;
}

/** The mitigator roster, validated and source-checked through the same seam. */
export function getMitigators(): Mitigators {
  if (!cachedMitigators) {
    cachedMitigators = MitigatorsSchema.parse(MITIGATORS);
    assertMitigators(cachedMitigators);
  }
  return cachedMitigators;
}

export function getSource(id: SourceId) {
  return SOURCES[id];
}
