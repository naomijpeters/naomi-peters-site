import Link from "next/link";
import { ArticleGrid } from "@/components/ArticleCard";
import { BookingButton } from "@/components/CtaButtons";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { LeadMagnetSection } from "@/components/LeadMagnet";
import { Ledger, MetricsStrip, MiniProof } from "@/components/Metrics";
import { Photo } from "@/components/Photo";
import { PillarGrid } from "@/components/PillarGrid";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Testimonials } from "@/components/Testimonials";
import { Arrow, Container, SectionLabel, buttonClasses } from "@/components/ui";
import { audiences } from "@/content/audiences";
import { home } from "@/content/home";
import { getListedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { personSchema, professionalServiceSchema } from "@/lib/structuredData";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  const articles = getListedArticles().slice(0, 10);

  return (
    <>
      <JsonLd data={[personSchema(), professionalServiceSchema()]} />

      {/* 1 — HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <Container className="grid gap-10 pb-12 pt-8 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pb-14 lg:pt-10">
          <div className="animate-rise lg:col-span-7 lg:pt-4">
            <p className="label text-terracotta">{home.hero.eyebrow}</p>
            <h1 id="hero-title" className="display mt-4 text-[2.65rem] sm:mt-6 sm:text-7xl xl:text-[5.25rem]">
              {home.hero.titleLine1}
              <br />
              <em className="text-forest">{home.hero.titleLine2}</em>
            </h1>
            <MiniProof className="mt-5 lg:hidden" />
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft sm:mt-8 sm:text-xl">
              {home.hero.body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
              <BookingButton kind="freeCall" size="lg" placement="hero">
                {home.hero.primaryCta}
              </BookingButton>
              <Link href="#method" className={buttonClasses("ghost", "md", "self-center sm:self-auto")}>
                {home.hero.secondaryCta}
                <Arrow />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <Photo
                name="portrait"
                priority
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/5] w-full lg:aspect-[6/7]"
              />
              <div className="absolute -bottom-5 -left-3 bg-ink px-5 py-4 text-ivory shadow-xl sm:-left-6">
                <p className="display text-4xl text-gold">$0</p>
                <p className="label mt-1 text-[0.65rem] text-ivory/85">Student debt at graduation</p>
              </div>
            </div>
            <p className="mt-8 text-right text-xs text-muted lg:mt-7">{home.hero.portraitCaption}</p>
          </div>
        </Container>
      </section>

      <MetricsStrip />

      {/* 2 — PROBLEM */}
      <section aria-labelledby="problem-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01">{home.problem.label}</SectionLabel>
            <h2 id="problem-title" className="display mt-6 text-5xl sm:text-6xl">
              {home.problem.title}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            {home.problem.paragraphs.map((p) => (
              <p key={p} className="mb-5 text-lg leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
            <p className="label mt-10 text-muted">What students are often juggling alone</p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-lg">
              {home.problem.juggling.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {item}
                  {i < home.problem.juggling.length - 1 && (
                    <span aria-hidden="true" className="text-line">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="display mt-12 border-l-2 border-terracotta pl-5 text-3xl">{home.problem.closing}</p>
          </div>
        </Container>
      </section>

      {/* 3 — METHOD */}
      <section id="method" aria-labelledby="method-title" className="scroll-mt-20 bg-paper py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel number="02">{home.method.label}</SectionLabel>
              <h2 id="method-title" className="display mt-6 text-5xl sm:text-6xl">
                {home.method.title}
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8 lg:pt-14">{home.method.intro}</p>
          </div>
          <div className="mt-14">
            <PillarGrid />
          </div>
        </Container>
      </section>

      {/* 4 — STORY */}
      <section aria-labelledby="story-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <Photo name="graduation" className="col-span-2 aspect-[16/11]" sizes="(min-width: 1024px) 36vw, 100vw" />
              <Photo name="studyAbroad" className="aspect-square" sizes="(min-width: 1024px) 18vw, 50vw" />
              <Photo name="travel" className="aspect-square" sizes="(min-width: 1024px) 18vw, 50vw" />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <SectionLabel number="03">{home.story.label}</SectionLabel>
            <h2 id="story-title" className="display mt-6 text-5xl sm:text-6xl">
              {home.story.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {home.story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 border-t rule pt-6 text-[0.95rem] italic leading-relaxed text-muted">{home.story.honesty}</p>
            <Link href="/about" className={buttonClasses("ghost", "md", "mt-6")}>
              Read the full story
              <Arrow />
            </Link>
          </div>
        </Container>
      </section>

      {/* 5 — WHO IT'S FOR */}
      <section aria-labelledby="audience-title" className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionLabel number="04">{home.audiences.label}</SectionLabel>
          <h2 id="audience-title" className="display mt-6 max-w-4xl text-5xl sm:text-6xl">
            {home.audiences.title}
          </h2>
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <article key={a.id} className="flex flex-col bg-sand p-6 sm:p-7 lg:bg-ivory">
                <h3 className="label text-ink">{a.title}</h3>
                <p className="display mt-4 text-2xl leading-tight">{a.summary}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-ink-soft">
                  {a.points.map((pt) => (
                    <li key={pt}>— {pt}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <BookingButton kind={a.cta.kind} variant="ghost" placement={`audience_${a.id}`}>
                    {a.cta.label}
                  </BookingButton>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 6 — SERVICES */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel number="05">{home.services.label}</SectionLabel>
              <h2 id="services-title" className="display mt-6 text-5xl sm:text-6xl">
                {home.services.title}
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8 lg:pt-14">{home.services.intro}</p>
          </div>
          <div className="mt-14">
            <ServicesGrid compact placement="home_services" />
          </div>
          <p className="mt-10 text-center">
            <Link href="/services" className={buttonClasses("ghost")}>
              Compare all services in detail
              <Arrow />
            </Link>
          </p>
        </Container>
      </section>

      {/* 7 — WHY NAOMI */}
      <section aria-labelledby="why-title" className="bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel number="06">{home.why.label}</SectionLabel>
            <h2 id="why-title" className="display mt-6 text-5xl sm:text-6xl">
              {home.why.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {home.why.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10">
              <BookingButton kind="freeCall" placement="why_naomi">
                Book a free 20-minute call
              </BookingButton>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Ledger />
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* 8 — LEAD MAGNET */}
      <LeadMagnetSection number="07" placement="home" />

      {/* 9 — CONTENT */}
      <section aria-labelledby="content-title" className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <SectionLabel number="08">{home.content.label}</SectionLabel>
              <h2 id="content-title" className="display mt-6 max-w-3xl text-5xl sm:text-6xl">
                {home.content.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-ink-soft">{home.content.intro}</p>
            </div>
            <Link href="/resources" className={buttonClasses("secondary", "md", "self-start lg:self-auto")}>
              All resources
              <Arrow />
            </Link>
          </div>
          <div className="mt-12">
            <ArticleGrid articles={articles} numbered />
          </div>
        </Container>
      </section>

      {/* 10 — FINAL CTA */}
      <div className="border-t rule">
        <FinalCta />
      </div>
    </>
  );
}
