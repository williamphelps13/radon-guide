import type { Metadata } from "next";
import Link from "next/link";
import { getMitigators } from "@/lib/content";
import { MitigatorMap } from "@/components/mitigator-map";
import { MitigatorList } from "@/components/mitigator-list";

const { copy } = getMitigators();

export const metadata: Metadata = {
  title: copy.title,
  description:
    "California-certified radon mitigation contractors with phone numbers, from the CDPH certified list and the state license board.",
  alternates: { canonical: "/mitigators" },
};

export default function MitigatorsPage() {
  const { mitigators, updatedAt } = getMitigators();
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-2xl">{copy.heading}</h1>
      <p className="mt-3 text-ink-700">{copy.intro}</p>
      <div className="mt-8">
        <MitigatorMap mitigators={mitigators} />
        <p className="mt-2 text-xs text-ink-500">{copy.mapNote}</p>
      </div>
      <div className="mt-8">
        <MitigatorList mitigators={mitigators} updatedAt={updatedAt} />
      </div>
      <nav className="mt-10 text-sm text-ink-500">
        <Link href="/" className="underline">
          ← Back to the guide
        </Link>
      </nav>
    </main>
  );
}
