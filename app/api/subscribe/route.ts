import { NextResponse } from "next/server";
import { subscribe } from "@/lib/emailProviders";
import { EMAIL_RE, isProduction, str, type ApiResponse } from "@/lib/validation";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json<ApiResponse>({ ok: false, message: "Invalid request." }, { status: 400 });

  // Honeypot: real people never fill this hidden field.
  if (str(body.website)) return NextResponse.json<ApiResponse>({ ok: true, message: "Thanks!" });

  const email = str(body.email, 254).toLowerCase();
  const firstName = str(body.firstName, 80);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "Please enter a valid email address.", fieldErrors: { email: "Enter a valid email address." } },
      { status: 422 },
    );
  }

  const result = await subscribe({ email, firstName });
  if (result.ok) return NextResponse.json<ApiResponse>({ ok: true, message: result.message });

  const message =
    result.code === "not_configured"
      ? "Signups for the Starter Kit open soon — the email list isn't connected yet."
      : "Something went wrong on our end. Please try again in a few minutes.";
  return NextResponse.json<ApiResponse>(
    { ok: false, message, devHint: isProduction ? undefined : result.devHint },
    { status: result.code === "not_configured" ? 503 : 502 },
  );
}
