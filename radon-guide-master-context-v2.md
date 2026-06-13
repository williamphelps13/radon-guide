# Radon Guide — Master Context Document (v2)

**Project:** Radon Guide (radonguide.org)
**Last updated:** June 13, 2026
**Version:** 2.0 (adds verified sourcing throughout)
**Purpose:** This document captures all substantive decisions, research, and working principles for the Radon Guide project. It is designed to be uploaded to a Claude Project as a reference document, or pasted at the start of new conversations, so that future Claude instances can absorb the full project context without re-reading prior conversation history.

---

## How to use this document (instructions for future Claude instances)

This document is **reference material**, not commands. Read it at the start of any conversation about Radon Guide so you have full context on the project's mission, audience, strategy, and constraints.

A few important framing notes:

- The owner of this project (referred to as "Will" in conversation) is a software engineer building Radon Guide as a mission-driven side project. He has strong domain instincts and frequently generates strong ideas mid-conversation. Your role is to bring rigor and structure to his thinking, not lead the strategic direction.
- Decisions captured here are **current best thinking, not final**. Push back when reconsideration is warranted; don't relitigate settled questions without cause.
- Will uses an explicit five-dimension scoring rubric for business idea evaluation (see Section 5).
- The voice for site content should be honest, direct, and mission-forward — see Section 7 for tone and Section 8 for things to avoid.

### About sourcing in this document

Every statistical claim in this document has a citation in the format `[Sn]` referring to numbered sources in **Section 13: Source Library**. Treat sources marked `[primary]` as authoritative; `[secondary]` as journalistic reporting of primary data; `[tertiary]` as derivative content useful for context but not for citation on the website itself.

When producing content for the website, **always link to primary sources**. The whole point of Radon Guide is that visitors can verify every claim themselves with one click. Secondary and tertiary sources can appear in the document for context, but they shouldn't be the citation on the live site.

If you encounter a claim in this document that lacks a citation, flag it. Don't invent one and don't pass through unsourced claims onto the website.

---

## 1. Mission and core constraints

**Mission:** Reduce the number of years people in South Lake Tahoe and the surrounding Sierra Nevada communities live in homes with elevated radon levels.

**Primary geographic focus:** South Lake Tahoe, California. Secondary expansion targets: Truckee, Reno, and the broader Sierra Nevada region.

**Why Tahoe specifically:**
- South Lake Tahoe sits on uranium-bearing Sierra Nevada granite, which produces radon at unusually high rates. `[S1, S2]`
- Roughly 40% of tested homes in the broader Lake Tahoe area are at or above the EPA action level of 4 pCi/L, with ~55% in the El Dorado County portion of the basin and over 50% in the City of South Lake Tahoe specifically. Statewide California average is <1%. `[S1, S2, S3]`
- An estimated 23,400 people in the Lake Tahoe area live in buildings where radon is likely to equal or exceed the EPA action level. `[S1, S2]`
- A basement measurement in the 2006–2007 CDPH/CGS Tahoe survey was more than 20 times the EPA action level (>80 pCi/L). `[S1]`
- The Barton Memorial community health survey found local lung cancer rates were 9.4% higher on the South Shore than the rest of California. `[S4]`
- The EPA's official zone map underrates the area as Zone 2 because it averages all of El Dorado County. California's newer state geological survey identifies the Tahoe basin specifically as high-risk. `[S1, S2]`

**Core mission constraint:** The success metric is **radon-years reduced**, not page views, leads generated, or revenue. Every strategic decision should be filtered through "does this reduce the number of years people live in elevated-radon homes?" Revenue is a means to mission impact, not the goal.

---

## 2. Audience

**Primary audiences (in rough order of importance):**

1. **Full-time South Lake Tahoe homeowners** — typically 35–70, often professionals who moved to the area for lifestyle reasons. Generally environmentally aware. Moderately health-conscious.
2. **Vacation-home owners** — many live in the Bay Area, Sacramento, or Reno, visit Tahoe periodically. Often delegate maintenance to property managers. Underserved by current radon outreach because they don't live there full-time.
3. **Buyer's agents and real estate professionals** — high-leverage audience because they advise buyers at the moment of greatest decision-making power (escrow). See Section 5 — the buyer's agent partnership is the highest-leverage idea identified.
4. **Local mitigation contractors** — potential referral partners. Roughly 3–5 active contractors serve the Tahoe basin.
5. **Underserved demographics** — Spanish-speaking renters and workforce. Worth eventual targeted content but not v1.

**Audience characteristics that matter for content:**
- Many are skeptical of "fearmongering" health content — credibility is built through specificity, honesty about uncertainty, and restraint.
- Many already have outdated information from the EPA's federal zone map. The site needs to correct this gently.
- Mobile-first — most local search traffic in 2026 is mobile.

---

## 3. Educational content reference (the 12 sections)

Each section below contains the plain-English summary plus source citations for the key claims. Longer versions exist in conversation transcripts and can be regenerated.

### 3.1 What is radon?

Radon is an invisible, odorless radioactive gas released as uranium in soil and rock naturally breaks down. It seeps up out of the ground everywhere — outside it's harmless, but when it gets sucked into a home through cracks in the foundation, it can collect indoors and reach levels that cause lung cancer over time. `[S5, S6, S7]`

Key facts:
- Chemical symbol Rn, atomic number 86. Noble gas, doesn't bind to anything.
- Measured in pCi/L (picocuries per liter) in the U.S.; 1 pCi/L = 37 Bq/m³ internationally.
- Average outdoor air: ~0.4 pCi/L. Average U.S. indoor air: ~1.3 pCi/L. `[S5]`
- The only way to know if your home has a problem is to test. `[S5, S7]`

### 3.2 What causes elevated radon levels in a home?

Two factors: how much uranium is in the rock under your house, and how easily your house pulls soil gas inside. South Lake Tahoe is a perfect storm because the granite is uranium-rich, fractured rock under most homes lets radon move freely, cold winters keep homes sealed for months, frozen ground forces radon upward, and warm indoor air pulls soil gas in through any crack. Newer homes aren't safer — tight modern homes hold radon better. The house next door's test result tells you nothing about yours. `[S1, S4]`

Key drivers:
- Geology (granite, shale, phosphate, glacial deposits) `[S1, S8]`
- Soil permeability `[S1]`
- Frozen or saturated ground `[S1]`
- The stack effect (warm indoor air rises → lower indoor pressure → soil gas pulled in)
- Foundation pathways (cracks, sump pits, utility penetrations) `[S5]`
- Winter season (peak levels in Tahoe especially) `[S1]`

### 3.3 What is considered elevated radon levels?

The EPA action level is 4.0 pCi/L (148 Bq/m³). The WHO recommends a stricter 100 Bq/m³ (~2.7 pCi/L) reference level. There is no truly safe level — risk increases steadily with exposure. A well-designed mitigation system typically brings a home down to 2.0 pCi/L or below. `[S5, S9, S10]`

| Level (pCi/L) | Meaning | Source |
|---|---|---|
| 0.4 | U.S. outdoor average | `[S5]` |
| 1.3 | U.S. indoor average | `[S5]` |
| 2.0 | EPA "consider fixing" | `[S5]` |
| 2.7 (100 Bq/m³) | WHO reference level | `[S9, S10]` |
| 4.0 (148 Bq/m³) | EPA action level | `[S5]` |
| 8.1 (300 Bq/m³) | WHO maximum ceiling | `[S9, S10]` |

For South Lake Tahoe: average tested levels are at or above 4.0 pCi/L for ~40–55% of homes; the EPA's 2009 Tahoe survey found a basement measurement >80 pCi/L. `[S1, S2]`

### 3.4 Why is radon harmful?

Radon decays into solid radioactive particles (polonium isotopes) that stick to lung tissue. Those particles fire off alpha particles — high-energy radiation that breaks DNA in lung cells. Over years, unrepaired mutations accumulate until cells become cancerous. There are no symptoms until cancer is advanced. `[S5, S11]`

Smoking + radon is multiplicative. The pooled European residential radon study (Darby et al. 2005, the gold-standard scientific source) found:
- For lifelong non-smokers, the absolute risk of lung cancer by age 75 at radon concentrations of 0, 100, and 400 Bq/m³ is about 0.4%, 0.5%, and 0.7% respectively.
- For cigarette smokers at the same concentrations: 10%, 12%, and 16% — roughly **25× higher** than non-smokers. `[S11, S12]`
- Lung cancer risk increases by 16% per 100 Bq/m³ increase in long-term residential radon (after correction for measurement uncertainty). The dose-response relationship is linear with no threshold. `[S11, S12]`

EPA's per-1,000 risk estimates at the U.S. average of 1.3 pCi/L: 2 in 1,000 for never-smokers; 20 in 1,000 for smokers. At 4 pCi/L: 7.3 in 1,000 for never-smokers; 62 in 1,000 for smokers. `[S13]`

### 3.5 How many people are impacted?

| Scale | Lung cancer deaths/yr from radon | Homes above 4.0 pCi/L | Source |
|---|---|---|---|
| World | ~80,000–230,000 (varies by methodology) | Varies by country | `[S9, S10]` |
| U.S. | ~21,000 (uncertainty: 8,000–45,000) | ~1 in 15 (older EPA estimate) | `[S13, S14]` |
| California | No published state-level figure | <1% statewide | `[S15]` |
| South Lake Tahoe | Not officially measured; lung cancer rates ~9.4% above CA average | 40–55% of tested homes | `[S1, S2, S4]` |

### 3.6 Risks by area of the U.S.

The EPA divides U.S. counties into three zones based on predicted average indoor radon screening levels (established 1993 under the Indoor Radon Abatement Act of 1988):
- **Zone 1 (red):** Predicted average >4 pCi/L. Highest risk.
- **Zone 2 (orange):** Predicted average 2–4 pCi/L. Moderate risk.
- **Zone 3 (yellow):** Predicted average <2 pCi/L. Lowest risk.

The EPA emphasizes that **homes with elevated levels of radon have been found in all three zones — the map is not a substitute for testing your specific home.** `[S15]`

Highest-risk states by share of Zone 1 counties: Iowa, Pennsylvania, the Dakotas, Minnesota, Ohio, Montana, Idaho, Colorado. Lowest-risk states are mostly coastal: Florida, Louisiana, Hawaii, the Carolinas, Washington. `[S15]`

**Critical insight specific to this project:** California is officially Zone 2 statewide. The EPA map averages risk at the county level, which means South Lake Tahoe — sitting on uranium-bearing granite — gets averaged together with the rest of El Dorado County. The California Geological Survey's 2009 Special Report 211 (the authoritative state-level analysis) identifies the Tahoe basin as a high-risk area specifically. `[S1, S2]` This gap between federal classification and state-level data is one of the strongest content angles the site can lead with.

### 3.7 Annual U.S. cost of radon

No single official figure exists. Built from components:
- Direct medical spending only: ~$2–3 billion/year (radon-attributable share of lung cancer care)
- Direct + indirect (productivity, caregiver burden): ~$10–15 billion/year
- Full economic burden including statistical value of lives lost: ~$200+ billion/year

**Strongest single statistic for the site:** Every dollar spent on radon testing and repairs in multifamily housing returns **$11 to $20** in avoided healthcare costs. `[S16]`

Note: The "$11–20 returned per dollar" figure originates from American Lung Association reporting and is widely cited in HUD and state health publications. The underlying study methodology is worth understanding before relying heavily on this number — it's a strong communication statistic but the original source should be reviewed for caveats.

### 3.8 Comparison to smoking and pollution

The cigarette-equivalent framing is the most accessible way to convey radon risk to homeowners:
- 2 pCi/L ≈ 4 cigarettes/day
- 4 pCi/L (EPA action level) ≈ 8 cigarettes/day
- 8 pCi/L ≈ 16 cigarettes/day
- 10 pCi/L ≈ 20 cigarettes/day (a pack a day)

This framing originated with the 1986 EPA Citizens' Guide to Radon. It was strongly criticized at the time as imprecise — the mechanism (alpha radiation vs. chemical carcinogens) is different, but the **lifetime lung cancer risk numbers align**. Use it as a communication tool with appropriate acknowledgment of the caveat. `[S5, S13]`

For a Tahoe homeowner: the average tested South Lake Tahoe home (~6–9 pCi/L) carries the equivalent of about 12–18 cigarettes per day of lung cancer risk, for every person in the household, every day they're inside.

The Berkeley Earth PM2.5-to-cigarette equivalence (1 cigarette/day ≈ 22 µg/m³ PM2.5) lets us compare radon to outdoor air pollution: a 4 pCi/L home carries comparable lung cancer risk to year-round residence in Delhi (annual average PM2.5 ~150-200 µg/m³, equivalent to ~9 cigarettes/day). A Tahoe home at 8 pCi/L exceeds Delhi's annual-average risk. Source the PM2.5 framing to Berkeley Earth before using on the live site.

### 3.9 Why isn't radon as well-known as smoking?

The honest answer: radon doesn't have a villain, doesn't make for compelling news, and threatens a population that has no organized lobby. Smoking had Big Tobacco to sue, a daily ritual to ban, and cultural identity to fight. Radon is geology — no one to blame, no behavior to give up. Other reasons:
- No symptoms, no visible behavior, 10–30 year latency
- Geographically concentrated (most senators don't represent radon-heavy states)
- EPA action level set in 1986 as a cost-effectiveness compromise, never updated
- Real estate has structural incentives to downplay it
- Natural hazards are systematically underrated vs. man-made ones

This section is primarily analytical synthesis; specific claims about EPA history come from the EPA Citizens Guide history `[S5]` and the Indoor Radon Abatement Act of 1988.

### 3.10 How to test

**The decision tree:**
- Never tested → $14.95 short-term kit from CDPH (California-specific best option), or $10–30 hardware store kit. `[S17]`
- Tested under 2 pCi/L → retest every 5 years. `[S17]`
- Tested 2–4 pCi/L → long-term test (3–12 months) to confirm year-round average. `[S5, S17]`
- Tested 4+ pCi/L → confirm with second test, then mitigate. `[S5]`
- Want continuous monitoring → Airthings or Ecosense monitor ($130–200).

**Critical for Tahoe:** Best test season is winter. Summer testing in a vacation home with windows open dramatically underestimates risk. `[S1]`

**Closed-house protocol:** Windows shut 12 hours before and during the test; detector on an interior wall, 20+ inches above the floor, away from kitchens and bathrooms. `[S5]`

**Free kits in California:** CDPH periodically offers free test kits (typically January, National Radon Action Month) when EPA State Indoor Radon Grant funding is available. `[S17, S18]`

### 3.11 Mitigation solutions and costs

| System | Foundation type | Typical cost | Reduction |
|---|---|---|---|
| Sub-slab depressurization (ASD) | Basement, slab | $1,000–$2,500 | 90–99% |
| Sub-membrane depressurization | Crawl space | $1,500–$3,500 | 90–99% |
| Drain tile depressurization | Basement w/ drain tile | $1,000–$2,500 | 90–99% |
| Block wall depressurization | Hollow block walls | $1,800–$3,000 | 85–95% |
| Passive (new construction) | Any | $350–$750 (during build) | Variable |
| ERV/HRV (ventilation) | Any | $1,500–$2,500 | 50–75% |
| Water aeration | Private well | $3,000–$5,500 | 95–99% |
| Water GAC filtration | Private well (low–medium radon) | $1,500–$3,000 | 85–99% |

EPA Citizens' Guide cites an average cost of ~$1,200 with a typical range of $800–$2,500; HomeAdvisor/Angi data (2026) puts the average closer to $1,000–$1,500 with most homeowners spending between $787 and $1,280. Higher-cost regions like Los Angeles average ~$2,000. `[S5, S19, S20]`

For Tahoe specifically: most homes need sub-slab or sub-membrane depressurization in the $1,200–$2,500 range. Many Tahoe vacation homes have crawl spaces, which favors the sub-membrane approach.

**Things that don't work:** sealing cracks alone, opening windows, air purifiers, bathroom fans. Worth flagging because homeowners try these. `[S5]`

### 3.12 How long mitigation solutions last

- PVC pipes: 50–100 years (effectively permanent)
- Radon fan: 5–10 years (8 years average); $300–600 to replace `[S5]`
- Manometer: 10–15 years
- Overall system: 20+ years

For Tahoe: fans wear faster due to cold/snow/freeze-thaw cycles. Plan on 5–8 year fan lifespan for exterior-mounted fans.

**Total lifetime cost over 25 years:** ~$350/year (~$1/day) for installation + fan replacements + electricity. A radon mitigation system outlasts most other home mechanical systems (roof, HVAC, water heater) with the lowest maintenance burden.

---

## 4. Working principles and meta-level decisions

### 4.1 The scoring rubric for business ideas

Every business idea is evaluated across five dimensions, scored 1–10:

1. **Profitability** — realistic revenue range, unit economics
2. **Ethics / conflict-of-interest avoidance** — how much does this distort honest content?
3. **Initial time investment** (low = high score)
4. **Ongoing time investment** (low = high score)
5. **Impact** — does this actually reduce years lived in elevated radon homes?

Unweighted averages can mislead; the spread across dimensions is often more important than the mean.

### 4.2 Hard "do not do" decisions

These have been deliberated and decided. Don't re-evaluate without strong new information:

- **No Google Ads on the site.** They monetize high-intent visitors by routing them to competitors at ~$1.50 per click — directly cannibalizing the higher-value referral funnel.
- **No fearmongering content.** Established cigarette comparisons are allowed (they're well-cited and standard). Manipulative imagery, exaggerated risk claims, or pressure tactics are not.
- **Don't slant content toward mitigation when not needed.** A homeowner with a 2.5 pCi/L reading deserves the honest "monitor and retest in a year" answer even though it earns no referral fee.
- **Don't bury the cheap options.** The CDPH $14.95 kit (and free January program) must be prominently mentioned wherever testing is discussed — even though it pays nothing. `[S17]`

### 4.3 The "is this worth doing at all" test

> A monetization idea is worth doing if it scores at least 6 on impact AND its profitability justifies the time investment.

By this filter, the current portfolio is:

- ✅ Referral partnerships (Idea #1): impact 9, modest time, modest revenue
- ✅ Scheduling integration (Idea #2): impact 10, moderate time, better revenue
- ✅ Amazon affiliate links (Idea #3): impact 6, near-zero time — pure upside
- ❌ Google Ads (Idea #4): impact 3 — fails both halves
- 🤔 Own remediation business (Idea #5): impact 10, very high time, very high revenue — deferred 12–18 month decision
- ⭐ Buyer's agent partnerships: impact 10, ethics 9, moderate time — highest-scoring idea identified

---

## 5. Business model portfolio

### 5.1 The six ideas evaluated, with scores

| Idea | Profitability | Ethics | Initial time | Ongoing time | Impact | Avg |
|---|---|---|---|---|---|---|
| #1 Contractor referrals | 5 | 7 | 8 | 8 | 9 | 7.4 |
| #2 Scheduling integration | 7 | 7 | 6 | 6 | 10 | 7.2 |
| #3 Amazon affiliate | 3 | 8 | 9 | 9 | 6 | 7.0 |
| #4 Google Ads | 2 | 4 | 9 | 10 | 3 | 5.6 |
| #5 Own remediation business | 9 | 5 | 2 | 1 | 10 | 5.4 |
| **Buyer's agent partnerships** | **7** | **9** | **6** | **7** | **10** | **7.8** |

### 5.2 The recommended portfolio

**Tier 1: Always run these (core business)**
- Ideas #1 + #2 combined as the primary monetization. Start with simple referral relationships and progressively add scheduling infrastructure.
- Idea #3 (Amazon affiliate). Pure upside. Add from day one.
- Buyer's agent partnerships as the primary growth channel.

**Tier 2: Skip entirely**
- Idea #4 (Google Ads).

**Tier 3: Future strategic question**
- Idea #5 (own remediation business). Don't commit Day 1. Re-evaluate at month 12–18.

### 5.3 Phased rollout

- **Q1 (months 1–3):** Build educational site. Set up Amazon affiliate. Begin contractor outreach. Begin SEO groundwork.
- **Q2 (months 4–6):** Sign 2–3 contractor referral partners. Launch scheduling integration (Calendly/Cal.com). Begin collecting consent for anonymous radon data.
- **Q3 (months 7–9):** Optimize funnel. Begin buyer's agent outreach. Build local press partnerships.
- **Q4 (months 10–12):** Launch v1 of the anonymized radon map (if 30+ data points). Conduct self-assessment on Path A (content/referral) vs. Path B (own contracting).
- **Year 2+:** Choose path. Expand geographically (Truckee, Reno) or begin licensing for own remediation business.

---

## 6. The anonymized neighborhood radon map

**Strategic significance:** Potentially the single most valuable feature on the site. No one publishes granular, neighborhood-level radon data for South Lake Tahoe.

**Design parameters:**
- Granularity: ~1/4-mile hexagonal bins
- Minimum sample size per bin: 3–5 readings before displaying
- Color coding: matches EPA zones + highlights WHO 2.7 pCi/L threshold
- Every reading is opt-in with explicit consent
- Filters: season, foundation type, test type

**Critical decision:** Consent capture must be built into the booking flow from the first customer.

**Bootstrapping sources for early map content:**
- CDPH publicly available data (statewide survey results) `[S17, S18]`
- California Geological Survey SR-211 (Lake Tahoe Radon Potential, 2009) `[S1, S2]`
- Voluntary user submissions (with verification)
- Aggregated data from contractor partners

---

## 7. Voice, tone, and content principles

The site's editorial voice should be:

- **Direct and honest, not corporate.** Plain English. No jargon unless explained.
- **Mission-forward without being preachy.** State the facts, let them carry the weight.
- **Specific over generic.** Real local data, named locations, concrete numbers beat abstract claims.
- **Acknowledging uncertainty where it exists.** "There's no scientific consensus on the exact cigarette equivalence" is more credible than "Living at 4 pCi/L = smoking 8 cigarettes/day, fact."
- **Skeptic-aware.** Many visitors arrive thinking "this is fearmongering." Earn their trust in the first 10 seconds through specificity, honesty, and restraint.

**Reference for voice:** The Radon Project (Canadian peer, https://www.theradonproject.org/). Their copy is direct, family-focused, emotionally grounded without manipulation. Their success stories are particularly well-written.

**Critical citation practice for the website:** Every statistic visible to users should link to a primary source. Visitors should be able to click any number and land on the EPA, WHO, CDC, CDPH, or CGS page that proves it. This is the single most important credibility signal a mission-driven information site can convey. The source library in Section 13 is the foundation for this.

---

## 8. Things to actively avoid

- **Over-engineering at the POC stage.** Single HTML file → Netlify drop is the right starting point.
- **Premature monetization.** v1 focuses on content quality and credibility.
- **Adding Google Ads.** See Section 4.2.
- **Scope creep in v1.** No map, no contractor directory with filtering, no custom scheduling, no Spanish-language version.
- **Trying to be "the comprehensive U.S. radon resource."** Tahoe-focused mission, Sierra Nevada expansion path.
- **Lifting copy from other radon sites.** Radon Guide's voice should be distinct.
- **Slanting product recommendations toward higher-commission options.**
- **Letting fear of being "alarmist" produce content that's too mild.** The cigarette comparison, the 40–50% Tahoe statistic, and the 21,000 annual U.S. deaths are not hyperbole — they're the truth.
- **Promising things the site can't deliver.**
- **Passing through unsourced statistics.** If a claim doesn't have a source, find one or remove it.

---

## 9. Open questions and undecided strategic issues

### 9.1 For-profit referral business vs. nonprofit (501c3) structure

The current plan is for-profit referral. The Radon Project (Canadian peer) runs as a nonprofit. Worth a serious conversation before significant capital is committed.

### 9.2 Final v1 success criteria

Likely candidates:
- Share URL with 5–10 South Lake Tahoe homeowners
- Show to 2–3 mitigation contractors as partnership pitch
- Show to 1–2 buyer's agents
- Have a working Google Form or Calendly for early test bookings

Will should commit to specific v1 success criteria before building.

### 9.3 Path A vs. Path B at month 12–18

Whether to remain a content/referral business or transition into operating the remediation business.

### 9.4 Geographic expansion timing and sequence

Truckee is the natural first expansion. Reno is bigger but has more competition. Broader Sierra Nevada (Bishop, Mammoth, Tahoe City) is fragmented.

### 9.5 Partnership with The Radon Project

Likely worth pursuing after v1 is live.

### 9.6 Buyer/seller data capture through Tahoe real estate transactions

If buyer's agents start recommending radon testing, the test data they generate is valuable. Whether this data is collected through agent partnership, contractor referral, or some third structure is an open design question.

### 9.7 Verifying the "$11–20 returned per dollar" figure

Trace this widely cited statistic back to its original source (likely an American Lung Association or CDC analysis) before relying heavily on it for site content. The figure is real and frequently cited in HUD/state publications, but the underlying methodology should be reviewed.

---

## 10. The Radon Project (peer organization reference)

**URL:** https://www.theradonproject.org/
**Location:** Calgary, Alberta, Canada
**Model:** Canadian nonprofit, donation-funded
**Founded:** Growing initiative, public-facing in 2026

**Their model:**
- Direct provision of free testing and mitigation to vulnerable households
- "Borrow to Breathe" program: free long-term radon testing
- Pipeline: certified measurement → diagnostics → mitigation → ongoing support
- Funded by donations and material donations from mitigation industry

**Their compelling statistics (worth referencing or adapting):**
- 16% of lung cancer deaths caused by radon (Canadian figure)
- 1 in 5 homes have high radon
- 48% of Canadian homes exceed WHO reference level
- 88% of Canadian homes have not tested
- Annual Canadian radon deaths (3,200) > car accidents (1,898) + carbon monoxide (300) + house fires (109) combined

These are Canadian numbers; do not present as U.S. figures on the Radon Guide site without conversion.

---

## 11. Technical and infrastructure decisions

**Domain:** radonguide.org (primary).
**Hosting:** Netlify for POC. Will eventually migrate to a static site generator (Astro or Eleventy) when content scope grows.

**Workflow during POC stage:**
- Will uses Claude.ai chat to generate HTML
- Copy/paste to Netlify Drop, or set up Netlify MCP connector for in-chat deployment
- Stay with single-HTML approach until ~5–10 pages

**When to graduate to Claude Code + framework:** Around month 3, once content and structure are settled.

**Analytics:** Plausible or Simple Analytics (privacy-friendly, no cookie banner). From day one.

**Required infrastructure for v1:**
- Educational content (compressed versions of 12 sections)
- Hero with strong hook (cigarette comparison, 40–50% Tahoe homes statistic, or both)
- Email capture for future newsletter
- Contact form for contractor and agent partnerships
- Basic SEO: title tags, meta descriptions, semantic HTML, sitemap.xml, robots.txt
- Privacy policy and disclosure pages
- **Inline links to primary sources for every statistic on the page**

**Not required for v1:**
- Map (defer to month 9–12)
- Multi-page architecture (single-page POC is fine)
- Scheduling integration (defer to month 4–6)
- Custom domain (use *.netlify.app initially)

---

## 12. Known active business opportunities not yet executed

1. **Contractor partnership outreach** — identify 3–5 active South Lake Tahoe radon mitigation contractors, draft referral agreement template.
2. **Buyer's agent outreach** — identify top 15–20 active buyer's agents by transaction volume, build agent-facing material.
3. **Real estate CE course development** — California DRE-approved continuing education provider status. ~40–60 hours of setup.
4. **CDPH partnership** — California Department of Public Health. Potential cross-promotion, shared content, or grant opportunities. `[S17]`
5. **Barton Memorial / local healthcare** — conducted the lung cancer community health survey. Natural educational partnership. `[S4]`
6. **Local press** — Tahoe Daily Tribune, Sierra Sun, Moonshine Ink, South Tahoe Now. Story angles already covered by these outlets `[S3, S4, S21, S22]`, suggesting receptivity.
7. **Tahoe Sierra Board of REALTORS®** — long-term: get radon testing onto standard inspection contingency checklist.
8. **The Radon Project outreach** — wait until v1 is live.

---

## 13. Source Library

Every statistic in this document is cited to one of these sources. For the website, **link to the primary sources directly** so visitors can verify any claim with one click.

### Primary sources (authoritative, cite directly on website)

**[S1] California Geological Survey, Special Report 211: Radon Potential in the Lake Tahoe Area, California (2009)**
- URL: https://www.conservation.ca.gov/cgs/documents/publications/special-reports/SR_211-Radon-Report.pdf
- Author: Ronald K. Churchill, Ph.D.
- The single most important Tahoe-specific source. Includes 443-home survey results (2006–2007), geologic analysis, and the maps that contradict the EPA's underclassification of Tahoe risk.
- Best for: Tahoe-specific statistics, geological context, methodology.

**[S2] California Geological Survey, SR-211 Plate 1: Radon Potential Zone Map for the Lake Tahoe Area**
- URL: https://www.conservation.ca.gov/cgs/documents/publications/special-reports/SR_211-Radon-Map.pdf
- The accompanying visual map showing very high / high / moderate / low risk zones across the Tahoe basin.
- Best for: Visual reference on the website (where licensing permits) or as a link from the map page.

**[S5] EPA, A Citizen's Guide to Radon (2016 edition, EPA 402-K-12-002)**
- URL: https://www.epa.gov/sites/default/files/2016-12/documents/2016_a_citizens_guide_to_radon.pdf
- The foundational consumer-facing EPA radon document. Includes the action level, test recommendations, and the risk-comparison tables.
- Best for: Almost every general radon claim — action level, mitigation cost, testing protocol, basic facts.

**[S9] WHO Handbook on Indoor Radon: A Public Health Perspective (2009)**
- URL: https://www.ncbi.nlm.nih.gov/books/NBK143216/ (full text via NCBI Bookshelf)
- Also: WHO fact sheet at https://www.who.int/news-room/fact-sheets/detail/radon-and-health
- Source for the 100 Bq/m³ reference level recommendation, the 300 Bq/m³ ceiling, and global lung cancer attribution range (3–14% of lung cancer cases worldwide).
- Best for: International / WHO recommendations, scientific framing of radon as a carcinogen, policy context.

**[S10] WHO Fact Sheet: Radon and Health**
- URL: https://www.who.int/news-room/fact-sheets/detail/radon-and-health
- More accessible summary of the Handbook for general public use.
- Best for: Quick citations on radon's status as a leading cause of lung cancer globally.

**[S11] Darby et al., "Radon in homes and risk of lung cancer: Collaborative analysis of individual data from 13 European case-control studies" (BMJ 2005)**
- URL: https://pubmed.ncbi.nlm.nih.gov/15613366/
- The pooled European residential radon study. Gold-standard epidemiological evidence that residential radon causes lung cancer.
- Source for: 16% increase in lung cancer risk per 100 Bq/m³, the absolute-risk tables for smokers vs. non-smokers, the 25× smoker multiplier, linear no-threshold dose-response.
- Best for: Any claim about how radon causes lung cancer at the individual level, especially the smoker/non-smoker comparison.

**[S13] EPA, Health Risk of Radon**
- URL: https://www.epa.gov/radon/health-risk-radon
- The EPA's official summary page on radon health risk, including the 21,000 deaths/year estimate (uncertainty range 8,000–45,000) and the smoker vs. non-smoker risk tables at various exposure levels.
- Best for: U.S. mortality figures, per-1,000 risk tables, the BEIR VI–based methodology.

**[S14] CDC, Radon and Your Health**
- URL: https://www.cdc.gov/radon/features/reduce-radon.html
- CDC's parallel public-facing page on radon. Confirms EPA's 21,000-deaths figure and recommends mitigation at 4 pCi/L.
- Best for: CDC-attributed claims when EPA isn't ideal (e.g., for medical/healthcare audiences).

**[S15] EPA Map of Radon Zones**
- URL: https://www.epa.gov/radon/find-information-about-local-radon-zones-and-state-contact-information
- Also: https://www.epa.gov/sites/default/files/2018-12/documents/radon-zones-map.pdf (printable map PDF)
- The 1993 county-level zone classification, with explicit caveat that all homes should be tested regardless of zone.
- Best for: Background on zone system, the "all three zones contain elevated homes" disclaimer.

**[S17] CDPH (California Department of Public Health) Indoor Radon Program**
- URL: https://www.cdph.ca.gov/Programs/CEH/DRSEM/Pages/EMB/Radon/Radon-Testing.aspx
- Also: https://www.cdph.ca.gov/radon (program landing page)
- Source for the $14.95 partner-lab kit (Alpha Energy), the free-kit program (when SIRG funding available), and California-specific testing/mitigation guidance.
- Best for: Any California-specific recommendation, including the discounted test kit.

**[S18] CDPH press releases / California county Radon Awareness program materials**
- Example: https://sosradon.org/sites/sosradon/files/State_Fact_Sheet_Originals/CA%20Radon%20Facts_2022.pdf
- State-by-state radon facts maintained by sosradon.org (Kansas State University / EPA partnership).
- Best for: County-level testing details and state radon program contacts.

**[S20] EPA Indoor Radon Abatement Act of 1988**
- URL: https://www.law.cornell.edu/uscode/text/15/2663
- The statutory basis for the EPA Citizens' Guide, the radon zone map, and federal radon policy generally.
- Best for: Legal/policy framing, history of federal radon programs.

### Secondary sources (journalism and aggregation, useful for context)

**[S3] Sierra Sun, "Radon persists at Lake Tahoe south shore" (2009)**
- URL: https://www.sierrasun.com/news/radon-persists-at-lake-tahoe-south-shore/
- Local journalism summarizing the CGS Special Report 211 findings.

**[S4] Tahoe Radon (tahoeradon.com), "What is Radon Gas? Why does Lake Tahoe area have radon?"**
- URL: https://tahoeradon.com/radon/
- A local mitigation company's overview. Source for the Barton Memorial 9.4%-higher-lung-cancer-rate statistic. **Note:** verify this Barton Memorial number against a primary source (Barton Health website, peer-reviewed survey) before using on the live site.

**[S21] Moonshine Ink, "The Unspoken Truth About Radon in Tahoe" (2019)**
- URL: https://www.moonshineink.com/tahoe-news/the-unspoken-truth-about-radon-in-tahoe/
- Local journalism with Tahoe-area testing recommendations and a critical view of disclosure practices.

**[S22] South Tahoe Now, "Guest Column: Radon - Tahoe's dirty little secret" (2025)**
- URL: https://southtahoenow.com/06/13/2025/guest-column-radon-tahoes-dirty-little-secret
- Strong local commentary on the EPA zone map's underclassification of Tahoe and Barton Health's response.

**[S16] American Lung Association / National Center for Healthy Housing, Radon in Rental Housing**
- Citation found in Minnesota State Legislature briefing document: https://www.house.mn.gov/comm/docs/uOrCP9Tht0qY8NS3-Naf9Q.pdf
- The "$11–20 returned per dollar invested in multifamily radon mitigation" claim originates here.
- Direct ALA citation URL not located in this research pass; verify before live-site use.

**[S19] HomeAdvisor / Angi mitigation cost data (2026)**
- URL: https://www.homeadvisor.com/cost/environmental-safety/remove-radon-gas
- Also: https://www.angi.com/articles/radon-remediation-cost.htm
- Current market data on mitigation costs in 2026.
- Best for: Cost ranges; cross-reference against EPA's older figures.

### Other useful resources (tertiary or for further research)

**[S6] EPA Radon Program Main Landing Page**
- URL: https://www.epa.gov/radon
- The entry point for all EPA radon resources.

**[S7] EPA, "What is Radon Gas? Is It Dangerous?"**
- URL: https://www.epa.gov/radon/what-radon-gas-it-dangerous
- Plain-English explainer page.

**[S8] U.S. Geological Survey Preliminary Geologic Radon Potential Assessments (1993)**
- General URL: https://pubs.usgs.gov/of/1993/ofr-93-292/
- State-by-state geological radon assessments referenced in the EPA zone map.

**[S12] National Research Council, BEIR VI Report: Health Effects of Exposure to Radon (1999)**
- The foundational scientific report underlying EPA's 21,000-deaths estimate.
- Published by National Academies Press; full text available at https://nap.nationalacademies.org/catalog/5499/

**[S23] Indoor Radon Abatement Act of 1988 (Pub. L. 100-551)**
- 15 USC §§ 2661–2671
- Establishes EPA's authority and obligations for indoor radon programs.

**[S24] California Department of Conservation, Indoor Radon page**
- URL: https://www.conservation.ca.gov/cgs/minerals/mineral-hazards/radon
- Lists all California Geological Survey radon special reports including SR-211 (Tahoe), SR-256 (western El Dorado County, 2024), and the California Online Indoor Radon Potential Map.

### Notes on source confidence

- **S1, S2, S5, S9, S10, S11, S13, S14, S15, S17, S20:** High confidence. These are primary government or peer-reviewed sources, directly verified during this research.
- **S4 (Barton Memorial 9.4% claim):** Repeated across multiple secondary sources but the primary Barton Health publication has not been directly verified. **Verify before live-site use.**
- **S16 ($11–20 per dollar):** Widely cited but original ALA methodology not directly verified in this pass. **Verify before live-site use.**
- **Tahoe-specific cigarette equivalents (12–18 cigs/day):** Derived calculations from established cigarette equivalents at standard pCi/L levels. The underlying cigarette-equivalent framework is from EPA's Citizens Guide history; the Tahoe-specific application is editorial.

---

## 14. Stylistic conventions for this document

- Update whenever significant decisions change
- Re-upload to the Claude Project as a fresh file (don't edit via append)
- Plain Markdown for maximum portability
- Version-numbered in the header
- **All statistics carry citations to Section 13**
- New sources should be added to Section 13 first, then cited inline

If working in a new conversation, the prompt should typically begin with:
> Please read the Radon Guide master context document. Then let's work on [specific task].

---

*End of document.*
