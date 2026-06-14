@AGENTS.md

# Radon Guide — project conventions

## Testing — Playwright, test-first
- **Write the spec before the implementation.** Every rendered component and behavior gets a Playwright spec: failing test (RED) → minimal code (GREEN) → refactor. No component ships without a spec covering its content/behavior.
- **DRY + data-driven.** Specs import the content layer via `tests/helpers.ts` (`@/lib/content`, `SOURCES`) and assert against it — never hardcode copy. Adding content extends coverage automatically. See `tests/credibility.spec.ts` and `tests/hero.spec.ts`.
- **The credibility gate is sacred.** Every on-page stat must render inside a link to its registered **primary** source with `target="_blank"`. Enforced by `tests/credibility.spec.ts` + the `assertPrimaryTier` schema guard (`content/schema.ts`).
- Projects: `mobile` (iPhone 13) + `desktop`. `npm run test` = schema guard + e2e. `webServer` runs `next dev` locally / `next build && next start` in CI.

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
