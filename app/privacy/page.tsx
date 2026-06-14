import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy — Radon Guide" };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-2xl">Privacy</h1>
      <p className="mt-4 text-ink-700">
        We use Vercel Web Analytics, which is cookieless and does not track you
        across sites — so there is no cookie banner. If you submit a form, we
        receive only what you enter (your email, and for partnership inquiries
        your name, role, and message) so we can respond to you. We do not sell or
        share it.
      </p>
      <p className="mt-4 text-ink-700">
        Newsletter emails are stored with our email provider (Resend) solely to
        notify you when free test kits open. You can ask us to remove your
        information at any time.
      </p>
      <nav className="mt-8 text-sm text-ink-500">
        <a href="/" className="underline">
          ← Back to the guide
        </a>
      </nav>
    </main>
  );
}
