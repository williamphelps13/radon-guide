import { getPageContent } from "@/lib/content";
import { SourceChip } from "./stat-link";

export function MitigationTable() {
  const { mitigationRows } = getPageContent();
  return (
    <section
      aria-label="Radon mitigation options"
      className="mx-auto mt-4 max-w-2xl px-5"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-ink-500">
            <tr>
              <th className="py-2 pr-3 font-medium">System</th>
              <th className="py-2 pr-3 font-medium">Foundation</th>
              <th className="py-2 pr-3 font-medium">Cost</th>
              <th className="py-2 font-medium">Reduction</th>
            </tr>
          </thead>
          <tbody>
            {mitigationRows.map((m) => (
              <tr key={m.system} className="border-t border-ink-100">
                <td className="py-2 pr-3 text-ink-900">{m.system}</td>
                <td className="py-2 pr-3 text-ink-700">{m.foundation}</td>
                <td className="py-2 pr-3 text-ink-700">{m.cost}</td>
                <td className="py-2 text-ink-700">{m.reduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <SourceChip sourceId="epa_citizens_guide" />
      </div>
    </section>
  );
}
