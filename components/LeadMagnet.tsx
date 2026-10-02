import { LeadMagnetForm } from "@/components/forms/LeadMagnetForm";
import { Container, SectionLabel, cx } from "@/components/ui";

const kitContents = [
  "Scholarships beyond the big search engines",
  "Grants and department awards",
  "Internships and co-ops",
  "Fellowships and funded programs",
  "Study-abroad and international funding",
];

/** Full-width Starter Kit signup band. */
export function LeadMagnetSection({ number, placement = "home" }: { number?: string; placement?: string }) {
  return (
    <section id="starter-kit" aria-labelledby="starter-kit-title" className="scroll-mt-20 bg-forest text-ivory">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionLabel number={number} tone="light">
            Free resource
          </SectionLabel>
          <h2 id="starter-kit-title" className="display mt-6 text-5xl sm:text-6xl">
            The College ROI Starter Kit
          </h2>
          <p className="mt-6 text-xl leading-snug text-ivory/90">
            The 25 places students forget to look for scholarships, grants, internships, fellowships &amp; funded
            opportunities.
          </p>
          <ul className="mt-8 space-y-2.5 text-ivory/85">
            {kitContents.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-gold">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:self-center">
          <div className="border-t border-ivory/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="mb-6 text-ivory/85">
              Scholarships are only one piece of the puzzle. Get the list, then start connecting the rest.
            </p>
            <LeadMagnetForm placement={placement} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Compact inline version used inside articles. */
export function LeadMagnetInline({ placement = "article_inline", className }: { placement?: string; className?: string }) {
  return (
    <aside aria-label="Free Starter Kit" className={cx("not-prose my-12 bg-forest p-6 text-ivory sm:p-8", className)}>
      <p className="label text-gold">Free guide</p>
      <p className="display mt-3 text-3xl">The College ROI Starter Kit</p>
      <p className="mb-6 mt-2 text-ivory/85">
        25 places students forget to look for scholarships, grants, internships, fellowships &amp; funded opportunities.
      </p>
      <LeadMagnetForm placement={placement} />
    </aside>
  );
}
