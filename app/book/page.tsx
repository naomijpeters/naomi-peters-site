import Link from "next/link";
import { BookingButton } from "@/components/CtaButtons";
import { Container, PageHeader } from "@/components/ui";
import { serviceById } from "@/content/services";
import type { BookingKind } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a Call",
  description: "Book a free 20-minute College ROI call, a $100 strategy session, or a fit call for the flagship program.",
  path: "/book",
  eyebrow: "Book a call",
});

const options: {
  kind: BookingKind;
  name: string;
  price: string;
  duration: string;
  body: string;
  cta: string;
  primary?: boolean;
}[] = [
  {
    kind: "freeCall",
    name: "Free 20-Minute College ROI Call",
    price: "$0",
    duration: "20 minutes",
    body: serviceById("free-call")?.description ?? "",
    cta: "Book free call",
    primary: true,
  },
  {
    kind: "strategySession",
    name: "College ROI Strategy Session",
    price: serviceById("strategy-session")?.priceLabel ?? "$100",
    duration: "60 minutes",
    body: "A focused working session on one priority — scholarships, budget, internships, career direction, study abroad or semester planning. You pay securely when you schedule.",
    cta: "Book strategy session",
  },
  {
    kind: "fitCall",
    name: "Flagship Program Fit Call",
    price: "Free",
    duration: "Short call",
    body: "For the Scholarship & Opportunity Intensive or the College ROI Blueprint. We’ll make sure the program fits before you commit, and talk through payment plans if helpful.",
    cta: "Book a fit call",
  },
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a call"
        title="Let’s find where you are — and what you may be missing."
        intro="Choose the conversation that fits. Not sure? Start with the free call."
      />
      <section aria-label="Booking options" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {options.map((o) => (
              <article
                key={o.kind}
                className={`flex flex-col p-7 sm:p-8 ${o.primary ? "bg-forest text-ivory" : "border rule bg-paper"}`}
              >
                <p className={`label ${o.primary ? "text-gold" : "text-terracotta"}`}>{o.duration}</p>
                <h2 className="display mt-4 text-3xl">{o.name}</h2>
                <p className="display mt-4 text-5xl">{o.price}</p>
                <p className={`mt-5 leading-relaxed ${o.primary ? "text-ivory/85" : "text-ink-soft"}`}>{o.body}</p>
                <div className="mt-auto pt-8">
                  <BookingButton kind={o.kind} variant={o.primary ? "light" : "primary"} placement="book_page">
                    {o.cta}
                  </BookingButton>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm text-muted">
            Prefer to enroll in a package directly? See{" "}
            <Link href="/services" className="underline underline-offset-4 hover:text-ink">
              services &amp; pricing
            </Link>
            . Questions first?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-ink">
              Send a message
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
