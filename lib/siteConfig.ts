/**
 * Central site configuration.
 *
 * Every external link (booking, checkout, social, email) lives here and is
 * read from environment variables — see `.env.example`. Components never
 * hard-code integration URLs; they ask `lib/links.ts`, which reads this file.
 *
 * NOTE: Next.js only exposes `NEXT_PUBLIC_*` values to the browser when they
 * are written out literally (`process.env.NEXT_PUBLIC_X`), so keep them that way.
 */

function env(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export const siteConfig = {
  name: "Naomi Peters",
  descriptor: "College Money, Opportunity & Career Strategy",
  tagline: "More Opportunity. Less Debt.",
  secondaryTagline: "Make college pay off.",
  title: "Naomi Peters | College Money, Scholarship & Career Strategy",
  description:
    "College strategy for scholarships, funding, internships, fellowships, career direction and making the most of your college years.",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://makecollegepayoff.com").replace(/\/$/, ""),
  locale: "en_US",

  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE),

  /** Only configured profiles are shown anywhere on the site. */
  social: {
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    tiktok: env(process.env.NEXT_PUBLIC_TIKTOK_URL),
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  },

  /**
   * Calendly event links. These are public, so the defaults live here;
   * an environment variable with the same purpose overrides them.
   */
  booking: {
    freeCall:
      env(process.env.NEXT_PUBLIC_CALENDLY_FREE_CALL_URL) ??
      "https://calendly.com/naomijpeters/free-20-minute-college-roi-call",
    strategySession: env(process.env.NEXT_PUBLIC_CALENDLY_STRATEGY_URL) ?? "https://calendly.com/naomijpeters/30min",
    fitCall:
      env(process.env.NEXT_PUBLIC_CALENDLY_FIT_CALL_URL) ?? "https://calendly.com/naomijpeters/flagship-program-fit-call",
  },

  /** Stripe-hosted Payment Links / Checkout URLs. No card data touches this site. */
  checkout: {
    strategyPack:
      env(process.env.NEXT_PUBLIC_STRIPE_STRATEGY_PACK_URL) ?? "https://buy.stripe.com/00w28k5hF3CN3i9eaN2kw00",
    intensive: env(process.env.NEXT_PUBLIC_STRIPE_INTENSIVE_URL) ?? "https://buy.stripe.com/3cI28k6lJ2yJ2e5feR2kw01",
    blueprint: env(process.env.NEXT_PUBLIC_STRIPE_ROI_BLUEPRINT_URL) ?? "https://buy.stripe.com/eVq6oA4dB4GR2e5d6J2kw02",
    paymentPlan: env(process.env.NEXT_PUBLIC_STRIPE_PAYMENT_PLAN_URL),
  },

  /** Optional secondary processor. Not required; buttons appear only when set. */
  paypal: {
    strategyPack: env(process.env.NEXT_PUBLIC_PAYPAL_STRATEGY_PACK_URL),
    intensive: env(process.env.NEXT_PUBLIC_PAYPAL_INTENSIVE_URL),
    blueprint: env(process.env.NEXT_PUBLIC_PAYPAL_ROI_BLUEPRINT_URL),
    paymentPlan: undefined as string | undefined,
  },

  leadMagnetUrl: env(process.env.NEXT_PUBLIC_LEAD_MAGNET_URL),
  /** Google Analytics 4 measurement ID (public); NEXT_PUBLIC_GA_ID overrides it. */
  analyticsId: env(process.env.NEXT_PUBLIC_GA_ID) ?? "G-F6ZFDTBQYT",
  /** Google Search Console ownership verification (public tag content). */
  googleSiteVerification: "cWZAcCPkZ0QijepthULWauVgzg_1zVh13L3lAjfmOWw",

  legal: {
    entityName: env(process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME) ?? "Naomi Peters",
    state: env(process.env.NEXT_PUBLIC_LEGAL_STATE),
    lastUpdated: "October 1, 2026",
  },

  disclaimer:
    "Educational coaching only. Results vary. Scholarship, admission, employment, travel, financial, and debt outcomes are not guaranteed. Services do not constitute investment, tax, legal, or individualized financial-planning advice.",
} as const;

export type SiteConfig = typeof siteConfig;
