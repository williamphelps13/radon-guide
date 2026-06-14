import type { PageContent } from "./schema";

/**
 * First-draft content (follows spec §5/§6). Every cited source is primary-tier;
 * the dropped Barton "9.4%" and "$11–20 per dollar" stats are deliberately absent.
 */
export const PAGE: PageContent = {
  hero: {
    eyebrow: "South Lake Tahoe radon",
    headline:
      "The average tested home in South Lake Tahoe carries the lung-cancer risk of smoking 12–18 cigarettes a day.",
    body: "Radon is an invisible, odorless gas seeping up from Tahoe's granite. It's a leading cause of lung cancer — and there's no way to know your home's level without testing.",
    caveat:
      "The cigarette figure is a risk analogy popularized by the EPA — see how we calculate it below.",
    sourceIds: ["epa_citizens_guide", "darby_2005"],
  },
  stats: [
    {
      id: "slt_above_action",
      value: "≈50%",
      label: "of tested South Lake Tahoe homes are above the EPA action level",
      sourceId: "cgs_sr211",
    },
    {
      id: "state_avg",
      value: "<1%",
      label: "the statewide California average, for comparison",
      sourceId: "cgs_sr211",
    },
    {
      id: "people_affected",
      value: "23,400",
      label: "people in the Tahoe area live in elevated-radon buildings",
      sourceId: "cgs_sr211",
    },
    {
      id: "us_deaths",
      value: "21,000",
      label: "estimated U.S. lung-cancer deaths per year from radon",
      sourceId: "epa_health_risk",
    },
  ],
  sections: [
    {
      id: "is-my-home",
      title: "Is my home at risk?",
      order: 3,
      body: "Tahoe sits on uranium-bearing granite, and fractured rock plus cold, sealed winters pull soil gas indoors. The EPA map rates the area moderate-risk because it averages all of El Dorado County; the California Geological Survey identifies the Tahoe basin specifically as high-risk. Your neighbor's result tells you nothing — the only way to know is to test your home.",
    },
    {
      id: "how-bad",
      title: "How bad, really?",
      order: 4,
      body: "The EPA action level is 4 pCi/L; the WHO reference level is lower, around 2.7 pCi/L. Radon decays into particles that lodge in the lungs and emit DNA-damaging radiation; risk rises steadily with exposure, with no safe threshold. For the average tested Tahoe home (~6–9 pCi/L), the EPA cigarette-equivalence works out to roughly 12–18 cigarettes a day. Darby et al. (2005), still the reference pooled study and reaffirmed by reviews since, found risk rises about 16% per 100 Bq/m³.",
    },
    {
      id: "fix-it",
      title: "If it's elevated — fix it",
      order: 6,
      body: "Most Tahoe homes need sub-slab or sub-membrane depressurization, typically $1,200–$2,500. Sealing cracks alone, opening windows, and air purifiers do not work. A system lasts decades (fans 5–8 years in Tahoe's freeze-thaw), roughly $1/day over its life. A 2.5 pCi/L reading means monitor and retest — not panic.",
    },
    {
      id: "why-unknown",
      title: "Why isn't this better known? · How we source",
      order: 7,
      body: "Radon has no villain and no daily ritual to ban, and it threatens a geographically concentrated population with no organized lobby. We cite a primary source for every number on this page — click any figure to verify it on the EPA, WHO, CDC, CDPH, or CGS. Where the science is uncertain, we say so. This is an independent, mission-driven project with no paid relationships yet.",
    },
  ],
  testingRoutes: [
    {
      status: "Never tested",
      action:
        "Order a test — the CDPH $14.95 kit is the cheapest reliable option.",
      primary: true,
    },
    { status: "Under 2 pCi/L", action: "You're low. Retest every 5 years." },
    {
      status: "2–4 pCi/L",
      action:
        "Long-term test (3–12 months) to confirm your true year-round average.",
    },
    {
      status: "4 pCi/L or more",
      action: "Confirm with a second test, then mitigate.",
    },
    {
      status: "Want ongoing data",
      action: "Continuous monitor, about $130–200.",
    },
  ],
  mitigationRows: [
    {
      system: "Sub-slab depressurization",
      foundation: "Basement / slab",
      cost: "$1,000–$2,500",
      reduction: "90–99%",
      sourceId: "epa_citizens_guide",
    },
    {
      system: "Sub-membrane depressurization",
      foundation: "Crawl space",
      cost: "$1,500–$3,500",
      reduction: "90–99%",
      sourceId: "epa_citizens_guide",
    },
    {
      system: "ERV/HRV ventilation",
      foundation: "Any",
      cost: "$1,500–$2,500",
      reduction: "50–75%",
      sourceId: "epa_citizens_guide",
    },
  ],
};
