"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribe, type FormState } from "@/app/actions/newsletter";
import { getPageContent } from "@/lib/content";
import { Input } from "./ui/input";
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

export function NewsletterForm() {
  const { newsletter, fields } = getPageContent().forms;
  const [state, action] = useActionState<FormState, FormData>(subscribe, {
    ok: false,
  });
  return (
    <form
      action={action}
      className="flex flex-col gap-2"
      data-testid="newsletter-form"
    >
      {/* Honeypot: hidden from people + AT; bots that fill it are dropped server-side. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <Label htmlFor="newsletter-email">{fields.email}</Label>
      <Input
        id="newsletter-email"
        name="email"
        type="email"
        placeholder={fields.emailPlaceholder}
        required
      />
      <Submit label={newsletter.cta} pendingLabel={newsletter.pending} />
      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {state.ok && (
          <span data-testid="newsletter-ok" className="font-medium text-brand-700">
            {newsletter.success}
          </span>
        )}
        {state.error && (
          <span data-testid="newsletter-error" className="text-destructive">
            {state.error}
          </span>
        )}
      </p>
    </form>
  );
}
