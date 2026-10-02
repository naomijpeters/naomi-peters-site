import { SpeakingForm } from "@/components/forms/SpeakingForm";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Arrow, Container, SectionLabel, buttonClasses } from "@/components/ui";
import { speakingAudiences, speakingTopics } from "@/content/speaking";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "Speaking & Workshops",
  description:
    "Workshops and talks for high schools, universities, parent groups and community organizations on scholarships, college money, career capital and funded opportunities.",
  path: "/speaking",
  eyebrow: "Speaking & workshops",
});

export default function SpeakingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Speaking", path: "/speaking" },
        ])}
      />
      <section aria-labelledby="speaking-title" className="border-b rule">
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionLabel>Speaking &amp; workshops</SectionLabel>
            <h1 id="speaking-title" className="display mt-6 text-5xl sm:text-7xl">
              More opportunity. Less debt. <em className="text-forest">For a whole room at once.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Practical, encouraging sessions that help students — and the adults supporting them — think strategically
              about paying for college, finding opportunities and building direction.
            </p>
            <a href="#inquiry" className={buttonClasses("primary", "lg", "mt-10")}>
              Book Naomi for a workshop
              <Arrow />
            </a>
          </div>
          <div className="lg:col-span-5">
            <Photo name="speaking" className="aspect-[4/3] w-full lg:mt-10" sizes="(min-width: 1024px) 38vw, 100vw" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="audiences-title" className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel number="01">Audiences</SectionLabel>
            <h2 id="audiences-title" className="display mt-6 text-5xl">
              Who it&apos;s for
            </h2>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-8 lg:pt-16">
            {speakingAudiences.map((a) => (
              <li key={a} className="rounded-full border border-ink/70 px-5 py-2.5 text-lg">
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="topics-title" className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionLabel number="02">Topics</SectionLabel>
          <h2 id="topics-title" className="display mt-6 text-5xl sm:text-6xl">
            Talks &amp; workshops
          </h2>
          <ol className="mt-12 grid gap-x-12 border-t-2 border-ink md:grid-cols-2">
            {speakingTopics.map((t, i) => (
              <li key={t.title} className="border-b rule py-7">
                <span className="text-sm tabular-nums text-terracotta">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-2 text-3xl">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{t.description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">Each session can be tailored for students, parents, or both.</p>
        </Container>
      </section>

      <section id="inquiry" aria-labelledby="inquiry-title" className="scroll-mt-20 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel number="03">Inquire</SectionLabel>
            <h2 id="inquiry-title" className="display mt-6 text-5xl">
              Book Naomi for a workshop
            </h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              Share a few details and Naomi will follow up about availability, format and fees. Budget ranges help her
              suggest the right format — every request is considered.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SpeakingForm />
          </div>
        </Container>
      </section>
    </>
  );
}
