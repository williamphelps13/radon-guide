import Link from "next/link";
import { getPageContent } from "@/lib/content";
import { NewsletterForm } from "./newsletter-form";
import { PartnershipForm } from "./partnership-form";
import { FooterBeacon } from "./footer-beacon";

export function Footer() {
  const { forms, legal } = getPageContent();
  return (
    <footer className="mx-auto mt-12 max-w-2xl px-5 pb-16">
      <FooterBeacon />
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-base">{forms.newsletter.heading}</h3>
          <div className="mt-2">
            <NewsletterForm />
          </div>
        </div>
        <div>
          <h3 className="text-base">{forms.partnership.heading}</h3>
          <div className="mt-2">
            <PartnershipForm />
          </div>
        </div>
      </div>
      <nav className="mt-8 text-sm text-ink-500">
        <Link href="/privacy" className="underline">
          {legal.privacy.title}
        </Link>{" "}
        ·{" "}
        <Link href="/disclosure" className="underline">
          {legal.disclosure.title}
        </Link>
      </nav>
    </footer>
  );
}
