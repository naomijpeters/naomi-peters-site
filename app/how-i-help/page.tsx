import Link from "next/link";
import { BookingButton } from "@/components/CtaButtons";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Container, PageHeader, SectionLabel, buttonClasses } from "@/components/ui";
import { audiences } from "@/content/audiences";
import { faqs } from "@/content/faq";
import { methodName, pillars } from "@/content/pillars";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "How I Help: The College ROI Method",
  description:
    "A four-part coaching framework for funding college, building career capital, finding funded opportunities and graduating with direction.",
  path: "/how-i-help",
  eyebrow: "The College ROI Method",
});

const steps = [
  { title: "Free 20-minute call", body: "We find your biggest current bottleneck and decide together whether coaching makes sense." },
  { title: "Choose your depth", body: "A single $100 session for one decision, or a package when several pieces need to connect." },
  { title: "Build your strategy", body: "We work through your priorities and leave each session with clear next steps and a roadmap." },
  { title: "Follow through", body: "Packages include follow-up and accountability, so the plan turns into applications, offers and decisions." },
];

const isIsNot = {
  is: [
    "Coaching, strategy, organization and feedback",
    "Frameworks for cost/benefit and opportunity decisions",
    "Help building your own systems and calendar",
    "Editing and feedback on materials you write",
  ],
  isNot: [
    "Admissions consulting",
    "Writing applications or essays for you",
    "Licensed financial, investment, tax or legal advice",
    "A guarantee of scholarships, jobs or debt-free graduation",
  ],
};

export default function HowIHelpPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How I Help", path: "/how-i-help" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow={methodName}
        title={
          <>
            Your college strategy should connect <em className="text-forest">all</em> the pieces.
          </>
        }
        intro="Money, opportunities, experience and what comes next aren’t separate problems. Scholarships are only one piece of the puzzle — the College ROI Method connects the rest."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <BookingButton kind="freeCall" size="lg" placement="how_header">
            Book a free 20-minute call
          </BookingButton>
          <Link href="/services" className={buttonClasses("ghost")}>
            See services &amp; pricing
            <Arrow />
          </Link>
        </div>
      </PageHeader>

      <nav aria-label="Pillars" className="sticky top-16 z-20 border-b rule bg-ivory/95 backdrop-blur-sm sm:top-20">
        <Container>
          <ul className="flex gap-6 overflow-x-auto py-3 text-sm font-medium [scrollbar-width:none]">
            {pillars.map((p) => (
              <li key={p.id} className="shrink-0">
                <a href={`#${p.id}`} className="hover:text-terracotta">
                  <span className="text-terracotta">{p.number}</span> {p.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {pillars.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          aria-labelledby={`${p.id}-title`}
          className={`scroll-mt-32 py-20 sm:py-24 ${i % 2 === 1 ? "bg-paper" : ""}`}
        >
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="display text-7xl text-terracotta/80">{p.number}</p>
              <h2 id={`${p.id}-title`} className="display mt-2 text-5xl sm:text-6xl">
                {p.name}
              </h2>
              <p className="mt-4 text-xl text-ink">{p.short}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-ink-soft">{p.summary}</p>
              <p className="label mt-10 text-muted">What we work on</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.topics.map((t) => (
                  <li key={t} className="rounded-full border rule px-3.5 py-1.5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="label mt-10 text-muted">Questions students bring</p>
              <ul className="mt-4 space-y-3">
                {p.questions.map((q) => (
                  <li key={q} className="display border-l-2 border-line pl-4 text-xl leading-snug">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}

      <section aria-labelledby="process-title" className="bg-forest py-20 text-ivory sm:py-28">
        <Container>
          <SectionLabel tone="light">How coaching works</SectionLabel>
          <h2 id="process-title" className="display mt-6 text-5xl sm:text-6xl">
            Four steps. No guesswork.
          </h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-ivory/25 pt-6">
                <span className="display text-4xl text-gold">{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-ivory/85">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="who-title" className="py-20 sm:py-28">
        <Container>
          <SectionLabel>Who I work with</SectionLabel>
          <h2 id="who-title" className="display mt-6 text-5xl">
            Students from 16 to early career — and their parents.
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <div key={a.id} className="border-t-2 border-ink pt-5">
                <h3 className="label">{a.title}</h3>
                <p className="mt-3 text-ink-soft">{a.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="isnot-title" className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionLabel>Transparency</SectionLabel>
          <h2 id="isnot-title" className="display mt-6 text-5xl">
            What coaching is — and isn’t.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="label text-forest">Coaching is</h3>
              <ul className="mt-4 space-y-3 text-lg">
                {isIsNot.is.map((x) => (
                  <li key={x} className="border-b rule pb-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label text-terracotta">Coaching isn’t</h3>
              <ul className="mt-4 space-y-3 text-lg text-ink-soft">
                {isIsNot.isNot.map((x) => (
                  <li key={x} className="border-b rule pb-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="py-20 sm:py-28">
        <Container narrow>
          <SectionLabel>Questions</SectionLabel>
          <h2 id="faq-title" className="display mb-10 mt-6 text-5xl">
            Frequently asked
          </h2>
          <Faq items={faqs} />
        </Container>
      </section>

      <div className="border-t rule">
        <FinalCta />
      </div>
    </>
  );
}
