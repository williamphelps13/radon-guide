import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-2xl">Privacy</h1>
      <p className="mt-2 text-sm text-ink-500">Last updated June 14, 2026</p>
      <p className="mt-4 text-ink-700">
        We use Vercel Web Analytics, which is cookieless and does not track you
        across sites — so there is no cookie banner. If you submit a form, we
        receive only what you enter (your email, and for partnership inquiries
        your name, role, and message) so we can respond to you. We do not sell or
        share it.
      </p>
      <p className="mt-4 text-ink-700">
        Newsletter emails are stored with our email provider (Resend) solely to
        notify you when free test kits open.
      </p>
      <p className="mt-4 text-ink-700">
        To access or delete the information you’ve given us, reach out through
        the partnership form on our{" "}
        <Link href="/" className="underline">
          homepage
        </Link>{" "}
        and we’ll take care of it.
      </p>
      <nav className="mt-8 text-sm text-ink-500">
        <Link href="/" className="underline">
          ← Back to the guide
        </Link>
      </nav>
    </main>
  );
}
