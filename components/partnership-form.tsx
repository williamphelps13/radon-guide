"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { contact, type FormState } from "@/app/actions/partnership";
import { getPageContent } from "@/lib/content";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending…" : label}
    </Button>
  );
}

export function PartnershipForm() {
  const { partnership } = getPageContent().forms;
  const [state, action] = useActionState<FormState, FormData>(contact, {
    ok: false,
  });
  return (
    <form
      action={action}
      className="flex flex-col gap-2"
      data-testid="partnership-form"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <Label htmlFor="partnership-name">Name</Label>
      <Input id="partnership-name" name="name" required />
      <Label htmlFor="partnership-email">Email</Label>
      <Input id="partnership-email" name="email" type="email" required />
      <Label htmlFor="partnership-role">I am a</Label>
      <select
        id="partnership-role"
        name="role"
        required
        // Native select (best on mobile: uses the OS picker); styled to match the
        // shadcn Input/Textarea around it.
        className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
      >
        {partnership.roles.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      <Label htmlFor="partnership-message">Message</Label>
      <Textarea
        id="partnership-message"
        name="message"
        placeholder="How can we work together?"
        required
      />
      <Submit label={partnership.cta} />
      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {state.ok && (
          <span
            data-testid="partnership-ok"
            className="font-medium text-brand-700"
          >
            {partnership.success}
          </span>
        )}
        {state.error && (
          <span data-testid="partnership-error" className="text-destructive">
            {state.error}
          </span>
        )}
      </p>
    </form>
  );
}
