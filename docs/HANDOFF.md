# Radon Guide — build handoff / continuity

> **Picking this up (fresh session or after compaction)?** Read this first, then `CLAUDE.md` (+ `AGENTS.md`), the spec, and `git log --oneline`. This is the living state of the build — it captures the *why* and *how* that a chat summary loses. Update it as you go.

## Where we are (as of 2026-06-14, Chunk 5 complete)
- **Phases 0–7 complete + the full test-coverage practice.** Phases 0–4: commits `f17d4f4` → `6de858a`. Chunk 5 (Phases 5–7): the run of commits after `ce31c53`.
- Built so far: Next 16 **no-`src`** scaffold · Playwright (mobile + desktop) · shadcn (**Base UI**, base-nova) · **Newsreader + Public Sans** fonts · **two-tier hex Palette 8** tokens · typed **content layer** (`content/` → `lib/content.ts`) + schema guard · client + **typed server** analytics wrappers · **hero, credibility strip, source-link, RiskScale, TestingPath (+KitLink), MitigationTable, Section, Derivation, Footer (+beacon)** · two **Server-Action forms** (newsletter + partnership) with a **mockable email transport** · **privacy + disclosure** stubs · **full funnel-order page** assembled.
- The page now renders the complete funnel: hero → credibility strip → "is my home" → "how bad" (+us-deaths stat) → derivation → risk scale → testing path → fix-it + mitigation table → "why unknown" → footer (both forms + CTA). The hero CTA `#test` anchor now resolves.
- **Coverage: full suite green — schema guard + 62 e2e (mobile + desktop); `npm run build` clean (all routes static).**
- **NEXT: Chunk 6 = impl-plan Phases 8–11** — SEO metadata/OG + sitemap/robots (Phase 8), legal-page *polish* (Phase 9; stubs already exist), full-suite + manual Resend happy-path (Phase 10), deploy to Vercel (Phase 11).

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
