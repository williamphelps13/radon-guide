import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent } from "@/lib/content";

const { ui, legal } = getPageContent();
const { disclosure } = legal;

export const metadata: Metadata = { title: disclosure.title };

export default function Disclosure() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-2xl">{disclosure.title}</h1>
      <p className="mt-2 text-sm text-ink-500">{disclosure.updated}</p>
      <p className="mt-4 text-ink-700">{disclosure.body}</p>
      <h2 className="mt-8 text-xl">{disclosure.notMedicalHeading}</h2>
      <p className="mt-3 text-ink-700">{disclosure.notMedicalBody}</p>
      <nav className="mt-8 text-sm text-ink-500">
        <Link href="/" className="underline">
          ← {ui.backToGuide}
        </Link>
      </nav>
    </main>
  );
}
