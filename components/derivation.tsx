"use client";

import { track } from "@/lib/analytics";
import { getPageContent } from "@/lib/content";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

export function Derivation() {
  const { derivation } = getPageContent();
  return (
    <Accordion
      className="mx-auto mt-4 max-w-2xl px-5"
      // Base UI passes the array of open item values; fire only on open.
      onValueChange={(value) => {
        if (Array.isArray(value) ? value.length > 0 : value != null) {
          track({ name: "derivation_open" });
        }
      }}
    >
      <AccordionItem value="calc">
        <AccordionTrigger data-testid="derivation-trigger">
          {derivation.trigger}
        </AccordionTrigger>
        <AccordionContent>{derivation.body}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
