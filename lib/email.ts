import { Resend } from "resend";

// Swap to a verified sending domain in production.
const FROM = "Radon Guide <onboarding@resend.dev>";

// Transport seam: "mock" resolves successfully WITHOUT touching Resend, so the
// Server-Action success branch is deterministically reachable in e2e and never
// sends real mail. Any other value uses the real Resend client.
const isMock = () => process.env.RG_EMAIL_TRANSPORT === "mock";

let client: Resend | null = null;
function resend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export async function notifyOwner(subject: string, text: string): Promise<void> {
  if (isMock()) return;
  const { error } = await resend().emails.send({
    from: FROM,
    to: process.env.OWNER_EMAIL!,
    subject,
    text,
  });
  if (error) throw new Error(error.message);
}

export async function addToAudience(email: string): Promise<void> {
  if (isMock()) return;
  // Adds the contact to the account's default audience.
  const { error } = await resend().contacts.create({ email });
  if (error) throw new Error(error.message);
}
