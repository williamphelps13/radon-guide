import { ImageResponse } from "next/og";
import { getPageContent } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Static branded social card, prerendered at build (the page is static).
export const alt = "Radon in South Lake Tahoe — test your home";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand + risk palette (hex, mirroring app/globals.css; ImageResponse can't read CSS vars).
const BRAND_900 = "#002159";
const BRAND_300 = "#47a3f3";
const RISK_ELEVATED = "#f35627";

export default function OpengraphImage() {
  const { hero } = getPageContent();
  const host = new URL(SITE_URL).host;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND_900,
          color: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: BRAND_300,
            fontWeight: 600,
          }}
        >
          {hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            lineHeight: 1.12,
            fontWeight: 600,
            maxWidth: 1000,
          }}
        >
          {hero.headline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            color: "#cbd2d9",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: RISK_ELEVATED,
            }}
          />
          {SITE_NAME} · {host}
        </div>
      </div>
    ),
    size,
  );
}
