import Link from "next/link";
import { CheckoutButton } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHeader, SectionLabel } from "@/components/ui";
import type { CheckoutKind } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "Give a College Strategy Gift",
  description:
    "Give a student a College ROI Strategy Session or Strategy Pack: one-on-one coaching on scholarships, internships, study abroad and career direction.",
  path: "/gift",
  eyebrow: "Gift a strategy",
});

const gifts: { kind: CheckoutKind; name: string; price: string; detail: string; forWho: string }[] = [
  {
    kind: "giftSession",
    name: "College ROI Strategy Session",
    price: "$100",
    detail: "One 60-minute session on the student's top priority: scholarships, budget, internships, career direction or study abroad.",
    forWho: "A great stocking stuffer for a high school junior or senior, or a college student mid-search.",
  },
  {
    kind: "giftPack",
    name: "Strategy Pack",
    price: "$375",
    detail: "Four sessions to connect funding, internships, study abroad and career plans, with follow-through between sessions.",
    forWho: "For a student facing several big decisions this year, like choosing a school, a major or summer plans.",
  },
];

const steps = [
  "Choose a gift and check out securely with Stripe. Add the student's name and email, and an optional message.",
  "Within one business day, Naomi emails the student (or you, if you'd rather give it in person) a gift note with booking instructions.",
  "The student books their sessions whenever suits them.",
];

export default function GiftPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gift", path: "/gift" },
        ])}
      />
      <PageHeader
        eyebrow="Gift a strategy"
        title={
          <>
            Give a gift that <em className="text-forest">pays for itself.</em>
          </>
        }
        intro="For parents, grandparents and mentors: one-on-one coaching to help a student find scholarships, land experience and plan college with direction."
      />

      <section aria-label="Gift options" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {gifts.map((g) => (
              <article key={g.kind} className="flex flex-col border rule bg-paper p-7 sm:p-8">
                <p className="label text-terracotta">Gift</p>
                <h2 className="display mt-3 text-3xl sm:text-4xl">{g.name}</h2>
                <p className="display mt-4 text-5xl">{g.price}</p>
                <p className="mt-5 leading-relaxed text-ink-soft">{g.detail}</p>
                <p className="mt-3 text-sm italic text-muted">{g.forWho}</p>
                <div className="mt-auto pt-8">
                  <CheckoutButton kind={g.kind} placement="gift_page">
                    Give this gift
                  </CheckoutButton>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Payments are processed securely by Stripe. Want to give a larger package?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-ink">
              Send a message
            </Link>{" "}
            and Naomi will set it up.
          </p>
        </Container>
      </section>

      <section aria-labelledby="how-gift-title" className="bg-paper py-16 sm:py-20">
        <Container>
          <SectionLabel>How it works</SectionLabel>
          <h2 id="how-gift-title" className="display mt-6 text-4xl sm:text-5xl">
            Simple to give. Easy to use.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="border-t-2 border-ink pt-5">
                <span className="display text-4xl text-terracotta">{i + 1}</span>
                <p className="mt-3 leading-relaxed text-ink-soft">{s}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
