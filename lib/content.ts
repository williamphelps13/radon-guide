import {
  PageContentSchema,
  assertPrimaryTier,
  type PageContent,
} from "@/content/schema";
import { PAGE } from "@/content/page";
import { SOURCES, type SourceId } from "@/content/sources";

let cached: PageContent | null = null;

/** The single seam: components and tests import page content only from here. */
export function getPageContent(): PageContent {
  if (!cached) {
    cached = PageContentSchema.parse(PAGE);
    assertPrimaryTier(cached);
  }
  return cached;
}

export function getSource(id: SourceId) {
  return SOURCES[id];
}
