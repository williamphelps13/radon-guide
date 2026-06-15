import type { Metadata } from "next";
import Link from "next/link";
import { MitigatorList } from "@/components/mitigator-list";

export const metadata: Metadata = {
  title: "Find a Certified Mitigator",
  description:
    "California-certified radon mitigation contractors with phone numbers, from the CDPH certified list and the state license board.",
  alternates: { canonical: "/mitigators" },
};

export default function MitigatorsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-2xl">Find a certified radon mitigator</h1>
      <p className="mt-3 text-ink-700">
        If a test comes back at or above 4 pCi/L, the next step is hiring a
        certified mitigator. California requires every radon mitigator to hold a
        national certification and a state contractor license. Everyone below is
        on the CDPH certified list.
      </p>
      <div className="mt-8">
        <MitigatorList />
      </div>
      <nav className="mt-10 text-sm text-ink-500">
        <Link href="/" className="underline">
          ← Back to the guide
        </Link>
      </nav>
    </main>
  );
}
