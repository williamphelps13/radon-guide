# Radon Guide — build handoff / continuity

> **Picking this up (fresh session or after compaction)?** Read this first, then `CLAUDE.md` (+ `AGENTS.md`), the spec, and `git log --oneline`. This is the living state of the build — it captures the *why* and *how* that a chat summary loses. Update it as you go.

## Where we are (as of 2026-06-14, through commit `6de858a`)
- **Phases 0–4 complete + a full test-coverage practice established.** Commits `f17d4f4` → `6de858a`.
- Built so far: Next 16 **no-`src`** scaffold · Playwright (mobile + desktop) · shadcn (**Base UI**, base-nova) · **Newsreader + Public Sans** fonts · **two-tier hex Palette 8** tokens · typed **content layer** (`content/` → `lib/content.ts`) + schema guard · analytics wrapper · **hero + credibility strip + source-link** components · the **data-driven credibility gate** · full **5-layer e2e coverage (30 tests green)**.
- The page currently renders: hero (hook + source chips + CTA), credibility strip (3 stats), the us-deaths stat. The CTA `href="#test"` is a **dangling anchor** until the testing section exists (Chunk 5).
- **NEXT: Chunk 5 = impl-plan Phases 5–7** — risk scale, testing path (CDPH-kit prominence), mitigation table, the two **Server-Action forms** (`z.email()`, `useActionState`/`useFormStatus`), and full **funnel-order page assembly**. Add each **test-first** per the CLAUDE.md "definition of done."

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
