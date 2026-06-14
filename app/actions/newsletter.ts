"use server";

import { z } from "zod";
import { addToAudience } from "@/lib/email";
import { trackServer } from "@/lib/analytics-server";

const schema = z.object({
  email: z.email().max(254),
  website: z.string().max(0).optional(), // honeypot — bots fill it
});

export type FormState = { ok: boolean; error?: string };

export async function subscribe(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse({
    email: form.get("email"),
    website: form.get("website") ?? "",
  });
  if (!parsed.success) return { ok: false, error: "Please enter a valid email." };
  if (parsed.data.website) return { ok: true }; // honeypot tripped — pretend success
  try {
    await addToAudience(parsed.data.email);
    await trackServer({ name: "newsletter_submit" });
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
