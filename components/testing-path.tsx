import { getPageContent } from "@/lib/content";
import { KitLink } from "./kit-link";

const KIT_PHRASE = "CDPH $14.95 kit";

// Render the primary route's action with the kit phrase wrapped in a tracked
// outbound link. The span's text stays equal to the content `action` string, so
// the DRY presence test still matches it exactly.
function withKitLink(action: string) {
  const [before, after] = action.split(KIT_PHRASE);
  if (after === undefined) return action;
  return (
    <>
      {before}
      <KitLink>{KIT_PHRASE}</KitLink>
      {after}
    </>
  );
}

export function TestingPath() {
  const { testingRoutes, testing } = getPageContent();
  return (
    <section id="test" className="mx-auto mt-10 max-w-2xl px-5">
      <h2 className="text-xl">{testing.heading}</h2>
      <ul className="mt-4 space-y-2">
        {testingRoutes.map((r) => (
          <li
            key={r.status}
            data-primary={r.primary ? "true" : "false"}
            className={`flex flex-wrap items-center gap-2 rounded-md p-3 ${
              r.primary
                ? "border-2 border-brand-500 bg-white"
                : "bg-ink-50"
            }`}
          >
            <span className="w-32 shrink-0 text-sm font-medium text-ink-900">
              {r.status}
            </span>
            <span className="flex-1 text-sm text-ink-700">
              {r.primary ? withKitLink(r.action) : r.action}
            </span>
            {r.primary && (
              <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                {testing.startHere}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-500">{testing.protocol}</p>
    </section>
  );
}
