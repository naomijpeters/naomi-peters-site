import { Container, SectionLabel } from "@/components/ui";
import { testimonials } from "@/content/testimonials";

/** Renders nothing until real, permissioned testimonials exist in content/testimonials.ts. */
export function Testimonials() {
  const real = testimonials.filter((t) => t.permission === true && t.quote.trim());
  if (real.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="border-t rule py-20 sm:py-28">
      <Container>
        <SectionLabel>In their words</SectionLabel>
        <h2 id="testimonials-title" className="display mt-6 text-5xl">
          From students &amp; families
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {real.map((t) => (
            <figure key={t.quote} className="border-t-2 border-ink pt-6">
              <blockquote className="display text-2xl leading-snug">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{t.name}</span>
                {t.role && <span className="text-muted"> · {t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
