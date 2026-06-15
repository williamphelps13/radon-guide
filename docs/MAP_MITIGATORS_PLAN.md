# Feature plan — Radon Mitigator Map (CA primary, NV secondary)

> Branch: `feat-map-mitigators` (off `main`). Status: **exploration / design**, no code yet.
> Read `CLAUDE.md` + `docs/HANDOFF.md` first. This doc captures the research, the
> decisions + rationale, and the chunked build sequence so the work survives a
> fresh session. Update it as chunks land.

## Goal

Add a map of certified radon **mitigation** contractors in California (then Nevada)
so a reader can pan, zoom, and see each contractor's name and phone number. The
map serves the funnel's "now go fix it" step: a reader who has tested and found an
elevated result needs a credentialed person to call.

## Decisions (owner-approved 2026-06-15)

| Decision | Choice | Why |
|---|---|---|
| Map library | **MapLibre GL JS** | Vector, free, pairs with OpenFreeMap; native GeoJSON clustering; no key/card. |
| Basemap tiles | **OpenFreeMap** public instance | No API key, no credit card, commercial use allowed, no request limits. Attribution only. Cost $0. |
| Data scope | **State-published lists only** | CA = CDPH, NV = UNR Extension. Authoritative, lower legal risk than scraping NRPP/NRSB (which publish no reuse license). Fits the credibility thesis. |
| Geocoding | **Enrich location via CSLB license #, then geocode** | CDPH has no location field; the CA license # resolves to a business city/address on CSLB (CA-gov). Geocode that once, baked. (Pending owner sign-off on CSLB vs NRPP.) |
| A11y model | **List is the primary content; map is an enhancement** | Required by our axe gate anyway; best practice for dense map data. |
| Phone numbers | Show as `tel:` links in both list rows and map popups | State lists publish them; high-value, cheap. |

### Rejected alternatives (so we don't relitigate)
- **react-leaflet + raster tiles** — the free raster options fail us: OSM's public tile server is not sanctioned for production/commercial sites, and Stadia's free tier bars commercial use.
- **Mapbox / Google Maps** — both require a credit card on file and bill per use with overage risk. Google replaced its flat $200/mo credit with smaller per-SKU caps in March 2025.
- **Scraping NRPP / NRSB** — search-only forms, no export/API, and only an "all rights reserved" copyright line (no reuse license). City-only listings. Redundant: both states require national cert anyway, so the state lists already capture these people.
- **Self-hosted Protomaps `.pmtiles`** — kept as the future upgrade path if we ever want zero third-party basemap dependency (a regional extract on Cloudflare R2 is ~$0 with zero egress). Not needed for v1.

## Data sources

### California — CDPH (already a `primary` source: `cdph_radon`)
- Authoritative list: **`CA Cert Mitigators.pdf`** linked from the CDPH
  [Certified Radon Services Providers](https://www.cdph.ca.gov/Programs/CEH/DRSEM/Pages/EMB/Radon/Certified-Radon-Services-Providers.aspx) page.
- CA *legally requires* mitigators to hold NRPP/NRSB cert **plus** a CA contractor
  license (B / C20 / C36 / D64), and to be on this list.
  [Certification rules](https://www.cdph.ca.gov/Programs/CEH/DRSEM/Pages/EMB/Radon/Radon-Services-Certification.aspx).
- CDPH notes the list "is not updated daily" — treat as a periodic snapshot; store a `lastFetched` date.

#### ✅ Verified roster (owner-supplied from the CDPH page, 2026-06-15)
CDPH columns are: **Last name · First name · Mitigation Certificate # · Expiration · Phone · CA Contractor License #**.
**There is no city / address / company field.** This is the blocker for mapping (see below).

| Last | First | Cert # | Expires | Phone | CA Lic # |
|---|---|---|---|---|---|
| Cole | Scott | 115293 | 6/30/2027 | 844-852-2858 | 797379 |
| Denny | Norman | 106142 | 8/31/2027 | 775-691-7101 | 241944 |
| Dopke | Cameron | 112346 | 9/30/2027 | 530-544-1862 | 922311 |
| Ellrott | Fred | 101023 | 11/1/2026 | 805-732-2476 | 617021 |
| Frayman | Daniel | 114455 | 1/31/2027 | 818-749-8576 | 1071369 |
| Gregory | Jason | 107970 | 11/2/2026 | 805-244-6687 | 843797 |
| Heichman | Jordan | 106156 | 11/4/2026 | 530-621-4052 | 816271 |
| Henderson | John | 108871 | 11/3/2026 | 805-280-6616 | 632908 |
| Huchingson | Eddie | 107621 | 3/31/2027 | 805-908-9274 | 612436 |
| Mandel | Peter | 104696 | 3/31/2027 | 510-300-7500 | 839709 |
| Riley | Edward | 106415 | 8/31/2026 | 530-583-6653 | 960994 |
| Zharkov | Iurii | 115915 | 4/30/2028 | 951-712-4722 | 1118941 |

- **12 unique mitigators.** The source list has a **duplicate**: "Iurii Zharkov" and
  "Zharkov Iurii" are the same person (cert 115915, same phone + license, first/last
  swapped). De-dupe on cert #.
- Smaller than the ~21 the NRPP mirror implied — CDPH's list is the *legally-operating-in-CA*
  set (national cert **+** CA license), which is the right population for this product.

> ✅ **RESOLVED — location enrichment done (2026-06-15).** CSLB's "Check A License"
> is JS/postback (WebFetch can't read it), but it **is** scriptable with **headless
> Playwright** (already in this repo). A batch script drove the search form for all 12
> licenses and pulled business name, **full street address**, city/state/ZIP, business
> phone, entity, classifications, and license status. Raw output saved to
> `docs/mitigators-ca-raw.json`. All 12 licenses are current/active. Notable:
> - **Denny is NV-based** (Minden, NV) but on the CA list — confirms office ≠ service area.
> - Full street addresses mean we can geocode precisely via the US Census Geocoder.
> - **Two phone numbers exist per contractor:** the CDPH-listed cert phone vs the CSLB
>   business line (they differ). Decide which to display (lean: the CDPH cert phone,
>   since that's the radon-certification contact of record).

### Nevada — UNR Extension (new source to add, tier `primary`)
- Authoritative list: **HTML table** at
  [extension.unr.edu/radon/contractors.aspx](https://extension.unr.edu/radon/contractors.aspx),
  split Northern / Southern Nevada.
- Verified fields: contractor/owner name, NRPP ID + expiration, NV contractor
  license # + expiration, company (hyperlinked), service area, phone, email.
- NV has no state radon cert (relies on national NRPP/NRSB) + a NV contractor license.
- **Size:** tiny — only a handful of mitigation-certified providers. A 2-pin map is
  marginal, so NV likely launches **list-first**, map optional.

> ❌ **Jurisdiction (verified 2026-06-15) — NV is out of scope for the SLT mission.**
> Mitigation authorization follows the *home's* state. South Lake Tahoe is entirely in
> California (El Dorado County; the NV side is Stateline/Douglas County), so an SLT home
> needs a **CDPH-certified, CA-licensed** mitigator. A NV-only contractor isn't authorized
> to work in CA, and CA↔NV reciprocity only waives a trade exam — it still requires
> obtaining a *separate* CA license. Border pros who legitimately serve Tahoe already appear
> on the **CA** list (some NV-based but CA-licensed, e.g. Denny in Minden, NV on CA lic
> 241944). A standalone NV roster would only add people who *can't* work in SLT. **Chunk D
> retired** (see chunk sequence). Sources: [CDPH Radon Services Certification](https://www.cdph.ca.gov/Programs/CEH/DRSEM/Pages/EMB/Radon/Radon-Services-Certification.aspx);
> [CSLB Reciprocity](https://www.cslb.ca.gov/Contractors/Applicants/Reciprocity/General_Reciprocity_Information.aspx) +
> [who must be licensed](https://www.cslb.ca.gov/contractors/applicants/contractors_license/exam_application/before_applying_for_license.aspx).

Add to `content/sources.ts`:
```ts
unr_radon: {
  id: "unr_radon",
  label: "UNR Extension — Nevada Radon Education Program",
  url: "https://extension.unr.edu/radon/contractors.aspx",
  tier: "primary",
},
```

## Content model (sketch — finalize after the CDPH PDF is verified)

New file `content/mitigators.ts`, validated in `content/schema.ts` (Zod v4),
exposed only through `lib/content.ts`.

```ts
const MitigatorSchema = z.object({
  name: z.string().nonempty(),        // "First Last"
  certId: z.string().nonempty(),      // mitigation cert # — the de-dupe key
  state: z.enum(["CA", "NV"]),
  city: z.string().nonempty(),        // from CSLB (CA) / UNR table (NV)
  region: z.string().optional(),      // e.g. "Northern Nevada"
  phone: z.string().optional(),       // display form; tel: derived
  caLicense: z.string().optional(),   // CA contractor license # (CA only)
  expires: z.string().optional(),     // cert expiration (freshness signal)
  lat: z.number(),                    // baked
  lng: z.number(),
  sourceId,                           // "cdph_radon" | "unr_radon"
});
```
- `phone` optional so a missing field never breaks the build.
- Each entry carries a `sourceId`, so `credibility.spec.ts` covers every pin's
  provenance automatically (must be `tier: "primary"`).
- A `lastFetched` date per state (the lists are snapshots).

## Build-time data pipeline

1. **Collect** (manual, one-time per refresh): the CDPH roster (above) + the UNR HTML
   table. CDPH gives name, phone, cert #, license #; **no location**.
2. **Enrich location** (CDPH has none): look up each CA Contractor License # on
   **CSLB** ([cslb.ca.gov](https://www.cslb.ca.gov/)) to get the business city/address.
   CSLB is a CA-gov public record, so this stays state-sourced. (NV's UNR list already
   includes region, so NV skips this step.)
   - *Method (proven):* CSLB's "Check A License" is a JS/postback app, so WebFetch can't
     read it, but **headless Playwright** can drive the form (`#MainContent_LicNo` +
     `#MainContent_Contractor_License_Number_Search`) and read the rendered detail page.
     Done for all 12 on 2026-06-15 → `docs/mitigators-ca-raw.json`. (Env note: launch the
     repo's chromium at `/opt/pw-browsers/...` with `ignoreHTTPSErrors` for the proxy.)
     Re-run when refreshing the roster; CSLB has periodic maintenance windows that return
     empty fields, so guard on "Business Information" + a ZIP being present.
   - *Caveat:* a contractor's business address is their **office**, not their service
     area. A mitigator may serve a wide radius. Pins mark "where they're based," and
     the list/UI should say so to avoid a misleading "nearest pin = best for me."
3. **Geocode** (script, one-time): geocode the enriched address via the **US Census
   Geocoder** (free, no key, public domain) → `lat`/`lng`. Commit the result.
4. **Bake**: write the typed `Mitigator[]` into `content/mitigators.ts` (de-dupe on cert #).
5. The schema guard (`tests/schema.test.ts`, via `tsx`) validates it at test time.

## Map + a11y implementation notes

- `'use client'` map component (interactivity); the **list is a server component**
  rendering the same `content` data, so it works with JS off and is the SR target.
- MapLibre native clustering (`cluster: true` GeoJSON source) — though at ~25 pins
  clustering is barely needed; keep it simple.
- Axe-passing requirements (our hard gate):
  - Zoom controls need `aria-label` ("Zoom in" / "Zoom out") — the #1 map axe failure.
  - The map container needs an accessible name; markers need accessible names.
  - `tel:` links: visible hyphen-separated number, no `aria-label` digit override
    (the field is split on this; plain text is the safe default).
  - If the map is ever made decorative, use `inert` (not bare `aria-hidden`, which
    trips `aria-hidden-focus` over focusable markers).
- Risk ramp (`--risk-*`) stays reserved for pCi/L. Map/pins use brand/ink + shadcn
  semantics only.

## Definition of done (per CLAUDE.md 5 layers)

- [ ] **Presence** — mitigator fields render (auto via `content.spec.ts` iterating the model).
- [ ] **Credibility** — every pin's `sourceId` is primary-tier + linked (auto via `credibility.spec.ts`).
- [ ] **Behavior** (write first, RED → GREEN): list renders all entries; `tel:` hrefs correct; map mounts; marker → popup shows name + phone; optional `track()` event via the `window.__rgEvents` seam.
- [ ] **Structure / a11y** — still exactly one `h1`; axe clean; zoom + markers + map container have accessible names.
- [ ] **Platform** — no horizontal overflow at mobile width; the list (key content) is visible on mobile.
- [ ] `npm run test` green.

## Proposed chunk sequence (verify-then-execute)

1. ~~**Chunk A — data + model.**~~ ✅ **DONE (2026-06-15).** Added `cslb` primary source;
   `MitigatorSchema`/`MitigatorsSchema` + `assertMitigators` (primary-tier + unique cert IDs)
   in `content/schema.ts`; baked the 12 CA mitigators in `content/mitigators.ts` (CSLB business
   phones; lat/lng via `scripts/geocode-mitigators.mjs` — 9 street-level, 3 city-level fallback
   flagged `precise:false`); `getMitigators()` seam in `lib/content.ts`; extended the schema guard.
   Verified: schema guard ✓, tsc ✓, eslint ✓, `next build` ✓ (static), e2e 72/72 ✓.
   (`unr_radon` deferred to Chunk D with the NV data.)
2. ~~**Chunk B — accessible list.**~~ ✅ **DONE (2026-06-15).** Added a reusable shadcn
   `components/ui/table.tsx` primitive (canonical, with two documented divergences:
   no `whitespace-nowrap` + `tabIndex={0}` scroll container, both for the mobile
   no-overflow + axe rules). New `/mitigators` route (own `h1`, metadata, sitemap) renders
   `components/mitigator-list.tsx` from `getMitigators()` — name/business, city (+"serves
   California" for the NV-based one), `tel:` phone links, CDPH + CSLB source chips, snapshot
   date. Refactored `mitigation-table.tsx` onto the primitive and linked it to `/mitigators`.
   Test-first across content/credibility/quality specs (RED→GREEN). Verified: schema guard ✓,
   tsc ✓, eslint ✓, build ✓ (static), e2e 88/88 ✓.
3. ~~**Chunk C — map enhancement.**~~ ✅ **DONE (2026-06-15).** `components/mitigator-map.tsx`
   (`'use client'`, maplibre dynamic-imported in `useEffect` so SSR never touches it; falls
   back to list-only if WebGL is absent). MapLibre + OpenFreeMap "bright" style; `<button>`
   HTML markers (accessible name = mitigator name) → popups with name/city/`tel:` phone;
   `NavigationControl` + `AttributionControl` (required OpenFreeMap text); fires a typed
   `map_pin_open` analytics event. Placed above the list on `/mitigators` (one `h1` kept).
   Test-first behavior specs (marker count, click → popup + event). Verified WebGL works in
   both Playwright chromium + webkit; CI-mode (prod server) e2e **92/92** ✓; schema guard, tsc,
   eslint, build all ✓. (Note: local `next dev` can show a webkit RSC-prefetch flake on the
   legal pages — a dev-server artifact, green under the production CI config.)
4. ~~**Chunk D — Nevada.**~~ ❌ **RETIRED (2026-06-15, owner-approved).** Verified that a
   NV-only mitigator can't legally work on a California (South Lake Tahoe) home, and the
   Tahoe-basin pros who *can* are already on the CA list (see the "Jurisdiction" note in the
   Nevada section). A standalone NV roster serves *Nevada* homeowners — a different audience
   than this SLT-focused product — so it's dropped. Revisit only if scope deliberately
   expands to Nevada homes; if so, gate it behind a jurisdiction label and a "NV cert ≠ CA
   authorization" warning. `unr_radon` is therefore **not** being added.

## Open questions / TODOs
- [x] ~~Verify the CDPH mitigators PDF fields + count~~ — done (owner paste, 2026-06-15): 12 unique, no location field.
- [x] ~~Decide location-enrichment source~~ → **CSLB license lookup** (owner, 2026-06-15).
- [x] ~~Pull CSLB locations for the 12~~ → done via headless Playwright → `docs/mitigators-ca-raw.json`.
- [x] ~~Map vs list~~ → **list first** (shippable), map as a later enhancement (owner, 2026-06-15).
- [x] ~~Which phone to display~~ → **CSLB business line** (owner, 2026-06-15).
- [x] ~~Convey service area vs office location~~ → done: list caption + "serves California" note + the "pins mark each office, not service area" line on `/mitigators` (Chunk B/C).
- [x] ~~Geocode the 12~~ → done via `scripts/geocode-mitigators.mjs` (Chunk A).
- [x] ~~MapLibre under Next 16 / Turbopack~~ → confirmed; dynamic-imported in `useEffect`, WebGL works in Playwright chromium + webkit (Chunk C).
- [x] ~~Where does the map live~~ → dedicated `/mitigators` route (Chunk B/C).
- [x] ~~OpenFreeMap attribution~~ → `AttributionControl` with the required text (Chunk C).
- [x] ~~Does a map add enough vs a list~~ → yes for CA (12 points spread statewide); shipped as enhancement over the list.
- [x] ~~Nevada / South Lake Tahoe jurisdiction~~ → **Chunk D retired** (owner, 2026-06-15): a NV-only mitigator can't legally work on a CA (SLT) home; verified vs CDPH + CSLB.

## Research provenance
Five-angle deep-research pass on 2026-06-15 (data sources, NRPP/NRSB directories,
geocoding, map stack + tiles, accessibility). Key external sources:
CDPH radon pages; UNR Extension radon pages; nrpp.info / nrsb.org; certifiedradonpros.org;
OSMF Nominatim + tile usage policies; US Census Gazetteer/Geocoder; OpenFreeMap;
Protomaps; Equal Entry / AccessibilityOz / Leaflet a11y docs.
