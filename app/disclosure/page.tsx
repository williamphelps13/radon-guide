import type { Metadata } from "next";

export const metadata: Metadata = { title: "Disclosure" };

export default function Disclosure() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-2xl">Disclosure</h1>
      <p className="mt-2 text-sm text-ink-500">Last updated June 14, 2026</p>
      <p className="mt-4 text-ink-700">
        Radon Guide is an independent, mission-driven project. We currently have
        no paid relationships and earn nothing from the testing options we
        recommend — we point you to the cheapest reliable one. If that ever
        changes, we will say so here.
      </p>
      <h2 className="mt-8 text-xl">Not medical advice</h2>
      <p className="mt-3 text-ink-700">
        This site is educational and is not a substitute for professional
        medical or environmental-health advice.
      </p>
      <nav className="mt-8 text-sm text-ink-500">
        <a href="/" className="underline">
          ← Back to the guide
        </a>
      </nav>
    </main>
  );
}
