import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingButton } from "@/components/CtaButtons";
import { Arrow, Container, SectionLabel, buttonClasses } from "@/components/ui";
import type { SetupSlug } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Fallback for any booking/checkout button whose integration URL isn't configured yet.
 * Visitors see an honest "being set up" message; developers also see which variable to set.
 */

const items: Record<SetupSlug, { title: string; kind: "booking" | "checkout" | "client"; envVar: string }> = {
  "free-call": { title: "Free 20-Minute College ROI Call", kind: "booking", envVar: "NEXT_PUBLIC_CALENDLY_FREE_CALL_URL" },
  "strategy-session": { title: "College ROI Strategy Session", kind: "booking", envVar: "NEXT_PUBLIC_CALENDLY_STRATEGY_URL" },
  "fit-call": { title: "Flagship Program Fit Call", kind: "booking", envVar: "NEXT_PUBLIC_CALENDLY_FIT_CALL_URL" },
  "strategy-pack": { title: "Strategy Pack", kind: "checkout", envVar: "NEXT_PUBLIC_STRIPE_STRATEGY_PACK_URL" },
  intensive: { title: "Scholarship & Opportunity Intensive", kind: "checkout", envVar: "NEXT_PUBLIC_STRIPE_INTENSIVE_URL" },
  blueprint: { title: "The College ROI Blueprint", kind: "checkout", envVar: "NEXT_PUBLIC_STRIPE_ROI_BLUEPRINT_URL" },
  "payment-plan": { title: "Blueprint payment plan", kind: "checkout", envVar: "NEXT_PUBLIC_STRIPE_PAYMENT_PLAN_URL" },
  "gift-session": { title: "Gift: College ROI Strategy Session", kind: "checkout", envVar: "NEXT_PUBLIC_STRIPE_GIFT_SESSION_URL" },
  "gift-pack": { title: "Gift: Strategy Pack", kind: "checkout", envVar: "NEXT_PUBLIC_STRIPE_GIFT_PACK_URL" },
  intake: { title: "Client intake questionnaire", kind: "client", envVar: "INTAKE_FORM_URL" },
  "client-scheduling": { title: "Client session scheduling", kind: "client", envVar: "CLIENT_SCHEDULING_URL" },
};

export function generateStaticParams() {
  return Object.keys(items).map((item) => ({ item }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ item: string }> }) {
  const { item } = await params;
  const entry = items[item as SetupSlug];
  return pageMetadata({ title: entry ? `${entry.title} — coming soon` : "Coming soon", path: `/setup/${item}`, noIndex: true });
}

export default async function SetupPage({ params }: { params: Promise<{ item: string }> }) {
  const { item } = await params;
  const entry = items[item as SetupSlug];
  if (!entry) notFound();

  const verb = entry.kind === "booking" ? "Online booking" : entry.kind === "checkout" ? "Online enrollment" : "This link";
  const isDev = process.env.NODE_ENV !== "production";
  const freeCallReady = Boolean(siteConfig.booking.freeCall) && item !== "free-call";

  return (
    <section className="py-20 sm:py-28">
      <Container narrow>
        <SectionLabel>Almost ready</SectionLabel>
        <h1 className="display mt-6 text-5xl sm:text-6xl">{entry.title}</h1>
        <p className="mt-6 text-xl leading-relaxed text-ink-soft">
          {verb} for this is being set up and isn&apos;t live yet. Nothing has been booked or charged.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {siteConfig.email ? (
            <>
              In the meantime, email{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink underline underline-offset-4">
                {siteConfig.email}
              </a>{" "}
              or send a message and Naomi will help you get started.
            </>
          ) : (
            <>In the meantime, send a message and Naomi will help you get started.</>
          )}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {freeCallReady ? (
            <BookingButton kind="freeCall" placement={`setup_${item}`}>
              Book a free call instead
            </BookingButton>
          ) : (
            <Link href="/contact" className={buttonClasses("primary")}>
              Send a message
              <Arrow />
            </Link>
          )}
          <Link href="/services" className={buttonClasses("ghost")}>
            Back to services
            <Arrow />
          </Link>
        </div>

        {isDev && (
          <aside className="mt-16 border border-dashed border-terracotta/60 bg-paper p-6 text-sm leading-relaxed">
            <p className="label text-terracotta">Setup note · visible only in development</p>
            <p className="mt-3">
              This page appears because <code className="break-all rounded bg-sand px-1.5 py-0.5">{entry.envVar}</code> is empty.
              Add the URL to <code className="rounded bg-sand px-1.5 py-0.5">.env.local</code> (and to Vercel’s Environment
              Variables), then restart / redeploy. Every button for this item will then go straight to the real page.
            </p>
          </aside>
        )}
      </Container>
    </section>
  );
}
