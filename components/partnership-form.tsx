"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { contact, type FormState } from "@/app/actions/partnership";
import { getPageContent } from "@/lib/content";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

function Submit({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

export function PartnershipForm() {
  const { partnership, fields } = getPageContent().forms;
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
      <Label htmlFor="partnership-name">{fields.name}</Label>
      <Input id="partnership-name" name="name" required />
      <Label htmlFor="partnership-email">{fields.email}</Label>
      <Input id="partnership-email" name="email" type="email" required />
      <Label htmlFor="partnership-role">{fields.role}</Label>
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
      <Label htmlFor="partnership-message">{fields.message}</Label>
      <Textarea
        id="partnership-message"
        name="message"
        placeholder={fields.messagePlaceholder}
        required
      />
      <Submit label={partnership.cta} pendingLabel={partnership.pending} />
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
