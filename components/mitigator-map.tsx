"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { track } from "@/lib/analytics";
import { telHref } from "@/lib/utils";
import type { Mitigator } from "@/content/schema";

/** Build popup content as DOM nodes (textContent auto-escapes — no raw HTML). */
function popupContent(m: Mitigator): HTMLElement {
  const root = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = m.name;
  root.append(name, document.createElement("br"), `${m.city}, ${m.state}`);
  if (m.phone) {
    const link = document.createElement("a");
    link.href = telHref(m.phone);
    link.textContent = m.phone;
    root.append(document.createElement("br"), link);
  }
  return root;
}

/**
 * Progressive enhancement over the list: a MapLibre + OpenFreeMap map of the
 * mitigators. maplibre is dynamically imported inside the effect so it never
 * runs during SSR; if it cannot initialize (no WebGL), we render nothing and
 * the accessible list below stands alone.
 */
export function MitigatorMap({ mitigators }: { mitigators: Mitigator[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let map: import("maplibre-gl").Map | undefined;
    let cancelled = false;

    (async () => {
      try {
        const maplibregl = (await import("maplibre-gl")).default;
        if (cancelled || !ref.current) return;

        map = new maplibregl.Map({
          container: ref.current,
          style: "https://tiles.openfreemap.org/styles/bright",
          center: [-119.4, 37.2],
          zoom: 4.5,
          attributionControl: false,
        });
        map.addControl(
          new maplibregl.NavigationControl({ showCompass: false }),
          "top-right",
        );
        map.addControl(
          new maplibregl.AttributionControl({
            compact: true,
            customAttribution:
              "OpenFreeMap © OpenMapTiles · Data from OpenStreetMap",
          }),
          "bottom-left",
        );

        const bounds = new maplibregl.LngLatBounds();
        for (const m of mitigators) {
          const el = document.createElement("button");
          el.type = "button";
          el.setAttribute("data-testid", "map-pin");
          el.setAttribute("aria-label", m.name);
          el.className =
            "block size-4 cursor-pointer rounded-full border-2 border-white bg-brand-600 shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";
          const popup = new maplibregl.Popup({ offset: 14 }).setDOMContent(
            popupContent(m),
          );
          // Fire only on open (the marker click toggles, so an element-click
          // listener would also count the click that dismisses the popup).
          popup.on("open", () =>
            track({ name: "map_pin_open", props: { state: m.state } }),
          );
          new maplibregl.Marker({ element: el })
            .setLngLat([m.lng, m.lat])
            .setPopup(popup)
            .addTo(map);
          bounds.extend([m.lng, m.lat]);
        }
        map.fitBounds(bounds, { padding: 48, maxZoom: 9, duration: 0 });
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [mitigators]);

  if (failed) return null;
  return (
    <div
      ref={ref}
      role="region"
      aria-label="Map of certified radon mitigators"
      data-testid="mitigator-map"
      className="h-80 w-full overflow-hidden rounded-md border border-ink-100"
    />
  );
}
