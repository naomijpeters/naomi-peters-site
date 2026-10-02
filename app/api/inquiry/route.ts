import { NextResponse } from "next/server";
import { serverConfig } from "@/lib/serverConfig";
import { siteConfig } from "@/lib/siteConfig";
import { EMAIL_RE, isProduction, str, type ApiResponse } from "@/lib/validation";

/**
 * Contact + speaking inquiries. Forwards a JSON payload to FORM_ENDPOINT
 * (Formspree, Basin, Getform, a Zapier/Make webhook…). Nothing is stored here.
 */

const CONTACT_FIELDS = ["name", "email", "role", "topic", "message"] as const;
const SPEAKING_FIELDS = [
  "name",
  "organization",
  "email",
  "phone",
  "audience",
  "attendance",
  "date",
  "budget",
  "message",
] as const;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json<ApiResponse>({ ok: false, message: "Invalid request." }, { status: 400 });
  if (str(body.website)) return NextResponse.json<ApiResponse>({ ok: true, message: "Thanks!" });

  const type = body.type === "speaking" ? "speaking" : "contact";
  const fields = type === "speaking" ? SPEAKING_FIELDS : CONTACT_FIELDS;
  const data: Record<string, string> = {};
  for (const key of fields) data[key] = str(body[key], key === "message" ? 5000 : 300);

  const fieldErrors: Record<string, string> = {};
  if (!data.name) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) fieldErrors.email = "Please enter a valid email address.";
  if (type === "speaking" && !data.organization) fieldErrors.organization = "Please enter your organization.";
  if (type === "contact" && !data.message) fieldErrors.message = "Please add a short message.";
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const endpoint = type === "speaking" ? serverConfig.forms.speaking : serverConfig.forms.contact;
  const fallback = siteConfig.email ? ` Please email ${siteConfig.email} directly.` : " Please try again soon.";

  if (!endpoint) {
    return NextResponse.json<ApiResponse>(
      {
        ok: false,
        message: `This form isn't connected yet, so your message was not sent.${fallback}`,
        devHint: isProduction
          ? undefined
          : `Set FORM_ENDPOINT${type === "speaking" ? " (or SPEAKING_FORM_ENDPOINT)" : ""} in .env.local — see README §13.`,
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        form: type,
        _subject: type === "speaking" ? `Speaking inquiry — ${data.organization}` : `Website inquiry — ${data.name}`,
        _replyto: data.email,
      }),
    });
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        ok: false,
        message: `Your message couldn't be sent right now.${fallback}`,
        devHint: isProduction ? undefined : String(error),
      },
      { status: 502 },
    );
  }

  return NextResponse.json<ApiResponse>({
    ok: true,
    message:
      type === "speaking"
        ? "Thank you — your inquiry was received. Naomi will reply by email."
        : "Thank you — your message was received. Naomi will reply by email.",
  });
}
