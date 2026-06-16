"use server";

import { z } from "zod";
import { notifyOwner } from "@/lib/email";
import { trackServer } from "@/lib/analytics-server";
import { getPageContent } from "@/lib/content";

// Single source of truth: the accepted roles come from the content model (the
// same list the partnership form renders), so the select and validation can't drift.
const { partnership, errors } = getPageContent().forms;
const roleValues = partnership.roles.map((r) => r.value) as [
  string,
  ...string[],
];

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.email().max(254),
  role: z.enum(roleValues),
  message: z.string().min(1).max(5000),
  website: z.string().max(0).optional(), // honeypot
});

export type FormState = { ok: boolean; error?: string };

export async function contact(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    role: form.get("role"),
    message: form.get("message"),
    website: form.get("website") ?? "",
  });
  if (!parsed.success) return { ok: false, error: errors.invalidFields };
  if (parsed.data.website) return { ok: true }; // honeypot tripped
  try {
    const { name, email, role, message } = parsed.data;
    // Function replacers so a name/role containing `$` patterns ($&, $1, …) is
    // inserted verbatim rather than interpreted by String.prototype.replace.
    const subject = partnership.emailSubject
      .replace("{role}", () => role)
      .replace("{name}", () => name);
    await notifyOwner(subject, `From: ${name} <${email}> (${role})\n\n${message}`);
    await trackServer({ name: "partnership_submit", props: { role } });
    return { ok: true };
  } catch {
    return { ok: false, error: errors.generic };
  }
}
