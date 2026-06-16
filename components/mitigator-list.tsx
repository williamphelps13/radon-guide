import type { Mitigator, Mitigators } from "@/content/schema";
import { telHref } from "@/lib/utils";
import { SourceChip } from "./stat-link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function MitigatorList({
  mitigators,
  updatedAt,
  copy,
}: {
  mitigators: Mitigator[];
  updatedAt: string;
  copy: Mitigators["copy"]["list"];
}) {
  return (
    <section aria-label={copy.ariaLabel}>
      <Table>
        <TableCaption className="text-left text-ink-500">
          {copy.caption} {copy.updatedLabel} {updatedAt}.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{copy.headers.name}</TableHead>
            <TableHead>{copy.headers.location}</TableHead>
            <TableHead>{copy.headers.phone}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mitigators.map((m) => (
            <TableRow key={m.certId}>
              <TableCell className="align-top text-ink-900">
                <span className="font-medium">{m.name}</span>
                {m.business && (
                  <span className="block text-xs text-ink-500">
                    {m.business}
                  </span>
                )}
              </TableCell>
              <TableCell className="align-top text-ink-700">
                {m.city}, {m.state}
                {m.state !== "CA" && (
                  <span className="block text-xs text-ink-500">
                    {copy.servesCaveat}
                  </span>
                )}
              </TableCell>
              <TableCell className="align-top">
                {m.phone ? (
                  <a
                    href={telHref(m.phone)}
                    className="text-brand-700 underline-offset-2 hover:underline"
                  >
                    {m.phone}
                  </a>
                ) : (
                  <span className="text-ink-400">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex flex-wrap gap-2">
        <SourceChip sourceId="cdph_mitigators" />
        <SourceChip sourceId="cslb" />
      </div>
    </section>
  );
}
