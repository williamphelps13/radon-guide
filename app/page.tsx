import { Hero } from "@/components/hero";
import { CredibilityStrip } from "@/components/credibility-strip";
import { Stat } from "@/components/stat-link";
import { Section } from "@/components/section";
import { Derivation } from "@/components/derivation";
import { RiskScale } from "@/components/risk-scale";
import { TestingPath } from "@/components/testing-path";
import { MitigationTable } from "@/components/mitigation-table";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { getPageContent } from "@/lib/content";

export default function Home() {
  const { sections, stats } = getPageContent();
  const section = (id: string) => sections.find((s) => s.id === id)!;
  const usDeaths = stats.find((s) => s.id === "us_deaths")!;

  return (
    <main>
      <JsonLd />
      {/* Funnel order (spec §5): hook → proof → is it me → how bad → fix → why unknown → act */}
      <Hero />
      <CredibilityStrip />

      <Section id="is-my-home" title={section("is-my-home").title}>
        {section("is-my-home").body}
      </Section>

      <Section id="how-bad" title={section("how-bad").title}>
        {section("how-bad").body}
      </Section>
      <section className="mx-auto mt-4 max-w-2xl px-5">
        <Stat
          value={usDeaths.value}
          label={usDeaths.label}
          sourceId={usDeaths.sourceId}
        />
      </section>
      <Derivation />

      <RiskScale />
      <TestingPath />

      <Section id="fix-it" title={section("fix-it").title}>
        {section("fix-it").body}
      </Section>
      <MitigationTable />

      <Section id="why-unknown" title={section("why-unknown").title}>
        {section("why-unknown").body}
      </Section>

      <Footer />
    </main>
  );
}
