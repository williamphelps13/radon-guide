import { Hero } from "@/components/hero";
import { CredibilityStrip } from "@/components/credibility-strip";
import { Stat } from "@/components/stat-link";
import { RiskScale } from "@/components/risk-scale";
import { TestingPath } from "@/components/testing-path";
import { MitigationTable } from "@/components/mitigation-table";
import { NewsletterForm } from "@/components/newsletter-form";
import { PartnershipForm } from "@/components/partnership-form";
import { getPageContent } from "@/lib/content";

export default function Home() {
  const usDeaths = getPageContent().stats.find((s) => s.id === "us_deaths")!;
  return (
    <main>
      <Hero />
      <CredibilityStrip />
      {/* Placeholder home for us_deaths; moves into the "how bad" section in a later chunk. */}
      <section className="mx-auto mt-8 max-w-2xl px-5">
        <Stat
          value={usDeaths.value}
          label={usDeaths.label}
          sourceId={usDeaths.sourceId}
        />
      </section>
      <RiskScale />
      <TestingPath />
      <MitigationTable />
      {/* Temporary forms home until the Footer lands (task 7.1). */}
      <section className="mx-auto mt-10 grid max-w-2xl gap-8 px-5 pb-16 sm:grid-cols-2">
        <NewsletterForm />
        <PartnershipForm />
      </section>
    </main>
  );
}
