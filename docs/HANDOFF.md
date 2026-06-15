# Radon Guide — build handoff / continuity

> **Picking this up (fresh session or after compaction)?** Read this first, then `CLAUDE.md` (+ `AGENTS.md`), the spec, and `git log --oneline`. This is the living state of the build — it captures the *why* and *how* that a chat summary loses. Update it as you go.

## Where we are (as of 2026-06-15, Mitigator directory — on branch `feat-map-mitigators`, PR #1, NOT yet merged/deployed)

- **New `/mitigators` route** completes the funnel's "now go fix it" step: a directory of 12 California-certified radon mitigators as an accessible table, enhanced with an interactive MapLibre map. Built in verified chunks A–C; full research, data provenance, and chunk history live in `docs/MAP_MITIGATORS_PLAN.md`.
- **Coverage:** full suite green — schema guard + 96 e2e (mobile + desktop) under the `CI=1` production gate; `npm run build` clean.
- **Status:** open PR, not merged. The deployed site (below) is still Chunk 6; merge to `main` to deploy. **Run `npm install` after checkout** — the branch added `maplibre-gl` to `package.json`.
- **NEXT (carried over):** enable Web Analytics in the Vercel dashboard; the Chunk-5 rate-limiting follow-up before driving traffic.

### Mitigator directory decisions worth remembering
- **Roster provenance is two-sourced.** The certified list is CDPH (`cdph_mitigators` → the *Certified Radon Services Providers* page; kept distinct from `cdph_radon`, which is the radon-testing page the kit link still uses). Office location + phone are enriched from the CSLB license lookup (`cslb`). Both primary-tier, enforced by `assertMitigators`.
- **Map is a progressive enhancement; the list is the truth.** MapLibre GL JS + OpenFreeMap "bright" tiles (no API key, no cost, attribution only). Dynamically imported inside `useEffect` for SSR safety; if WebGL is absent the map renders nothing and the accessible list still carries the content. `map_pin_open` fires via the `__rgEvents` seam.
- **Office is not service area.** A few mitigators are CA-certified but NV-based (e.g. Minden), so the schema allows `state: "CA" | "NV"` and the UI says pins mark the office. The **Nevada-only chunk (D) was retired**: a NV-only mitigator can't legally work a CA home, and border pros who serve Tahoe are already on the CA list.
- **Geocoded once, baked.** lat/lng from the US Census Geocoder (street-level) with an OSM city/ZIP fallback for PO-box-only addresses (`precise: false`). Regenerate with `scripts/geocode-mitigators.mjs`; the snapshot date is `updatedAt`.
- **New `components/ui/table.tsx` primitive** follows the existing shadcn-primitive style (semantic tokens). Two divergences are documented in its header comment (no `whitespace-nowrap`; a focusable scroll container) for the mobile no-overflow rule.
- **CLAUDE.md gained the dev-vs-prod e2e gate note** (cold `next dev` flakes the webkit RSC prefetch; trust `CI=1 npm run test`, don't patch app behavior for a dev-only flake).

## Where we are (as of 2026-06-14, Chunk 6 complete — DEPLOYED & LIVE)

> **Live:** https://radonguide.vercel.app (Vercel project `radon-guide`, GitHub `williamphelps13/radon-guide`, public). Pushes to `main` auto-deploy. Production env: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY` (Full access), `OWNER_EMAIL`. **Both email flows verified in production** (newsletter → Resend contact; partnership → owner inbox). Resend now uses Segments (no audience ID). Sending `FROM` is still `onboarding@resend.dev` — verify a domain before emailing non-owner recipients. **Still to do: enable Web Analytics in the Vercel dashboard.**
- **Phases 0–11 implemented (deploy is owner-run).** Phases 0–4: `f17d4f4` → `6de858a`. Chunk 5 (Phases 5–7): after `ce31c53`. Chunk 6 (Phases 8–11): the SEO/legal/deploy-prep run after that.
- Chunk 5 built the full funnel page + forms. **Chunk 6 made it shareable + launch-ready:** SEO metadata (title template, canonical, OG/Twitter), a **dynamic `next/og` social image** (`app/opengraph-image.tsx`), **sitemap + robots** (from `lib/site.ts` `SITE_URL`), **JSON-LD** (Organization + WebSite + FAQPage via `components/json-ld.tsx`), legal-page polish (effective date, data-request contact), conservative **security headers** (`next.config.ts`), and a **deploy runbook** (`docs/DEPLOY.md`).
- **Coverage: full suite green — schema guard + 68 e2e (mobile + desktop); `npm run build` clean (all routes static).** Verified the client-event seam also fires under a production `build && start` server (CI parity).
- **NEXT: enable Web Analytics** (Vercel → Analytics), then the pre-promotion follow-ups below. After launch, content/copy tightening per spec voice + a real brand font/logo are the natural polish items. A custom domain (`radonguide.org`) can be pointed via `docs/DEPLOY.md` step 7 when registered (update `NEXT_PUBLIC_SITE_URL` then).

### Chunk 6 decisions worth remembering
- **One site-origin source of truth:** `lib/site.ts` `SITE_URL` (env `NEXT_PUBLIC_SITE_URL`, fallback prod host) feeds metadata, sitemap, robots, JSON-LD. No hardcoded host anywhere else.
- **OG image is dynamic** (`ImageResponse`, branded from `hero` content, default sans). Swap to a brand font/logo later if wanted. Twitter falls back to og:image (no separate `twitter-image`).
- **JSON-LD FAQ caveat:** FAQ entries = sections whose title ends with "?" (answers = visible bodies, per Google's rule). Google now gates **FAQ rich results** to authoritative health/gov sites, so snippets likely won't show — markup is still valid/future-proof; Organization+WebSite carry the SEO weight.
- **CI seam fix:** the `__rgEvents` seam is now `NODE_ENV !== 'production' || NEXT_PUBLIC_RG_TEST === '1'`; `playwright.config` sets `NEXT_PUBLIC_RG_TEST=1` in `webServer.env`. Never set that var in prod (keeps the seam off). This resolved the Chunk-5 "flagged for CI" item.
- **Security headers** are conservative (nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy, HSTS). **Full CSP deferred** — needs allow-listing Vercel Analytics + Server Actions + next/og; do it post-deploy.

### Chunk 5 decisions worth remembering (deltas + accepted risks)
- **Content model grew** (per CLAUDE.md "all copy is typed data"): added `riskScale`, `derivation`, `forms` to `content/{schema,page}.ts`; `content.spec.ts` now iterates them, so they're presence-covered automatically.
- **Single source of truth for roles:** the partnership Server Action derives its `z.enum` from `content.forms.partnership.roles` — the select and validation can't drift.
- **Email transport seam:** `lib/email.ts` honors `RG_EMAIL_TRANSPORT=mock` (set in `.env.local`) to resolve without calling Resend, so the **form success path is CI-testable** (not just validation/honeypot). For the real happy-path, unset it (or set `resend`) with real keys — manual verify (Phase 10).
- **A11y beyond axe:** form results use `role="status"` `aria-live="polite"`; inputs use visible `<Label htmlFor>` (axe wouldn't have caught either gap).
- **Risk ramp stays reserved for pCi/L** — form feedback uses semantic tokens (`text-destructive`, `text-brand-700`), never `risk-*`.
- **ACCEPTED RISK (revisit before promotion):** the two public Server Actions are protected by the **honeypot only** — no rate limiting / CAPTCHA. Fine for low-traffic v1; add durable rate limiting (needs KV/Upstash) before driving traffic. Newsletter is **single opt-in**.
- **Flagged for CI:** the client-event test seam (`window.__rgEvents`) is gated to `NODE_ENV !== 'production'`. Local e2e uses `next dev` (non-prod) so it works; a CI `build && start` server is production → seam off. Gate it on a test env flag before running behavior specs in CI.

## How we work (the methodology — this is the "smoothness," keep it)
1. **Verify-then-execute loop.** Before each chunk: enter **plan mode**, verify the chunk's commands/APIs against the bundled Next 16 docs (`node_modules/next/dist/docs/01-app/…`) + library docs, write the chunk plan to the plan file, `ExitPlanMode` for approval, then execute, then re-enter plan mode for the next chunk. This loop caught the phantom `--src-dir=false` flag, Next 15→16, shadcn=Base UI + the globals.css collision, and Zod 4 `z.email()`.
2. **Read the docs, don't trust training data.** Per `AGENTS.md`, this Next is non-standard (v16). Read the bundled guide before writing any Next feature.
3. **Test-first, fully covered.** Every UI feature must satisfy the CLAUDE.md 5-layer "definition of done." Tests are DRY invariants that iterate `content/page.ts`. Write the failing spec first (RED → GREEN).
4. **One decision at a time; bring rigor; push back when warranted.** The owner makes design calls (hex, Base UI, no-src); surface tradeoffs, recommend, then proceed. Commit per task; messages end with the `Co-Authored-By` trailer.

## Key decisions + rationale (what a summary drops)
- **Next 16 / React 19.2 / Turbopack-default** (not 15). APIs differ — read the bundled docs.
- **no-`src` layout** — the standard default; alias `@/* → ./*`.
- **shadcn = Base UI (base-nova)** — kept (owner's call) over Radix; fine for our few components.
- **Two-tier hex tokens** — `--brand-*` (Blue Vivid), `--ink-*` (Cool Grey), `--risk-*` primitives (Refactoring UI Palette 8, **hex**) in `:root` → shadcn semantics via `var()`. Risk ramp reserved for **pCi/L levels only**.
- **Content-driven** — all copy in `content/page.ts`; `lib/content.ts` is the only seam; the credibility gate = every stat links to a **primary** source, new tab.
- **Dropped stats (verification gate, spec §12):** Barton "9.4% / SLT lung cancer above CA average" — *refuted* by California Cancer Registry data (El Dorado 18.1 vs CA 19.7; SLT-zone 27.6 vs CA 36.8). "$11–20 per dollar" — untraceable to a primary source. Both omitted.
- **The hook** — cigarette-risk lead, handled credibly with a "see how we calculate it" derivation + a visible "it's a risk analogy" caveat. Credibility-first throughout.
- **Source chips = always-visible inline labels, NOT tooltips** (deliberate divergence from spec §components "Tooltip/Popover (source chips)"). `SourceChip` renders the citation name + ↗ as a visible link; chosen for mobile/touch + a11y (tooltips are poor on phones). The Tooltip primitive + `TooltipProvider` were scaffolded-but-unused and removed. Same reasoning keeps the partnership **role field a native `<select>`** (OS picker beats a JS dropdown on mobile), styled to match the shadcn inputs.

## Gotchas (save yourself the pain)
- `create-next-app` refuses non-empty dirs → scaffold into `/tmp/rg-app` then `cp -a /tmp/rg-app/. ./`. Use **`--no-src-dir`** (NOT `--src-dir=false`, which *enables* src). No `--turbopack` flag (default).
- Playwright: `testMatch: '**/*.spec.ts'` so the node schema guard (`tests/schema.test.ts`, run via `tsx`) isn't collected. `reuseExistingServer` can reuse a **stale** local `next dev` — if a run hangs or shows wrong counts, `pkill -f "next dev"` and re-run.
- Analytics is testable via the **dev-only `window.__rgEvents` seam** in `lib/analytics.ts` → `expectClientEvent` (`tests/helpers.ts`).
- shadcn **owns** `app/globals.css` + `app/layout.tsx` — edit them, don't recreate.

## Read-first artifacts
1. `CLAUDE.md` (+ `AGENTS.md`) — conventions + the testing standard (auto-loaded each session).
2. `docs/superpowers/specs/2026-06-13-radon-guide-v1-website-design.md` — the full design spec (mission, funnel, sourcing ethos, verification gate).
3. `docs/superpowers/plans/2026-06-13-radon-guide-v1.md` — the implementation plan, with the "reality reconciliation" note up top.
4. `git log --oneline` — chunk-by-chunk progress.
5. `tests/{content,credibility,behavior,quality}.spec.ts` + `tests/helpers.ts` — the invariants that define "correct."
