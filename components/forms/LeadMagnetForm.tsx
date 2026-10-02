"use client";

import Link from "next/link";
import { Honeypot, FormStatus } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
import { Arrow, buttonClasses, cx } from "@/components/ui";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/siteConfig";

export function LeadMagnetForm({ placement, dark = true }: { placement: string; dark?: boolean }) {
  const { state, handleSubmit } = useFormSubmit("/api/subscribe", { source: placement }, () =>
    track("lead_magnet_signup", { placement }),
  );
  const ids = { first: `${placement}-first`, email: `${placement}-email` };

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className={cx("border-l-2 pl-5", dark ? "border-gold" : "border-terracotta")}>
        <p className="display text-3xl">Thank you.</p>
        <p className={cx("mt-2", dark ? "text-ivory/85" : "text-ink-soft")}>{state.message}</p>
        {siteConfig.leadMagnetUrl && (
          <a
            href={siteConfig.leadMagnetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cx("mt-4 inline-block font-semibold underline underline-offset-4", dark ? "text-gold" : "text-terracotta")}
          >
            Open the Starter Kit now
          </a>
        )}
      </div>
    );
  }

  const inputClass = cx(
    "block w-full rounded-[3px] border px-4 py-3.5 text-base focus:outline-none",
    dark
      ? "border-ivory/30 bg-forest-deep/60 text-ivory placeholder:text-ivory/60 focus:border-gold"
      : "border-line bg-paper text-ink placeholder:text-muted focus:border-ink",
  );

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4" aria-label="Get the free College ROI Starter Kit">
      <Honeypot id={`${placement}-website`} />
      <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr]">
        <div>
          <label htmlFor={ids.first} className="sr-only">
            First name (optional)
          </label>
          <input id={ids.first} name="firstName" type="text" autoComplete="given-name" placeholder="First name" className={inputClass} />
        </div>
        <div>
          <label htmlFor={ids.email} className="sr-only">
            Email address
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            className={inputClass}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={state.status === "submitting"}
        className={buttonClasses(dark ? "light" : "primary", "lg", "w-full sm:w-auto")}
      >
        {state.status === "submitting" ? "Sending…" : "Send me the free guide"}
        <Arrow />
      </button>
      <FormStatus state={state} dark={dark} />
      <p className={cx("text-xs", dark ? "text-ivory/75" : "text-muted")}>
        Occasional emails about college money and opportunities. Unsubscribe anytime. See the{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
