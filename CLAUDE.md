@AGENTS.md

> 🚧 **Build in progress** — read `docs/HANDOFF.md` first for current state, the working methodology, key decisions + rationale, gotchas, and what's next. Then this file, the spec, and `git log`.

# Radon Guide — project conventions

## Testing — Playwright, test-first (the accountability standard)

**Five coverage layers.** The first two are DRY invariants that iterate `content/page.ts`, so new content is covered automatically:
1. **Presence** — `tests/content.spec.ts` — every field in the content model renders on the page.
2. **Source / credibility** — `tests/credibility.spec.ts` — every stat + cited source is primary-tier, linked, opens in a new tab. Use `expectPrimarySourceLink` from `tests/helpers.ts`.
3. **Behavior** — `tests/behavior.spec.ts` — every interaction (CTA, forms, accordion) is tested. Client analytics events assert via `expectClientEvent` (the dev-only `window.__rgEvents` seam in `lib/analytics.ts`).
4. **Structure / a11y** — `tests/quality.spec.ts` — exactly one `h1`; axe (`@axe-core/playwright`) finds no serious/critical violations; controls have accessible names.
5. **Platform** — `tests/quality.spec.ts` — mobile: no horizontal overflow + key CTA visible; SEO: `<title>` + meta description.

**Definition of done — no UI feature is complete until:**
- [ ] Its content fields are asserted in `content.spec.ts` (DRY, from the model).
- [ ] Any stat / cited source is covered by `credibility.spec.ts` (auto, via the model).
- [ ] Its interactivity has a `behavior.spec.ts` test, **written first** (RED → GREEN).
- [ ] Still exactly one `h1`; axe still passes; new controls have accessible names.
- [ ] No new horizontal overflow at mobile width.
- [ ] `npm run test` is green (schema guard + e2e on mobile + desktop).

**Rules.** Test-first (write the failing spec before the code). DRY — specs read `content` / `SOURCES` from `tests/helpers.ts`; never hardcode copy. The node schema guard (`tests/schema.test.ts`) runs via `tsx`; Playwright runs `*.spec.ts` only. `webServer` runs `next dev` locally / `next build && next start` in CI.

**Gate on the production build (dev-flake gotcha).** Plain `npm run test` uses `next dev`, whose on-demand route compilation makes a *cold* server flake on webkit/mobile: a `<Link>`'s prefetch of the `/` RSC payload can fail mid-`goto` and fall back to a hard nav that interrupts the test (seen on the legal pages). It's a dev artifact, not a defect — warm reruns and CI pass. Per Next + Playwright best practice, trust the production gate: for a deterministic run use **`CI=1 npm run test`** (`build && start` + the single retry). Don't patch app behavior (e.g. `prefetch={false}`) to satisfy a dev-only flake, and keep retries CI-only by design so real flakiness stays visible locally.

## Next.js 16 — read the bundled docs first
- This is non-standard Next (see `AGENTS.md`). Before writing any Next feature, read the matching guide in `node_modules/next/dist/docs/01-app/…`. Turbopack is default; Server Actions + `useActionState`/`useFormStatus`; async request APIs (`await cookies()/headers()/params`).

## Content layer
- All copy lives as typed data in `content/{sources,schema,page}.ts`; `lib/content.ts` is the **only seam** (components & tests import from it). Zod **v4** (`z.email()`, not `z.string().email()`). Only `tier:"primary"` sources may back an on-page stat.

## Content & voice: write like a person, not an AI
Credibility is the whole product. If the prose reads as machine-generated, a skeptical reader discounts everything, and that one tell cancels the trust the sourcing works to earn. Plain, human writing is a credibility requirement here, not a style preference. All copy lives in `content/*` (see Content layer), so this governs every string there.

**Avoid the AI tells.** Audit copy before shipping:
- **Em dashes (`—`) are the #1 tell.** The *density* gives it away (this content had 13, about one per string). Use at most one per section and none in short UI strings; rewrite the rest with a period, comma, colon, or parentheses. En dashes in numeric ranges (`6–9 pCi/L`, `$1,000–$2,500`) are correct and fine. Check with `grep -c "—" content/page.ts`.
- **Reflexive triads / rule of three** ("invisible, odorless, and X", three-clause parallels). Two items usually suffice; vary the count.
- **Negative parallelism and dramatic fragments** ("can't see it, smell it, or know it"; "Not panic."). Use rarely, not as the default rhythm.
- **Antithesis scaffolding** ("not just X, it's Y"; "not only… but also").
- **Inflated words:** delve, leverage, robust, seamless, comprehensive, foster, empower, unlock, harness, elevate, pivotal, crucial, vital, realm, landscape, testament, underscore, "in today's world", "whether you're".
- **Filler / hedging:** "it's worth noting", "it's important to", "that said", "simply", "just".
- **Uniform rhythm.** Vary sentence length; even, metronomic pacing reads generated.
- **Promo creep and wrap-ups:** "valuable insights", vague intensifiers ("significantly", "a wide range of"), and "In summary / Overall / Ultimately" closers.

Read it aloud. If it sounds like a brochure or a chatbot, cut. Prefer the specific sourced number to the adjective; specificity is itself the anti-AI move.

**Content-design principles, by register.** This site mixes two kinds of writing; use the matched guidance for each. Material's content design is UI/UX-writing guidance, so it fits the first register, not the editorial core.
- **UI microcopy** (CTAs, labels, badges, success/error, form fields, alt text). Material/UX-writing principles: concise but not robotic; simple and direct ("is there an easier way to say this?"); address the reader as "you" (first-person "we" is only the project's own voice, the sourcing promise and disclosure; don't mix in one sentence); say only the essentials and disclose real consequences; numerals not words (`12–18`); present tense; lead with the reader's goal; sentence case; meaningful alt text.
- **Long-form editorial / health content** (the hook, section bodies, derivation, "how we source"). This is the credibility-critical core that Material does not cover; use plain-language + health-risk communication. The CDC Clear Communication Index maps onto our funnel:
  - **One main message and one call to action** per screen (the hook, then "test your home").
  - **Plain language:** everyday words; define a needed term (`pCi/L`, "action level") once.
  - **State of the science:** separate what's established from what's uncertain, and note findings can change (our "where the science is uncertain, we say so", and pairing a landmark study like Darby 2005 with current consensus).
  - **Numbers in context:** keep one denominator so the reader never does the math (≈50% of tested SLT homes vs <1% statewide); caveat any analogy (the cigarette figure).
  - **Honest risk and restraint:** convey lung-cancer risk without fear-mongering or false reassurance; recommend the proportionate action ("2.5 means monitor and retest, not panic").

Sources read for this: [plain language](https://digital.gov/guides/plain-language) (Federal Plain Language / Plain Writing Act of 2010), [CDC Clear Communication Index](https://www.cdc.gov/ccindex/index.html), [Material communication principles](https://codelabs.developers.google.com/codelabs/material-communication-guidance). (Material's content-design hub at m3.material.io is the canonical UI-writing reference but is JS-rendered and was not directly extracted.)

## Design tokens — two-tier, hex
- Raw **hex** primitives in `app/globals.css :root`: `--brand-*` (Blue Vivid), `--ink-*` (Cool Grey), `--risk-*`. shadcn semantics reference them via `var()` (e.g. `--foreground: var(--ink-900)`, `--primary: var(--brand-700)`). Use `brand-*`/`ink-*`/`risk-*` utilities + shadcn semantics (`bg-primary`, `text-foreground`, `border-border`). **The risk ramp is reserved for pCi/L levels only.** Never put a raw hex in a semantic token.

## Components — shadcn (Base UI)
- Server components by default; `'use client'` only where needed (analytics `track`, interactivity). shadcn primitives live in `components/ui/`.

## Workflow
- Build in **verified chunks**: before each chunk, a plan-mode pass checks its commands/APIs against the docs (this caught the phantom `--src-dir=false` flag, Next 15→16, and the shadcn/globals.css collision). Commit per task; messages end with the `Co-Authored-By` trailer.
