import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent } from "@/lib/content";

const { ui, legal } = getPageContent();
const { privacy } = legal;

export const metadata: Metadata = { title: privacy.title };

// Render the access sentence with its link phrase wrapped, keeping the rendered
// text equal to the model string (same approach as testing-path's withKitLink).
// If the link phrase isn't found, fall back to the plain sentence so a future
// copy edit can't silently drop the trailing text (a schema guard also enforces
// that `accessLink` is a substring of `access`).
const [accessBefore, accessAfter] = privacy.access.split(privacy.accessLink);
const accessParagraph =
  accessAfter === undefined ? (
    privacy.access
  ) : (
    <>
      {accessBefore}
      <Link href="/" className="underline">
        {privacy.accessLink}
      </Link>
      {accessAfter}
    </>
  );

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-2xl">{privacy.title}</h1>
      <p className="mt-2 text-sm text-ink-500">{privacy.updated}</p>
      <p className="mt-4 text-ink-700">{privacy.intro}</p>
      <p className="mt-4 text-ink-700">{privacy.newsletter}</p>
      <p className="mt-4 text-ink-700">{accessParagraph}</p>
      <nav className="mt-8 text-sm text-ink-500">
        <Link href="/" className="underline">
          ← {ui.backToGuide}
        </Link>
      </nav>
    </main>
  );
}
