import { getPageContent } from "@/lib/content";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const ORG_DESCRIPTION =
  "Independent, mission-driven radon education for South Lake Tahoe. Every figure links to a primary source.";

// Question-shaped sections become FAQ entries; the answer text is the visible
// section body (Google requires FAQ answers to appear on the page).
export function faqSections() {
  return getPageContent().sections.filter((s) => s.title.trim().endsWith("?"));
}

export function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      description: ORG_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqSections().map((s) => ({
        "@type": "Question",
        name: s.title,
        acceptedAnswer: { "@type": "Answer", text: s.body },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Trusted, build-time content — no user input in the payload.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
