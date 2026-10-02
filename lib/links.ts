import { siteConfig } from "@/lib/siteConfig";

/**
 * Resolves every booking / checkout CTA to either the configured external URL
 * or a clearly-labelled setup page — never a dead "#" link.
 */

export type BookingKind = keyof typeof siteConfig.booking;
export type CheckoutKind = keyof typeof siteConfig.checkout;
export type SetupSlug =
  | "free-call"
  | "strategy-session"
  | "fit-call"
  | "strategy-pack"
  | "intensive"
  | "blueprint"
  | "payment-plan"
  | "intake"
  | "client-scheduling";

export interface ResolvedLink {
  href: string;
  configured: boolean;
  external: boolean;
}

const bookingSlugs: Record<BookingKind, SetupSlug> = {
  freeCall: "free-call",
  strategySession: "strategy-session",
  fitCall: "fit-call",
};

const checkoutSlugs: Record<CheckoutKind, SetupSlug> = {
  strategyPack: "strategy-pack",
  intensive: "intensive",
  blueprint: "blueprint",
  paymentPlan: "payment-plan",
};

export const bookingTitles: Record<BookingKind, string> = {
  freeCall: "Free 20-Minute College ROI Call",
  strategySession: "College ROI Strategy Session — $100",
  fitCall: "Flagship Program Fit Call",
};

function resolve(url: string | undefined, slug: SetupSlug): ResolvedLink {
  return url
    ? { href: url, configured: true, external: true }
    : { href: `/setup/${slug}`, configured: false, external: false };
}

export function bookingLink(kind: BookingKind): ResolvedLink {
  return resolve(siteConfig.booking[kind], bookingSlugs[kind]);
}

export function checkoutLink(kind: CheckoutKind): ResolvedLink {
  return resolve(siteConfig.checkout[kind], checkoutSlugs[kind]);
}

/** Future processor; returns undefined when not configured so no button renders. */
export function paypalLink(kind: CheckoutKind): string | undefined {
  return siteConfig.paypal[kind];
}

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function configuredSocials(): { label: string; href: string }[] {
  const all: { label: string; href: string | undefined }[] = [
    { label: "Instagram", href: siteConfig.social.instagram },
    { label: "TikTok", href: siteConfig.social.tiktok },
    { label: "YouTube", href: siteConfig.social.youtube },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "Facebook", href: siteConfig.social.facebook },
  ];
  return all.flatMap((s) => (s.href ? [{ label: s.label, href: s.href }] : []));
}
