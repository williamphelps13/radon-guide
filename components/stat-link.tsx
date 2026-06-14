import { getSource } from "@/lib/content";
import type { SourceId } from "@/content/sources";

export function SourceChip({ sourceId }: { sourceId: SourceId }) {
  const s = getSource(sourceId);
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      data-source-tier={s.tier}
      className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs text-brand-700"
    >
      ↗ {s.label}
    </a>
  );
}

export function Stat({
  value,
  label,
  sourceId,
}: {
  value: string;
  label: string;
  sourceId: SourceId;
}) {
  const s = getSource(sourceId);
  return (
    <div className="rounded-md bg-ink-50 p-3">
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        data-stat-value={value}
        data-source-tier={s.tier}
        className="text-2xl font-medium text-ink-900 underline-offset-2 hover:underline"
      >
        {value}
      </a>
      <p className="mt-1 text-xs text-ink-600">{label}</p>
    </div>
  );
}
