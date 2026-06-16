import { getPageContent } from "@/lib/content";
import { SourceChip } from "./stat-link";
import { MitigatorCta } from "./mitigator-cta";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function MitigationTable() {
  const { mitigationRows, mitigation } = getPageContent();
  return (
    <section
      aria-label={mitigation.ariaLabel}
      className="mx-auto mt-4 max-w-2xl px-5"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{mitigation.headers.system}</TableHead>
            <TableHead>{mitigation.headers.foundation}</TableHead>
            <TableHead>{mitigation.headers.cost}</TableHead>
            <TableHead>{mitigation.headers.reduction}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mitigationRows.map((m) => (
            <TableRow key={m.system}>
              <TableCell className="text-ink-900">{m.system}</TableCell>
              <TableCell className="text-ink-700">{m.foundation}</TableCell>
              <TableCell className="text-ink-700">{m.cost}</TableCell>
              <TableCell className="text-ink-700">{m.reduction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <SourceChip sourceId="epa_citizens_guide" />
        <MitigatorCta />
      </div>
    </section>
  );
}
