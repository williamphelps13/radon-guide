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

## Next.js 16 — read the bundled docs first
- This is non-standard Next (see `AGENTS.md`). Before writing any Next feature, read the matching guide in `node_modules/next/dist/docs/01-app/…`. Turbopack is default; Server Actions + `useActionState`/`useFormStatus`; async request APIs (`await cookies()/headers()/params`).

## Content layer
- All copy lives as typed data in `content/{sources,schema,page}.ts`; `lib/content.ts` is the **only seam** (components & tests import from it). Zod **v4** (`z.email()`, not `z.string().email()`). Only `tier:"primary"` sources may back an on-page stat.

## Design tokens — two-tier, hex
- Raw **hex** primitives in `app/globals.css :root`: `--brand-*` (Blue Vivid), `--ink-*` (Cool Grey), `--risk-*`. shadcn semantics reference them via `var()` (e.g. `--foreground: var(--ink-900)`, `--primary: var(--brand-700)`). Use `brand-*`/`ink-*`/`risk-*` utilities + shadcn semantics (`bg-primary`, `text-foreground`, `border-border`). **The risk ramp is reserved for pCi/L levels only.** Never put a raw hex in a semantic token.

## Components — shadcn (Base UI)
- Server components by default; `'use client'` only where needed (analytics `track`, interactivity). shadcn primitives live in `components/ui/`.

## Workflow
- Build in **verified chunks**: before each chunk, a plan-mode pass checks its commands/APIs against the docs (this caught the phantom `--src-dir=false` flag, Next 15→16, and the shadcn/globals.css collision). Commit per task; messages end with the `Co-Authored-By` trailer.
