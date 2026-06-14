import { getPageContent } from "@/lib/content";
import { SourceChip } from "./stat-link";
import { CtaTest } from "./cta-test";

export function Hero() {
  const { hero } = getPageContent();
  return (
    <header className="mx-auto max-w-2xl px-5 pt-12">
      <p className="text-sm text-ink-500">{hero.eyebrow}</p>
      <h1 className="mt-2 text-3xl leading-tight text-ink-900">
        {hero.headline}
      </h1>
      <p className="mt-3 text-lg text-ink-700">{hero.body}</p>
      <p className="mt-3 text-xs text-ink-500">{hero.caveat}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {hero.sourceIds.map((id) => (
          <SourceChip key={id} sourceId={id} />
        ))}
      </div>
      <div className="mt-5">
        <CtaTest location="hero" />
      </div>
    </header>
  );
}
