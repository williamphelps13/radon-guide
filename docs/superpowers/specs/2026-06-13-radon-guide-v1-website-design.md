# Radon Guide v1 — Educational Website Design Spec

**Date:** 2026-06-13
**Status:** Reviewed — ready for implementation planning
**Related:** `radon-guide-master-context-v2.md` (master context). Every statistic below cites that document's Section 13 source library by ID (e.g. `[S1]`).

---

## 1. Summary

v1 is a **single rich page**, built on **Next.js 16 (App Router) + React 19**, that serves as the **credible local reference** on radon in South Lake Tahoe. It opens with a visceral but honestly-handled cigarette-risk hook, immediately backs it with sourced local data, and walks the reader through a narrative funnel toward the primary action: **testing their home** (the CDPH $14.95 kit). Every statistic links to a primary source — that verifiability is the site's signature credibility move.

All page **content lives outside the JSX** in a typed content layer, and the site is built **test-first with Playwright**. These two choices reinforce each other (see §8) and keep a future CMS migration cheap (see §7).

**Guiding design rule:**
> The funnel earns the right to persuade by over-delivering on proof at every step. Every emotional claim is followed within a sentence or two by a sourced figure and a visible caveat.

---

## 2. Goals

- **Primary job — credible local reference.** The page wins by being trusted, fully sourced, and worth sharing. A skeptical Tahoe homeowner should move from "this is fearmongering" to "this is honest and specific" within the first 10 seconds (master doc §7).
- **Mission alignment — drive testing.** The primary call-to-action is "test your home." Testing is step one of reducing radon-years (the mission metric, master doc §1). Email capture and sharing are secondary.
- **Double as an outreach artifact.** Sharable to 5–10 homeowners; presentable to 2–3 mitigation contractors and 1–2 buyer's agents as a partnership pitch (master doc §9.2, §12).

---

## 3. Non-goals (explicitly out of v1)

Per master doc §8, to hold the line on scope:

- No anonymized radon map (defer to month 9–12).
- No interactive "what's your situation?" decision tool.
- No contractor directory with filtering.
- No scheduling integration (Calendly/Cal.com) — defer to Q2.
- No Spanish-language version.
- **No Google Ads — ever** (§4.2).
- No multi-page architecture (single page).
- No CMS *yet* — but the content layer is structured so adopting one later is cheap (§7).

The chosen stack adds **toolchain** complexity, not **product** complexity. Product scope stays exactly as above.

---

## 4. Audience

Primary on-page audience: **full-time South Lake Tahoe homeowners** (35–70, professional, environmentally aware, skeptic-aware) and **vacation-home owners** (Bay Area / Sacramento / Reno; underserved; at risk of testing in summer and getting a falsely low reading). The page must also read credibly to **contractors and buyer's agents** viewing it as a partnership artifact. Mobile-first (most local search is mobile, master doc §2).

---

## 5. Page architecture — the narrative funnel (Approach A)

Single long page, mobile-first. Sections in order; the funnel ordering pulls toward testing while the early proof keeps it from reading as a sales funnel.

| # | Section | Purpose | Folds master-doc § | Primary sources | CTA |
|---|---------|---------|--------------------|-----------------|-----|
| 1 | **Hero — the hook** | Lead with the cigarette-risk claim, caveat visible in the same breath | §3.8 | EPA Citizen's Guide `[S5]`, Darby 2005 `[S11]` | Test your home (anchor → §5) |
| 2 | **Credibility strip** | Sourced local proof on the first screen — ≈50% of homes >4 pCi/L vs. <1% statewide; 23,400 people affected | §1, §3.5 | CGS SR-211 `[S1][S2]`, CDPH `[S17]` | — |
| 3 | **Is my home at risk?** | Tahoe geology + the EPA-vs-California-geologists gap + "your neighbor's result tells you nothing." The credibility centerpiece | §3.1, §3.2, §3.6 | CGS SR-211 `[S1][S2]`, EPA zones `[S15]` | — |
| 4 | **How bad, really?** | Honest risk calibration: levels table, mechanism, smoker multiplier, 21,000 U.S. deaths/yr — and the §1 cigarette claim fully substantiated | §3.3, §3.4, §3.5, §3.8 | EPA health risk `[S13]`, Darby `[S11]`, WHO `[S9][S10]` | — |
| 5 | **Find out — test your home** | The decision tree by current status; CDPH $14.95 kit + free-January program up front; winter + closed-house protocol | §3.10 | CDPH `[S17]`, EPA `[S5]` | **Primary** |
| 6 | **If it's elevated — fix it** | Mitigation types & real Tahoe costs, what doesn't work, system lifespan — plus "a 2.5 reading means monitor and retest, not panic" | §3.11, §3.12 | EPA `[S5]`, HomeAdvisor/Angi `[S19]` | — |
| 7 | **Why isn't this better known? / How we source** | The "no villain" explanation + the sourcing promise + an honest project disclosure | §3.9 | (synthesis) | — |
| 8 | **Footer** | Email capture (free-kit alerts) · partnership contact (contractors + agents) · privacy & disclosure | §11 | — | Test your home (repeat) |

**Note:** the master-doc "lung cancer ~9.4% above California" figure (master doc §3.4–§3.5) is **dropped** per §12 — the local angle is radon *levels* (CGS SR-211), not local cancer rates. Do not fold it into sections 3 or 4.

---

## 6. Key content & design decisions

- **Hook execution — "keep it, show the math."** Lead with "the average tested South Lake Tahoe home carries the lung-cancer risk of smoking 12–18 cigarettes a day." A "see how we calculate it" link reveals the derivation: average tested Tahoe reading ≈6–9 pCi/L (CGS SR-211 `[S1]`) × the EPA per-pCi/L cigarette equivalence (`[S5]`, where 4 pCi/L ≈ 8/day). This turns the editorially-derived figure into a credibility *feature* — we show our work. The "it's a risk analogy, not chemical equivalence" caveat stays visible.
- **Credibility strip is the linchpin.** Sourced local proof immediately under the hook is what lets the visceral opener coexist with the "credible reference" job. It is not optional.
- **§4 closes the loop.** The scary opener pays off as "honest" because §4 substantiates it with cited risk numbers and the explicit caveat.
- **Sourcing mechanic (signature credibility move):**
  - Every statistic is a clickable link to its **primary** source — the number itself is the link, or a small "↗ Source" chip sits beneath stat cards. Links open the EPA/WHO/CDC/CDPH/CGS document in a new tab.
  - **Primary sources only** appear as live citations. This is modeled in data (`tier: 'primary'` on the source) and **enforced by an automated test** (§8), not by manual discipline.
  - The "How we source" section (page section 7 in the §5 table) states the sourcing promise explicitly and names where the science is uncertain.
- **Foundational ≠ outdated (handling landmark older sources).** Several core sources are landmark but old — Darby 2005 (BMJ), BEIR VI (1999), the WHO Handbook (2009). Present each as the *foundational* study and pair it with a recent reaffirmation plus a continuously-updated authority, so the reader sees an unbroken line to today's consensus rather than a lone dated citation. For Darby specifically: frame it as the largest pooled residential-radon study, and pair it with the 2021 *European Respiratory Review* never-smoker meta-analysis (reconfirms a comparable ~15% excess relative risk per 100 Bq/m³) and the 2022 *IJERPH* updated systematic review/meta-analysis, alongside the current IARC/WHO/EPA classification of radon as a Group 1 carcinogen. (Exact recent-figure citations confirmed at content time — §12.)
- **Honest restraint = credibility.** "A 2.5 reading means monitor and retest, not panic" (§4.2: don't slant toward mitigation when not needed).
- **Never bury the cheap option.** The "never tested → CDPH $14.95 kit" route is the most prominent ("start here") path in §5, by layout, not willpower (§4.2).
- **Winter is load-bearing for Tahoe.** The closed-house/winter protocol sits beside the test CTA so vacation-home owners don't test in summer and underestimate (§3.10).

---

## 7. Technical architecture

- **Framework:** Next.js 16 (App Router), React 19.2, TypeScript. Turbopack is the default dev/build engine; Next APIs are verified against the version-matched docs bundled at `node_modules/next/dist/docs/` (per the repo's `AGENTS.md`).
- **Rendering:** Page content is **statically rendered** (Server Components, SSG/cached) for fast first paint and strong SEO. A server runtime is required only for the form **Server Actions** (so we deploy to a runtime that supports them — not a pure static export).
- **Deploy: Vercel.** First-party Next.js support, zero-config Server Actions, and the built-in analytics below. Ship on the `*.vercel.app` subdomain; point `radonguide.org` at it when ready (a quick switch, not a v1 gate). The page stays static/cached; only form POSTs hit the server runtime.
- **Forms (React 19 Server Actions):** Both forms use `<form action={serverAction}>` with `useActionState` (validation / pending / error UI) and `useFormStatus` (submit-button state). (This supersedes the form-handling approach in the master doc.)
  - **Newsletter** — email capture, framed around free-January-kit alerts (genuine value, not a generic list).
  - **Partnership contact** — single form with an "I am a: homeowner / contractor / buyer's agent" selector.
  - **Spam mitigation (public forms):** a hidden honeypot field plus server-side validation inside the Server Action; add rate limiting only if abuse appears. Cheap, and no CAPTCHA.
- **Email — Resend (confirmed).** One vendor covers both forms: the partnership Server Action *sends* a transactional email to the owner (Resend Node SDK, optionally with a React Email template); the newsletter Server Action *adds the address to a Resend Audience* for later broadcasts — so "capture now, send later" needs no second tool. The free tier is ample for v1 volume; one setup step is verifying a sending domain (DNS) for deliverability. Persisting submissions to a DB/sheet is optional in v1.
- **Analytics — Vercel Web Analytics (built-in).** `@vercel/analytics` (drop-in `<Analytics />`) is cookieless and privacy-friendly (**no cookie banner**, preserving the master doc's privacy intent) and supports **custom events**, so we record outbound CDPH-kit clicks and funnel checkpoints (§7.2). Its included event allotment is ample for low-traffic v1. This **replaces Plausible** as the v1 default — one less vendor, native to the host (Plausible stays a fallback if you ever want host-independent or richer reports).
- **Speed Insights — intentionally skipped in v1** to avoid the ~$10/mo cost. Because the page is statically rendered, its Core Web Vitals should be strong by construction, and we can spot-check them for free with Lighthouse (Chrome DevTools), PageSpeed Insights, or Search Console's Core Web Vitals report. Speed Insights stays an easy add-on later if you ever want continuous real-user monitoring.

### 7.1 Content architecture (content outside the JSX)

The whole page's content lives in a **typed content layer**, separate from presentation. This makes tests DRY (§8) and a future CMS migration mechanical.

- **`content/` — structured, typed data, not prose-in-components.**
  - `sources.ts` — the **source registry**: each source is `{ id, label, url, tier: 'primary' | 'secondary' | 'tertiary' }`. Single source of truth for every citation.
  - `page.ts` — hero, sections (ordered), stats, testing routes, mitigation rows, FAQ, and form copy.
  - `schema.ts` — **Zod** schemas + inferred TypeScript types. Key shapes:
    - `Stat = { id, value, label, sourceId }` — every stat references a source by id.
    - `Section = { id, title, order, body }` (body as Markdown string).
    - `TestingRoute = { status, action, primary?: boolean }`.
    - `MitigationRow = { system, foundation, cost, reduction, sourceId }`.
  - **Invariant, schema-checked:** any `sourceId` referenced by an on-page stat must resolve to a source with `tier: 'primary'`.
- **`lib/content.ts` — the single seam.** Exposes typed getters (`getPageContent()`, `getSources()`). Components and tests import **only** from here.
- **Components are presentational** — they receive typed content as props and contain zero hardcoded copy.
- **CMS-migration contract.** Because `lib/content.ts` is the only seam and everything is schema-typed, migrating to a CMS later means **reimplementing `lib/content.ts` against the CMS API while preserving the same return types** — components and tests don't change. A CMS with structured-content + typed-schema modeling makes the mapping near-mechanical. **The CMS choice is deliberately deferred** (candidate field to evaluate when a real authoring need exists: Sanity, Payload, TinaCMS, Keystatic, Contentful — confirm current fit at decision time). The architecture's job is to keep that choice cheap, not to make it now.
- **Prose vs MDX (planning decision):** default is typed objects + Markdown-string body fields (most test-friendly and CMS-portable). MDX is an option if rich authoring is wanted, with the tradeoff that embedded JSX is harder to assert against and to move into a CMS.

### 7.2 Analytics events

Vercel Web Analytics auto-tracks page views; everything else is a **custom event** via `track()`. Define event names + property shapes once in a typed `lib/analytics.ts` wrapper (DRY, mirroring the content layer) rather than scattering string literals.

- **Client events** (`import { track } from '@vercel/analytics'`):
  - `cta_test_click` — `{ location: 'hero' | 'inline' | 'footer' }` for the "Test your home" CTAs.
  - `test_kit_outbound` — `{ vendor: 'cdph' }` on the outbound click to the $14.95 kit (the mission action).
  - `derivation_open` — when "see how we calculate it" is expanded (engagement with the credibility mechanism).
  - `reached_testing` / `reached_footer` — funnel checkpoints via IntersectionObserver (Web Analytics has no built-in scroll tracking; these stand in for "scroll depth").
- **Server events** (`import { track } from '@vercel/analytics/server'`, v1.1.0+, awaited inside the Server Action so it fires only on real success):
  - `newsletter_submit`
  - `partnership_submit` — `{ role: 'homeowner' | 'contractor' | 'agent' }`
- **Volume:** each event counts toward the Web Analytics allotment, so the taxonomy stays deliberately small (the list above).
- **TDD:** event wiring is testable — Playwright intercepts the `POST /_vercel/insights/event` request and asserts the right event name/props fire on click/submit (run against the CI `build && start` server, since the SDK no-ops in dev). Keep firing-assertions to the high-value events (test-kit outbound + the two form submits); a unit spy on the `lib/analytics.ts` wrapper covers the rest.

### 7.3 Design system (visual)

- **Components — shadcn/ui** (Base UI primitives (shadcn base-nova default) + Tailwind v4; `npx shadcn@latest add`). Copy-in and **owned**, so they're restyleable into a distinct look and portable into the Claude Design library. Pull only what the page needs — form `Input`/`Select`/`Textarea`/`Button`/`Label`, `Accordion` (the "see how we calculate it" disclosure), `Tooltip`/`Popover` (source chips). Wire the form primitives to the React 19 Server Actions + `useActionState` from §7 (not shadcn's default react-hook-form path). Confirmed compatible with Next.js 16 / React 19 / Tailwind v4.
- **Styling — Tailwind v4** (implied by shadcn; resolves the prior CSS-Modules-vs-Tailwind question).
- **Typography — Newsreader (headlines) + Public Sans (body)**, self-hosted via `next/font` (no runtime external request, no layout shift). Newsreader is a screen-optimized editorial serif (journalistic credibility); Public Sans is the US Web Design System sans (official public-health register). Two weights (400 / 500) to start.
- **Color — Refactoring UI Palette 8 (resolved).** Primary **Blue (Vivid)** (`#03449E` for CTAs, `#0967D2` mid) · neutral **Cool Grey** (`#1F2933` text → `#F5F7FA` surface) · full 10-step scales → Tailwind theme tokens. A **risk ramp reserved strictly for the pCi/L levels / EPA zones** (the only place warm color appears): low `#3F9142` → moderate `#DE911D` → elevated `#F35627` → high `#CF1124` — three of the four come straight from Palette 8's own supporting set (Yellow / Orange / Red Vivid), with a green added for "low." The base stays cool so the page never reads as fearmongering; use the dark stops for text/buttons to hold WCAG AA.

---

## 8. Testing — Playwright TDD

The site is built **test-first** with Playwright, following the red → green → refactor loop (`superpowers:test-driven-development` at implementation time): write the failing spec describing a behavior/content invariant, implement the minimum to pass, refactor.

- **Tooling:** `@playwright/test`, `playwright.config.ts`.
  - **`webServer`** boots the Next.js app before tests. Local TDD loop: `next dev` with `reuseExistingServer: true` (fast, reuses a running dev server). CI: `next build && next start` for production fidelity (catches SSG/metadata regressions). `baseURL` set so specs use relative paths.
  - **`projects`** include a **mobile** device profile (e.g. `devices['iPhone 13']`) as the primary target (mobile-first), plus Desktop Chrome; WebKit/Firefox optional.
- **Tests read the content layer — this is the DRY payoff.** Specs import from `lib/content.ts` and generate assertions by iterating the data, so adding content automatically extends coverage and no expected strings are duplicated:
  - **Credibility gate (the §12 hard criterion, automated):** for every `stat` in the content model, assert its value renders, that it is wrapped in a link whose `href` equals the registered source URL, that the link opens in a new tab (`target="_blank"`, `rel` set), and that the source's `tier` is `primary`. A page can no longer ship an unsourced or non-primary-sourced stat without a red test.
  - **Funnel order:** assert sections 1→8 render in order, with the hero hook first and the credibility strip immediately after.
  - **Cheap-option prominence:** assert the "start here" testing route is the CDPH $14.95 kit.
  - **Forms (Server Actions):** happy-path submit shows success; invalid input shows the error from `useActionState`; submit is disabled while pending (`useFormStatus`).
  - **SEO/metadata:** `toHaveTitle`, meta description present, Open Graph tags present.
  - **Mobile rendering:** key CTAs visible and tappable at the mobile viewport; no layout overflow.
  - **Accessibility (optional, recommended):** `@axe-core/playwright` smoke check; single `<h1>`; links have accessible names.
- **Schema guard:** a fast pre-test check validates `content/` against the Zod schema and the "on-page stats must be primary-tier" invariant — failing the build before Playwright even runs.
- **Note:** because Server Actions need a server runtime, the `webServer` runs the full Next app (not a static export), consistent with §7.

### 8.1 Two Playwright roles — committed suite vs. agent-driven MCP

Two distinct uses of Playwright, not interchangeable:

- **`@playwright/test` (committed suite)** — the TDD source of truth described above. Lives in the repo, runs in CI, encodes the invariants and the credibility gate. This is what "test-first" means here.
- **Playwright MCP (agent-driven, dev loop)** — during implementation the agent drives the running dev server directly (navigate, accessibility snapshot, screenshot, fill/submit forms, read console/network) to: explore and author robust locators before codifying them into the committed suite; verify the real rendered experience (forms actually submit, source links open in a new tab to the right domain, mobile layout holds); debug red tests interactively; and capture screenshots to share during review.

**Guardrail:** the MCP *complements* TDD, it does not replace it. New behavior starts with a failing `@playwright/test` spec (red → green → refactor); the MCP is for exploration, verification, and debugging around that loop — never a substitute for codified, committed tests. Ties into `superpowers:verification-before-completion`: no "it works" claim without a green committed test or an MCP-observed result (ideally both).

---

## 9. SEO

- Locally-targeted `<title>` and meta description, via the Next.js **metadata API** (React 19 document metadata).
- Semantic HTML; `app/sitemap.ts` and `app/robots.ts`.
- **Open Graph / Twitter card** so a shared link previews with the hook and a clean image — directly serving the "shared with 5–10 homeowners" goal.
- Optional, low-cost: FAQ / MedicalWebPage **JSON-LD** for richer Google results. Nice-to-have, not a v1 gate.

---

## 10. Analytics, privacy, legal, disclosure

- **Privacy policy** — minimal; covers what analytics and the forms collect.
- **Medical disclaimer** — light "educational, not medical advice" line.
- **Disclosure page** — honest statement of what the project is. **Dependency:** the for-profit-vs-nonprofit question (master doc §9.1) is unresolved; v1 ships an honest "independent, mission-driven, no paid relationships yet" disclosure that doesn't preempt that decision, revised the moment referrals go live.

---

## 11. Voice & content principles (master doc §7)

Direct and honest, not corporate. Mission-forward without preaching. Specific over generic (real local data, named places, concrete numbers). Acknowledges uncertainty where it exists. Skeptic-aware. Distinct voice — no copy lifted from other radon sites (§8).

---

## 12. Verification gate (must-resolve before any live publish)

Per §8 ("pass through no unsourced statistics") of the master doc:

- **Barton "SLT lung cancer above the California average" claim `[S4]`** — *Checked 2026-06-13: refuted by primary California Cancer Registry data at every level; do not use.* The "9.4%" is untraceable, and the broader claim is contradicted by the registry:
  - **County death rate:** El Dorado 18.1 per 100,000 (2021–2023, CDPH) vs California 19.7 — below the state.
  - **Sub-county incidence:** the CCR census-tract zone containing South Lake Tahoe (zone B0052 — bundles SLT with Mammoth Lakes / Placerville / eastern Sierra; SLT alone is count-suppressed) shows age-adjusted lung-cancer **incidence of 27.6 per 100,000 (2017–2021) vs California's 36.8** — ~25% *below* the state, despite the zone's smoking rate (13.2%) slightly exceeding California's (11.8%).

  The only support for a local excess is Barton's 14-year-old **2012** CHNA, which itself attributed it to smoking. **Resolution: drop the local lung-cancer-excess claim entirely.** The honest (and stronger) framing: SLT-area lung cancer is *not* elevated, so the case for testing rests on the **radon levels** (CGS SR-211) plus the established radon→cancer science — never on observed local cancer. Barton stays citable for other current, supportable local context.
- **"$11–20 returned per dollar" `[S16]`** — *Checked 2026-06-13: NOT verified.* Widely attributed to ALA/NCHH "Radon in Rental Housing," but the figure does not appear in the ALA National Radon Action Plan 2021–2025 (PDF unreadable this pass) or the ALA rental-housing policy-brief press release. **Resolution: omit from v1** unless the primary NCHH/ALA brief stating it is located and quoted. (Not load-bearing — the §3.7 cost content is minor; the page's credibility rests on the local Tahoe data plus EPA/WHO/Darby.)
- **Tahoe-specific 12–18 cigarettes/day (hook)** — editorially derived; ship *with* the visible "see how we calculate it" derivation (§6). The derivation must cite CGS SR-211 `[S1]` and EPA `[S5]`.
- **Recency corroboration for the radon → lung-cancer claim** — *Checked 2026-06-13: confirmed usable.* Darby 2005 `[S11]` stays foundational, presented alongside the 2021 *European Respiratory Review* never-smoker meta-analysis (excess relative risk ≈0.15 per 100 Bq/m³ for never-smokers, 95% CI ~0.06–0.25) and the 2022 *IJERPH* updated review (pooled OR ≈1.38, 95% CI ~1.19–1.60), plus the current IARC/WHO/EPA Group 1 classification. Confirm exact CIs and full author/citation details when adding these as new `[S]` entries to the master doc's Section 13.

The general case is enforced automatically by the credibility-gate test (§8): no stat renders without a primary-tier source link.

---

## 13. Success criteria (confirmed 2026-06-13)

- **Credibility gate (hard):** every statistic links to a primary source; zero unsourced claims; the two flagged stats resolved (both dropped per §12). **Enforced by the §8 Playwright credibility test.** Gut check — the owner would put his name on it publicly.
- **Distribution (hard):** shared with 5–10 SLT homeowners; shown to 2–3 contractors and 1–2 buyer's agents.
- **Function (hard):** email capture + partnership form both deliver real submissions; analytics live; the Playwright suite passes green.
- **Signal (soft):** a handful of visitors click through to the CDPH kit (outbound-tracked).

---

## 14. Open questions & dependencies

- **CMS choice — deliberately deferred.** Adopt when there's a real authoring need; the §7.1 content layer keeps the migration cheap. Evaluate Sanity / Payload / TinaCMS / Keystatic / Contentful at that point.
- **Content tooling (planning decision):** typed objects + Markdown bodies (default) vs MDX.
- **Form persistence (planning decision):** Resend is the chosen email provider (§7); whether to *also* persist submissions to a DB/sheet is optional in v1.
- **Styling — resolved:** Tailwind v4 (via the shadcn/ui choice, §7.3).
- **Color palette — resolved:** Refactoring UI Palette 8 (Blue Vivid primary + Cool Grey neutral) with a reserved green→red risk ramp (§7.3).
- **Master doc §9.1 for-profit vs nonprofit** — affects disclosure copy (handled with a neutral v1 disclosure, §10).
- **Custom domain timing** — `radonguide.org` now vs. platform subdomain first.
- **Downstream (not v1):** Claude Design component library; the anonymized radon map; scheduling integration. The component-oriented stack and typed content layer are chosen partly to make these cheaper later.
