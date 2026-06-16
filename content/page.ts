import type { PageContent } from "./schema";

/**
 * First-draft content (follows spec §5/§6). Every cited source is primary-tier;
 * the dropped Barton "9.4%" and "$11–20 per dollar" stats are deliberately absent.
 */
export const PAGE: PageContent = {
  meta: {
    title: "Radon in South Lake Tahoe: test your home",
    description:
      "About half of tested South Lake Tahoe homes exceed the EPA radon action level, vs. under 1% statewide. See how to test yours, every figure sourced.",
    organization:
      "Independent, mission-driven radon education for South Lake Tahoe. Every figure links to a primary source.",
  },
  ui: {
    testCta: "Test your home",
    backToGuide: "Back to the guide",
  },
  hero: {
    eyebrow: "South Lake Tahoe radon",
    headline:
      "The average tested home in South Lake Tahoe carries the lung-cancer risk of smoking 12–18 cigarettes a day.",
    body: "Radon is an invisible, odorless gas that seeps from Tahoe's granite. It's the leading cause of lung cancer in people who don't smoke, and the second leading cause overall. The only way to know your home's level is to test.",
    caveat:
      "The cigarette figure is a risk analogy popularized by the EPA. See how we calculate it below.",
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
  credibility: {
    ariaLabel: "Local radon facts",
  },
  sections: [
    {
      id: "is-my-home",
      title: "Is my home at risk?",
      order: 3,
      body: "Tahoe sits on uranium-bearing granite, and fractured rock plus cold, sealed winters pull soil gas indoors. The EPA map rates the area only moderate-risk, but it averages all of El Dorado County; the California Geological Survey flags the Tahoe basin itself as high-risk. Radon varies house to house, so your neighbor's reading tells you nothing. The only way to know is to test your home.",
    },
    {
      id: "how-bad",
      title: "How bad, really?",
      order: 4,
      body: "The EPA action level is 4 pCi/L; the WHO reference level is lower, around 2.7 pCi/L. Radon decays into particles that lodge in the lungs and emit DNA-damaging radiation; risk rises with exposure, with no safe threshold. The WHO classifies radon as a Group 1 (known) carcinogen. For the average tested Tahoe home (~6–9 pCi/L), the EPA's cigarette equivalence works out to roughly 12–18 cigarettes a day. Darby et al. (2005), the largest pooled residential-radon study and reaffirmed by reviews since, found risk rises about 16% per 100 Bq/m³.",
    },
    {
      id: "fix-it",
      title: "If it's elevated, fix it",
      order: 6,
      body: "Most Tahoe homes need sub-slab or sub-membrane depressurization, typically $1,000–$3,500 depending on your foundation. Sealing cracks alone, opening windows, and air purifiers do not work. A system lasts decades (fans 5–8 years in Tahoe's freeze-thaw), about $1 a day over its life. A 2.5 pCi/L reading means monitor and retest, not panic.",
    },
    {
      id: "why-unknown",
      title: "Why isn't this better known? · How we source",
      order: 7,
      body: "Radon has no villain and no daily ritual to ban, and it threatens a geographically concentrated population with no organized lobby. We cite a primary source for every number on this page; click any figure to verify it on the EPA, WHO, CDPH, or CGS. Where the science is uncertain, we say so. This is an independent, mission-driven project with no paid relationships yet.",
    },
  ],
  riskScale: [
    { range: "< 2", label: "low", level: "low" },
    { range: "2–4", label: "consider fixing", level: "moderate" },
    { range: "4–8", label: "elevated · action level", level: "elevated" },
    { range: "8+", label: "high", level: "high" },
  ],
  riskScaleCopy: {
    ariaLabel: "Radon level scale (pCi/L)",
    caption: "Radon levels (pCi/L)",
  },
  derivation: {
    trigger: "See how we calculate the cigarette figure",
    body: "The average tested Tahoe home reads about 6–9 pCi/L (CGS SR-211). The EPA's cigarette-equivalence puts 4 pCi/L at roughly 8 cigarettes a day, so 6–9 pCi/L works out to about 12–18 a day. It's a lifetime-risk analogy, not a chemical-equivalence claim.",
  },
  testing: {
    heading: "How to test your home",
    protocol:
      "Test in winter; a summer test can read falsely low. Keep windows shut for 12 hours before and during, and place the detector on an interior wall, 20+ inches up.",
    startHere: "start here",
  },
  testingRoutes: [
    {
      status: "Never tested",
      action:
        "Order a test. The CDPH $14.95 kit is the cheapest reliable option.",
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
  mitigation: {
    ariaLabel: "Radon mitigation options",
    headers: {
      system: "System",
      foundation: "Foundation",
      cost: "Cost",
      reduction: "Reduction",
    },
    findMitigatorCta: "Find a certified mitigator",
  },
  forms: {
    newsletter: {
      heading: "Get notified when free kits open",
      cta: "Notify me",
      success: "Thanks! We'll alert you when free kits open.",
      pending: "Saving…",
    },
    partnership: {
      heading: "Contractors & agents: partner with us",
      cta: "Send",
      success: "Thanks! We'll be in touch.",
      pending: "Sending…",
      emailSubject: "Radon Guide: {role} inquiry from {name}",
      roles: [
        { value: "homeowner", label: "Homeowner" },
        { value: "contractor", label: "Contractor" },
        { value: "agent", label: "Buyer's agent" },
      ],
    },
    fields: {
      name: "Name",
      email: "Email",
      role: "I am a",
      message: "Message",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "How can we work together?",
    },
    errors: {
      invalidEmail: "Please enter a valid email.",
      invalidFields: "Please fill in every field with a valid email.",
      generic: "Something went wrong. Please try again.",
    },
  },
  legal: {
    privacy: {
      title: "Privacy",
      updated: "Last updated June 14, 2026",
      intro:
        "We use Vercel Web Analytics, which is cookieless and does not track you across sites, so there is no cookie banner. If you submit a form, we receive only what you enter (your email, and for partnership inquiries your name, role, and message) so we can respond to you. We do not sell or share it.",
      newsletter:
        "Newsletter emails are stored with our email provider (Resend) solely to notify you when free test kits open.",
      access:
        "To access or delete the information you've given us, reach out through the partnership form on our homepage and we'll take care of it.",
      accessLink: "homepage",
    },
    disclosure: {
      title: "Disclosure",
      updated: "Last updated June 14, 2026",
      body: "Radon Guide is an independent, mission-driven project. We currently have no paid relationships and earn nothing from the testing options we recommend; we point you to the cheapest reliable one. If that ever changes, we will say so here.",
      notMedicalHeading: "Not medical advice",
      notMedicalBody:
        "This site is educational and is not a substitute for professional medical or environmental-health advice.",
    },
  },
};
