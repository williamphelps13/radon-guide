// One-time, build-time geocoder for the mitigator roster.
// Reads docs/mitigators-ca-raw.json (CSLB-enriched), resolves each office
// address to lat/lng, and prints a { license: { lat, lng, via } } map.
//
// Strategy: US Census Geocoder (free, no key, public domain) for street
// addresses; fall back to OSM Nominatim city/ZIP for PO-box-only rows.
// Run once when refreshing the roster:
//   NODE_TLS_REJECT_UNAUTHORIZED=0 node scripts/geocode-mitigators.mjs
// (NODE_TLS_REJECT_UNAUTHORIZED is only for this container's TLS proxy.)
import { readFileSync } from "node:fs";

const UA = "radon-guide/0.1 (mitigator map; williamphelps13@gmail.com)";
const raw = JSON.parse(readFileSync(new URL("../docs/mitigators-ca-raw.json", import.meta.url)));

const street = (addr) => {
  const parts = addr.split(" | ").map((s) => s.trim()).filter((s) => !/^dba /i.test(s));
  return parts.slice(1, -1).join(" "); // drop business (first) + cityStateZip (last)
};
const isPoBox = (s) => /^p\.?\s*o\.?\s*box/i.test(s);

async function census(oneline) {
  const u = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(oneline)}&benchmark=Public_AR_Current&format=json`;
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const m = j?.result?.addressMatches?.[0];
  return m ? { lat: m.coordinates.y, lng: m.coordinates.x } : null;
}
async function nominatim(q) {
  const u = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=us`;
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  const j = await r.json();
  return j?.[0] ? { lat: +j[0].lat, lng: +j[0].lon } : null;
}

const out = {};
for (const m of raw) {
  const st = street(m.address);
  const csz = m.cityStateZip;
  let coord = null, via = "";
  if (st && !isPoBox(st)) { coord = await census(`${st}, ${csz}`); if (coord) via = "census:street"; }
  if (!coord) { coord = await nominatim(csz); if (coord) via = "nominatim:city"; await new Promise((r) => setTimeout(r, 1100)); }
  out[m.lic] = coord ? { ...coord, via, city: csz } : { error: "no match", city: csz };
  console.error(`${m.name.padEnd(18)} ${m.lic.padEnd(8)} -> ${coord ? coord.lat.toFixed(4)+","+coord.lng.toFixed(4) : "FAIL"} (${via||"none"})`);
}
console.log(JSON.stringify(out, null, 2));
