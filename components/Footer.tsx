import Link from "next/link";
import { BookingButton } from "@/components/CtaButtons";
import { footerNav } from "@/components/navigation";
import { Container } from "@/components/ui";
import { configuredSocials } from "@/lib/links";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  const socials = configuredSocials();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-deep text-ivory">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="display text-4xl">Naomi Peters</p>
            <p className="label mt-3 text-gold">{siteConfig.descriptor}</p>
            <p className="mt-6 max-w-sm text-ivory/80">
              {siteConfig.tagline} {siteConfig.secondaryTagline}
            </p>
            <div className="mt-8">
              <BookingButton kind="freeCall" variant="light" placement="footer">
                Book a free 20-minute call
              </BookingButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {Object.entries(footerNav).map(([heading, links]) => (
              <nav key={heading} aria-label={heading}>
                <p className="label text-gold">{heading}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-ivory/85 hover:text-ivory hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            {(socials.length > 0 || siteConfig.email) && (
              <div>
                <p className="label text-gold">Connect</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {siteConfig.email && (
                    <li>
                      <a href={`mailto:${siteConfig.email}`} className="text-ivory/85 hover:text-ivory hover:underline">
                        Email
                      </a>
                    </li>
                  )}
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ivory/85 hover:text-ivory hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/15 pt-8 text-xs leading-relaxed text-ivory/75">
          <p className="max-w-4xl">{siteConfig.disclaimer}</p>
          <p className="mt-4">
            © {year} {siteConfig.legal.entityName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
