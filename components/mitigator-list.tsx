import type { Mitigator } from "@/content/schema";
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
}: {
  mitigators: Mitigator[];
  updatedAt: string;
}) {
  return (
    <section aria-label="Certified radon mitigators in California">
      <Table>
        <TableCaption className="text-left text-ink-500">
          Listed where each business is based. Many serve a wider area, so call
          to confirm they cover your county. Updated {updatedAt}.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Phone</TableHead>
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
                    serves California
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
