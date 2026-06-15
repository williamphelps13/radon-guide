import Link from "next/link";
import { getPageContent } from "@/lib/content";
import { SourceChip } from "./stat-link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function MitigationTable() {
  const { mitigationRows } = getPageContent();
  return (
    <section
      aria-label="Radon mitigation options"
      className="mx-auto mt-4 max-w-2xl px-5"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>System</TableHead>
            <TableHead>Foundation</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Reduction</TableHead>
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
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <SourceChip sourceId="epa_citizens_guide" />
        <Link
          href="/mitigators"
          className="text-sm text-brand-700 underline-offset-2 hover:underline"
        >
          Find a certified mitigator →
        </Link>
      </div>
    </section>
  );
}
