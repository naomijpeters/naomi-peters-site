import Link from "next/link";
import type { ReactNode } from "react";
import { Container, SectionLabel } from "@/components/ui";
import { siteConfig } from "@/lib/siteConfig";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-14 sm:py-20">
      <Container narrow>
        <SectionLabel>Legal</SectionLabel>
        <h1 className="display mt-6 text-5xl sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated {siteConfig.legal.lastUpdated}</p>
        <div className="prose-article mt-10 [&_h2]:text-3xl">{children}</div>
      </Container>
    </section>
  );
}

export function ContactLine() {
  return siteConfig.email ? (
    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
  ) : (
    <Link href="/contact">the contact page</Link>
  );
}
