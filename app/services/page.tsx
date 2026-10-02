import Link from "next/link";
import { BookingButton } from "@/components/CtaButtons";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Container, PageHeader, SectionLabel } from "@/components/ui";
import { faqs } from "@/content/faq";
import { serviceById, serviceChooser } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, professionalServiceSchema } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "Services & Pricing",
  description:
    "Transparent pricing for college strategy coaching: a free 20-minute call, $100 strategy sessions, and packages for scholarships, internships, study abroad and career direction.",
  path: "/services",
  eyebrow: "Services & pricing",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          professionalServiceSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="Services & pricing"
        title={
          <>
            Make college pay off. <em className="text-forest">Start where you are.</em>
          </>
        }
        intro="Every price is listed. Book a free call if you’d like to talk first — or, if you already know what you need, book or enroll directly."
      />

      <section aria-label="All services" className="py-16 sm:py-20">
        <Container>
          <ServicesGrid placement="services_page" />
          <p className="mt-8 text-sm text-muted">
            Payments are processed securely by Stripe — card details never touch this website.
          </p>
        </Container>
      </section>

      <section aria-labelledby="chooser-title" className="bg-paper py-20 sm:py-24">
        <Container>
          <SectionLabel>Not sure?</SectionLabel>
          <h2 id="chooser-title" className="display mt-6 text-5xl">
            Which one is right for me?
          </h2>
          <dl className="mt-12 border-t-2 border-ink">
            {serviceChooser.map((row) => {
              const s = serviceById(row.serviceId);
              if (!s) return null;
              return (
                <div key={row.serviceId} className="grid gap-2 border-b rule py-5 sm:grid-cols-[1.3fr_1fr_auto] sm:items-baseline sm:gap-8">
                  <dt className="display text-2xl">{row.situation}</dt>
                  <dd className="font-medium">
                    <Link href={`#${s.id}`} className="underline decoration-line underline-offset-4 hover:decoration-terracotta">
                      {s.name}
                    </Link>
                  </dd>
                  <dd className="display text-2xl text-terracotta">{s.priceLabel}</dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-10">
            <BookingButton kind="freeCall" placement="services_chooser">
              Still unsure? Book a free call
            </BookingButton>
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="py-20 sm:py-28">
        <Container narrow>
          <SectionLabel>Questions</SectionLabel>
          <h2 id="faq-title" className="display mb-10 mt-6 text-5xl">
            Before you book
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
