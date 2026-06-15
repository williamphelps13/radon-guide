type SourceTier = "primary" | "secondary" | "tertiary";

export interface Source {
  id: string;
  label: string;
  url: string;
  tier: SourceTier;
}

/**
 * The single registry of citations. Only `tier: "primary"` sources may back an
 * on-page statistic (enforced by `assertPrimaryTier` in schema.ts and the
 * Playwright credibility gate).
 */
export const SOURCES = {
  cgs_sr211: {
    id: "cgs_sr211",
    label: "CA Geological Survey SR-211",
    url: "https://www.conservation.ca.gov/cgs/documents/publications/special-reports/SR_211-Radon-Report.pdf",
    tier: "primary",
  },
  epa_citizens_guide: {
    id: "epa_citizens_guide",
    label: "EPA Citizen's Guide to Radon",
    url: "https://www.epa.gov/sites/default/files/2016-12/documents/2016_a_citizens_guide_to_radon.pdf",
    tier: "primary",
  },
  epa_health_risk: {
    id: "epa_health_risk",
    label: "EPA — Health Risk of Radon",
    url: "https://www.epa.gov/radon/health-risk-radon",
    tier: "primary",
  },
  epa_zones: {
    id: "epa_zones",
    label: "EPA Map of Radon Zones",
    url: "https://www.epa.gov/radon/find-information-about-local-radon-zones-and-state-contact-information",
    tier: "primary",
  },
  who_radon: {
    id: "who_radon",
    label: "WHO — Radon and Health",
    url: "https://www.who.int/news-room/fact-sheets/detail/radon-and-health",
    tier: "primary",
  },
  darby_2005: {
    id: "darby_2005",
    label: "Darby et al. 2005 (BMJ)",
    url: "https://pubmed.ncbi.nlm.nih.gov/15613366/",
    tier: "primary",
  },
  cdph_radon: {
    id: "cdph_radon",
    label: "CDPH Indoor Radon Program",
    url: "https://www.cdph.ca.gov/Programs/CEH/DRSEM/Pages/EMB/Radon/Radon-Testing.aspx",
    tier: "primary",
  },
  cdph_mitigators: {
    id: "cdph_mitigators",
    label: "CDPH Certified Radon Services Providers",
    url: "https://www.cdph.ca.gov/Programs/CEH/DRSEM/Pages/EMB/Radon/Certified-Radon-Services-Providers.aspx",
    tier: "primary",
  },
  angi_2026: {
    id: "angi_2026",
    label: "Angi radon mitigation cost data",
    url: "https://www.angi.com/articles/radon-remediation-cost.htm",
    tier: "secondary",
  },
  cslb: {
    id: "cslb",
    label: "CA Contractors State License Board (license lookup)",
    url: "https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx",
    tier: "primary",
  },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;
