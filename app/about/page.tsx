import Link from "next/link";
import { BookingButton } from "@/components/CtaButtons";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Ledger } from "@/components/Metrics";
import { Photo } from "@/components/Photo";
import { Arrow, Container, SectionLabel, buttonClasses } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "About Naomi",
  description:
    "Naomi Peters graduated from the University of St. Thomas with a finance degree and $0 in student debt — without need-based aid or family-paid tuition. Here’s the rest of the story.",
  path: "/about",
  eyebrow: "About Naomi",
});

const philosophy = [
  { cause: "Funding", effect: "created flexibility." },
  { cause: "Opportunities", effect: "created experience." },
  { cause: "Internships", effect: "created career capital." },
  { cause: "Travel", effect: "broadened perspective." },
  { cause: "Budgeting", effect: "made choices possible." },
  { cause: "Discernment", effect: "helped decide what was actually worth pursuing." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <section aria-labelledby="about-title" className="border-b rule">
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 lg:pt-6">
            <SectionLabel>About Naomi</SectionLabel>
            <h1 id="about-title" className="display mt-6 text-5xl sm:text-7xl">
              I graduated debt-free. <em className="text-forest">But that&apos;s only part of the story.</em>
            </h1>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                I studied finance at the University of St. Thomas. I didn&apos;t receive need-based scholarships, and my
                family didn&apos;t pay my tuition. If college was going to work, I had to figure out how to make it work.
              </p>
              <p>
                By graduation I had secured more than 20 scholarships and 5 grants, and I owed $0 in student debt. But
                the number people ask about — the $0 — is the least interesting part to me.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Photo name="portrait" priority className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 38vw, 100vw" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="pieces-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01">What actually happened</SectionLabel>
            <h2 id="pieces-title" className="display mt-6 text-5xl">
              The pieces were connected.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              During school I completed 4 internships, a co-op and 3 fellowships. I studied abroad for a semester and
              traveled to more than 30 countries. None of it happened in isolation — each piece made the next one
              possible.
            </p>
          </div>
          <ol className="border-t-2 border-ink lg:col-span-6 lg:col-start-7">
            {philosophy.map((row) => (
              <li key={row.cause} className="flex flex-wrap items-baseline gap-x-3 border-b rule py-5">
                <span className="display text-3xl text-terracotta sm:text-4xl">{row.cause}</span>
                <span className="text-lg text-ink">{row.effect}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-label="Photos" className="pb-20 sm:pb-28">
        <Container>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Photo name="studyAbroad" className="aspect-[3/4]" sizes="(min-width: 1024px) 24vw, 50vw" />
            <Photo name="professional" className="aspect-[3/4] lg:translate-y-10" sizes="(min-width: 1024px) 24vw, 50vw" />
            <Photo name="travel" className="aspect-[3/4]" sizes="(min-width: 1024px) 24vw, 50vw" />
            <Photo name="graduation" className="aspect-[3/4] lg:translate-y-10" sizes="(min-width: 1024px) 24vw, 50vw" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="strategy-title" className="bg-forest py-20 text-ivory sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel number="02" tone="light">
              Why I do this
            </SectionLabel>
            <h2 id="strategy-title" className="display mt-6 text-5xl sm:text-6xl">
              Students don&apos;t need more tips. They need a strategy that connects them.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ivory/90 lg:col-span-5 lg:col-start-8 lg:pt-14">
            <p>
              Most advice treats scholarships, internships, study abroad and career planning as separate checklists. In
              reality, a scholarship decision changes which internship you can afford to take; an internship changes what
              you want to study; a semester abroad changes what you think is possible.
            </p>
            <p>
              My finance background gives me a practical lens for this: budgeting, cost/benefit thinking, opportunity
              cost, and return. I use it to help students see the trade-offs clearly and choose on purpose.
            </p>
            <p className="text-ivory">
              You don&apos;t need to do college exactly the way I did. You need a strategy that works for you.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="ledger-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="03">The short version</SectionLabel>
            <h2 id="ledger-title" className="display mt-6 text-5xl">
              College, itemized.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              These are my personal results — shared as proof of what I know from experience, not as a promise of what
              any student will achieve. I&apos;m a coach and educator, not a licensed financial adviser.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <BookingButton kind="freeCall" placement="about">
                Book a free 20-minute call
              </BookingButton>
              <Link href="/how-i-help" className={buttonClasses("ghost")}>
                How I help
                <Arrow />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Ledger />
          </div>
        </Container>
      </section>

      <div className="border-t rule">
        <FinalCta title="Let’s build your version." body="A free 20-minute call to find your biggest bottleneck — and whether I can help." />
      </div>
    </>
  );
}
