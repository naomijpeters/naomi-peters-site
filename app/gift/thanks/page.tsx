import Link from "next/link";
import { Container, SectionLabel } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({ title: "Thank you for your gift", path: "/gift/thanks", noIndex: true });

export default function GiftThanksPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container narrow>
        <SectionLabel>Gift received</SectionLabel>
        <h1 className="display mt-6 text-5xl sm:text-7xl">
          Thank you. <em className="text-forest">What a thoughtful gift.</em>
        </h1>
        <ol className="mt-12 space-y-6 border-t-2 border-ink pt-8 text-lg leading-relaxed text-ink-soft">
          <li>
            <strong className="text-ink">1. Your receipt</strong> is on its way from Stripe to the email you used at
            checkout.
          </li>
          <li>
            <strong className="text-ink">2. Within one business day,</strong> Naomi will email the gift note with booking
            instructions to the student, or to you if you asked to give it in person.
          </li>
          <li>
            <strong className="text-ink">3. The student books</strong> their sessions whenever suits them.
          </li>
        </ol>
        <p className="mt-10 text-ink-soft">
          Questions?{" "}
          {siteConfig.email ? (
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink underline underline-offset-4">
              {siteConfig.email}
            </a>
          ) : (
            <Link href="/contact" className="font-medium text-ink underline underline-offset-4">
              Send a message
            </Link>
          )}
          .
        </p>
      </Container>
    </section>
  );
}
