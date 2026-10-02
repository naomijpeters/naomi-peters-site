import { serverConfig } from "@/lib/serverConfig";

/**
 * Email-list adapters for the College ROI Starter Kit. No SDKs — plain fetch.
 * Set EMAIL_PROVIDER to kit | beehiiv | mailchimp plus that provider's keys.
 */

export type SubscribeResult =
  | { ok: true; message: string }
  | { ok: false; code: "not_configured" | "provider_error"; devHint?: string };

interface Subscriber {
  email: string;
  firstName?: string;
}

async function kit({ email, firstName }: Subscriber): Promise<SubscribeResult> {
  const { apiKey, formId } = serverConfig.email.kit;
  if (!apiKey || !formId) return notConfigured("Set KIT_API_KEY and KIT_FORM_ID.");
  const headers = { "Content-Type": "application/json", "X-Kit-Api-Key": apiKey };
  const create = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email, first_name: firstName || undefined }),
  });
  if (!create.ok) return providerError("Kit", create);
  const add = await fetch(`https://api.kit.com/v4/forms/${encodeURIComponent(formId)}/subscribers`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email }),
  });
  if (!add.ok) return providerError("Kit", add);
  return { ok: true, message: "You're on the list. Watch your inbox for the Starter Kit." };
}

async function beehiiv({ email }: Subscriber): Promise<SubscribeResult> {
  const { apiKey, publicationId } = serverConfig.email.beehiiv;
  if (!apiKey || !publicationId) return notConfigured("Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID.");
  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${encodeURIComponent(publicationId)}/subscriptions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "website",
        utm_medium: "starter-kit",
      }),
    },
  );
  if (!res.ok) return providerError("Beehiiv", res);
  return { ok: true, message: "You're on the list. Watch your inbox for the Starter Kit." };
}

async function mailchimp({ email, firstName }: Subscriber): Promise<SubscribeResult> {
  const { apiKey, audienceId } = serverConfig.email.mailchimp;
  const dc = apiKey?.split("-")[1];
  if (!apiKey || !audienceId || !dc)
    return notConfigured("Set MAILCHIMP_API_KEY (ending in -usXX) and MAILCHIMP_AUDIENCE_ID.");
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: "pending",
      merge_fields: firstName ? { FNAME: firstName } : undefined,
      tags: ["starter-kit"],
    }),
  });
  if (res.ok) return { ok: true, message: "Almost done — check your inbox to confirm your email." };
  const data = (await res.json().catch(() => ({}))) as { title?: string };
  if (data.title === "Member Exists")
    return { ok: true, message: "You're already on the list. Check your inbox for the Starter Kit." };
  return { ok: false, code: "provider_error", devHint: `Mailchimp responded ${res.status}: ${data.title ?? ""}` };
}

function notConfigured(devHint: string): SubscribeResult {
  return { ok: false, code: "not_configured", devHint };
}

async function providerError(name: string, res: Response): Promise<SubscribeResult> {
  const text = await res.text().catch(() => "");
  return { ok: false, code: "provider_error", devHint: `${name} responded ${res.status}: ${text.slice(0, 200)}` };
}

export async function subscribe(subscriber: Subscriber): Promise<SubscribeResult> {
  switch (serverConfig.email.provider) {
    case "kit":
    case "convertkit":
      return kit(subscriber);
    case "beehiiv":
      return beehiiv(subscriber);
    case "mailchimp":
      return mailchimp(subscriber);
    default:
      return notConfigured(
        "No email provider is connected. Set EMAIL_PROVIDER (kit | beehiiv | mailchimp) and its keys in .env.local — see README §13.",
      );
  }
}
