# Deploy runbook — Radon Guide

Owner-run steps to ship to Vercel. The app is a static Next.js 16 site with two Server Actions
(Resend email). Everything below is click-ops on your own accounts; nothing here runs automatically.

## 0. Pre-flight (local)
- [ ] `npm run test` is green (schema guard + Playwright mobile+desktop).
- [ ] `npm run build` is clean; `/`, `/privacy`, `/disclosure`, `/sitemap.xml`, `/robots.txt`,
      `/opengraph-image` all resolve.
- [ ] Decide the production origin (default `https://radonguide.org`).

## 1. Push to GitHub
```bash
git remote add origin git@github.com:<you>/radon-guide.git   # if not already
git push -u origin main
```
`.env.local` is gitignored — confirm it did **not** get committed (`git ls-files | grep .env` → empty).

## 2. Import to Vercel
- New Project → import the GitHub repo. Framework auto-detects as **Next.js**; build command
  `next build`, output handled automatically. No overrides needed.

## 3. Environment variables (Project → Settings → Environment Variables)
Set for **Production** and **Preview**:

| Variable | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | real key |
| `OWNER_EMAIL` | your inbox | partnership inquiries land here |
| `RESEND_AUDIENCE_ID` | audience id | newsletter contacts |
| `NEXT_PUBLIC_SITE_URL` | `https://radonguide.org` | drives metadata/sitemap/robots/JSON-LD |

**Do NOT set** `RG_EMAIL_TRANSPORT` (leave unset so real Resend is used) and **do NOT set**
`NEXT_PUBLIC_RG_TEST` (keeps the analytics test-seam off in production).

## 4. Verify the Resend sending domain
- The code's `FROM` is `onboarding@resend.dev` (Resend's shared test sender). Before real sending,
  verify your domain in Resend and update `FROM` in `lib/email.ts` to e.g. `hello@radonguide.org`.
  Until then, deliverability is limited and may be spam-filtered.

## 5. Enable Web Analytics
- Project → Analytics → enable **Web Analytics** (Speed Insights optional/off per spec). Custom events
  (`cta_test_click`, `test_kit_outbound`, `derivation_open`, `reached_footer`, `newsletter_submit`,
  `partnership_submit`) start flowing once live.

## 6. Post-deploy smoke (on the `*.vercel.app` URL)
- [ ] Page renders end-to-end; a source link opens its EPA/CGS/WHO doc in a new tab.
- [ ] Clicking the test CTA registers a `cta_test_click` event in the Analytics tab.
- [ ] **Forms happy-path (real delivery):** submit the newsletter with a real address → it appears in
      the Resend Audience; submit the partnership form → an email arrives at `OWNER_EMAIL`.
- [ ] Share the URL into Slack/iMessage/X → the OG card renders (title + image).
- [ ] `view-source` shows the `application/ld+json` block; optionally run Google's Rich Results Test.

## 7. Custom domain
- Project → Domains → add `radonguide.org`; follow Vercel's DNS instructions. After it resolves,
  re-check the smoke list on the apex domain.

## Pre-promotion follow-ups (before driving real traffic)
- **Abuse protection:** the Server Actions are **honeypot-only** today. Add rate limiting
  (Vercel KV / Upstash Ratelimit, keyed by IP) before promoting — in-memory limits don't survive
  serverless cold starts.
- **Content-Security-Policy:** only conservative headers ship now (see `next.config.ts`). Add a CSP
  once you can allow-list Vercel Analytics, Server Actions, and `next/og` without breakage.
- **Newsletter double opt-in** if list hygiene / GDPR matters later (single opt-in today).
