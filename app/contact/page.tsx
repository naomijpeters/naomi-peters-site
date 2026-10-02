import { BookingButton } from "@/components/CtaButtons";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, SectionLabel } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Questions about coaching, pricing, workshops or where to start? Send Naomi a message.",
  path: "/contact",
  eyebrow: "Contact",
});

export default function ContactPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="display mt-6 text-5xl sm:text-6xl">Tell me where you are.</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Questions about coaching, pricing, workshops, or where to start? Send a message. Students and parents are
            both welcome to write.
          </p>
          <div className="mt-10 border-t rule pt-8">
            <p className="label text-muted">Faster route</p>
            <p className="mt-3 text-ink-soft">The free 20-minute call is the quickest way to get a real answer.</p>
            <div className="mt-5">
              <BookingButton kind="freeCall" placement="contact">
                Book a free call
              </BookingButton>
            </div>
          </div>
          {(siteConfig.email || siteConfig.phone) && (
            <dl className="mt-10 space-y-3 border-t rule pt-8 text-sm">
              {siteConfig.email && (
                <div>
                  <dt className="label text-muted">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${siteConfig.email}`} className="text-lg underline underline-offset-4">
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              )}
              {siteConfig.phone && (
                <div>
                  <dt className="label text-muted">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="text-lg underline underline-offset-4">
                      {siteConfig.phone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
